import { Application, NextFunction, Request } from 'express';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

const corsConfig: CorsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: [
    'X-Response-Time',
    'etag',
    'x-powered-by',
    'cache-control',
    'Date',
    'Cookie',
    'x-access-token',
    'Content-Type',
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Accept',
    'Set-Cookie',
    'Connection',
    '*',
  ],
  exposedHeaders: [
    'X-Response-Time',
    'etag',
    'x-powered-by',
    'cache-control',
    'Date',
    'Cookie',
    'x-access-token',
    'Content-Type',
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Accept',
    'Set-Cookie',
    'Connection',
    '*',
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'INDEX', 'OPTIONS'],
  credentials: true,
  maxAge: 3600,
};
const delegate: CorsOptionsDelegate =
  (req: Request, callback: (err: Error | null, options?: CorsOptions) => void) => {
    const origin = req.header('Origin');
    callback(null, {
      ...corsConfig,
      origin,
    });
  };

export const ConfigureCORS = (app: Application) => {
  app.use(cors(delegate));
};
