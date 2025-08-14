import { EventEmitter } from 'events';
import { logger } from '@lib/logger';
import { databaseService } from '@services/database.service';
import { redisService } from '@services/redis.service';
import * as os from 'os';
import * as process from 'process';

interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
  heal: () => Promise<void>;
  interval: number;
  maxRetries: number;
}

interface SystemMetrics {
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
  uptime: number;
  loadAverage: number[];
  freeMemory: number;
  totalMemory: number;
}

export class SelfHealingService extends EventEmitter {
  private static instance: SelfHealingService;
  private healthChecks: Map<string, HealthCheck> = new Map();
  private isRunning = false;
  private checkIntervals: Map<string, NodeJS.Timeout> = new Map();
  private failureCount: Map<string, number> = new Map();
  private metrics: SystemMetrics | null = null;
  private metricsInterval: NodeJS.Timeout | null = null;

  private constructor() {
    super();
    this.initializeDefaultChecks();
  }

  public static getInstance(): SelfHealingService {
    if (!SelfHealingService.instance) {
      SelfHealingService.instance = new SelfHealingService();
    }
    return SelfHealingService.instance;
  }

  /**
   * Initialize default health checks
   */
  private initializeDefaultChecks(): void {
    // Database health check
    this.registerHealthCheck({
      name: 'database',
      check: async () => {
        try {
          const isHealthy = await databaseService.healthCheck();
          return isHealthy;
        } catch (error) {
          logger.error('Database health check failed:', error);
          return false;
        }
      },
      heal: async () => {
        logger.info('Attempting to heal database connection...');
        try {
          await databaseService.disconnect();
          await new Promise(resolve => setTimeout(resolve, 2000));
          await databaseService.connect();
          logger.info('Database connection healed successfully');
        } catch (error) {
          logger.error('Database healing failed:', error);
          throw error;
        }
      },
      interval: 30000, // 30 seconds
      maxRetries: 3,
    });

    // Redis health check
    this.registerHealthCheck({
      name: 'redis',
      check: async () => {
        try {
          const client = redisService.getClient();
          if (!client) return false;
          await client.ping();
          return true;
        } catch (error) {
          logger.error('Redis health check failed:', error);
          return false;
        }
      },
      heal: async () => {
        logger.info('Attempting to heal Redis connection...');
        try {
          await redisService.disconnect();
          await new Promise(resolve => setTimeout(resolve, 2000));
          // Redis will auto-reconnect on next operation
          logger.info('Redis disconnected for healing - will reconnect on next use');
        } catch (error) {
          logger.error('Redis healing failed:', error);
          throw error;
        }
      },
      interval: 30000, // 30 seconds
      maxRetries: 3,
    });

    // Memory leak detection and healing
    this.registerHealthCheck({
      name: 'memory',
      check: async () => {
        const memUsage = process.memoryUsage();
        const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
        
        if (heapUsedPercent > 90) {
          logger.warn(`High memory usage detected: ${heapUsedPercent.toFixed(2)}%`);
          return false;
        }
        return true;
      },
      heal: async () => {
        logger.info('Attempting to reduce memory usage...');
        
        // Force garbage collection if available
        if (global.gc) {
          global.gc();
          logger.info('Forced garbage collection');
        }
        
        // Clear caches
        this.emit('clear-caches');
        
        // Wait and check again
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const memUsage = process.memoryUsage();
        const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
        
        if (heapUsedPercent > 95) {
          logger.error('Critical memory usage - considering restart');
          this.emit('restart-required', { reason: 'memory' });
        }
      },
      interval: 60000, // 1 minute
      maxRetries: 2,
    });

    // CPU usage monitoring
    this.registerHealthCheck({
      name: 'cpu',
      check: async () => {
        const loadAvg = os.loadavg();
        const cpuCount = os.cpus().length;
        const normalizedLoad = loadAvg[0] / cpuCount;
        
        if (normalizedLoad > 0.9) {
          logger.warn(`High CPU load detected: ${(normalizedLoad * 100).toFixed(2)}%`);
          return false;
        }
        return true;
      },
      heal: async () => {
        logger.info('Attempting to reduce CPU load...');
        
        // Reduce worker pool size
        this.emit('reduce-workers');
        
        // Throttle request processing
        this.emit('enable-throttling');
        
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        const loadAvg = os.loadavg();
        const cpuCount = os.cpus().length;
        const normalizedLoad = loadAvg[0] / cpuCount;
        
        if (normalizedLoad < 0.7) {
          logger.info('CPU load normalized');
          this.emit('disable-throttling');
        }
      },
      interval: 30000, // 30 seconds
      maxRetries: 2,
    });
  }

