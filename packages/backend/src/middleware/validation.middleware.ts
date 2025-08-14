import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import logger from '@lib/logger';

/**
 * Middleware to handle validation errors from express-validator
 */
export const handleValidationErrors = (
  entityName: string
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: 'Validation failed',
        errors: errors.array(),
        message: `Invalid ${entityName} data`,
      });
      return;
    }
    next();
  };
};

/**
 * Create a validation middleware chain
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));
    
    // Handle any validation errors
    handleValidationErrors('')(req, res, next);
  };
};

/**
 * Sanitize input to prevent XSS attacks
 */
export const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    // Remove HTML tags and scripts
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (input && typeof input === 'object') {
    const sanitized: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  
  return input;
};

/**
 * Middleware to sanitize request body
 */
export const sanitizeBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  next();
};

/**
 * Validate pagination parameters
 */
export const validatePagination = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  if (page < 1) {
    res.status(400).json({
      error: 'Invalid page number',
      message: 'Page must be greater than 0',
    });
    return;
  }
  
  if (limit < 1 || limit > 100) {
    res.status(400).json({
      error: 'Invalid limit',
      message: 'Limit must be between 1 and 100',
    });
    return;
  }
  
  // Add pagination to request
  (req as any).pagination = {
    page,
    limit,
    offset: (page - 1) * limit,
  };
  
  next();
};

/**
 * Validate UUID parameters
 */
export const validateUUID = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const uuid = req.params[paramName];
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    if (!uuid || !uuidRegex.test(uuid)) {
      res.status(400).json({
        success: false,
        message: `Invalid ${paramName} format`,
      });
      return;
    }
    
    next();
  };
};

/**
 * Rate limit specific to validation errors
 */
const validationErrorCounts = new Map<string, number>();

export const trackValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const clientId = req.ip || 'unknown';
  const errorCount = validationErrorCounts.get(clientId) || 0;
  
  if (errorCount > 10) {
    logger.warn('Client exceeding validation error threshold', {
      clientId,
      errorCount,
    });
    res.status(429).json({
      error: 'Too many validation errors',
      message: 'Please review your request format',
    });
    return;
  }
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    validationErrorCounts.set(clientId, errorCount + 1);
  }
  
  next();
};
