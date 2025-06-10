import { createApp } from './app';
import config from './config';
import logger from './utils/logger';
import prisma from './utils/prisma';

let server: any;

const startServer = async () => {
  const app = await createApp();

  server = app.listen(config.server.port, () => {
    logger.info(`Server running in ${config.env} mode on port ${config.server.port}`);
    logger.info(`API available at http://localhost:${config.server.port}${config.server.apiPrefix}`);
  });

  // Handle graceful shutdown
  setupGracefulShutdown();
};

const setupGracefulShutdown = () => {
  // Handle process termination
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received, shutting down gracefully`);
    
    // Close server first to stop accepting new connections
    if (server) {
      server.close(() => {
        logger.info('HTTP server closed');
      });
    }

    // Close database connection
    await prisma.$disconnect();
    logger.info('Database connection closed');
    
    // Exit with success code
    process.exit(0);
  };

  // Listen for termination signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Handle uncaught exceptions and rejections
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    shutdown('Uncaught Exception');
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise Rejection:', reason);
    shutdown('Unhandled Promise Rejection');
  });
};

// Start the server
startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
