import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { UserController, DialogController, MessageController } from './controllers';
import { updateLastSeen, checkAuth } from './middlewares';

const app = express();
dotenv.config();
// const port = 3000;

app.use(bodyParser.json());
app.use(checkAuth);
app.use(updateLastSeen);

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get('/user/:id', User.index);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);
app.post('/user/login', User.login);

app.get('/dialogs', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.delete);

app.get('/messages', Messages.index);
app.post('/messages', Messages.create);
app.delete('/messages/:id', Messages.delete);

app.listen(process.env.PORT, function () {
  console.log(`Запустились:${process.env.PORT}`);
});
