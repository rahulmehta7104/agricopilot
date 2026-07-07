import dotenv from 'dotenv';
// Explicitly load environment variables before importing app
dotenv.config();

import app from './app';
import prisma from './lib/prisma';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Verify database connection on startup
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL via Prisma');

    app.listen(PORT, () => {
      console.log(`🚀 AgriCopilot Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`🌍 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdowns (Docker / PM2 compatibility)
process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server and database connections.');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server and database connections.');
  await prisma.$disconnect();
  process.exit(0);
});
