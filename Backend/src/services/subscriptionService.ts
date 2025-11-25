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

export interface SubscriptionData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

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

export const processSubscription = async (data: SubscriptionData) => {
  const { email, firstName, lastName, phone, cardNumber, expiryDate, cvc } = data;

  const [month, year] = expiryDate.split("/");
  if (!month || !year) {
    throw new Error("Invalid expiry date format. Use MM/YY");
  }
  
  const expYear = parseInt(`20${year}`);
  const expMonth = parseInt(month);

  if (isNaN(expYear) || isNaN(expMonth) || expMonth < 1 || expMonth > 12) {
    throw new Error("Invalid expiry date");
  }

  const cardNumberClean = cardNumber.replace(/\s/g, "");
  
  if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
    throw new Error("Invalid card number length");
  }

  let customer;
  try {
    customer = await stripe.customers.create({
      email,
      name: `${firstName} ${lastName}`,
      phone
    });
  } catch (error: any) {
    const errorMessage = error?.message || "Failed to create Stripe customer";
    throw new Error(errorMessage);
  }

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      customer: customer.id,
      payment_method_data: {
        type: "card",
        card: {
          number: cardNumberClean,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc
        }
      },
      confirm: true,
      description: `One-time payment for ${firstName} ${lastName}`
    });
  } catch (error: any) {
    const errorMessage = error?.message || error?.raw?.message || "Payment processing failed";
    throw new Error(errorMessage);
  }

  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment was not successful");
  }

  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    existingUser.password = hashedPassword;
    await existingUser.save();
  } else {
    await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    });
  }

  const paymentMethodId = paymentIntent.payment_method;
  if (typeof paymentMethodId === 'string') {
    try {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id
      });
    } catch (error) {
      console.error("Failed to attach payment method to customer:", error);
    }
  }

  const subscription = await Subscription.create({
    email,
    firstName,
    lastName,
    phone,
    cardNumber: `****${cardNumberClean.slice(-4)}`,
    expiryDate,
    cvc: "***",
    stripePaymentIntentId: paymentIntent.id,
    stripeCustomerId: customer.id,
    password: hashedPassword,
    isActive: true
  });

  await sendSubscriptionEmail(email, firstName, lastName, password);

  return {
    success: true,
    subscriptionId: subscription._id,
    message: "Subscription successful"
  };
};

