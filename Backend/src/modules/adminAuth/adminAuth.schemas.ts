import { z } from "zod";

export const adminSigninSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required")
});

export const adminForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required")
});

export const adminVerifyOtpSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  code: z.string().regex(/^\d{4}$/, "OTP code must be exactly 4 digits").optional(),
  otp: z.string().regex(/^\d{4}$/, "OTP code must be exactly 4 digits").optional()
}).refine((data) => data.code || data.otp, {
  message: "OTP code is required",
  path: ["code"]
});

export const adminResetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

