import { Request, Response } from "express";
import { createCheckoutSession } from "../services/checkoutService";
import { handleCheckoutSuccess } from "../services/subscriptionWebhookService";
import { Subscription } from "../models/Subscription";

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, phone } = req.body;

    if (!email || !firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: "You already subscription get"
      });
    }

    const frontendUrl = process.env.FRONTEND_URL || req.headers.origin || "http://localhost:3000";
    const successUrl = `${frontendUrl}/webinar/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${frontendUrl}/webinar/subscription?canceled=true`;

    const result = await createCheckoutSession(
      { email, firstName, lastName, phone },
      successUrl,
      cancelUrl
    );

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create checkout session"
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required"
      });
    }

    const result = await handleCheckoutSuccess(sessionId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Payment verification failed"
    });
  }
};

