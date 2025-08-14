import dotenv from 'dotenv-flow';
import path from 'path';
import { logger } from '@lib/logger';

// Load environment variables
dotenv.config({
  path: path.resolve(process.cwd(), '../..'),
  node_env: process.env.NODE_ENV || 'development'
});

interface EnvConfig {
  NODE_ENV?: 'development' | 'production' | 'test';
  PORT?: number;
  DATABASE_URL?: string;
  JWT_SECRET?: string;
  JWT_REFRESH_SECRET?: string;
  JWT_EXPIRES_IN?: string;
  REDIS_URL?: string;
  REDIS_PASSWORD?: string;
  CORS_ORIGIN?: string;
  LOG_LEVEL?: string;
  RATE_LIMIT_WINDOW_MS?: number;
  RATE_LIMIT_MAX_REQUESTS?: number;
  [key: string]: string | number | undefined;
}

class EnvValidator {
  private config: Partial<EnvConfig> = {};
  private errors: string[] = [];
  private warnings: string[] = [];

  constructor() {
    this.validateAndLoad();
  }

  private validateAndLoad(): void {
    // Required environment variables
    this.validateRequired('NODE_ENV', ['development', 'production', 'test']);
    this.validateRequired('PORT', undefined, this.isValidPort);
    this.validateRequired('DATABASE_URL', undefined, this.isValidDatabaseUrl);
    this.validateRequired('JWT_SECRET', undefined, this.isSecureSecret);
    this.validateRequired('REDIS_URL', undefined, this.isValidRedisUrl);
    this.validateRequired('CORS_ORIGIN', undefined, this.isValidUrl);

    // Optional but recommended
    this.validateOptional('JWT_REFRESH_SECRET', this.isSecureSecret);
    this.validateOptional('JWT_EXPIRES_IN', this.isValidDuration);
    this.validateOptional('REDIS_PASSWORD', this.isNonEmpty);
    this.validateOptional('LOG_LEVEL', this.isValidLogLevel);
    this.validateOptional('RATE_LIMIT_WINDOW_MS', this.isPositiveNumber);
    this.validateOptional('RATE_LIMIT_MAX_REQUESTS', this.isPositiveNumber);

    // Security checks
    this.performSecurityChecks();

    // Log results
    this.logValidationResults();

    // Throw if critical errors
    if (this.errors.length > 0) {
      throw new Error(`Environment validation failed:\n${this.errors.join('\n')}`);
    }
  }

  private validateRequired(
    key: string,
    allowedValues?: string[] | undefined,
    validator?: (value: string) => boolean
  ): void {
    const value = process.env[key];

    if (!value) {
      this.errors.push(`Missing required environment variable: ${key}`);
      return;
    }

    if (allowedValues && !allowedValues.includes(value)) {
      this.errors.push(
        `Invalid value for ${key}: "${value}". Allowed values: ${allowedValues.join(', ')}`
      );
      return;
    }

    if (validator && !validator(value)) {
      this.errors.push(`Invalid value for ${key}: "${value}"`);
      return;
    }

    this.config[key as keyof EnvConfig] = this.parseValue(key, value);
  }

  private validateOptional(
    key: string,
    validator?: (value: string) => boolean
  ): void {
    const value = process.env[key];

    if (!value) {
      this.warnings.push(`Optional environment variable not set: ${key}`);
      return;
    }

    if (validator && !validator(value)) {
      this.warnings.push(`Invalid value for optional ${key}: "${value}"`);
      return;
    }

    this.config[key as keyof EnvConfig] = this.parseValue(key, value);
  }

  private parseValue(key: string, value: string): string | number {
    // Parse numbers
    if (key.includes('PORT') || key.includes('MS') || key.includes('REQUESTS')) {
      return parseInt(value, 10);
    }
    return value;
  }

  private performSecurityChecks(): void {
    // Skip strict security checks in development
    if (process.env.NODE_ENV === 'development') {
      this.warnings.push('Security checks relaxed for development environment');
      return;
    }
    
    // Check JWT secret strength
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret && jwtSecret.length < 32) {
      this.warnings.push('JWT_SECRET should be at least 32 characters long for better security');
    }

    if (jwtSecret && jwtSecret.includes('change-this')) {
      this.errors.push('JWT_SECRET contains default placeholder text. Please set a secure secret!');
    }

    // Check Redis password in production
    if (process.env.NODE_ENV === 'production' && !process.env.REDIS_PASSWORD) {
      this.errors.push('REDIS_PASSWORD is required in production environment');
    }

    // Check database URL security
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl && dbUrl.includes('password123')) {
      this.warnings.push('DATABASE_URL contains weak default password');
    }

    // Check CORS origin in production
    if (process.env.NODE_ENV === 'production') {
      const corsOrigin = process.env.CORS_ORIGIN;
      if (corsOrigin && (corsOrigin.includes('localhost') || corsOrigin.includes('127.0.0.1'))) {
        this.warnings.push('CORS_ORIGIN should not use localhost in production');
      }
    }
  }

  private logValidationResults(): void {
    if (this.errors.length > 0) {
      logger.error('Environment validation errors:', this.errors);
    }

    if (this.warnings.length > 0) {
      logger.warn('Environment validation warnings:', this.warnings);
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      logger.info('✅ Environment variables validated successfully');
    }
  }

  // Validation helper functions
  private isValidPort = (value: string): boolean => {
    const port = parseInt(value, 10);
    return !isNaN(port) && port > 0 && port <= 65535;
  };

  private isValidDatabaseUrl = (value: string): boolean => {
    return value.startsWith('postgresql://') || 
           value.startsWith('postgres://') || 
           value.startsWith('file:') ||
           value.startsWith('sqlite://');
  };

  private isValidRedisUrl = (value: string): boolean => {
    return value.startsWith('redis://') || value.startsWith('rediss://');
  };

  private isValidUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  private isSecureSecret = (value: string): boolean => {
    return value.length >= 16 && !value.includes(' ');
  };

  private isValidDuration = (value: string): boolean => {
    return /^\d+[smhd]$/.test(value);
  };

  private isValidLogLevel = (value: string): boolean => {
    return ['error', 'warn', 'info', 'debug', 'verbose'].includes(value);
  };

  private isNonEmpty = (value: string): boolean => {
    return value.trim().length > 0;
  };

  private isPositiveNumber = (value: string): boolean => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num > 0;
  };

  public getConfig(): EnvConfig {
    return this.config as EnvConfig;
  }

  public get(key: keyof EnvConfig): string | number | undefined {
    return this.config[key];
  }
}

// Create singleton instance
const envValidator = new EnvValidator();

export { envValidator };
export type { EnvConfig };
export default envValidator.getConfig();
