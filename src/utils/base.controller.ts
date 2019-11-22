import { Request, Response, Router, NextFunction } from 'express';
import { getRepository, BaseEntity, getManager, EntityManager, createQueryBuilder, Repository } from 'typeorm';

export class BaseController<T> implements IController {
  repo: Repository<T>;

  constructor(private e: new () => T) {
    this.repo = getRepository(e.name);
  }

  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = createQueryBuilder(this.e);

      for (const i in req.query) {
        const arg = req.query[i];
        switch (typeof (req.query[i])) {
          case 'object': {
            query.andWhere(`"${this.e.name}"."${i}" in ('${arg.join("','")}')`);
            break;
          }
          default: {
            query.andWhere(`"${this.e.name}"."${i}" = :i`, { i: arg });
            break;
          }
        }
      }
      const result = await query.getMany();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const r = this.repo.findOne(req.params.id);

      res.status(200).json(r);
    } catch (e) {
      next(e);
    }
  }

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const r = await this.repo.delete(req.params.id);
      res.status(200).json(r);
    } catch (e) {
      next(e);
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const r = await await this.repo.save(req.body);

      res.status(200).json(r);
    } catch (e) {
      next(e);
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { createdAt, updatedAt, id, ...data } = req.body;
      await this.repo.update(req.params.id, data);

      const r = await this.repo.findOne(req.params.id);

      res.status(200).json(r);
    } catch (e) {
      next(e);
    }
  }
}

export declare interface IController {
  create(req: Request, res: Response, next: NextFunction): void;
  deleteById(req: Request, res: Response, next: NextFunction): void;
  findById(req: Request, res: Response, next: NextFunction): void;
  find(req: Request, res: Response, next: NextFunction): void;
  update(req: Request, res: Response, next: NextFunction): void;
}
