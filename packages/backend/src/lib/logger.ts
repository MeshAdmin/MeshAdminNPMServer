import winston, { Logger as WinstonLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { appConfig } from '@config/index';
import path from 'path';
import fs from 'fs';
import { getNamespace } from 'cls-hooked';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogMetadata {
  traceId?: string;
  userId?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  duration?: number;
  [key: string]: any;
}

class EnhancedLogger {
  private winston: WinstonLogger;
  private logsDir: string;

  constructor() {
    this.logsDir = path.join(process.cwd(), 'logs');
    this.ensureLogsDirectory();
    this.winston = this.createWinstonLogger();
  }

  private ensureLogsDirectory(): void {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  private createWinstonLogger(): WinstonLogger {
    const logFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.errors({ stack: true }),
      winston.format.json(),
      winston.format.printf(info => {
        const { timestamp, level, message, stack, ...meta } = info;

        // Get trace ID from CLS namespace if available
        const namespace = getNamespace('request-context');
        const traceId = namespace?.get('traceId') || meta.traceId;

        const logEntry = {
          timestamp,
          level,
          message,
          traceId,
          ...meta,
        };

        if (stack) {
          (logEntry as any).stack = stack;
        }

        return JSON.stringify(logEntry);
      })
    );

    const transports: winston.transport[] = [];

    // Console transport for development
    if (appConfig.nodeEnv === 'development') {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.printf(info => {
              const namespace = getNamespace('request-context');
              const traceId = namespace?.get('traceId');
              const traceInfo = traceId ? `[${traceId}] ` : '';
              return `${info.timestamp} [${info.level}] ${traceInfo}${info.message}`;
            })
          ),
        })
      );
    }

    // Daily rotate file transport for all logs
    transports.push(
      new DailyRotateFile({
        filename: path.join(this.logsDir, 'app-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
        format: logFormat,
        level: appConfig.logging.level || 'info',
      })
    );

    // Separate error log file
    transports.push(
      new DailyRotateFile({
        filename: path.join(this.logsDir, 'error-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '30d',
        format: logFormat,
        level: 'error',
      })
    );

    // Audit log for critical operations
    transports.push(
      new DailyRotateFile({
        filename: path.join(this.logsDir, 'audit-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxSize: '10m',
        maxFiles: '90d',
        format: logFormat,
        level: 'info',
      })
    );

    return winston.createLogger({
      level: appConfig.logging.level || 'info',
      transports,
      exitOnError: false,
    });
  }

  private getTraceId(): string | undefined {
    const namespace = getNamespace('request-context');
    return namespace?.get('traceId');
  }

  private parseMeta(meta: LogMetadata | unknown): LogMetadata {
    if (!meta || typeof meta !== 'object') {
      return {};
    }
    
    // If it's an Error object, extract relevant properties
    if (meta instanceof Error) {
      return {
        error: meta.message,
        stack: meta.stack,
        name: meta.name,
      };
    }
    
    // If it's already properly typed, return as is
    return meta as LogMetadata;
  }

  private formatMetadata(meta: LogMetadata): LogMetadata {
    const traceId = this.getTraceId();
    return {
      ...meta,
      ...(traceId && { traceId }),
    };
  }

  error(message: string, meta: LogMetadata | unknown = {}): void {
    const safeMeta = this.parseMeta(meta);
    this.winston.error(message, this.formatMetadata(safeMeta));
  }

  warn(message: string, meta: LogMetadata | unknown = {}): void {
    const safeMeta = this.parseMeta(meta);
    this.winston.warn(message, this.formatMetadata(safeMeta));
  }

  info(message: string, meta: LogMetadata = {}): void {
    this.winston.info(message, this.formatMetadata(meta));
  }

  debug(message: string, meta: LogMetadata = {}): void {
    this.winston.debug(message, this.formatMetadata(meta));
  }

  // Audit logging for security-critical operations
  audit(action: string, meta: LogMetadata = {}): void {
    this.winston.info(`AUDIT: ${action}`, {
      ...this.formatMetadata(meta),
      audit: true,
    });
  }

  // HTTP request logging
  http(message: string, meta: LogMetadata = {}): void {
    this.winston.info(message, {
      ...this.formatMetadata(meta),
      type: 'http',
    });
  }

  // Performance logging
  performance(operation: string, duration: number, meta: LogMetadata = {}): void {
    this.winston.info(`PERF: ${operation}`, {
      ...this.formatMetadata(meta),
      duration,
      type: 'performance',
    });
  }

  // System logging
  system(message: string, meta: LogMetadata = {}): void {
    this.winston.info(message, {
      ...this.formatMetadata(meta),
      type: 'system',
    });
  }

  // Security logging
  security(message: string, meta: LogMetadata = {}): void {
    this.winston.warn(`SECURITY: ${message}`, {
      ...this.formatMetadata(meta),
      type: 'security',
    });
  }

  // Get winston instance for advanced usage
  getWinstonInstance(): WinstonLogger {
    return this.winston;
  }
}

export const logger = new EnhancedLogger();
export default logger;
export type { LogMetadata };
