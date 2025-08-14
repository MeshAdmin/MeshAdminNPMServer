import { Request, Response, NextFunction } from 'express';
import { UserRole, UserPayload } from '../types/auth';
import ResponseHelper from '@lib/response';
import logger from '@lib/logger';

// Role hierarchy - higher roles can access lower role resources
const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.VIEWER]: 1,
  [UserRole.OPERATOR]: 2,
  [UserRole.ADMIN]: 3,
};

// Extended Request interface to include user
interface AuthenticatedRequest extends Request {
  user: UserPayload;
}

/**
 * Middleware to check if user has required role or higher
 */
export function requireRole(requiredRoles: UserRole[] | string[]) {
  // Convert string array to UserRole enum values
  const roles = requiredRoles.map(role => {
    if (typeof role === 'string') {
      return role as UserRole;
    }
    return role;
  });
  
  return (req: Request, res: Response, next: NextFunction): void => {
    const authenticatedReq = req as AuthenticatedRequest;

    if (!authenticatedReq.user) {
      logger.warn('RBAC middleware called without authenticated user');
      ResponseHelper.unauthorized(res, 'Authentication required');
      return;
    }

    const userRole = authenticatedReq.user.role;
    const userRoleLevel = ROLE_HIERARCHY[userRole];

    // Check if user has any of the required roles
    const hasRequiredRole = roles.some(role => {
      const requiredRoleLevel = ROLE_HIERARCHY[role];
      return userRoleLevel >= requiredRoleLevel;
    });

    if (!hasRequiredRole) {
      logger.warn(
        `User ${authenticatedReq.user.username} (${userRole}) attempted to access resource requiring roles: ${roles.join(', ')}`
      );
      ResponseHelper.forbidden(res, 'Insufficient permissions');
      return;
    }

    next();
  };
}

/**
 * Middleware to check if user has exact role
 */
export function requireExactRole(...exactRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authenticatedReq = req as AuthenticatedRequest;

    if (!authenticatedReq.user) {
      logger.warn('RBAC middleware called without authenticated user');
      ResponseHelper.unauthorized(res, 'Authentication required');
      return;
    }

    const userRole = authenticatedReq.user.role;

    if (!exactRoles.includes(userRole)) {
      logger.warn(
        `User ${authenticatedReq.user.username} (${userRole}) attempted to access resource requiring exact roles: ${exactRoles.join(', ')}`
      );
      ResponseHelper.forbidden(res, 'Insufficient permissions');
      return;
    }

    next();
  };
}

/**
 * Middleware to check if user is admin
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  return requireExactRole(UserRole.ADMIN)(req, res, next);
}

/**
 * Middleware to check if user is operator or higher
 */
export function requireOperator(req: Request, res: Response, next: NextFunction): void {
  return requireRole([UserRole.OPERATOR])(req, res, next);
}

/**
 * Middleware to check if user is viewer or higher (essentially authenticated)
 */
export function requireViewer(req: Request, res: Response, next: NextFunction): void {
  return requireRole([UserRole.VIEWER])(req, res, next);
}

/**
 * Middleware to check if user can access their own resources or is admin
 */
export function requireOwnershipOrAdmin(userIdParam: string = 'userId') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authenticatedReq = req as AuthenticatedRequest;

    if (!authenticatedReq.user) {
      logger.warn('Ownership middleware called without authenticated user');
      ResponseHelper.unauthorized(res, 'Authentication required');
      return;
    }

    const requestedUserId = req.params[userIdParam];
    const currentUserId = authenticatedReq.user.id;
    const userRole = authenticatedReq.user.role;

    // Admin can access any resource
    if (userRole === UserRole.ADMIN) {
      return next();
    }

    // User can access their own resources
    if (requestedUserId === currentUserId) {
      return next();
    }

    logger.warn(
      `User ${authenticatedReq.user.username} attempted to access resource belonging to user ${requestedUserId}`
    );
    ResponseHelper.forbidden(res, 'Can only access your own resources');
    return;
  };
}

/**
 * Get role hierarchy level
 */
export function getRoleLevel(role: UserRole): number {
  return ROLE_HIERARCHY[role];
}

/**
 * Check if role A has higher or equal privileges than role B
 */
export function hasRoleOrHigher(roleA: UserRole, roleB: UserRole): boolean {
  return ROLE_HIERARCHY[roleA] >= ROLE_HIERARCHY[roleB];
}
