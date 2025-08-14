import express from 'express';
import serviceManager from '../services/service-manager.service';
import logger from '@lib/logger';
import ResponseHelper from '@lib/response';

const router = express.Router();

interface ServiceMetrics {
  serviceId: string;
  serviceName: string;
  metrics: {
    cpu: number;
    memory: {
      usage: number;
      total: number;
      percent: number;
    };
    uptime: number;
    restarts: number;
    pid?: number;
    status: string;
  };
  timestamp: number;
}

interface ServiceLogEntry {
  id: string;
  serviceId: string;
  message: string;
  level: string;
  source?: string;
  timestamp: string;
}

// Get metrics for a specific service
router.get('/:serviceId/metrics', async (req, res) => {
  try {
    const { serviceId } = req.params;

    const serviceInfo = await serviceManager.getServiceStatus(serviceId);

    const metrics: ServiceMetrics = {
      serviceId: serviceInfo.id,
      serviceName: serviceInfo.name,
      metrics: {
        cpu: serviceInfo.cpu || 0,
        memory: {
          usage: serviceInfo.memory || 0,
          total: serviceInfo.memory || 0,
          percent: serviceInfo.memory ? (serviceInfo.memory / (1024 * 1024 * 1024)) * 100 : 0, // Convert to percentage
        },
        uptime: serviceInfo.uptime || 0,
        restarts: serviceInfo.restarts || 0,
        pid: serviceInfo.pid,
        status: serviceInfo.status,
      },
      timestamp: Date.now(),
    };

    ResponseHelper.success(res, metrics, 'Service metrics retrieved successfully');
  } catch (error: any) {
    logger.error('Failed to get service metrics:', error);
    ResponseHelper.internalError(res, error.message);
  }
});

// Get logs for a specific service
router.get('/:serviceId/logs', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const lines = parseInt(req.query.lines as string) || 100;
    const level = req.query.level as string;
    const source = req.query.source as string;

    // Get logs from database
    const { databaseService } = await import('../services/database.service');
    const prisma = databaseService.getClient();

    const whereClause: any = { serviceId };

    if (level) {
      whereClause.level = level.toUpperCase();
    }

    if (source) {
      whereClause.source = source;
    }

    const logs = await prisma.serviceLog.findMany({
      where: whereClause,
      orderBy: { timestamp: 'desc' },
      take: lines,
    });

    const formattedLogs: ServiceLogEntry[] = logs.map(log => ({
      id: log.id,
      serviceId: log.serviceId,
      message: log.message,
      level: log.level,
      source: log.source || undefined,
      timestamp: log.timestamp.toISOString(),
    }));

    ResponseHelper.success(res, formattedLogs, 'Service logs retrieved successfully');
  } catch (error: any) {
    logger.error('Failed to get service logs:', error);
    ResponseHelper.internalError(res, error.message);
  }
});

// Get live logs for a specific service (Server-Sent Events)
router.get('/:serviceId/logs/live', async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Set up Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    });

    // Send initial connection message
    res.write(`data: ${JSON.stringify({ type: 'connected', serviceId })}\n\n`);

    // Set up log streaming
    const logEmitter = await serviceManager.tailLogs(serviceId, { follow: true });

    const logHandler = (logLine: string) => {
      const logEntry = {
        type: 'log',
        serviceId,
        message: logLine,
        timestamp: new Date().toISOString(),
      };
      res.write(`data: ${JSON.stringify(logEntry)}\n\n`);
    };

    const errorHandler = (error: string) => {
      const errorEntry = {
        type: 'error',
        serviceId,
        message: error,
        timestamp: new Date().toISOString(),
      };
      res.write(`data: ${JSON.stringify(errorEntry)}\n\n`);
    };

    const endHandler = () => {
      res.write(`data: ${JSON.stringify({ type: 'end', serviceId })}\n\n`);
      res.end();
    };

    logEmitter.on('log', logHandler);
    logEmitter.on('error', errorHandler);
    logEmitter.on('end', endHandler);

    // Clean up on client disconnect
    req.on('close', () => {
      logEmitter.removeListener('log', logHandler);
      logEmitter.removeListener('error', errorHandler);
      logEmitter.removeListener('end', endHandler);
      logEmitter.emit('end');
    });
  } catch (error: any) {
    logger.error('Failed to start live log stream:', error);
    ResponseHelper.internalError(res, error.message);
  }
});

// Get historical metrics for a service (for charts/graphs)
router.get('/:serviceId/metrics/history', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const hours = parseInt(req.query.hours as string) || 24;

    // For now, we'll generate mock historical data since we don't have a metrics collection system yet
    // In a real implementation, you'd store metrics data in a time-series database

    const now = Date.now();
    const interval = (hours * 60 * 60 * 1000) / 100; // 100 data points
    const historicalMetrics = [];

    for (let i = 99; i >= 0; i--) {
      const timestamp = now - i * interval;
      historicalMetrics.push({
        timestamp,
        cpu: Math.random() * 100,
        memory: Math.random() * 1024 * 1024 * 1024, // Random memory usage in bytes
        uptime: (Date.now() - timestamp) / 1000, // Uptime in seconds
      });
    }

    ResponseHelper.success(
      res,
      {
        serviceId,
        hours,
        dataPoints: historicalMetrics.length,
        metrics: historicalMetrics,
      },
      'Historical metrics retrieved successfully'
    );
  } catch (error: any) {
    logger.error('Failed to get historical metrics:', error);
    ResponseHelper.internalError(res, error.message);
  }
});

// Get all services metrics summary
router.get('/summary', async (req, res) => {
  try {
    const servicesStatus = await serviceManager.getAllServicesStatus();

    const summary = servicesStatus.map(service => ({
      serviceId: service.id,
      serviceName: service.name,
      status: service.status,
      metrics: {
        cpu: service.cpu || 0,
        memory: service.memory || 0,
        uptime: service.uptime || 0,
        restarts: service.restarts || 0,
        pid: service.pid,
      },
      timestamp: Date.now(),
    }));

    ResponseHelper.success(res, summary, 'Services metrics summary retrieved successfully');
  } catch (error: any) {
    logger.error('Failed to get services metrics summary:', error);
    ResponseHelper.internalError(res, error.message);
  }
});

export default router;
