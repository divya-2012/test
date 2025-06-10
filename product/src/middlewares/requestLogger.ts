import { Request, Response, NextFunction } from 'express';
import pinoHttp from 'pino-http';
import logger from '../utils/logger';
import config from '../config';

export const requestLogger = pinoHttp({
  logger,
  customProps: () => ({ environment: config.env }),
  autoLogging: {
    ignore: (req) => req.url === '/health' || req.url === '/favicon.ico',
  },
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      headers: {
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
        'content-length': req.headers['content-length'],
      },
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
