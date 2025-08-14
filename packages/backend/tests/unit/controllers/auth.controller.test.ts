import { Request, Response } from 'express';
import { authController } from '@api/controllers/auth.controller';
import { authService } from '@services/auth.service';
import { userService } from '@services/user.service';
import ResponseHelper from '@lib/response';

// Mock dependencies
jest.mock('@services/auth.service');
jest.mock('@services/user.service');
jest.mock('@lib/response');

describe('AuthController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {},
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePassword123!',
        name: 'Test User',
      };
      const mockUser = { id: '1', ...userData, password: undefined };
      const mockTokens = { accessToken: 'access-token', refreshToken: 'refresh-token' };

      mockRequest.body = userData;
      (userService.createUser as jest.Mock).mockResolvedValue(mockUser);
      (authService.generateTokens as jest.Mock).mockReturnValue(mockTokens);

      await authController.register(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(userService.createUser).toHaveBeenCalledWith(userData);
      expect(authService.generateTokens).toHaveBeenCalledWith(mockUser);
      expect(ResponseHelper.created).toHaveBeenCalledWith(
        mockResponse,
        expect.objectContaining({
          user: mockUser,
          tokens: mockTokens,
        }),
        'User registered successfully'
      );
    });

    it('should handle registration errors', async () => {
      const error = new Error('Email already exists');
      mockRequest.body = {
        email: 'existing@example.com',
        password: 'password',
      };
      (userService.createUser as jest.Mock).mockRejectedValue(error);

      await authController.register(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockUser = { id: '1', email: credentials.email };
      const mockTokens = { accessToken: 'access-token', refreshToken: 'refresh-token' };

      mockRequest.body = credentials;
      (authService.validateUserCredentials as jest.Mock).mockResolvedValue(mockUser);
      (authService.generateTokens as jest.Mock).mockReturnValue(mockTokens);

      await authController.login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(authService.validateUserCredentials).toHaveBeenCalledWith(
        credentials.email,
        credentials.password
      );
      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        expect.objectContaining({
          user: mockUser,
          tokens: mockTokens,
        }),
        'Login successful'
      );
    });

    it('should handle invalid credentials', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      (authService.validateUserCredentials as jest.Mock).mockResolvedValue(null);

      await authController.login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ResponseHelper.unauthorized).toHaveBeenCalledWith(
        mockResponse,
        'Invalid email or password'
      );
    });
  });

  describe('refreshToken', () => {
    it('should refresh tokens successfully', async () => {
      const refreshToken = 'valid-refresh-token';
      const mockUser = { id: '1', email: 'test@example.com' };
      const newTokens = { accessToken: 'new-access', refreshToken: 'new-refresh' };

      mockRequest.body = { refreshToken };
      (authService.validateRefreshToken as jest.Mock).mockResolvedValue(mockUser);
      (authService.generateTokens as jest.Mock).mockReturnValue(newTokens);

      await authController.refreshToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(authService.validateRefreshToken).toHaveBeenCalledWith(refreshToken);
      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        newTokens,
        'Tokens refreshed successfully'
      );
    });

    it('should handle invalid refresh token', async () => {
      mockRequest.body = { refreshToken: 'invalid-token' };
      (authService.validateRefreshToken as jest.Mock).mockResolvedValue(null);

      await authController.refreshToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ResponseHelper.unauthorized).toHaveBeenCalledWith(
        mockResponse,
        'Invalid refresh token'
      );
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      const userId = '1';
      mockRequest.user = { id: userId };

      await authController.logout(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(authService.revokeUserTokens).toHaveBeenCalledWith(userId);
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('refreshToken');
      expect(ResponseHelper.success).toHaveBeenCalledWith(
        mockResponse,
        null,
        'Logout successful'
      );
    });
  });
});
