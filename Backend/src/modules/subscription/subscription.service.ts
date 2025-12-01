import Stripe from "stripe";
import { config } from "../../config/env";
import { Subscription } from "../../models/Subscription";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { sendSubscriptionEmail } from "../../services/mailService";

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

export interface CheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const createCheckoutSession = async (data: CheckoutData, successUrl: string, cancelUrl: string) => {
  const { email, firstName, lastName, phone } = data;

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "SolveMyAllergies Subscription",
              description: `One-time payment for ${firstName} ${lastName}`,
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: "required",
      metadata: {
        email,
        firstName,
        lastName,
        phone,
      },
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
    };
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create checkout session");
  }
};

export const handleCheckoutSuccess = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    const { email, firstName, lastName, phone } = session.metadata || {};
    
    if (!email || !firstName || !lastName || !phone) {
      throw new Error("Missing customer information");
    }

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.password = hashedPassword;
      existingUser.name = `${firstName} ${lastName}`;
      await existingUser.save();
    } else {
      await User.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`
      });
    }

    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      existingSubscription.firstName = firstName;
      existingSubscription.lastName = lastName;
      existingSubscription.phone = phone;
      existingSubscription.password = hashedPassword;
      existingSubscription.stripePaymentIntentId = session.payment_intent as string;
      existingSubscription.stripeCustomerId = session.customer as string;
      existingSubscription.isActive = true;
      await existingSubscription.save();
    } else {
      await Subscription.create({
        email,
        firstName,
        lastName,
        phone,
        cardNumber: "****",
        expiryDate: "",
        cvc: "***",
        password: hashedPassword,
        stripePaymentIntentId: session.payment_intent as string,
        stripeCustomerId: session.customer as string,
        isActive: true
      });
    }

    await sendSubscriptionEmail(email, firstName, lastName, password);

    return {
      success: true,
      message: "Payment verified successfully"
    };
  } catch (error: any) {
    throw new Error(error?.message || "Failed to process subscription");
  }
};

