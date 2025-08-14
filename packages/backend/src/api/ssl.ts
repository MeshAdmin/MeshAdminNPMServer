import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { authenticateJwt } from '@middleware/auth.middleware';
import { requireRole } from '@middleware/rbac.middleware';
import ResponseHelper from '@lib/response';
import logger from '@lib/logger';
import { acmeService } from '@services/acme.service';
import { domainService } from '@services/domain.service';
import { databaseService } from '@services/database.service';

const router = Router();

// Apply authentication to all SSL routes
router.use(authenticateJwt);

/**
 * @route GET /api/ssl/domains
 * @description Get all managed domains
 */
router.get('/domains', async (req, res) => {
  try {
    const domains = await domainService.listDomains();
    ResponseHelper.success(res, domains, 'Domains retrieved successfully');
  } catch (error) {
    logger.error('Failed to get domains:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve domains');
  }
});

/**
 * @route POST /api/ssl/domains
 * @description Add a new domain for SSL management
 */
router.post(
  '/domains',
  requireRole(['admin']),
  [
    body('name').isString().isLength({ min: 1 }).withMessage('Domain name is required'),
    body('wildcard').optional().isBoolean().withMessage('Wildcard must be a boolean'),
    body('validationMethod')
      .optional()
      .isIn(['http-01', 'dns-01'])
      .withMessage('Invalid validation method'),
    body('challengePlugin').optional().isString().withMessage('Challenge plugin must be a string'),
    body('pluginConfig').optional().isObject().withMessage('Plugin config must be an object'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const domain = await domainService.addDomain(req.body);
      return ResponseHelper.success(res, domain, 'Domain added successfully', 201);
    } catch (error) {
      logger.error('Failed to add domain:', error);
      return ResponseHelper.internalError(res, 'Failed to add domain');
    }
  }
);

/**
 * @route GET /api/ssl/domains/:name
 * @description Get domain details
 */
router.get(
  '/domains/:name',
  param('name').isString().withMessage('Domain name is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const domain = await domainService.getDomain(req.params?.name);
      if (!domain) {
        return ResponseHelper.notFound(res, 'Domain not found');
      }
      return ResponseHelper.success(res, domain, 'Domain retrieved successfully');
    } catch (error) {
      logger.error('Failed to get domain:', error);
      return ResponseHelper.internalError(res, 'Failed to retrieve domain');
    }
  }
);

/**
 * @route PUT /api/ssl/domains/:name
 * @description Update domain configuration
 */
router.put(
  '/domains/:name',
  requireRole(['admin']),
  [
    param('name').isString().withMessage('Domain name is required'),
    body('wildcard').optional().isBoolean().withMessage('Wildcard must be a boolean'),
    body('validationMethod')
      .optional()
      .isIn(['http-01', 'dns-01'])
      .withMessage('Invalid validation method'),
    body('challengePlugin').optional().isString().withMessage('Challenge plugin must be a string'),
    body('pluginConfig').optional().isObject().withMessage('Plugin config must be an object'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const domain = await domainService.updateDomain(req.params.name, req.body);
      return ResponseHelper.success(res, domain, 'Domain updated successfully');
    } catch (error) {
      logger.error('Failed to update domain:', error);
      return ResponseHelper.internalError(res, 'Failed to update domain');
    }
  }
);

/**
 * @route DELETE /api/ssl/domains/:name
 * @description Remove a domain
 */
router.delete(
  '/domains/:name',
  requireRole(['admin']),
  param('name').isString().withMessage('Domain name is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      await domainService.removeDomain(req.params.name);
      return ResponseHelper.success(res, null, 'Domain removed successfully');
    } catch (error) {
      logger.error('Failed to remove domain:', error);
      return ResponseHelper.internalError(res, 'Failed to remove domain');
    }
  }
);

/**
 * @route POST /api/ssl/certificates/issue
 * @description Issue a new SSL certificate
 */
router.post(
  '/certificates/issue',
  requireRole(['admin']),
  [
    body('domainName').isString().isLength({ min: 1 }).withMessage('Domain name is required'),
    body('altNames').optional().isArray().withMessage('Alt names must be an array'),
    body('altNames.*').optional().isString().withMessage('Alt names must be strings'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const { domainName, altNames = [] } = req.body;

      // Check if domain exists
      const domain = await domainService.getDomain(domainName);
      if (!domain) {
        return ResponseHelper.badRequest(res, 'Domain not found. Please add the domain first.');
      }

      const certificateId = await acmeService.issueCertificate(domainName, altNames);
      return ResponseHelper.success(res, { certificateId }, 'Certificate issued successfully', 201);
    } catch (error) {
      logger.error('Failed to issue certificate:', error);
      return ResponseHelper.internalError(res, (error as Error).message || 'Failed to issue certificate');
    }
  }
);

