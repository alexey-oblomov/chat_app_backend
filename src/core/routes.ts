import bodyParser from 'body-parser';
import _io from 'socket.io';
import { UserController, DialogController, MessageController } from '../controllers';
import { updateLastSeen, checkAuth } from '../middlewares';
import { loginValidation } from '../utils/Validations';

const createRoutes = (app: any, _io: any) => {
  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);

  app.get('/user/me', UserController.getMe);
  app.get('/user/:id', UserController.index);
  app.post('/user/registration', UserController.create);
  app.delete('/user/:id', UserController.delete);
  app.post('/user/login', loginValidation, UserController.login);

  app.get('/dialogs', DialogController.index);
  app.post('/dialogs', DialogController.create);
  app.delete('/dialogs/:id', DialogController.delete);

  app.get('/messages', MessageController.index);
  app.post('/messages', MessageController.create);
  app.delete('/messages/:id', MessageController.delete);
};

export default createRoutes;
