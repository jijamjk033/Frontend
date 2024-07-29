import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  isUser: boolean;
  isAdmin: boolean;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  isUser: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default model<User>('User', userSchema);
