import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    cardNumber: { type: String, default: "****" },
    expiryDate: { type: String, default: "" },
    cvc: { type: String, default: "***" },
    stripePaymentIntentId: { type: String },
    stripeCustomerId: { type: String },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "subscriptions" }
);

export const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

