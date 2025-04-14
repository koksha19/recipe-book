import { NextFunction, Request, Response } from 'express';

export function catchError(fn) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((e: Error) => next(e));
  };
}
