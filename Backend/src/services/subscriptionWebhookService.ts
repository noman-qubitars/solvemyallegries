import Stripe from "stripe";
import { config } from "../config/env";
import { Subscription } from "../models/Subscription";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { sendSubscriptionEmail } from "./mailService";

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: "2025-11-17.clover",
  typescript: true
});

const generatePassword = (): string => {
  const length = 8;
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*";
  const allChars = lowercase + uppercase + numbers + special;
  
  let password = "";
  
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += special.charAt(Math.floor(Math.random() * special.length));
  
  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

export const handleCheckoutSuccess = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    const { email } = session.metadata || {};
    
    if (!email) {
      throw new Error("Missing customer information");
    }

    const subscription = await Subscription.findOne({ email });
    if (subscription) {
      subscription.stripePaymentIntentId = session.payment_intent as string;
      subscription.stripeCustomerId = session.customer as string;
      subscription.isActive = true;
      await subscription.save();
    } else {
      throw new Error("Subscription not found");
    }

    return {
      success: true,
      message: "Payment verified successfully"
    };
  } catch (error: any) {
    throw new Error(error?.message || "Failed to process subscription");
  }
};

