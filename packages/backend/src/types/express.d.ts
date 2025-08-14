import { UserPayload } from './auth';
import { TraceContext } from '../middleware/trace.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
      traceId?: string;
      traceContext?: TraceContext;
    }
  }
}
