import { Schema } from 'mongoose';
import {
  OptionalString,
  RequiredBoolean,
  RequiredString,
} from '../SchemaTypes';

export const UserSchema = new Schema(
  {
    email: RequiredString,
    password: RequiredString,
    isDeleted: { ...RequiredBoolean, default: false },
    resetPasswordToken: OptionalString,
  },
  { timestamps: true },
);
