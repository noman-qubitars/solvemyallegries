import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "users" }
);

export const User = mongoose.model<IUser>("User", UserSchema);

