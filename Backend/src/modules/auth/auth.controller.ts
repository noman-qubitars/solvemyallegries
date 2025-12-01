import { Request, Response } from "express";
import { signin as signinService, requestPasswordReset, resendOtp as resendOtpService, verifyOtp as verifyOtpService, resetPassword as resetPasswordService } from "./auth.service";
import { signinSchema, forgotPasswordSchema, verifyOtpSchema, resetPasswordSchema } from "./auth.schemas";
import { validate } from "../../lib/validation/validateRequest";

const determineStatus = (message: string) => {
  if (message.includes("required") || message.includes("must be") || message.includes("Invalid OTP") || message.includes("password is wrong") || message.includes("email is wrong") || message.includes("credentials are wrong") || message.includes("email address is wrong")) {
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

export const signin = [
  validate(signinSchema),
  async (req: Request, res: Response) => {
  try {
    const result = await signinService(req.body);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
  }
];

export const forgotPassword = [
  validate(forgotPasswordSchema),
  async (req: Request, res: Response) => {
  try {
    const result = await requestPasswordReset(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
  }
];

export const verifyOtp = [
  validate(verifyOtpSchema),
  async (req: Request, res: Response) => {
  try {
      const code = req.body.code || req.body.otp;
      const result = await verifyOtpService(req.body.email, code);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error);
    }
  }
];

export const resetPassword = [
  validate(resetPasswordSchema),
  async (req: Request, res: Response) => {
    try {
      const result = await resetPasswordService({
        email: req.body.email,
        password: req.body.password
      });
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
  }
];

export const resendOtp = [
  validate(forgotPasswordSchema),
  async (req: Request, res: Response) => {
  try {
      const result = await resendOtpService(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
  }
];

