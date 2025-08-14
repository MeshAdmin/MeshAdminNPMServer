import jwt, { SignOptions } from 'jsonwebtoken';
import { appConfig } from '@config/index';
import { JwtPayload, UserPayload } from '../types/auth';
import logger from '@lib/logger';

export class JwtService {
  /**
   * Generate access token
   */
  static generateAccessToken(user: UserPayload): string {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      type: 'access',
    };

    return jwt.sign(payload, appConfig.jwt.secret, {
      expiresIn: appConfig.jwt.accessExpiresIn,
      issuer: 'meshadmin-backend',
      audience: 'meshadmin-client',
    } as SignOptions);
  }

  /**
   * Generate refresh token
   */
  static generateRefreshToken(user: UserPayload): string {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      type: 'refresh',
    };

    return jwt.sign(payload, appConfig.jwt.refreshSecret, {
      expiresIn: appConfig.jwt.refreshExpiresIn,
      issuer: 'meshadmin-backend',
      audience: 'meshadmin-client',
    } as SignOptions);
  }

  /**
   * Generate both access and refresh tokens
   */
  static generateTokens(user: UserPayload): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  /**
   * Verify access token
   */
  static verifyAccessToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, appConfig.jwt.secret, {
        issuer: 'meshadmin-backend',
        audience: 'meshadmin-client',
      }) as JwtPayload;

      if (decoded.type !== 'access') {
        throw new Error('Invalid token type');
      }

      return decoded;
    } catch (error) {
      logger.error('Error verifying access token:', error);
      throw new Error('Invalid or expired access token');
    }
  }

  /**
   * Verify refresh token
   */
  static verifyRefreshToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, appConfig.jwt.refreshSecret, {
        issuer: 'meshadmin-backend',
        audience: 'meshadmin-client',
      }) as JwtPayload;

      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return decoded;
    } catch (error) {
      logger.error('Error verifying refresh token:', error);
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Decode token without verification (for debugging)
   */
  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }

  /**
   * Get token expiration time
   */
  static getTokenExpiration(token: string): Date | null {
    try {
      const decoded = this.decodeToken(token);
      if (decoded && decoded.exp) {
        return new Date(decoded.exp * 1000);
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(token: string): boolean {
    const expiration = this.getTokenExpiration(token);
    if (!expiration) {
      return true;
    }
    return new Date() >= expiration;
  }
}

export default JwtService;
