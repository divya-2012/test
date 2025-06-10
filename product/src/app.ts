import express, { Express } from 'express';
import { setupSecurity } from './middlewares/security';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import logger from './utils/logger';

export const createApp = async (): Promise<Express> => {
  const app = express();

  // Apply security middlewares (helmet, cors, rate limiting, etc)
  setupSecurity(app);

  // Request parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use(requestLogger);

  // Apply routes
  app.use(routes);

  return app;
};
