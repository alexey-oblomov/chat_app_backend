import express from 'express';
import socket from 'socket.io';

import { MessageModel } from '../models';
import { IMessage } from '../models/Message';

class MessageController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index(req: express.Request, res: express.Response) {
    const dialogId: any = req.query.dialog;

    MessageModel.find({ dialog: dialogId })
      .populate(['dialog'])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            message: 'Messages not found',
          });
        }
        return res.json(messages);
      });
  }

  create(req: express.Request, res: express.Response) {
    const userId = '5f52100d59c67b4f6c9c8d13';
    const postData = {
      text: req.body.text,
      user: userId,
      dialog: req.body.dialog_id,
    };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj: IMessage) => res.json(obj))
      .catch((reason: any) => {
        res.json(reason);
      });
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    MessageModel.findOneAndRemove({ _id: id })
      .then((message) => {
        if (message) {
          res.json({ message: `Message deleted` });
        }
      })
      .catch(() => {
        res.json({ message: `Message not found` });
      });
  }
}

export default MessageController;
