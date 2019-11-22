import { Application } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import { IS_PRODUCTION, SILENT } from '../constants';

export const ConfigureLogger = (app: Application) => {
  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.File({ filename: 'errors.log', dirname: 'logs' }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }));

  if (!SILENT && !IS_PRODUCTION) {
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.File({ dirname: 'logs', filename: 'requests.log' }),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      meta: true,
      msg: 'HTTP {{req.method}} {{req.url}}',
      expressFormat: true,
      colorize: true,
      level(_, res) {
        let level = '';
        if (res.statusCode >= 100) { level = 'info'; }
        if (res.statusCode >= 400) { level = 'warn'; }
        if (res.statusCode >= 500) { level = 'error'; }
        // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
        if (res.statusCode === 401 || res.statusCode === 403) { level = 'critical'; }
        // No one should be using the old path, so always warn for those
        return level;
      },
    }));
  }
};
