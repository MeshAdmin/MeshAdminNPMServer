import { Router } from 'express';
import ResponseHelper from '@lib/response';
import autonomousTestingSystem from '../autonomousTestingSystem';
import qualityAssuranceSystem from '../qualityAssurance';

const router: Router = Router();

// Get autonomous system status
router.get('/status', async (req, res) => {
  try {
    const status = autonomousTestingSystem.getStatus();
    const qaStatus = qualityAssuranceSystem.getQAStatus();

    ResponseHelper.success(
      res,
      {
        autonomous: status,
        qa: qaStatus,
        timestamp: new Date().toISOString(),
      },
      'Autonomous system status retrieved successfully'
    );
  } catch (error) {
    console.error('Error getting autonomous system status:', error);
    ResponseHelper.internalError(res, 'Failed to get autonomous system status');
  }
});

// Start autonomous testing system
router.post('/start', async (req, res) => {
  try {
    if (autonomousTestingSystem.getStatus().isRunning) {
      ResponseHelper.badRequest(res, 'Autonomous system is already running');
      return;
    }

    await autonomousTestingSystem.start();
    ResponseHelper.success(
      res,
      {
        status: 'started',
        timestamp: new Date().toISOString(),
      },
      'Autonomous testing system started successfully'
    );
  } catch (error) {
    console.error('Error starting autonomous system:', error);
    ResponseHelper.internalError(res, 'Failed to start autonomous system');
  }
});

// Stop autonomous testing system
router.post('/stop', async (req, res) => {
  try {
    if (!autonomousTestingSystem.getStatus().isRunning) {
      ResponseHelper.badRequest(res, 'Autonomous system is not running');
      return;
    }

    autonomousTestingSystem.stop();
    ResponseHelper.success(
      res,
      {
        status: 'stopped',
        timestamp: new Date().toISOString(),
      },
      'Autonomous testing system stopped successfully'
    );
  } catch (error) {
    console.error('Error stopping autonomous system:', error);
    ResponseHelper.internalError(res, 'Failed to stop autonomous system');
  }
});

// Emergency stop
router.post('/emergency-stop', async (req, res) => {
  try {
    autonomousTestingSystem.emergencyStopActivate();
    ResponseHelper.success(
      res,
      {
        status: 'emergency_stopped',
        timestamp: new Date().toISOString(),
      },
      'Emergency stop activated'
    );
  } catch (error) {
    console.error('Error activating emergency stop:', error);
    ResponseHelper.internalError(res, 'Failed to activate emergency stop');
  }
});

// Deactivate emergency stop
router.post('/emergency-stop/deactivate', async (req, res) => {
  try {
    autonomousTestingSystem.emergencyStopDeactivate();
    ResponseHelper.success(
      res,
      {
        status: 'emergency_stop_deactivated',
        timestamp: new Date().toISOString(),
      },
      'Emergency stop deactivated'
    );
  } catch (error) {
    console.error('Error deactivating emergency stop:', error);
    ResponseHelper.internalError(res, 'Failed to deactivate emergency stop');
  }
});

// Run comprehensive QA tests
router.post('/qa/run', async (req, res) => {
  try {
    const report = await qualityAssuranceSystem.runComprehensiveTests();
    ResponseHelper.success(res, report, 'QA tests completed successfully');
  } catch (error) {
    console.error('Error running QA tests:', error);
    ResponseHelper.internalError(res, 'Failed to run QA tests');
  }
});

// Add a test to the queue
router.post('/tests', async (req, res) => {
  try {
    const { name, description, type } = req.body;

    if (!name || !type) {
      ResponseHelper.badRequest(res, 'Test name and type are required');
      return;
    }

    const test = {
      name,
      description: description || '',
      type,
      timestamp: new Date().toISOString(),
    };

    autonomousTestingSystem.addTest(test);
    ResponseHelper.success(res, test, 'Test added to queue successfully');
  } catch (error) {
    console.error('Error adding test:', error);
    ResponseHelper.internalError(res, 'Failed to add test');
  }
});

// Force issue detection (manual trigger)
router.post('/detect-issues', async (req, res) => {
  try {
    const issues = await autonomousTestingSystem.detectIssues();
    ResponseHelper.success(
      res,
      {
        issues,
        count: issues.length,
        timestamp: new Date().toISOString(),
      },
      'Issue detection completed'
    );
  } catch (error) {
    console.error('Error detecting issues:', error);
    ResponseHelper.internalError(res, 'Failed to detect issues');
  }
});

export default router;
