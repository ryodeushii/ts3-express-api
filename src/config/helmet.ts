import helmet from 'helmet';
import { Application } from 'express';

export const ConfigureHelmet = (app: Application) => {
  app.use(helmet());
};
