import { createClient, RedisClientType } from 'redis';
import { appConfig } from '@config/index';
import logger from '@lib/logger';

export class RedisService {
  private client: RedisClientType | null = null;
  private connected: boolean = false;
  private disabled: boolean = false;
  private initializationAttempted: boolean = false;

  constructor() {
    // In development, check if Redis should be used
    const useRedis = process.env.ENABLE_REDIS === 'true' || appConfig.nodeEnv === 'production';
    
    if (useRedis) {
      this.initialize().catch((error) => {
        if (appConfig.nodeEnv === 'development') {
          logger.warn('Redis not available in development mode - disabling Redis features');
          this.disabled = true;
        } else {
          logger.error('Redis initialization failed in production:', error);
          throw error;
        }
      });
    } else {
      logger.info('Redis disabled in development mode (set ENABLE_REDIS=true to enable)');
      this.disabled = true;
    }
  }

  private async initialize(): Promise<void> {
    if (this.initializationAttempted) {
      return;
    }
    this.initializationAttempted = true;

    try {
      this.client = createClient({
        socket: {
          host: appConfig.redis.host,
          port: appConfig.redis.port,
          reconnectStrategy: (retries) => {
            if (retries > 3) {
              logger.warn('Redis reconnection limit reached - disabling Redis');
              this.disabled = true;
              return false;
            }
            return Math.min(retries * 1000, 5000);
          },
        },
        password: appConfig.redis.password,
        database: appConfig.redis.db,
      });

      this.client.on('error', err => {
        logger.warn('Redis error, continuing without Redis:', err.message);
        this.connected = false;
        this.disabled = true;
      });

      this.client.on('connect', () => {
        logger.info('Redis client connected');
        this.connected = true;
        this.disabled = false;
      });

      this.client.on('ready', () => {
        logger.info('Redis client ready');
        this.connected = true;
        this.disabled = false;
      });

      // Set a timeout for connection attempt
      const connectTimeout = setTimeout(() => {
        logger.warn('Redis connection timeout - disabling Redis');
        this.disabled = true;
        this.connected = false;
      }, 3000);

      await this.client.connect();
      clearTimeout(connectTimeout);
    } catch (error) {
      logger.warn('Failed to initialize Redis - continuing without Redis:', (error as Error).message);
      this.disabled = true;
      this.connected = false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
      this.connected = false;
      logger.info('Redis client disconnected');
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  getClient(): RedisClientType {
    if (!this.client || !this.connected) {
      throw new Error('Redis client is not connected');
    }
    return this.client;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const client = this.getClient();
    if (ttl) {
      await client.setEx(key, ttl, value);
    } else {
      await client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    const client = this.getClient();
    return await client.get(key);
  }

  async del(key: string): Promise<number> {
    const client = this.getClient();
    return await client.del(key);
  }

  async lpush(key: string, ...values: string[]): Promise<number> {
    const client = this.getClient();
    return await client.lPush(key, values);
  }

  async ltrim(key: string, start: number, stop: number): Promise<string> {
    const client = this.getClient();
    return await client.lTrim(key, start, stop);
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    const client = this.getClient();
    return await client.lRange(key, start, stop);
  }

  async exists(key: string): Promise<number> {
    const client = this.getClient();
    return await client.exists(key);
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.connected || !this.client) {
        return false;
      }
      await this.client.ping();
      return true;
    } catch (error) {
      logger.error('Redis health check failed:', error);
      return false;
    }
  }
}

export const redisService = new RedisService();