  /**
   * Register a new health check
   */
  public registerHealthCheck(check: HealthCheck): void {
    this.healthChecks.set(check.name, check);
    this.failureCount.set(check.name, 0);
    logger.info(`Registered health check: ${check.name}`);
  }

  /**
   * Start self-healing service
   */
  public start(): void {
    if (this.isRunning) {
      logger.warn('Self-healing service is already running');
      return;
    }

    this.isRunning = true;
    logger.info('🏥 Self-healing service started');

    // Start health checks
    this.healthChecks.forEach((check, name) => {
      const interval = setInterval(async () => {
        await this.performHealthCheck(name);
      }, check.interval);
      
      this.checkIntervals.set(name, interval);
    });

    // Start metrics collection
    this.startMetricsCollection();

    // Handle uncaught exceptions
    process.on('uncaughtException', async (error) => {
      logger.error('Uncaught exception detected:', error);
      await this.handleCriticalError(error);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', async (reason, promise) => {
      logger.error('Unhandled rejection detected:', { reason, promise });
      await this.handleCriticalError(new Error(String(reason)));
    });
  }

  /**
   * Stop self-healing service
   */
  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    
    // Clear all intervals
    this.checkIntervals.forEach(interval => clearInterval(interval));
    this.checkIntervals.clear();
    
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = null;
    }

    logger.info('Self-healing service stopped');
  }

  /**
   * Perform a health check
   */
  private async performHealthCheck(name: string): Promise<void> {
    const check = this.healthChecks.get(name);
    if (!check) return;

    try {
      const isHealthy = await check.check();
      
      if (!isHealthy) {
        const failures = (this.failureCount.get(name) || 0) + 1;
        this.failureCount.set(name, failures);
        
        logger.warn(`Health check '${name}' failed (${failures}/${check.maxRetries})`);
        
        if (failures >= check.maxRetries) {
          logger.error(`Health check '${name}' exceeded max retries, attempting to heal...`);
          await this.attemptHealing(name);
        }
      } else {
        // Reset failure count on success
        this.failureCount.set(name, 0);
      }
    } catch (error) {
      logger.error(`Error during health check '${name}':`, error);
    }
  }

  /**
   * Attempt to heal a failed service
   */
  private async attemptHealing(name: string): Promise<void> {
    const check = this.healthChecks.get(name);
    if (!check) return;

    try {
      await check.heal();
      
      // Verify healing was successful
      const isHealthy = await check.check();
      
      if (isHealthy) {
        logger.info(`✅ Successfully healed '${name}'`);
        this.failureCount.set(name, 0);
        this.emit('healed', { service: name });
      } else {
        logger.error(`❌ Healing failed for '${name}'`);
        this.emit('healing-failed', { service: name });
      }
    } catch (error) {
      logger.error(`Error during healing attempt for '${name}':`, error);
      this.emit('healing-error', { service: name, error });
    }
  }

  /**
   * Handle critical errors
   */
  private async handleCriticalError(error: Error): Promise<void> {
    logger.error('Handling critical error:', error);
    
    // Attempt to recover based on error type
    if (error.message.includes('ECONNREFUSED')) {
      // Connection refused - try to reconnect
      await this.attemptHealing('database');
      await this.attemptHealing('redis');
    } else if (error.message.includes('ENOMEM')) {
      // Out of memory
      await this.attemptHealing('memory');
    } else {
      // Unknown error - emit for external handling
      this.emit('critical-error', error);
    }
  }

  /**
   * Start collecting system metrics
   */
  private startMetricsCollection(): void {
    this.metricsInterval = setInterval(() => {
      this.metrics = {
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        uptime: process.uptime(),
        loadAverage: os.loadavg(),
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
      };
      
      this.emit('metrics-updated', this.metrics);
    }, 10000); // Every 10 seconds
  }

  /**
   * Get current metrics
   */
  public getMetrics(): SystemMetrics | null {
    return this.metrics;
  }

  /**
   * Get health status
   */
  public async getHealthStatus(): Promise<Record<string, boolean>> {
    const status: Record<string, boolean> = {};
    
    for (const [name, check] of this.healthChecks.entries()) {
      try {
        status[name] = await check.check();
      } catch (error) {
        status[name] = false;
      }
    }
    
    return status;
  }

  /**
   * Force healing of a specific service
   */
  public async forceHeal(serviceName: string): Promise<void> {
    const check = this.healthChecks.get(serviceName);
    if (!check) {
      throw new Error(`Service '${serviceName}' not found`);
    }
    
    await this.attemptHealing(serviceName);
  }
}

export const selfHealingService = SelfHealingService.getInstance();
