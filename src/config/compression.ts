import { Application } from 'express';
import compression from 'compression';

export const ConfigureCompression = (app: Application) => {
  app.use(compression({ level: 9 }));
};
