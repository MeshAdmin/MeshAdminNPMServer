import { Router, Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { packageManagerService } from '@services/package-manager.service';
import ResponseHelper from '@lib/response';
import logger from '@lib/logger';
import { authenticateJwt } from '../middleware/auth.middleware';

const router: Router = Router();

// Apply JWT authentication to all package manager routes
router.use(authenticateJwt);

/**
 * GET /api/package-manager/outdated
 * List outdated packages
 */
router.get('/outdated', async (req: Request, res: Response) => {
  try {
    const user = req.user as import('../types/auth').UserPayload;
    logger.info('Fetching outdated packages', { userId: user?.id });
    const outdatedPackages = await packageManagerService.listOutdated();

    ResponseHelper.success(
      res,
      {
        packages: outdatedPackages,
        count: outdatedPackages.length,
        manager: packageManagerService['config'].type,
      },
      'Outdated packages retrieved successfully'
    );
  } catch (error) {
    logger.error('Failed to list outdated packages:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve outdated packages');
  }
});

/**
 * POST /api/package-manager/install
 * Install packages
 */
router.post(
  '/install',
  [
    body('packages')
      .isArray({ min: 1 })
      .withMessage('Packages must be a non-empty array')
      .custom((packages: string[]) => {
        return packages.every(pkg => typeof pkg === 'string' && pkg.trim().length > 0);
      })
      .withMessage('All packages must be non-empty strings'),
    body('options.isDev').optional().isBoolean().withMessage('isDev must be a boolean'),
    body('options.isGlobal').optional().isBoolean().withMessage('isGlobal must be a boolean'),
    body('options.save').optional().isBoolean().withMessage('save must be a boolean'),
    body('options.exact').optional().isBoolean().withMessage('exact must be a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const { packages, options = {} } = req.body;

      const user = req.user as import('../types/auth').UserPayload;
      logger.info('Installing packages', {
        userId: user?.id,
        packages,
        options,
      });

      await packageManagerService.install(packages, options);

      return ResponseHelper.success(
        res,
        {
          packages,
          options,
          manager: packageManagerService['config'].type,
        },
        `Successfully started installation of ${packages.length} package(s)`
      );
    } catch (error) {
      logger.error('Failed to install packages:', error);
      return ResponseHelper.internalError(res, 'Failed to install packages');
    }
  }
);

/**
 * POST /api/package-manager/upgrade
 * Upgrade packages
 */
router.post(
  '/upgrade',
  [
    body('packages')
      .optional()
      .isArray()
      .withMessage('Packages must be an array')
      .custom((packages: string[]) => {
        if (packages && packages.length > 0) {
          return packages.every(pkg => typeof pkg === 'string' && pkg.trim().length > 0);
        }
        return true;
      })
      .withMessage('All packages must be non-empty strings'),
    body('options.latest').optional().isBoolean().withMessage('latest must be a boolean'),
    body('options.interactive').optional().isBoolean().withMessage('interactive must be a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const { packages, options = {} } = req.body;

      const user = req.user as import('../types/auth').UserPayload;
      logger.info('Upgrading packages', {
        userId: user?.id,
        packages: packages || 'all',
        options,
      });

      await packageManagerService.upgrade(packages, options);

      return ResponseHelper.success(
        res,
        {
          packages: packages || 'all',
          options,
          manager: packageManagerService['config'].type,
        },
        packages
          ? `Successfully started upgrade of ${packages.length} package(s)`
          : 'Successfully started upgrade of all packages'
      );
    } catch (error) {
      logger.error('Failed to upgrade packages:', error);
      return ResponseHelper.internalError(res, 'Failed to upgrade packages');
    }
  }
);

/**
 * DELETE /api/package-manager/remove
 * Remove packages
 */
router.delete(
  '/remove',
  [
    body('packages')
      .isArray({ min: 1 })
      .withMessage('Packages must be a non-empty array')
      .custom((packages: string[]) => {
        return packages.every(pkg => typeof pkg === 'string' && pkg.trim().length > 0);
      })
      .withMessage('All packages must be non-empty strings'),
    body('options.isGlobal').optional().isBoolean().withMessage('isGlobal must be a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const { packages, options = {} } = req.body;

      const user = req.user as import('../types/auth').UserPayload;
      logger.info('Removing packages', {
        userId: user?.id,
        packages,
        options,
      });

      await packageManagerService.remove(packages, options);

      return ResponseHelper.success(
        res,
        {
          packages,
          options,
          manager: packageManagerService['config'].type,
        },
        `Successfully started removal of ${packages.length} package(s)`
      );
    } catch (error) {
      logger.error('Failed to remove packages:', error);
      return ResponseHelper.internalError(res, 'Failed to remove packages');
    }
  }
);

/**
 * GET /api/package-manager/operations
 * Get all package manager operations
 */
router.get('/operations', async (req: Request, res: Response) => {
  try {
    const operations = packageManagerService.getAllOperations();

    ResponseHelper.success(
      res,
      {
        operations,
        count: operations.length,
      },
      'Package manager operations retrieved successfully'
    );
  } catch (error) {
    logger.error('Failed to get package manager operations:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve operations');
  }
});

/**
 * GET /api/package-manager/operations/:operationId
 * Get specific package manager operation
 */
router.get(
  '/operations/:operationId',
  [param('operationId').isUUID().withMessage('Operation ID must be a valid UUID')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const { operationId } = req.params;
      const operation = packageManagerService.getOperation(operationId);

      if (!operation) {
        return ResponseHelper.notFound(res, 'Operation not found');
      }

      return ResponseHelper.success(res, operation, 'Operation retrieved successfully');
    } catch (error) {
      logger.error('Failed to get package manager operation:', error);
      return ResponseHelper.internalError(res, 'Failed to retrieve operation');
    }
  }
);

/**
 * DELETE /api/package-manager/operations/completed
 * Clear completed operations
 */
router.delete('/operations/completed', async (req: Request, res: Response) => {
  try {
    const operationsBefore = packageManagerService.getAllOperations().length;
    packageManagerService.clearCompletedOperations();
    const operationsAfter = packageManagerService.getAllOperations().length;
    const cleared = operationsBefore - operationsAfter;

    ResponseHelper.success(
      res,
      {
        cleared,
        remaining: operationsAfter,
      },
      `Successfully cleared ${cleared} completed operation(s)`
    );
  } catch (error) {
    logger.error('Failed to clear completed operations:', error);
    ResponseHelper.internalError(res, 'Failed to clear completed operations');
  }
});

/**
 * GET /api/package-manager/info
 * Get package manager information
 */
router.get('/info', async (req: Request, res: Response) => {
  try {
    const config = packageManagerService['config'];

    ResponseHelper.success(
      res,
      {
        type: config.type,
        workingDirectory: config.workingDirectory,
        timeout: config.timeout,
        activeOperations: packageManagerService
          .getAllOperations()
          .filter(op => op.status === 'pending' || op.status === 'running').length,
        totalOperations: packageManagerService.getAllOperations().length,
      },
      'Package manager information retrieved successfully'
    );
  } catch (error) {
    logger.error('Failed to get package manager info:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve package manager information');
  }
});

export default router;
