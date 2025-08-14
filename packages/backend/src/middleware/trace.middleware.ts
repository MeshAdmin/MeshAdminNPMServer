import { Request, Response, NextFunction } from 'express';
import { createNamespace, getNamespace } from 'cls-hooked';
import { v4 as uuidv4 } from 'uuid';

// Create namespace for request context
const namespace = createNamespace('request-context');

export interface TraceContext {
  traceId: string;
  userId?: string;
  sessionId?: string;
  userAgent?: string;
  ip?: string;
}

export const traceMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  namespace.run(() => {
    // Generate or extract trace ID
    const traceId =
      req.get('X-Trace-ID') || req.get('X-Request-ID') || req.get('X-Correlation-ID') || uuidv4();

    // Set trace ID in response header for client correlation
    res.set('X-Trace-ID', traceId);

    // Store context in namespace
    const user = req.user as import('../types/auth').UserPayload;
    const context: TraceContext = {
      traceId,
      userId: user?.id,
      sessionId: (req as any).sessionID,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
    };

    namespace.set('traceId', traceId);
    namespace.set('context', context);

    // Add trace info to request object for convenience
    req.traceId = traceId;
    req.traceContext = context;

    next();
  });
};

export const getTraceContext = (): TraceContext | undefined => {
  const namespace = getNamespace('request-context');
  return namespace?.get('context');
};

export const getTraceId = (): string | undefined => {
  const namespace = getNamespace('request-context');
  return namespace?.get('traceId');
};

export { namespace };
