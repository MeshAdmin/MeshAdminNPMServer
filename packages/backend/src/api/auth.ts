import { Router, Request, Response } from 'express';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, UserRole } from '../types/auth';
import AuthService from '@services/auth.service';
import UserService from '@services/user.service';
import PasswordService from '@services/password.service';
import { authenticateJwt } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/rbac.middleware';
import ResponseHelper from '@lib/response';
import logger from '@lib/logger';

const router: Router = Router();

/**
 * POST /auth/login
 * Authenticate user and return JWT tokens
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = req.body as LoginRequest;

    // Validate request body
    if (!loginData.username || !loginData.password) {
      ResponseHelper.badRequest(res, 'Username and password are required');
      return;
    }

    const result = await AuthService.login(loginData);
    ResponseHelper.success(res, result, 'Login successful');
  } catch (error) {
    logger.error('Login error:', error);
    if (error instanceof Error) {
      if (error.message === 'Invalid credentials' || error.message === 'Account is inactive') {
        ResponseHelper.unauthorized(res, error.message);
        return;
      }
    }
    ResponseHelper.internalError(res, 'Login failed');
  }
});

/**
 * POST /auth/refresh
 * Refresh JWT tokens using refresh token
 */
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshData = req.body as RefreshTokenRequest;

    // Validate request body
    if (!refreshData.refreshToken) {
      ResponseHelper.badRequest(res, 'Refresh token is required');
      return;
    }

    const result = await AuthService.refreshTokens(refreshData);
    ResponseHelper.success(res, result, 'Tokens refreshed successfully');
  } catch (error) {
    logger.error('Token refresh error:', error);
    ResponseHelper.unauthorized(res, 'Invalid or expired refresh token');
  }
});

/**
 * POST /auth/logout
 * Logout user (invalidate tokens)
 */
router.post('/logout', authenticateJwt, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    await AuthService.logout(token);
    ResponseHelper.success(res, null, 'Logout successful');
  } catch (error) {
    logger.error('Logout error:', error);
    ResponseHelper.internalError(res, 'Logout failed');
  }
});

/**
 * POST /auth/register
 * Register a new user (admin only)
 */
router.post(
  '/register',
  authenticateJwt,
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const registerData = req.body as RegisterRequest;
      const currentUser = (req as any).user;

      // Validate request body
      if (!registerData.username || !registerData.email || !registerData.password) {
        ResponseHelper.badRequest(res, 'Username, email, and password are required');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerData.email)) {
        ResponseHelper.badRequest(res, 'Invalid email format');
        return;
      }

      // Validate username format (alphanumeric and underscore only)
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(registerData.username)) {
        ResponseHelper.badRequest(
          res,
          'Username can only contain letters, numbers, and underscores'
        );
        return;
      }

      // Create user
      const user = await UserService.createUser(registerData, currentUser.role);
      ResponseHelper.created(res, user, 'User registered successfully');
    } catch (error) {
      logger.error('User registration error:', error);
      if (error instanceof Error) {
        if (
          error.message.includes('already exists') ||
          error.message.includes('Password validation failed')
        ) {
          ResponseHelper.badRequest(res, error.message);
          return;
        }
      }
      ResponseHelper.internalError(res, 'User registration failed');
    }
  }
);

/**
 * GET /auth/me
 * Get current user information
 */
router.get('/me', authenticateJwt, async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    ResponseHelper.success(res, currentUser, 'User information retrieved successfully');
  } catch (error) {
    logger.error('Get current user error:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve user information');
  }
});

/**
 * PUT /auth/me/password
 * Change current user's password
 */
router.put('/me/password', authenticateJwt, async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUser = (req as any).user;
    const { currentPassword, newPassword } = req.body;

    // Validate request body
    if (!currentPassword || !newPassword) {
      ResponseHelper.badRequest(res, 'Current password and new password are required');
      return;
    }

    // Get full user details to verify current password
    const user = await UserService.findById(currentUser.id);
    if (!user) {
      ResponseHelper.notFound(res, 'User not found');
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await PasswordService.verifyPassword(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      ResponseHelper.badRequest(res, 'Current password is incorrect');
      return;
    }

    // Update password
    await UserService.updatePassword(currentUser.id, newPassword);
    ResponseHelper.success(res, null, 'Password updated successfully');
  } catch (error) {
    logger.error('Password change error:', error);
    if (error instanceof Error && error.message.includes('Password validation failed')) {
      ResponseHelper.badRequest(res, error.message);
      return;
    }
    ResponseHelper.internalError(res, 'Failed to update password');
  }
});

export default router;
