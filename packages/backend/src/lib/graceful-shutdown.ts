import { Server } from 'http';
import { Socket } from 'net';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@lib/logger';
import { databaseService } from '@services/database.service';
import { redisService } from '@services/redis.service';

export class GracefulShutdown {
  private server: Server;
  private isShuttingDown = false;
  private connections = new Set<Socket>();
  private shutdownTimeout = 30000; // 30 seconds
  private shutdownCallbacks: Array<() => Promise<void>> = [];

  constructor(server: Server) {
    this.server = server;
    this.setupShutdownHandlers();
    this.trackConnections();
  }

  /**
   * Register a cleanup callback to run during shutdown
   */
  public registerCleanup(callback: () => Promise<void>) {
    this.shutdownCallbacks.push(callback);
  }

  /**
   * Track active connections
   */
  private trackConnections() {
    this.server.on('connection', (connection) => {
      this.connections.add(connection);
      
      connection.on('close', () => {
        this.connections.delete(connection);
      });
    });
  }

  /**
   * Setup signal handlers for graceful shutdown
   */
  private setupShutdownHandlers() {
    // Handle different termination signals
    const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    
    signals.forEach((signal) => {
      process.on(signal, async () => {
        logger.info(`Received ${signal}, starting graceful shutdown...`);
        await this.shutdown();
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', async (error) => {
      logger.error('Uncaught Exception:', error);
      await this.shutdown(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', async (reason, promise) => {
      logger.error('Unhandled Rejection:', { promise: String(promise), reason });
      await this.shutdown(1);
    });
  }

  /**
   * Perform graceful shutdown
   */
  private async shutdown(exitCode = 0) {
    if (this.isShuttingDown) {
      logger.info('Shutdown already in progress...');
      return;
    }

    this.isShuttingDown = true;
    logger.info('Starting graceful shutdown process...');

    // Set a timeout for forced shutdown
    const forceShutdownTimer = setTimeout(() => {
      logger.error('Forced shutdown due to timeout');
      process.exit(1);
    }, this.shutdownTimeout);

    try {
      // Step 1: Stop accepting new connections
      logger.info('Step 1: Stopping server from accepting new connections...');
      await this.stopServer();

      // Step 2: Close existing connections
      logger.info('Step 2: Closing existing connections...');
      await this.closeConnections();

      // Step 3: Run cleanup callbacks
      logger.info('Step 3: Running cleanup callbacks...');
      await this.runCleanupCallbacks();

      // Step 4: Disconnect from databases
      logger.info('Step 4: Disconnecting from databases...');
      await this.disconnectDatabases();

      // Clear the force shutdown timer
      clearTimeout(forceShutdownTimer);

      logger.info('✅ Graceful shutdown completed successfully');
      process.exit(exitCode);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      clearTimeout(forceShutdownTimer);
      process.exit(1);
    }
  }

  /**
   * Stop the server from accepting new connections
   */
  private stopServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((error) => {
        if (error) {
          logger.error('Error closing server:', error);
          reject(error);
        } else {
          logger.info('Server stopped accepting new connections');
          resolve();
        }
      });
    });
  }

  /**
   * Close all existing connections
   */
  private async closeConnections(): Promise<void> {
    const connectionClosePromises: Promise<void>[] = [];

    this.connections.forEach((connection) => {
      connectionClosePromises.push(
        new Promise<void>((resolve) => {
          // Send Connection: close header for HTTP keep-alive connections
          connection.end(() => {
            resolve();
          });

          // Force close after 5 seconds
          setTimeout(() => {
            if ('destroy' in connection && typeof connection.destroy === 'function') {
              connection.destroy();
            }
            resolve();
          }, 5000);
        })
      );
    });

    await Promise.all(connectionClosePromises);
    logger.info(`Closed ${connectionClosePromises.length} connections`);
  }

  /**
   * Run registered cleanup callbacks
   */
  private async runCleanupCallbacks(): Promise<void> {
    for (const callback of this.shutdownCallbacks) {
      try {
        await callback();
      } catch (error) {
        logger.error('Error running cleanup callback:', error);
      }
    }
    logger.info(`Ran ${this.shutdownCallbacks.length} cleanup callbacks`);
  }

  /**
   * Disconnect from databases and external services
   */
  private async disconnectDatabases(): Promise<void> {
    const disconnectPromises: Promise<void>[] = [];

    // Disconnect from PostgreSQL
    disconnectPromises.push(
      databaseService.disconnect().catch((error) => {
        logger.error('Error disconnecting from PostgreSQL:', error);
      })
    );

    // Disconnect from Redis
    disconnectPromises.push(
      redisService.disconnect().catch((error) => {
        logger.error('Error disconnecting from Redis:', error);
      })
    );

    await Promise.all(disconnectPromises);
    logger.info('Disconnected from all databases');
  }

  /**
   * Get shutdown status
   */
  public isShuttingDownStatus(): boolean {
    return this.isShuttingDown;
  }

  /**
   * Middleware to reject requests during shutdown
   */
  public middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (this.isShuttingDown) {
        res.status(503).json({
          success: false,
          message: 'Server is shutting down',
        });
      } else {
        next();
      }
    };
  }
}

export default GracefulShutdown;
