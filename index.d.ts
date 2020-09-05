import { IUser } from './src/models/User';

declare global {
  interface User {
    _id: any;
  }
}
