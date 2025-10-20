import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { IUserFields } from '../types';

export interface IUserMethods {
  checkPassword: (value: string) => Promise<boolean>;
  generateToken(): void;
}

type IUserModel = Model<IUserFields, {}, IUserMethods>;

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema<IUserFields, IUserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
  googleId: String,
  token: String,
});

userSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(this.password, password);
};

userSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret: Partial<IUserFields>) => {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model('user', userSchema);
