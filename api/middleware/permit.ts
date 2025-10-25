import { NextFunction, Request, Response } from 'express';
import { IReqWithUser } from './auth';

export const permit = (...roles: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as IReqWithUser;

    if (!req.user) {
      return res.status(401).send({ message: 'Unauthenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  };
};
export default permit;
