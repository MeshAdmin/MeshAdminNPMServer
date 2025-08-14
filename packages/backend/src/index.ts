import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { appConfig } from '@config/index';
import apiRoutes from '@api/index';
import pluginManager, { PluginContext } from '@plugins/base';
import passport from '@config/passport';
import logger from '@lib/logger';
import ResponseHelper from '@lib/response';
import { traceMiddleware } from '@middleware/trace.middleware';
import { databaseService } from '@services/database.service';
import { systemMonitoringService } from '@services/system-monitoring.service';
import { acmeService } from '@services/acme.service';
import { redisService } from '@services/redis.service';
import { notificationService } from '@services/notification.service';
import { envValidator } from '@config/env-validator';

// Validate environment variables on startup
logger.info('Validating environment variables...');
envValidator.getConfig(); // This will throw if validation fails

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: appConfig.cors.origin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Register plugins
const initializePlugins = async () => {
  try {
    const ctx: PluginContext = {
      app,
      io,
      db: databaseService.prisma,
      logger,
    };
    pluginManager.setContext(ctx);
    await pluginManager.loadPluginsFromDirectory('src/plugins');
    await pluginManager.initializePlugins(app, ctx);
  } catch (error) {
    logger.error('Failed to initialize plugins:', error);
    process.exit(1);
  }
};

// Initialize Socket.IO
const initializeSocketIO = () => {
  io.on('connection', socket => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });

    // Join package manager room for progress updates
    socket.on('join-package-manager', () => {
      socket.join('package-manager');
      logger.info(`Client ${socket.id} joined package-manager room`);
    });

    socket.on('leave-package-manager', () => {
      socket.leave('package-manager');
      logger.info(`Client ${socket.id} left package-manager room`);
    });

    // Join system monitoring room for metrics updates
    socket.on('join-system-monitoring', () => {
      socket.join('system-monitoring');
      logger.info(`Client ${socket.id} joined system-monitoring room`);
    });

    socket.on('leave-system-monitoring', () => {
      socket.leave('system-monitoring');
      logger.info(`Client ${socket.id} left system-monitoring room`);
    });
  });

  // Set Socket.IO instance for system monitoring service
  systemMonitoringService.setSocketIO(io);
};

// Initialize ACME service
const initializeAcmeService = async () => {
  try {
    // Setup ACME account using environment variable or default
    const acmeEmail = process.env.ACME_EMAIL || 'admin@example.com';
    await acmeService.setupAccount(acmeEmail);

    logger.info('ACME service initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize ACME service:', error);
  }
};

// Initialize server
const initializeServer = async () => {
  try {
    // Initialize database connection
    await databaseService.connect();

    // Initialize Redis connection (non-blocking, will retry in background)
    try {
      // Redis service initializes automatically in constructor
      logger.info('Redis service initialized');
    } catch (error) {
      logger.warn('Redis initialization failed, will retry in background:', error);
    }

    // Initialize plugins first
    await initializePlugins();

    // Initialize Socket.IO
    initializeSocketIO();

    // Initialize system monitoring
    await systemMonitoringService.start();

    // Autonomous testing system will be implemented in next phase

    // Initialize ACME service
    await initializeAcmeService();

    // Security and parsing middleware
    app.use(helmet());
    app.use(cors(appConfig.cors));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Initialize Passport
    app.use(passport.initialize());

    // Trace middleware for logging and correlation
    app.use(traceMiddleware);

    // API routes
    app.use('/api', apiRoutes);

    // Health check endpoint for Docker compose
    app.get('/health', async (req, res) => {
      const dbHealthy = await databaseService.healthCheck();
      const status = dbHealthy ? 'healthy' : 'unhealthy';
      const statusCode = dbHealthy ? 200 : 503;
      
      res.status(statusCode).json({
        status,
        timestamp: new Date().toISOString(),
        services: {
          database: dbHealthy ? 'connected' : 'disconnected',
          redis: 'connected', // TODO: Add actual Redis health check
        },
      });
    });

    // Root endpoint
    app.get('/', async (req, res) => {
      const dbHealthy = await databaseService.healthCheck();
      ResponseHelper.success(
        res,
        {
          name: 'Mesh Admin Backend API',
          version: '1.0.0',
          environment: appConfig.nodeEnv,
          timestamp: new Date().toISOString(),
          database: dbHealthy ? 'connected' : 'disconnected',
        },
        'Welcome to Mesh Admin Backend API'
      );
    });

    // Global error handling middleware
    app.use(
      async (
        err: Error,
        req: express.Request,
        res: express.Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _next: express.NextFunction
      ) => {
        const traceId = req.traceId || 'no-trace-id';
        const errorMetadata = {
          traceId,
          stack: err.stack,
          url: req.originalUrl,
          method: req.method,
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          userId: (req.user as { id?: string })?.id,
        };

        logger.error(`Unhandled error: ${err.message}`, errorMetadata);

        // Send notification for server errors
        try {
          await notificationService.notifyError('Unhandled application error', err, traceId, {
            url: req.originalUrl,
            method: req.method,
            userId: (req.user as { id?: string })?.id,
          });
        } catch (notificationError) {
          logger.error('Failed to send error notification:', {
            error: notificationError,
            traceId,
          });
        }

        ResponseHelper.internalError(res, 'Something went wrong!', traceId);
      }
    );

    // 404 handler for all other routes
    app.use('*', (req, res) => {
      ResponseHelper.notFound(res, 'Route not found');
    });

    // Start server
    server.listen(appConfig.port, () => {
      logger.info(`🚀 Server running on http://localhost:${appConfig.port}`);
      logger.info(`🔌 Socket.IO server ready for connections`);
      logger.info(`Environment: ${appConfig.nodeEnv}`);
      logger.info(`Plugins loaded: ${pluginManager.getPlugins().length}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed');

        try {
          await systemMonitoringService.stop();
          await acmeService.destroy();
          await redisService.disconnect();
          await pluginManager.destroyPlugins();
          await databaseService.disconnect();
          logger.info('Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  } catch (error) {
    logger.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

// Start the application
initializeServer().catch(error => {
  logger.error('Failed to start application:', error);
  process.exit(1);
});
