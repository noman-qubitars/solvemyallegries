import { Request, Response } from "express";
import { adminSignin as adminSigninService, adminRequestPasswordReset, adminResendOtp as adminResendOtpService, adminVerifyOtp as adminVerifyOtpService, adminResetPassword as adminResetPasswordService } from "./adminAuth.service";
import { adminSigninSchema, adminForgotPasswordSchema, adminVerifyOtpSchema, adminResetPasswordSchema } from "./adminAuth.schemas";
import { validate } from "../../lib/validation/validateRequest";

const determineStatus = (message: string) => {
  if (message.includes("required") || message.includes("must be") || message.includes("Invalid OTP") || message.includes("password is wrong") || message.includes("email is wrong") || message.includes("credentials are wrong") || message.includes("email address is wrong") || message.includes("Only admin email is allowed")) {
    return 400;
  }
  if (message.includes("not found") || message.includes("expired")) {
    return 400;
  }
  if (message === "Account already exists") {
    return 400;
  }
  return 422;
};

const handleError = (res: Response, error: unknown) => {
  const message = error instanceof Error ? error.message : "Unexpected error";
  res.status(determineStatus(message)).json({ 
    success: false,
    message: message 
  });
};

export const adminSignin = [
  validate(adminSigninSchema),
  async (req: Request, res: Response) => {
    try {
      const result = await adminSigninService(req.body);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  }
];

export const adminForgotPassword = [
  validate(adminForgotPasswordSchema),
  async (req: Request, res: Response) => {
    try {
      const result = await adminRequestPasswordReset(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  }
];

export const adminVerifyOtp = [
  validate(adminVerifyOtpSchema),
  async (req: Request, res: Response) => {
    try {
      const code = req.body.code || req.body.otp;
      const result = await adminVerifyOtpService(req.body.email, code);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  }
];

export const adminResetPassword = [
  validate(adminResetPasswordSchema),
  async (req: Request, res: Response) => {
    try {
      const result = await adminResetPasswordService({
        email: req.body.email,
        password: req.body.password
      });
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  }
];

export const adminResendOtp = [
  validate(adminForgotPasswordSchema),
  async (req: Request, res: Response) => {
    try {
      const result = await adminResendOtpService(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  }
];

