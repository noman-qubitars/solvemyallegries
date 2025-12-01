import { Router } from "express";
import { createCheckout, verifyPayment } from "./subscription.controller";

const router = Router();

router.post("/create-checkout", createCheckout);
router.post("/verify-payment", verifyPayment);

export { router as subscriptionRouter };