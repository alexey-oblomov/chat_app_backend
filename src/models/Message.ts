import mongoose, { Schema, Document } from 'mongoose';
import { IDialog } from './Dialog';

export interface IMessage extends Document {
  text: { type: string; require: boolean };
  dialog: { type: IDialog | string; ref: string; require: true };
  unread: { type: boolean; default: boolean };
}

const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', require: true },
    unread: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;