/**
 * @route POST /api/ssl/certificates/:id/renew
 * @description Renew an SSL certificate
 */
router.post(
  '/certificates/:id/renew',
  requireRole(['admin']),
  param('id').isString().withMessage('Certificate ID is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const success = await acmeService.renewCertificate(req.params.id);
      if (success) {
        return ResponseHelper.success(res, null, 'Certificate renewed successfully');
      } else {
        return ResponseHelper.internalError(res, 'Failed to renew certificate');
      }
    } catch (error) {
      logger.error('Failed to renew certificate:', error);
      return ResponseHelper.internalError(res, (error as Error).message || 'Failed to renew certificate');
    }
  }
);

/**
 * @route GET /api/ssl/certificates
 * @description Get all certificates
 */
router.get('/certificates', async (req, res) => {
  try {
    const certificates = await databaseService.prisma.certificate.findMany({
      include: {
        domain: true,
        renewalJobs: {
          where: { status: 'SCHEDULED' },
          orderBy: { scheduledAt: 'asc' },
          take: 1,
        },
        deployments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    ResponseHelper.success(res, certificates, 'Certificates retrieved successfully');
  } catch (error) {
    logger.error('Failed to get certificates:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve certificates');
  }
});

/**
 * @route GET /api/ssl/certificates/:id
 * @description Get certificate details
 */
router.get(
  '/certificates/:id',
  param('id').isString().withMessage('Certificate ID is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const certificate = await databaseService.prisma.certificate.findUnique({
        where: { id: req.params?.id },
        include: {
          domain: true,
          renewalJobs: true,
          deployments: true,
        },
      });

      if (!certificate) {
        return ResponseHelper.notFound(res, 'Certificate not found');
      }

      return ResponseHelper.success(res, certificate, 'Certificate retrieved successfully');
    } catch (error) {
      logger.error('Failed to get certificate:', error);
      return ResponseHelper.internalError(res, 'Failed to retrieve certificate');
    }
  }
);

/**
 * @route GET /api/ssl/certificates/domain/:domainName
 * @description Get certificate for a specific domain
 */
router.get(
  '/certificates/domain/:domainName',
  param('domainName').isString().withMessage('Domain name is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHelper.badRequest(res, 'Validation failed', errors.array());
    }

    try {
      const certificate = await acmeService.getCertificateInfo(req.params?.domainName);
      if (!certificate) {
        return ResponseHelper.notFound(res, 'Certificate not found for domain');
      }

      return ResponseHelper.success(res, certificate, 'Certificate retrieved successfully');
    } catch (error) {
      logger.error('Failed to get certificate:', error);
      return ResponseHelper.internalError(res, 'Failed to retrieve certificate');
    }
  }
);

/**
 * @route POST /api/ssl/renewal/check
 * @description Manually trigger renewal check
 */
router.post('/renewal/check', requireRole(['admin']), async (req, res) => {
  try {
    await acmeService.checkAndRenewCertificates();
    ResponseHelper.success(res, null, 'Renewal check completed successfully');
  } catch (error) {
    logger.error('Failed to check renewals:', error);
    ResponseHelper.internalError(res, 'Failed to check renewals');
  }
});

/**
 * @route GET /api/ssl/status
 * @description Get SSL management status
 */
router.get('/status', async (req, res) => {
  try {
    // Get summary statistics
    const totalDomains = await databaseService.prisma.domain.count();
    const activeCertificates = await databaseService.prisma.certificate.count({
      where: { status: 'ACTIVE' },
    });
    const pendingRenewals = await databaseService.prisma.certificateRenewal.count({
      where: { status: 'SCHEDULED' },
    });
    const failedDeployments = await databaseService.prisma.certificateDeployment.count({
      where: { status: 'FAILED' },
    });

    // Get upcoming renewals (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingRenewals = await databaseService.prisma.certificateRenewal.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: {
          lte: thirtyDaysFromNow,
        },
      },
      include: {
        certificate: {
          include: {
            domain: true,
          },
        },
      },
      orderBy: { scheduledAt: 'asc' },
      take: 10,
    });

    const status = {
      totalDomains,
      activeCertificates,
      pendingRenewals,
      failedDeployments,
      upcomingRenewals,
      acmeServerUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://acme-v02.api.letsencrypt.org/directory'
          : 'https://acme-staging-v02.api.letsencrypt.org/directory',
    };

    ResponseHelper.success(res, status, 'SSL status retrieved successfully');
  } catch (error) {
    logger.error('Failed to get SSL status:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve SSL status');
  }
});

export default router;
