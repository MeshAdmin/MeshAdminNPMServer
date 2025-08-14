import { Request, Response, NextFunction } from 'express';
import passport from '@config/passport';
import { JwtPayload } from '../types/auth';

// Middleware for JWT authentication
export function authenticateJwt(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (err: any, user: JwtPayload, info: any) => {
    if (err || !user) {
      res
        .status(401)
        .json({ message: 'Unauthorized', detail: info ? info.message : 'Invalid token' });
      return;
    }

    req.user = user;
    next();
  })(req, res, next);
}
