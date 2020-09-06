declare namespace Express {
  import { IUser } from './models/User';

  export interface Request {
    // user?: IUser;
  }
}

export interface IExpress extends express.Request {
  user?: any;
  body?: any;
  params?: any;
}
