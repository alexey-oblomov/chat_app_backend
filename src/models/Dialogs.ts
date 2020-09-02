import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  fullname: string;
  password: string;
  confirmed: boolean;
  avatar: string;
  confirm_hash: string;
  last_seen: Date;
}

const DialogsSchema = new Schema(
  {
    email: {
      type: String,
      require: 'Email address is required',
      unique: true,
    },
    fullname: { type: String, required: 'Fullname is required' },
    password: { type: String, required: 'Password is required' },
    confirmed: { type: Boolean, default: false },
    avatar: String,
    confirm_hash: String,
    last_seen: Date,
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', DialogsSchema);

export default UserModel;
