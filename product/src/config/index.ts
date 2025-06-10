import dotenv from 'dotenv';
import path from 'path';

// Load .env file into process.env
dotenv.config();

const { NODE_ENV, PORT, API_PREFIX, CORS_ORIGINS, JWT_SECRET, JWT_EXPIRES_IN, LOG_LEVEL, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } = process.env;

interface Config {
  env: string;
  isProduction: boolean;
  isTest: boolean;
  server: {
    port: number;
    apiPrefix: string;
  };
  cors: {
    origins: string[];
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
  logging: {
    level: string;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const config: Config = {
  env: NODE_ENV || 'development',
  isProduction: NODE_ENV === 'production',
  isTest: NODE_ENV === 'test',
  server: {
    port: PORT ? parseInt(PORT, 10) : 3000,
    apiPrefix: API_PREFIX || '/api/v1',
  },
  cors: {
    origins: CORS_ORIGINS ? CORS_ORIGINS.split(',') : ['http://localhost:3000'],
  },
  auth: {
    jwtSecret: JWT_SECRET || 'your-secret-key-here',
    jwtExpiresIn: JWT_EXPIRES_IN || '1d',
  },
  logging: {
    level: LOG_LEVEL || 'info',
  },
  rateLimit: {
    windowMs: RATE_LIMIT_WINDOW_MS ? parseInt(RATE_LIMIT_WINDOW_MS, 10) : 15 * 60 * 1000, // 15 minutes
    max: RATE_LIMIT_MAX ? parseInt(RATE_LIMIT_MAX, 10) : 100, // limit each IP to 100 requests per windowMs
  },
};

export default config;
