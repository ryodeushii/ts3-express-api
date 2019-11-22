import express from 'express';
import { BaseController, BaseRouter } from '../utils';
import { User } from '../entities';

export const ConfigureRoutes = (router: express.Router) => {
  const controller = new BaseController<User>(User);
  const userRouter = BaseRouter(controller);

  router.use('/user', userRouter);
};
