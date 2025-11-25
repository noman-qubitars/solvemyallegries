import { Router } from "express";
import { adminSignin, adminForgotPassword, adminVerifyOtp, adminResetPassword, adminResendOtp } from "../controllers/adminAuthController";

const router = Router();

router.post("/signin", adminSignin);
router.post("/forgot-password", adminForgotPassword);
router.post("/resend-otp", adminResendOtp);
router.post("/otp", adminVerifyOtp);
router.post("/reset-password", adminResetPassword);

export { router as adminAuthRouter };

