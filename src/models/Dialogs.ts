import mongoose, { Schema, Document } from 'mongoose';

export interface IDialog extends Document {
  partner: { type: Schema.Types.ObjectId; ref: string };
  author: { type: Schema.Types.ObjectId; ref: string };
  lastMessage: { type: Schema.Types.ObjectId; ref: string };
}

const DialogsSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IDialog>('User', DialogsSchema);

export default UserModel;
