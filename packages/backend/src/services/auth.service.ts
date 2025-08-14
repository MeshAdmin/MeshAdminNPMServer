import logger from '@lib/logger';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserPayload,
} from '../types/auth';
import UserService from '@services/user.service';
import PasswordService from '@services/password.service';
import JwtService from '@services/jwt.service';

export class AuthService {
  /**
   * Authenticate user with username/password
   */
  static async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      logger.info(`Login attempt for username: ${loginData.username}`);

      // Find user by username
      const user = await UserService.findByUsername(loginData.username);
      if (!user) {
        logger.warn(`Login failed: User not found - ${loginData.username}`);
        throw new Error('Invalid credentials');
      }

      // Check if user is active
      if (!user.isActive) {
        logger.warn(`Login failed: User inactive - ${loginData.username}`);
        throw new Error('Account is inactive');
      }

      // Verify password
      const isPasswordValid = await PasswordService.verifyPassword(
        loginData.password,
        user.password
      );
      if (!isPasswordValid) {
        logger.warn(`Login failed: Invalid password - ${loginData.username}`);
        throw new Error('Invalid credentials');
      }

      // Create user payload
      const userPayload: UserPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      // Generate tokens
      const tokens = JwtService.generateTokens(userPayload);

      logger.info(`Login successful for user: ${user.username}`);

      return {
        user: userPayload,
        tokens,
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Refresh authentication tokens
   */
  static async refreshTokens(refreshData: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    try {
      logger.info('Token refresh attempt');

      // Verify refresh token
      const payload = JwtService.verifyRefreshToken(refreshData.refreshToken);

      // Find user to ensure they still exist and are active
      const user = await UserService.findById(payload.sub);
      if (!user) {
        logger.warn(`Token refresh failed: User not found - ${payload.sub}`);
        throw new Error('User not found');
      }

      if (!user.isActive) {
        logger.warn(`Token refresh failed: User inactive - ${payload.sub}`);
        throw new Error('Account is inactive');
      }

      // Create user payload
      const userPayload: UserPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      // Generate new tokens
      const tokens = JwtService.generateTokens(userPayload);

      logger.info(`Token refresh successful for user: ${user.username}`);

      return { tokens };
    } catch (error) {
      logger.error('Token refresh error:', error);
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Validate access token and return user payload
   */
  static async validateToken(token: string): Promise<UserPayload> {
    try {
      // Verify access token
      const payload = JwtService.verifyAccessToken(token);

      // Find user to ensure they still exist and are active
      const user = await UserService.findById(payload.sub);
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.isActive) {
        throw new Error('Account is inactive');
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      logger.error('Token validation error:', error);
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Logout user (in real app, you might want to blacklist the token)
   */
  static async logout(token: string): Promise<void> {
    try {
      // In a real application, you would add the token to a blacklist
      // or store it in a database/cache to prevent reuse
      const payload = JwtService.decodeToken(token);
      if (payload) {
        logger.info(`Logout for user: ${payload.username}`);
      }
    } catch (error) {
      logger.error('Logout error:', error);
    }
  }
}

export default AuthService;
