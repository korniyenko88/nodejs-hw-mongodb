import { Schema, model } from 'mongoose';
import { emailRegExp } from '../../constants/users.js';

import { hendelSaveError, setUpdateSettings } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.post('save', hendelSaveError);
userSchema.pre('findeOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', hendelSaveError);

const userCollection = model('user', userSchema);
export default userCollection;
