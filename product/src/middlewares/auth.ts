import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UnauthorizedError, ForbiddenError } from '../utils/HttpError';
import { asyncHandler } from '../utils/asyncHandler';

// Add user to request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No authentication token provided');
  }

  // Extract and verify token
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.auth.jwtSecret) as {
      id: number;
      email: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired token');
  }
});

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError('User not authenticated');
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      throw new ForbiddenError(`User role ${req.user.role} is not authorized to access this resource`);
    }

    next();
  };
};
