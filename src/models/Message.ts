import mongoose, { Schema, Document } from 'mongoose';
import { IDialog } from './Dialog';

export interface IMessage extends Document {
  text: string;
  dialog: IDialog | string;
  unread: boolean;
}

const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Dialog' },
    unread: Boolean,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>('Dialog', MessageSchema);

export default MessageModel;
