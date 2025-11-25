import { Router } from "express";
import { createCheckout, verifyPayment } from "../controllers/subscriptionController";

const router = Router();

router.post("/create-checkout", createCheckout);
router.post("/verify-payment", verifyPayment);

export { router as subscriptionRouter };

