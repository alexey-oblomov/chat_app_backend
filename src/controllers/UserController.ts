import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult, Result, ValidationError } from 'express-validator';

import { UserModel } from '../models';
import { IUser } from '../models/User';
import { createJWTToken } from '../utils';

class UserController {
  index(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'Not Found',
        });
      }
    }).then((user: any) => {
      res.json(user);
    });
  }

  getMe() {
    // TODO
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };
    const user = new UserModel(postData);
    user
      .save()
      .then((obj: any) => res.json(obj))
      .catch((reason: any) => {
        res.json(reason);
      });
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    UserModel.findByIdAndRemove({ _id: id })
      .then((user) => {
        if (user) {
          res.json({
            message: `User ${user.fullname} deleted`,
          });
        }
      })
      .catch((err) => {
        res.json({ message: 'User not found' });
      });
  }

  login = (req: express.Request, res: express.Response): void => {
    const postData: { email: string; password: string } = {
      email: req.body.email,
      password: req.body.password,
    };

    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      UserModel.findOne({ email: postData.email }, (err, user: IUser) => {
        if (err || !user) {
          return res.status(404).json({
            message: 'User not found',
          });
        }
        console.log('user', user.password);

        if (bcrypt.compareSync(postData.password, user.password)) {
          const token = createJWTToken(user);
          res.json({
            status: 'success',
            token,
          });
        } else {
          res.status(403).json({
            status: 'error',
            message: 'Incorrect password or email',
          });
        }
      });
    }
  };
}

export default UserController;
