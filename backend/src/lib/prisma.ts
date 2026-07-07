import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Ensure the singleton pattern is applied
export const prisma =
  global.prisma ||
  new PrismaClient({
    // Log queries and warnings in development, only errors in production
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

// In development, attach the Prisma instance to the global object
// so it survives hot-reloads (nodemon/ts-node) without exhausting connection limits.
// In production, `global` is not mutated, and a single instance is maintained naturally.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
