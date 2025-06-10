import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { asyncHandler } from '../utils/asyncHandler';

export const checkHealth = asyncHandler(async (req: Request, res: Response) => {
  // Check database connectivity
  await prisma.$queryRaw`SELECT 1`;

  // Return health status
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
    },
  });
});
