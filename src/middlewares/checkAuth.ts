import { verifyJWTToken } from '../utils';

export default (req: any, res: any, next: any): void => {
  if (req.path === '/user/login' || req.path === '/user/signup' || req.path === '/user/verify') {
    return next();
  }

  const token: string | null = 'token' in req.headers ? (req.headers.token as string) : null;

  if (token) {
    verifyJWTToken(token)
      .then((user: any) => {
        if (user) {
          req.user = user.data._doc;
        }
        next();
      })
      .catch(() => {
        res.status(403).json({ message: 'Invalid auth token provided.' });
      });
  } else {
    res.status(403).json({ message: 'Вы не авторизованы' });
  }
};
