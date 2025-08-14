import * as si from 'systeminformation';
import { Server as SocketIOServer } from 'socket.io';
import { appConfig } from '@config/index';
import { redisService } from './redis.service';
import logger from '@lib/logger';
import {
  SystemMetrics,
  CpuMetrics,
  MemoryMetrics,
  DiskMetrics,
  NetworkMetrics,
  SystemAlert,
  SystemStatus,
  SystemMonitoringEvent,
} from '../types/system-monitoring';

export class SystemMonitoringService {
  private io: SocketIOServer | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private _isRunning: boolean = false;
  private lastNetworkStats: any = null;
  private lastDiskStats: any = null;
  private startTime: number = Date.now();
  private redisUnavailableLogged: boolean = false;

  // Alert thresholds
  private readonly thresholds = {
    cpu: 80, // percentage
    memory: 85, // percentage
    disk: 90, // percentage
    networkErrors: 100, // errors per interval
  };

  constructor() {
    // Initialize system information
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      // Get initial network and disk stats for delta calculations
      this.lastNetworkStats = await si.networkStats();
      this.lastDiskStats = await si.disksIO();
      logger.info('System monitoring service initialized');
    } catch (error) {
      logger.error('Failed to initialize system monitoring service:', error);
    }
  }

  setSocketIO(io: SocketIOServer): void {
    this.io = io;
    logger.info('Socket.IO instance set for system monitoring');
  }

  async start(): Promise<void> {
    if (this._isRunning) {
      logger.warn('System monitoring is already running');
      return;
    }

    this._isRunning = true;
    logger.info(
      `Starting system monitoring with ${appConfig.systemMonitoring.intervalMs}ms interval`
    );

    // Collect initial metrics immediately
    await this.collectAndStoreMetrics();

    // Start periodic collection
    this.intervalId = setInterval(async () => {
      try {
        await this.collectAndStoreMetrics();
      } catch (error) {
        logger.error('Error collecting system metrics:', error);
      }
    }, appConfig.systemMonitoring.intervalMs);
  }

  async stop(): Promise<void> {
    if (!this._isRunning) {
      return;
    }

    this._isRunning = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    logger.info('System monitoring stopped');
  }

  private async collectAndStoreMetrics(): Promise<void> {
    try {
      const timestamp = Date.now();

      // Collect all metrics in parallel
      const [cpuData, memData, diskData, networkData, loadData, osInfo, diskIO, networkStats] =
        await Promise.all([
          si.currentLoad(),
          si.mem(),
          si.fsSize(),
          si.networkInterfaces(),
          si.currentLoad(),
          si.osInfo(),
          si.disksIO(),
          si.networkStats(),
        ]);

      // Process CPU metrics
      const cpu: CpuMetrics = {
        usage: Math.round(cpuData.currentLoad * 100) / 100,
        load: [loadData.avgLoad, loadData.avgLoad, loadData.avgLoad], // Use single avgLoad value for all
        cores: cpuData.cpus?.length || 1,
        speed: 0, // Speed property doesn't exist in current API, set to 0
      };

      // Try to get CPU temperature (may not be available on all systems)
      try {
        const temp = await si.cpuTemperature();
        if (temp.main && temp.main > 0) {
          cpu.temperature = Math.round(temp.main * 100) / 100;
        }
      } catch (tempError) {
        // Temperature reading not available, skip it
      }

      // Process memory metrics
      const memory: MemoryMetrics = {
        total: memData.total,
        used: memData.used,
        free: memData.free,
        available: memData.available,
        usage: Math.round((memData.used / memData.total) * 10000) / 100,
        swap: {
          total: memData.swaptotal,
          used: memData.swapused,
          free: memData.swapfree,
          usage:
            memData.swaptotal > 0
              ? Math.round((memData.swapused / memData.swaptotal) * 10000) / 100
              : 0,
        },
      };

      // Process disk metrics (aggregate all filesystems)
      let totalDisk = 0;
      let usedDisk = 0;
      let freeDisk = 0;

      diskData.forEach(disk => {
        totalDisk += disk.size;
        usedDisk += disk.used;
        freeDisk += disk.available;
      });

      // Calculate disk I/O rates
      let readSpeed = 0;
      let writeSpeed = 0;
      let readIOPS = 0;
      let writeIOPS = 0;

      if (this.lastDiskStats && diskIO) {
        const timeDiff = (timestamp - this.lastDiskStats.timestamp) / 1000; // seconds

        if (timeDiff > 0) {
          const currentRead = diskIO.rIO || 0;
          const currentWrite = diskIO.wIO || 0;
          const lastRead = this.lastDiskStats.rIO || 0;
          const lastWrite = this.lastDiskStats.wIO || 0;

          readIOPS = Math.round((currentRead - lastRead) / timeDiff);
          writeIOPS = Math.round((currentWrite - lastWrite) / timeDiff);

          // Estimate speed (this is approximate)
          const currentReadBytes = diskIO.rIO_sec || 0;
          const currentWriteBytes = diskIO.wIO_sec || 0;

          readSpeed = currentReadBytes;
          writeSpeed = currentWriteBytes;
        }
      }

      // Store current disk stats for next calculation
      this.lastDiskStats = { ...diskIO, timestamp };

      const disk: DiskMetrics = {
        total: totalDisk,
        used: usedDisk,
        free: freeDisk,
        usage: totalDisk > 0 ? Math.round((usedDisk / totalDisk) * 10000) / 100 : 0,
        readSpeed,
        writeSpeed,
        iops: {
          read: readIOPS,
          write: writeIOPS,
        },
      };

      // Process network metrics
      let totalBytesReceived = 0;
      let totalBytesSent = 0;
      let totalPacketsReceived = 0;
      let totalPacketsSent = 0;

      const interfaces = networkData.map(iface => {
        // Use safe property access for network stats
        totalBytesReceived += (iface as any).rx_bytes || 0;
        totalBytesSent += (iface as any).tx_bytes || 0;
        totalPacketsReceived += (iface as any).rx_packets || 0;
        totalPacketsSent += (iface as any).tx_packets || 0;

        return {
          name: iface.iface,
          bytesReceived: (iface as any).rx_bytes || 0,
          bytesSent: (iface as any).tx_bytes || 0,
          packetsReceived: (iface as any).rx_packets || 0,
          packetsSent: (iface as any).tx_packets || 0,
          speed: iface.speed || 0,
          isUp: iface.operstate === 'up',
          ip4: iface.ip4 || '',
          ip6: iface.ip6 || '',
        };
      });

      const network: NetworkMetrics = {
        interfaces,
        totalBytesReceived,
        totalBytesSent,
        totalPacketsReceived,
        totalPacketsSent,
      };

      // Create the complete metrics object
      const metrics: SystemMetrics = {
        timestamp,
        cpu,
        memory,
        disk,
        network,
      };

      // Store metrics in Redis
      await this.storeMetrics(metrics);

      // Check for alerts
      const alerts = this.checkAlerts(metrics);

      // Broadcast to connected clients
      this.broadcastMetrics(metrics, alerts);

      logger.debug('System metrics collected and stored successfully');
    } catch (error) {
      logger.error('Error collecting system metrics:', error);
    }
  }

  private async storeMetrics(metrics: SystemMetrics): Promise<void> {
    try {
      if (!redisService.isConnected()) {
        // Only log once when Redis is first unavailable
        if (!this.redisUnavailableLogged) {
          logger.info('Redis not available - metrics will not be persisted');
          this.redisUnavailableLogged = true;
        }
        return;
      }

      const key = 'system:metrics';
      const jsonMetrics = JSON.stringify(metrics);

      // Add to the beginning of the list
      await redisService.lpush(key, jsonMetrics);

      // Trim the list to keep only the configured history size
      await redisService.ltrim(key, 0, appConfig.systemMonitoring.historySize - 1);

      // Also store the latest metrics in a separate key for quick access
      await redisService.set('system:latest', jsonMetrics, 60); // 60 second TTL
    } catch (error) {
      logger.error('Error storing metrics in Redis:', error);
    }
  }

  private checkAlerts(metrics: SystemMetrics): SystemAlert[] {
    const alerts: SystemAlert[] = [];

    // CPU alert
    if (metrics.cpu.usage > this.thresholds.cpu) {
      alerts.push({
        level: metrics.cpu.usage > 95 ? 'critical' : 'warning',
        metric: 'cpu',
        message: `High CPU usage: ${metrics.cpu.usage.toFixed(1)}%`,
        value: metrics.cpu.usage,
        threshold: this.thresholds.cpu,
        timestamp: metrics.timestamp,
      });
    }

    // Memory alert
    if (metrics.memory.usage > this.thresholds.memory) {
      alerts.push({
        level: metrics.memory.usage > 95 ? 'critical' : 'warning',
        metric: 'memory',
        message: `High memory usage: ${metrics.memory.usage.toFixed(1)}%`,
        value: metrics.memory.usage,
        threshold: this.thresholds.memory,
        timestamp: metrics.timestamp,
      });
    }

    // Disk alert
    if (metrics.disk.usage > this.thresholds.disk) {
      alerts.push({
        level: metrics.disk.usage > 98 ? 'critical' : 'warning',
        metric: 'disk',
        message: `High disk usage: ${metrics.disk.usage.toFixed(1)}%`,
        value: metrics.disk.usage,
        threshold: this.thresholds.disk,
        timestamp: metrics.timestamp,
      });
    }

    return alerts;
  }

  private broadcastMetrics(metrics: SystemMetrics, alerts: SystemAlert[]): void {
    if (!this.io) {
      return;
    }

    // Broadcast current metrics
    const metricsEvent: SystemMonitoringEvent = {
      type: 'system-metrics',
      data: metrics,
    };

    this.io.to('system-monitoring').emit('system-monitoring', metricsEvent);

    // Broadcast alerts if any
    if (alerts.length > 0) {
      alerts.forEach(alert => {
        const alertEvent: SystemMonitoringEvent = {
          type: 'system-alert',
          data: alert,
        };
        this.io?.to('system-monitoring').emit('system-monitoring', alertEvent);
      });
    }

    // Broadcast system status
    const status: SystemStatus = {
      isHealthy: alerts.filter(a => a.level === 'critical').length === 0,
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      lastUpdate: metrics.timestamp,
      alerts,
    };

    const statusEvent: SystemMonitoringEvent = {
      type: 'system-status',
      data: status,
    };

    this.io.to('system-monitoring').emit('system-monitoring', statusEvent);
  }

  async getLatestMetrics(): Promise<SystemMetrics | null> {
    try {
      if (!redisService.isConnected()) {
        return null;
      }

      const latest = await redisService.get('system:latest');
      if (!latest) {
        return null;
      }

      return JSON.parse(latest) as SystemMetrics;
    } catch (error) {
      logger.error('Error getting latest metrics:', error);
      return null;
    }
  }

  async getHistoricalMetrics(count: number = 100): Promise<SystemMetrics[]> {
    try {
      if (!redisService.isConnected()) {
        return [];
      }

      const metrics = await redisService.lrange('system:metrics', 0, count - 1);
      return metrics.map(m => JSON.parse(m) as SystemMetrics);
    } catch (error) {
      logger.error('Error getting historical metrics:', error);
      return [];
    }
  }

  isRunning(): boolean {
    return this._isRunning;
  }

  getUptime(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
}

export const systemMonitoringService = new SystemMonitoringService();
