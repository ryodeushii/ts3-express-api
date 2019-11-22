import express, { Application, Response, NextFunction } from 'express';
import { ConfigureCORS } from './cors';
import { ConfigureParsers } from './parsers';
import { ConfigureRT } from './responseTime';
import { ConfigureHelmet } from './helmet';
import { ConfigureCompression } from './compression';
import { ConfigureLogger } from './logger';
import {
  NotFoundError,
  InternalError,
  ValidationError,
  ForbiddenError,
  TeapotError,
  UnauthorizedError,
  UnknownError,
} from '../errors';
import { BaseController } from '../utils';
import { User } from '../entities';
import { ConfigureRoutes } from './routes';

export const ConfigServer = (app: Application) => {

  ConfigureCORS(app);
  ConfigureParsers(app);
  ConfigureRT(app);
  ConfigureHelmet(app);
  ConfigureCompression(app);
  ConfigureLogger(app);

  const router = express.Router();
  router.get('/', (_, res: Response) => {
    res.status(200).json({ date: new Date() });
  });

  // BEGIN ROUTES CONFIG

  ConfigureRoutes(router);
  // END ROUTES CONFIG

  // 404: Not found
  app.use((_, res: Response, next: NextFunction) => {
    next(new NotFoundError());
  });

  // 500: Error rep  oring
  app.use((err: Error, _, res: Response, __) => {
    console.error(err.stack);
    if (
      err instanceof NotFoundError ||
      err instanceof InternalError ||
      err instanceof ValidationError ||
      err instanceof ForbiddenError ||
      err instanceof TeapotError ||
      err instanceof UnauthorizedError ||
      err instanceof UnknownError
    ) {
      res.status(err.status).json({ ERROR: err.message, name: err.name, stack: err.stack });
    } else {
      res.status(500).json({ ERROR: err.message, name: "Internal server error", stack: err.stack });
    }

  });
  app.use("", router);

};
