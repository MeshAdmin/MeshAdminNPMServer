import { Router, Request, Response } from 'express';
import { systemMonitoringService } from '@services/system-monitoring.service';
import ResponseHelper from '@lib/response';
import logger from '@lib/logger';
import os from 'os';

const router = Router();

/**
 * GET /api/server/stats
 * Get server statistics
 */
router.get('/stats', async (req: Request, res: Response) => {
  try {
    // Get system information
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    
    // Get load averages
    const loadAvg = os.loadavg();
    
    // Calculate CPU usage percentage (approximation)
    const cpuUsage = loadAvg[0] / cpus.length * 100;
    
    // Get uptime
    const uptime = os.uptime();
    
    const stats = {
      cpu: {
        usage: Math.min(100, Math.max(0, cpuUsage)), // Clamp between 0-100
        cores: cpus.length,
        model: cpus[0]?.model || 'Unknown',
        speed: cpus[0]?.speed || 0,
        loadAvg: loadAvg
      },
      memory: {
        total: totalMem,
        used: usedMem,
        free: freeMem,
        usage: (usedMem / totalMem) * 100
      },
      disk: {
        // For demo purposes - in production you'd want to check actual disk usage
        total: totalMem * 4, // Approximation
        used: totalMem * 2,   // Approximation
        free: totalMem * 2,   // Approximation
        usage: 50 // Approximation
      },
      network: {
        interfaces: Object.keys(os.networkInterfaces()).length,
        bytesReceived: 0, // Would need actual network monitoring
        bytesSent: 0      // Would need actual network monitoring
      },
      uptime: uptime,
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      nodeVersion: process.version,
      timestamp: Date.now()
    };

    return ResponseHelper.success(res, stats, 'Server stats retrieved successfully');
  } catch (error) {
    logger.error('Error getting server stats:', error);
    return ResponseHelper.internalError(res, 'Failed to get server stats');
  }
});

/**
 * GET /api/server/health
 * Get server health status
 */
router.get('/health', async (req: Request, res: Response) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid
    };

    return ResponseHelper.success(res, health, 'Server is healthy');
  } catch (error) {
    logger.error('Error getting server health:', error);
    return ResponseHelper.internalError(res, 'Failed to get server health');
  }
});

export default router;
