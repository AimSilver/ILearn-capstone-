import { Schema, model } from "mongoose";

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  address: string;
  isAdmin: boolean;
  isBlocked: boolean;
  role: string;
  subscriptions: string[];
}

export const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, required: true },
    subscriptions: { type: [String], required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const UserModel = model<User>("user", UserSchema);
