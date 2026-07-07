import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  
  // Log detailed error traces in development or for critical 500 crashes
  if (process.env.NODE_ENV === 'development' || statusCode === 500) {
    console.error(`[Error] ${req.method} ${req.path}`);
    console.error(err.stack || err.message);
  }

  // Handle Prisma Unique Constraint Errors gracefully (Code P2002)
  if (err.message.includes('Unique constraint failed')) {
    res.status(409).json({
      status: 'error',
      message: 'A record with this unique information already exists (e.g. Email or Phone).',
    });
    return;
  }

  // Return standardized JSON format for all unhandled errors
  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 && process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' // Hide sensitive DB/Stack traces in production
      : err.message,
  });
};
