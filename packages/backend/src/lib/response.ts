import { Response } from 'express';
import { getTraceId } from '../middleware/trace.middleware';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
  traceId?: string;
  timestamp?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  traceId?: string;
  timestamp: string;
  details?: any;
}

export class ResponseHelper {
  static success<T>(res: Response, data: T, message?: string, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      statusCode,
      traceId: getTraceId(),
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, error: string, statusCode: number = 500, details?: any): Response {
    const response: ErrorResponse = {
      success: false,
      error,
      statusCode,
      traceId: getTraceId(),
      timestamp: new Date().toISOString(),
      ...(details && { details }),
    };
    return res.status(statusCode).json(response);
  }

  static badRequest(res: Response, error: string = 'Bad Request', details?: any): Response {
    return this.error(res, error, 400, details);
  }

  static unauthorized(res: Response, error: string = 'Unauthorized', details?: any): Response {
    return this.error(res, error, 401, details);
  }

  static forbidden(res: Response, error: string = 'Forbidden', details?: any): Response {
    return this.error(res, error, 403, details);
  }

  static notFound(res: Response, error: string = 'Resource not found', details?: any): Response {
    return this.error(res, error, 404, details);
  }

  static conflict(res: Response, error: string = 'Conflict', details?: any): Response {
    return this.error(res, error, 409, details);
  }

  static unprocessableEntity(
    res: Response,
    error: string = 'Unprocessable Entity',
    details?: any
  ): Response {
    return this.error(res, error, 422, details);
  }

  static tooManyRequests(
    res: Response,
    error: string = 'Too Many Requests',
    details?: any
  ): Response {
    return this.error(res, error, 429, details);
  }

  static created<T>(res: Response, data: T, message?: string): Response {
    return this.success(res, data, message, 201);
  }

  static internalError(
    res: Response,
    error: string = 'Internal server error',
    traceId?: string
  ): Response {
    return this.error(res, error, 500, { traceId });
  }

  static serviceUnavailable(
    res: Response,
    error: string = 'Service Unavailable',
    details?: any
  ): Response {
    return this.error(res, error, 503, details);
  }

  static gatewayTimeout(res: Response, error: string = 'Gateway Timeout', details?: any): Response {
    return this.error(res, error, 504, details);
  }
}

export default ResponseHelper;
