import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import config from '../config';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  // Handle custom HTTP errors
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: {
        status: err.statusCode,
        message: err.message,
        errors: err.errors,
      },
    });
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      error: {
        status: 400,
        message: 'Database operation failed',
      },
    });
  }

  // Handle all other errors
  const statusCode = 500;
  const message = config.isProduction
    ? 'Internal Server Error'
    : err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    error: {
      status: statusCode,
      message,
    },
  });
};
