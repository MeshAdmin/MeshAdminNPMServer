import { Router, Request, Response } from 'express';
import { monitoringService } from '@services/monitoring.service';
import { selfHealingService } from '@services/self-healing.service';
import { authenticateJwt } from '@middleware/auth.middleware';
import { logger } from '@lib/logger';

const router = Router();

/**
 * @swagger
 * /api/monitoring/metrics:
 *   get:
 *     summary: Get Prometheus metrics
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: Prometheus metrics in text format
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/metrics', async (req: Request, res: Response) => {
  try {
    const metrics = await monitoringService.getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  } catch (error) {
    logger.error('Error fetching metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch metrics',
    });
  }
});

/**
 * @swagger
 * /api/monitoring/health:
 *   get:
 *     summary: Get health status
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: Health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [healthy, degraded, unhealthy]
 *                 services:
 *                   type: object
 *                 metrics:
 *                   type: object
 *                 uptime:
 *                   type: number
 */
router.get('/health', async (req: Request, res: Response) => {
  try {
    const services = await selfHealingService.getHealthStatus();
    const metrics = monitoringService.getHealthMetrics();
    
    const allHealthy = Object.values(services).every(status => status === true);
    const someHealthy = Object.values(services).some(status => status === true);
    
    const overallStatus = allHealthy ? 'healthy' : someHealthy ? 'degraded' : 'unhealthy';
    
    res.status(allHealthy ? 200 : 503).json({
      status: overallStatus,
      services,
      metrics,
      uptime: process.uptime(),
    });
  } catch (error) {
    logger.error('Error checking health:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check health status',
    });
  }
});

/**
 * @swagger
 * /api/monitoring/performance:
 *   get:
 *     summary: Get performance report
 *     tags: [Monitoring]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Performance report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                 recent:
 *                   type: array
 */
router.get('/performance', authenticateJwt, async (req: Request, res: Response) => {
  try {
    const metrics = await monitoringService.getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  } catch (error) {
    logger.error('Error fetching performance report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch performance report',
    });
  }
});

/**
 * @swagger
 * /api/monitoring/heal/{service}:
 *   post:
 *     summary: Trigger manual healing for a service
 *     tags: [Monitoring]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: service
 *         required: true
 *         schema:
 *           type: string
 *           enum: [database, redis, memory, cpu]
 *     responses:
 *       200:
 *         description: Healing triggered successfully
 */
router.post('/heal/:service', authenticateJwt, async (req: Request, res: Response) => {
  try {
    const { service } = req.params;
    await selfHealingService.forceHeal(service);
    
    res.json({
      success: true,
      message: `Healing triggered for ${service}`,
    });
  } catch (error) {
    logger.error('Error triggering healing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to trigger healing',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
