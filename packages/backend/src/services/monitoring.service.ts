import { Registry, Counter, Histogram, Gauge, collectDefaultMetrics } from 'prom-client';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@lib/logger';
import * as os from 'os';
import { performance } from 'perf_hooks';

interface MetricOptions {
  name: string;
  help: string;
  labelNames?: string[];
  buckets?: number[];
}

interface PerformanceMetric {
  operation: string;
  duration: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class MonitoringService {
  private static instance: MonitoringService;
  private register: Registry;
  private metrics: Map<string, Counter | Histogram | Gauge> = new Map();
  private performanceBuffer: PerformanceMetric[] = [];
  private readonly maxBufferSize = 1000;

  // Default metrics
  private httpRequestDuration!: Histogram;
  private httpRequestTotal!: Counter;
  private httpRequestErrors!: Counter;
  private activeConnections!: Gauge;
  private databaseQueryDuration!: Histogram;
  private cacheHitRate!: Gauge;
  private memoryUsage!: Gauge;
  private cpuUsage!: Gauge;

  private constructor() {
    this.register = new Registry();
    this.initializeMetrics();
    this.startCollectors();
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  /**
   * Initialize default metrics
   */
  private initializeMetrics(): void {
    // Collect default Node.js metrics
    collectDefaultMetrics({ register: this.register });

    // HTTP metrics
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
      registers: [this.register],
    });

    this.httpRequestTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
      registers: [this.register],
    });

    this.httpRequestErrors = new Counter({
      name: 'http_request_errors_total',
      help: 'Total number of HTTP request errors',
      labelNames: ['method', 'route', 'error_type'],
      registers: [this.register],
    });

    this.activeConnections = new Gauge({
      name: 'active_connections',
      help: 'Number of active connections',
      registers: [this.register],
    });

    // Database metrics
    this.databaseQueryDuration = new Histogram({
      name: 'database_query_duration_seconds',
      help: 'Duration of database queries in seconds',
      labelNames: ['operation', 'table'],
      buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
      registers: [this.register],
    });

    // Cache metrics
    this.cacheHitRate = new Gauge({
      name: 'cache_hit_rate',
      help: 'Cache hit rate percentage',
      registers: [this.register],
    });

    // System metrics
    this.memoryUsage = new Gauge({
      name: 'nodejs_memory_usage_bytes',
      help: 'Node.js memory usage in bytes',
      labelNames: ['type'],
      registers: [this.register],
    });

    this.cpuUsage = new Gauge({
      name: 'nodejs_cpu_usage_percentage',
      help: 'Node.js CPU usage percentage',
      registers: [this.register],
    });

    // Store references
    this.metrics.set('httpRequestDuration', this.httpRequestDuration);
    this.metrics.set('httpRequestTotal', this.httpRequestTotal);
    this.metrics.set('httpRequestErrors', this.httpRequestErrors);
    this.metrics.set('activeConnections', this.activeConnections);
    this.metrics.set('databaseQueryDuration', this.databaseQueryDuration);
    this.metrics.set('cacheHitRate', this.cacheHitRate);
    this.metrics.set('memoryUsage', this.memoryUsage);
    this.metrics.set('cpuUsage', this.cpuUsage);
  }

  /**
   * Start metric collectors
   */
  private startCollectors(): void {
    // Collect memory metrics every 10 seconds
    setInterval(() => {
      const memUsage = process.memoryUsage();
      this.memoryUsage.set({ type: 'rss' }, memUsage.rss);
      this.memoryUsage.set({ type: 'heapTotal' }, memUsage.heapTotal);
      this.memoryUsage.set({ type: 'heapUsed' }, memUsage.heapUsed);
      this.memoryUsage.set({ type: 'external' }, memUsage.external);
    }, 10000);

    // Collect CPU metrics every 5 seconds
    let previousCpuUsage = process.cpuUsage();
    setInterval(() => {
      const currentCpuUsage = process.cpuUsage(previousCpuUsage);
      const totalUsage = (currentCpuUsage.user + currentCpuUsage.system) / 1000000; // Convert to seconds
      const cpuPercent = (totalUsage / 5) * 100; // 5 second interval
      this.cpuUsage.set(cpuPercent);
      previousCpuUsage = process.cpuUsage();
    }, 5000);
  }

  /**
   * Express middleware for HTTP metrics
   */
  public httpMetricsMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const start = performance.now();
      
      // Increment active connections
      this.activeConnections.inc();

      // Capture the original end function
      const originalEnd = res.end;
      
      // Override the end function
      res.end = (...args: any[]) => {
        // Calculate duration
        const duration = (performance.now() - start) / 1000;
        
        // Get route path
        const route = req.route?.path || req.path || 'unknown';
        const method = req.method;
        const status = res.statusCode.toString();

        // Record metrics
        this.httpRequestDuration.observe(
          { method, route, status },
          duration
        );
        
        this.httpRequestTotal.inc({ method, route, status });
        
        // Decrement active connections
        this.activeConnections.dec();

        // Log slow requests
        if (duration > 1) {
          logger.warn('Slow request detected', {
            method,
            route,
            duration,
            status,
          });
        }

        // Call the original end function
        return originalEnd.apply(res, args as [any, BufferEncoding]);
      };

      next();
    };
  }

  /**
   * Record database query metrics
   */
  public recordDatabaseQuery(operation: string, table: string, duration: number): void {
    this.databaseQueryDuration.observe({ operation, table }, duration / 1000);
    
    // Record performance metric
    this.recordPerformance('database', duration, { operation, table });
  }

  /**
   * Record cache metrics
   */
  public recordCacheMetrics(hits: number, misses: number): void {
    const total = hits + misses;
    const hitRate = total > 0 ? (hits / total) * 100 : 0;
    this.cacheHitRate.set(hitRate);
  }

  /**
   * Record custom metric
   */
  public recordMetric(name: string, value: number, labels?: Record<string, string>): void {
    const metric = this.metrics.get(name);
    
    if (metric instanceof Counter) {
      metric.inc(labels || {}, value);
    } else if (metric instanceof Gauge) {
      metric.set(labels || {}, value);
    } else if (metric instanceof Histogram) {
      metric.observe(labels || {}, value);
    }
  }

  /**
   * Record performance metric
   */
  public recordPerformance(operation: string, duration: number, metadata?: Record<string, any>): void {
    const metric: PerformanceMetric = {
      operation,
      duration,
      timestamp: new Date(),
      metadata,
    };

    this.performanceBuffer.push(metric);

    // Maintain buffer size
    if (this.performanceBuffer.length > this.maxBufferSize) {
      this.performanceBuffer.shift();
    }

    // Log slow operations
    if (duration > 1000) {
      logger.warn('Slow operation detected', metric);
    }
  }

  /**
   * Create custom metric
   */
  public createMetric(options: MetricOptions): void {
    const { name, help, labelNames, buckets } = options;

    let metric;
    if (buckets) {
      metric = new Histogram({
        name,
        help,
        labelNames,
        buckets,
        registers: [this.register],
      });
    } else if (name.includes('total') || name.includes('count')) {
      metric = new Counter({
        name,
        help,
        labelNames,
        registers: [this.register],
      });
    } else {
      metric = new Gauge({
        name,
        help,
        labelNames,
        registers: [this.register],
      });
    }

    this.metrics.set(name, metric);
  }

  /**
   * Get metrics for Prometheus
   */
  public async getMetrics(): Promise<string> {
    return this.register.metrics();
  }

  /**
   * Get performance report
   */
  public getPerformanceReport(): {
    summary: Record<string, any>;
    recent: PerformanceMetric[];
  } {
    const summary: Record<string, any> = {};

    // Group by operation
    const grouped = this.performanceBuffer.reduce((acc, metric) => {
      if (!acc[metric.operation]) {
        acc[metric.operation] = [];
      }
      acc[metric.operation].push(metric.duration);
      return acc;
    }, {} as Record<string, number[]>);

    // Calculate statistics
    for (const [operation, durations] of Object.entries(grouped)) {
      const sorted = durations.sort((a, b) => a - b);
      const sum = sorted.reduce((a, b) => a + b, 0);
      const avg = sum / sorted.length;
      const p50 = sorted[Math.floor(sorted.length * 0.5)];
      const p95 = sorted[Math.floor(sorted.length * 0.95)];
      const p99 = sorted[Math.floor(sorted.length * 0.99)];

      summary[operation] = {
        count: sorted.length,
        avg: avg.toFixed(2),
        min: sorted[0]?.toFixed(2),
        max: sorted[sorted.length - 1]?.toFixed(2),
        p50: p50?.toFixed(2),
        p95: p95?.toFixed(2),
        p99: p99?.toFixed(2),
      };
    }

    return {
      summary,
      recent: this.performanceBuffer.slice(-100),
    };
  }

  /**
   * Get system health metrics
   */
  public getHealthMetrics(): Record<string, any> {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const uptime = process.uptime();

    return {
      memory: {
        rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`,
        heapUsagePercent: `${((memUsage.heapUsed / memUsage.heapTotal) * 100).toFixed(2)}%`,
      },
      cpu: {
        user: `${(cpuUsage.user / 1000000).toFixed(2)}s`,
        system: `${(cpuUsage.system / 1000000).toFixed(2)}s`,
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        uptime: `${Math.floor(uptime / 60)} minutes`,
        loadAverage: os.loadavg(),
        freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      },
    };
  }

  /**
   * Reset all metrics
   */
  public reset(): void {
    this.register.clear();
    this.metrics.clear();
    this.performanceBuffer = [];
    this.initializeMetrics();
  }
}

export const monitoringService = MonitoringService.getInstance();
