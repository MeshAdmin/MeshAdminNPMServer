import { Router, Request, Response } from 'express';
import userService from '@services/user.service';
import { authenticateJwt } from '../middleware/auth.middleware';
import {
  requireAdmin,
  requireOperator,
  requireViewer,
  requireOwnershipOrAdmin,
} from '../middleware/rbac.middleware';
import { UserRole } from '../types/auth';
import ResponseHelper from '@lib/response';
import logger from '@lib/logger';

const router: Router = Router();

// GET /api/users
router.get('/', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return ResponseHelper.success(res, users, 'Users retrieved successfully');
  } catch (error) {
    logger.error('Error fetching users:', error);
    return ResponseHelper.internalError(res, 'Failed to fetch users');
  }
});

// GET /api/users/:id
router.get(
  '/:id',
  authenticateJwt,
  requireViewer,
  requireOwnershipOrAdmin('id'),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return ResponseHelper.badRequest(res, 'User ID is required');
      }

      const user = await userService.findById(id);
      if (!user) {
        return ResponseHelper.notFound(res, 'User not found');
      }

      // Return user payload without sensitive data
      const userPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      return ResponseHelper.success(res, userPayload, 'User retrieved successfully');
    } catch (error) {
      logger.error('Error fetching user:', error);
      return ResponseHelper.internalError(res, 'Failed to fetch user');
    }
  }
);

// POST /api/users - Use /auth/register instead for proper user creation

// PUT /api/users/:id
router.put(
  '/:id',
  authenticateJwt,
  requireOperator,
  requireOwnershipOrAdmin('id'),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return ResponseHelper.badRequest(res, 'User ID is required');
      }

      const currentUser = (req as any).user;
      const { username, email, role } = req.body;

      // Validate provided fields
      if (username && typeof username !== 'string') {
        return ResponseHelper.badRequest(res, 'Username must be a string');
      }

      if (email && (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        return ResponseHelper.badRequest(res, 'Invalid email format');
      }

      if (role && !Object.values(UserRole).includes(role)) {
        return ResponseHelper.badRequest(res, 'Invalid role');
      }

      const updatedUser = await userService.updateUser(
        id,
        { username, email, role },
        currentUser.role
      );
      if (!updatedUser) {
        return ResponseHelper.notFound(res, 'User not found');
      }

      return ResponseHelper.success(res, updatedUser, 'User updated successfully');
    } catch (error) {
      logger.error('Error updating user:', error);
      if (error instanceof Error && error.message.includes('Only administrators')) {
        return ResponseHelper.forbidden(res, error.message);
      }
      if (error instanceof Error && error.message.includes('already exists')) {
        return ResponseHelper.badRequest(res, error.message);
      }
      return ResponseHelper.internalError(res, 'Failed to update user');
    }
  }
);

// DELETE /api/users/:id
router.delete(
  '/:id',
  authenticateJwt,
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) {
        ResponseHelper.badRequest(res, 'User ID is required');
        return;
      }

      const currentUser = (req as any).user;
      const deleted = await userService.deleteUser(id, currentUser.role);
      if (!deleted) {
        ResponseHelper.notFound(res, 'User not found');
        return;
      }

      res.status(204).send(); // 204 No Content should not have a response body
    } catch (error) {
      logger.error('Error deleting user:', error);
      if (
        error instanceof Error &&
        (error.message.includes('Only administrators') || error.message.includes('Cannot delete'))
      ) {
        ResponseHelper.forbidden(res, error.message);
        return;
      }
      ResponseHelper.internalError(res, 'Failed to delete user');
      return;
    }
  }
);

export default router;
