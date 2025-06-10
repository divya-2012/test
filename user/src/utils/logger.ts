import pino from 'pino';
import config from '../config';

const transport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: !config.isProduction,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  },
});

const logger = pino(
  {
    level: config.logging.level,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
  },
  transport
);

export default logger;
