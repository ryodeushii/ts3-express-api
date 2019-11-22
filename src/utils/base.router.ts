import { IController } from './base.controller';
import express, { Router } from 'express';

export function BaseRouter(c: IController): Router {
  const router = express.Router();

  router.get('', c.find);
  router.get('/:id', c.findById);
  router.post('', c.create);
  router.patch('/:id', c.update);
  router.delete('/:id', c.deleteById);

  return router;
}
