import { Request, Response } from "express";
import { signup as signupService, signin as signinService, requestPasswordReset, verifyOtp as verifyOtpService, resetPassword as resetPasswordService } from "../services/authService";

const determineStatus = (message: string) => {
  if (message === "Account already exists" || message === "Invalid credentials" || message === "Invalid or expired code") {
    return 400;
  }
  if (message === "Account not found") {
    return 404;
  }
  return 422;
};

const handleError = (res: Response, error: unknown) => {
  const message = error instanceof Error ? error.message : "Unexpected error";
  res.status(determineStatus(message)).json({ error: message });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const result = await signinService(req.body);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const result = await requestPasswordReset(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const result = await verifyOtpService(req.body.email, req.body.code);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const body = { email: req.body.email, code: req.body.code, password: req.body.password };
    const result = await resetPasswordService(body);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

