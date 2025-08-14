import { Router } from 'express';
import authRoutes from './auth';
// import sslRoutes from './ssl'; // Temporarily disabled
import usersRouter from './users';
// import packageManagerRouter from './package-manager'; // Temporarily disabled
import systemMonitoringRouter from './system-monitoring';
// import pluginsRouter from './plugins'; // Temporarily disabled
import servicesRouter from './services';
import serviceMetricsRouter from './service-metrics';
// import autonomousRouter from './autonomous'; // Temporarily disabled
import { systemMonitoringService } from '@services/system-monitoring.service';
import ResponseHelper from '@lib/response';

const router: Router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  ResponseHelper.success(
    res,
    {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    },
    'Server is healthy'
  );
});

// API routes
router.use('/auth', authRoutes);
// router.use('/ssl', sslRoutes); // Temporarily disabled
router.use('/users', usersRouter);
// router.use('/package-manager', packageManagerRouter); // Temporarily disabled
router.use('/system-monitoring', systemMonitoringRouter);
// router.use('/plugins', pluginsRouter); // Temporarily disabled
router.use('/services', servicesRouter);
router.use('/service-metrics', serviceMetricsRouter);
// router.use('/autonomous', autonomousRouter); // Temporarily disabled

// Server stats alias (frontend expects this endpoint)
router.get('/server/stats', async (req, res) => {
  try {
    let metrics = await systemMonitoringService.getLatestMetrics();
    
    // If no metrics available, provide fallback data
    if (!metrics) {
      const os = require('os');
      const cpus = os.cpus();
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;
      const loadAvg = os.loadavg();
      
      metrics = {
        cpu: {
          usage: Math.min(100, Math.max(0, (loadAvg[0] / cpus.length) * 100)),
          load: loadAvg,
          cores: cpus.length,
          speed: cpus[0]?.speed || 0
        },
        memory: {
          total: totalMem,
          used: usedMem,
          free: freeMem,
          usage: (usedMem / totalMem) * 100,
          available: freeMem,
          swap: {
            total: 0,
            used: 0,
            free: 0,
            usage: 0
          }
        },
        disk: {
          total: totalMem * 4,
          used: totalMem * 2,
          free: totalMem * 2,
          usage: 50,
          readSpeed: 0,
          writeSpeed: 0,
          iops: {
            read: 0,
            write: 0
          }
        },
        network: {
          interfaces: Object.keys(os.networkInterfaces()).map(name => ({
            name,
            bytesReceived: 0,
            bytesSent: 0,
            packetsReceived: 0,
            packetsSent: 0,
            speed: 0,
            isUp: true,
            ip4: '0.0.0.0',
            ip6: '::'
          })),
          totalBytesReceived: 0,
          totalBytesSent: 0,
          totalPacketsReceived: 0,
          totalPacketsSent: 0
        },
        timestamp: Date.now()
      };
    }
    
    return ResponseHelper.success(res, metrics, 'Server stats retrieved successfully');
  } catch (error) {
    console.error('Error getting server stats:', error);
    return ResponseHelper.internalError(res, 'Failed to get server stats');
  }
});

// Catch-all for undefined API routes
router.use('*', (req, res) => {
  ResponseHelper.notFound(res, 'API endpoint not found');
});

export default router;
