import express from 'express';
import { UserModel } from '../models';

export default (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
  UserModel.findOneAndUpdate(
    { _id: '5f52100d59c67b4f6c9c8d13' },
    { last_seen: new Date() },
    { new: true },
    () => {}
  );
  next();
};
