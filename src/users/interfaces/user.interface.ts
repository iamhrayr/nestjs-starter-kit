import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  roles: string[];
  password: string;
}
