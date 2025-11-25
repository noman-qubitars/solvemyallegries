import { Router } from "express";
import { signup, signin, forgotPassword, verifyOtp, resetPassword } from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/otp", verifyOtp);
router.post("/reset-password", resetPassword);

export { router as authRouter };

