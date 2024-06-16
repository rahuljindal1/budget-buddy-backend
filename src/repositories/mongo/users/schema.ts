import { Schema } from 'mongoose';
import { RequiredString } from '../SchemaTypes';

export const UserSchema = new Schema({
  email: RequiredString,
});
