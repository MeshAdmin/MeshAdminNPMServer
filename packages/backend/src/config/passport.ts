import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { appConfig } from '@config/index';
import { JwtPayload, UserPayload } from '../types/auth';
import UserService from '@services/user.service';
import logger from '@lib/logger';

// JWT Strategy Options
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: appConfig.jwt.secret,
  issuer: 'meshadmin-backend',
  audience: 'meshadmin-client',
};

// JWT Strategy Implementation
passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
    try {
      // Validate token type
      if (payload.type !== 'access') {
        logger.warn('Invalid token type in JWT strategy:', payload.type);
        return done(null, false, { message: 'Invalid token type' });
      }

      // Try to find user by ID
      const user = await UserService.findById(payload.sub);

      if (!user) {
        logger.warn('User not found for JWT payload:', payload.sub);
        return done(null, false, { message: 'User not found' });
      }

      if (!user.isActive) {
        logger.warn('Inactive user attempted to authenticate:', user.id);
        return done(null, false, { message: 'User account is inactive' });
      }

      // Create user payload for request
      const userPayload: UserPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      return done(null, userPayload);
    } catch (error) {
      logger.error('Error in JWT strategy:', error);
      return done(error, false);
    }
  })
);

// Serialize user for session (if needed)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session (if needed)
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await UserService.findById(id);
    if (user) {
      const userPayload: UserPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      done(null, userPayload);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});

export default passport;
