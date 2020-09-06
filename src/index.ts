import express from 'express';
import socket from 'socket.io';
import dotenv from 'dotenv';
import { createServer } from 'http';

import './core/db';
import ceateRoutes from './core/routes';

dotenv.config();

const app = express();
const http = createServer(app);
const io = socket(http);

ceateRoutes(app, io);

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
