import { IUser } from './src/models/User';

interface Request {
  property: string;
}

declare module 'express' {
  // declare module "express-serve-static-core"
  export interface Request {
    user: string;
  }
}
