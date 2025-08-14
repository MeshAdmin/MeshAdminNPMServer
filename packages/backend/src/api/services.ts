import { Router } from 'express';
import { PrismaClient, ServiceStatus } from '../generated/prisma';
import { authenticateJwt } from '../middleware/auth.middleware';
import ResponseHelper from '@lib/response';
import { serviceManager } from '@services/service-manager.service';

const router: Router = Router();
const prisma = new PrismaClient();

// Apply auth middleware to all routes - temporarily disabled for development
// router.use(authenticateJwt);

// GET /api/services - Get all services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    ResponseHelper.success(res, services, 'Services retrieved successfully');
  } catch (error) {
    console.error('Error getting services:', error);
    ResponseHelper.internalError(res, 'Failed to get services');
  }
});

// POST /api/services - Create a new service
router.post('/', async (req, res) => {
  try {
    const { name, description, type, config } = req.body;
    const newService = await prisma.service.create({
      data: {
        name,
        description,
        type,
        config,
        status: ServiceStatus.STOPPED,
      },
    });
    ResponseHelper.created(res, newService, 'Service created successfully');
  } catch (error) {
    console.error('Error creating service:', error);
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      ResponseHelper.conflict(res, 'Service name must be unique');
      return;
    }
    ResponseHelper.internalError(res, 'Failed to create service');
  }
});

// GET /api/services/:id - Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      ResponseHelper.notFound(res, 'Service not found');
      return;
    }
    ResponseHelper.success(res, service, 'Service retrieved successfully');
  } catch (error) {
    console.error('Error getting service:', error);
    ResponseHelper.internalError(res, 'Failed to get service');
  }
});

// PUT /api/services/:id - Update service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, config, status } = req.body;
    const updatedService = await prisma.service.update({
      where: { id },
      data: { name, description, type, config, status },
    });
    ResponseHelper.success(res, updatedService, 'Service updated successfully');
  } catch (error) {
    console.error('Error updating service:', error);
    ResponseHelper.internalError(res, 'Failed to update service');
  }
});

// DELETE /api/services/:id - Delete service
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    ResponseHelper.success(res, null, 'Service deleted successfully');
  } catch (error) {
    console.error('Error deleting service:', error);
    ResponseHelper.internalError(res, 'Failed to delete service');
  }
});

// POST /api/services/:id/:action - Start/Stop/Restart service
router.post('/:id/:action', async (req, res) => {
  try {
    const { id, action } = req.params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      ResponseHelper.notFound(res, 'Service not found');
      return;
    }

    // For services with PM2 config, use real service management
    // For others, simulate the action (update status only)
    let serviceInfo;
    let newStatus = service.status;

    try {
      switch (action) {
        case 'start':
          if (service.type === 'pm2') {
            serviceInfo = await serviceManager.startService(id);
            newStatus = ServiceStatus.RUNNING;
          } else {
            // Simulate for non-PM2 services
            newStatus = ServiceStatus.RUNNING;
            await prisma.service.update({
              where: { id },
              data: { status: newStatus },
            });
          }
          break;
        case 'stop':
          if (service.type === 'pm2') {
            serviceInfo = await serviceManager.stopService(id);
            newStatus = ServiceStatus.STOPPED;
          } else {
            // Simulate for non-PM2 services
            newStatus = ServiceStatus.STOPPED;
            await prisma.service.update({
              where: { id },
              data: { status: newStatus },
            });
          }
          break;
        case 'restart':
          if (service.type === 'pm2') {
            serviceInfo = await serviceManager.restartService(id);
            newStatus = ServiceStatus.RUNNING;
          } else {
            // Simulate for non-PM2 services
            newStatus = ServiceStatus.RESTARTING;
            await prisma.service.update({
              where: { id },
              data: { status: newStatus },
            });
            // Simulate restart delay
            setTimeout(async () => {
              await prisma.service.update({
                where: { id },
                data: { status: ServiceStatus.RUNNING },
              });
            }, 2000);
          }
          break;
        default:
          ResponseHelper.badRequest(res, 'Invalid action');
          return;
      }

      // Get updated service from database
      const updatedService = await prisma.service.findUnique({ where: { id } });

      ResponseHelper.success(
        res,
        {
          service: updatedService,
          serviceInfo,
          realAction: service.type === 'pm2',
          simulated: service.type !== 'pm2',
        },
        `Service ${action}ed successfully`
      );
    } catch (serviceError) {
      console.error(`Failed to ${action} service:`, serviceError);

      // Update service status to ERROR if real action failed
      await prisma.service.update({
        where: { id },
        data: { status: ServiceStatus.ERROR },
      });

      ResponseHelper.internalError(res, `Failed to ${action} service: ${(serviceError as Error).message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error performing service action:', error);
    ResponseHelper.internalError(res, `Failed to ${req.params.action} service`);
  }
});

// GET /api/services/:id/logs?lines=100 - Get service logs
router.get('/:id/logs', async (req, res) => {
  try {
    const { id } = req.params;
    const lines = parseInt(req.query.lines as string, 10) || 100;
    const serviceLogs = await prisma.serviceLog.findMany({
      where: { serviceId: id },
      orderBy: { timestamp: 'desc' },
      take: lines,
    });
    ResponseHelper.success(res, serviceLogs.reverse(), 'Logs retrieved successfully');
  } catch (error) {
    console.error('Error getting service logs:', error);
    ResponseHelper.internalError(res, 'Failed to get service logs');
  }
});

export default router;
