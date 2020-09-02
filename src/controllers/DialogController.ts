import express from 'express';
import { DialogModel } from '../models';

class DialogController {
  index(req: express.Request, res: express.Response) {
    const authorId: string = req.params.id;
    DialogModel.find({ authorId: authorId }, (err: any, dialogs: any) => {
      if (err) {
        return res.status(404).json({
          message: 'Dialogs not found',
        });
      }

      res.json(dialogs);
    });
  }
}
// getMe() {
//   // TODO
// }

// create(req: express.Request, res: express.Response) {
//   const postData = {
//     email: req.body.email,
//     fullname: req.body.fullname,
//     password: req.body.fullname,
//   };
//   const user = new DialogModel(postData);
//   user
//     .save()
//     .then((obj: any) => res.json(obj))
//     .catch((reason: any) => {
//       res.json(reason);
//     });
// }

// delete(req: express.Request, res: express.Response) {
//   const id: string = req.params.id;
//   DialogModel.findByIdAndRemove({ _id: id })
//     .then((user) => {
//       if (user) {
//         res.json({
//           message: `User ${user.fullname} deleted`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.json({ message: 'User not found' });
//     });
// }

export default DialogController;
