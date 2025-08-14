import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { PrismaClient, ServiceStatus } from '../generated/prisma';
import { logger } from '@lib/logger';
import { authenticateJwt } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const prisma = new PrismaClient();

const router = Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of services
 */
router.get('/', authenticateJwt, async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error: any) {
    logger.error('Failed to fetch services:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               config:
 *                 type: object
 *     responses:
 *       201:
 *         description: Service created
 */
router.post(
  '/',
  authenticateJwt,
  [
    body('name').notEmpty().trim(),
    body('description').optional().trim(),
    body('type').optional().default('pm2'),
    body('config').optional().isObject(),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, type, config } = req.body;

      // Check if service already exists
      const existing = await prisma.service.findUnique({
        where: { name },
      });

      if (existing) {
        res.status(400).json({ error: 'Service with this name already exists' });
        return;
      }

      const newService = await prisma.service.create({
        data: {
          name,
          description: description || `Service ${name}`,
          type: type || 'pm2',
          config: config || {},
          status: ServiceStatus.STOPPED,
        },
      });

      // If it's a PM2 service, create the config
      if (type === 'pm2' && config) {
        await prisma.servicePm2Config.create({
          data: {
            serviceId: newService.id,
            name: config.name || newService.name,
            script: config.script || newService.name,
            cwd: config.cwd || process.cwd(),
            instances: config.instances || 1,
            execMode: config.execMode || 'fork',
            env: config.env || {},
            envProduction: config.envProduction || {},
            envDevelopment: config.envDevelopment || {},
            watch: config.watch || false,
            maxMemoryRestart: config.maxMemoryRestart || '500M',
            restartDelay: config.restartDelay || 0,
            // autorestart: config.autorestart ?? true, // TODO: Add when schema updated
          },
        });
      }

      const createdService = await prisma.service.findUnique({
        where: { id: newService.id },
      });

      logger.info(`Service created: ${name}`);
      res.status(201).json(createdService);
    } catch (error: any) {
      logger.error('Error creating service:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service details
 */
router.get('/:id', authenticateJwt, async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id },
    });

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json(service);
  } catch (error: any) {
    logger.error('Failed to fetch service:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.put(
  '/:id',
  authenticateJwt,
  [
    param('id').notEmpty(),
    body('name').optional().trim(),
    body('description').optional().trim(),
    body('config').optional().isObject(),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, config } = req.body;

      const service = await prisma.service.update({
        where: { id: req.params.id },
        data: {
          ...(name && { name }),
          ...(description && { description }),
          ...(config && { config }),
        },
      });

      logger.info(`Service updated: ${service.name}`);
      res.json(service);
    } catch (error) {
      logger.error('Error updating service:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  }
);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete(
  '/:id',
  authenticateJwt,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Delete PM2 config first if exists
      await prisma.servicePm2Config.deleteMany({
        where: { serviceId: req.params.id },
      });

      // Delete service
      const service = await prisma.service.delete({
        where: { id: req.params.id },
      });

      logger.info(`Service deleted: ${service.name}`);
      res.json({ message: 'Service deleted', service });
    } catch (error) {
      logger.error('Error deleting service:', error);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  }
);

/**
 * @swagger
 * /api/services/{id}/start:
 *   post:
 *     summary: Start a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post(
  '/:id/start',
  authenticateJwt,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await prisma.service.update({
        where: { id: req.params.id },
        data: { status: ServiceStatus.STOPPED },
      });

      logger.info(`Service stopped: ${service.name}`);
      res.json(service);
    } catch (error: any) {
      logger.error('Failed to stop service:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * @swagger
 * /api/services/{id}/stop:
 *   post:
 *     summary: Stop a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post(
  '/:id/stop',
  authenticateJwt,
  async (req: Request, res: Response): Promise<void> => {
    try {
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: { status: ServiceStatus.STOPPED },
    });

    logger.info(`Service stopped: ${service.name}`);
    res.json({ message: 'Service stopped', service });
  } catch (error) {
    logger.error('Error stopping service:', error);
    res.status(500).json({ error: 'Failed to stop service' });
  }
});

/**
 * @swagger
 * /api/services/{id}/restart:
 *   post:
 *     summary: Restart a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post(
  '/:id/restart',
  authenticateJwt,
  async (req: Request, res: Response): Promise<void> => {
    try {
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: { status: ServiceStatus.RESTARTING },
    });

    // Simulate restart by updating to running after a delay
    setTimeout(async () => {
      try {
        await prisma.service.update({
          where: { id: req.params.id },
          data: { status: ServiceStatus.RUNNING },
        });
      } catch (error) {
        logger.error('Error updating service status after restart:', error);
      }
    }, 1000);

    logger.info(`Service restarting: ${service.name}`);
    res.json(service);
  } catch (error: any) {
    logger.error('Failed to restart service:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
