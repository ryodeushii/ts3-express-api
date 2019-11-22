import { Application } from 'express';
import responseTime from 'response-time';

export const ConfigureRT = (app: Application) => {
  app.use(responseTime());
};
