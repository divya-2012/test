import { PrismaClient } from '@prisma/client';
// Create a singleton instance of the Prisma client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['error', 'warn'] 
    : ['error'],
});

export default prisma;
