export interface SystemMetrics {
  timestamp: number;
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics;
  network: NetworkMetrics;
}

export interface CpuMetrics {
  usage: number; // percentage
  load: number[]; // 1min, 5min, 15min averages
  cores: number;
  speed: number; // GHz
  temperature?: number; // Celsius
}

export interface MemoryMetrics {
  total: number; // bytes
  used: number; // bytes
  free: number; // bytes
  available: number; // bytes
  usage: number; // percentage
  swap: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
}

export interface DiskMetrics {
  total: number; // bytes
  used: number; // bytes
  free: number; // bytes
  usage: number; // percentage
  readSpeed: number; // bytes/sec
  writeSpeed: number; // bytes/sec
  iops: {
    read: number;
    write: number;
  };
}

export interface NetworkMetrics {
  interfaces: NetworkInterface[];
  totalBytesReceived: number;
  totalBytesSent: number;
  totalPacketsReceived: number;
  totalPacketsSent: number;
}

export interface NetworkInterface {
  name: string;
  bytesReceived: number;
  bytesSent: number;
  packetsReceived: number;
  packetsSent: number;
  speed: number; // Mbps
  isUp: boolean;
  ip4: string;
  ip6: string;
}

export interface SystemMonitoringConfig {
  intervalMs: number;
  historySize: number;
  enableTemperature: boolean;
  enableDiskIO: boolean;
  enableNetworkDetails: boolean;
}

export interface SystemMonitoringEvent {
  type: 'system-metrics' | 'system-alert' | 'system-status';
  data: SystemMetrics | SystemAlert | SystemStatus;
}

export interface SystemAlert {
  level: 'warning' | 'error' | 'critical';
  metric: 'cpu' | 'memory' | 'disk' | 'network';
  message: string;
  value: number;
  threshold: number;
  timestamp: number;
}

export interface SystemStatus {
  isHealthy: boolean;
  uptime: number; // seconds
  lastUpdate: number;
  alerts: SystemAlert[];
}
