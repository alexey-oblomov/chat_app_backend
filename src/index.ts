import mongoose from 'mongoose';
import express from 'express';
import socket from 'socket.io';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { UserController, DialogController, MessageController } from './controllers';
import { updateLastSeen, checkAuth } from './middlewares';
import { loginValidation } from './utils/Validations';

dotenv.config();

const app = express();
const http = createServer(app);
const io = socket(http);

app.use(cors());

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

app.get('/user/me', User.getMe);
app.get('/user/:id', User.index);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);
app.post('/user/login', loginValidation, User.login);

app.get('/dialogs', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.delete);

app.get('/messages', Messages.index);
app.post('/messages', Messages.create);
app.delete('/messages/:id', Messages.delete);

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.emit('test command', 'TEST COMMAND');

  socket.on('chat message', function (msg) {
    console.log('message ', msg);
  });
});

http.listen(process.env.PORT, function () {
  console.log(`Запустились:${process.env.PORT}`);
});
