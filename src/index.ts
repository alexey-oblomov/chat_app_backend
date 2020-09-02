import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import { UserModel } from './models';
import { UserController } from './controllers';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const User = new UserController();

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get('/user/:id', User.index);
app.delete('/user/:id', User.delete);
app.post('/user/registration', User.create);

app.listen(port, function () {
  console.log(`Запустились:${port}`);
});
