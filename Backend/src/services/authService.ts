import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { User } from "../models/User";
import { OtpToken } from "../models/OtpToken";
import { sendOtpEmail } from "./mailService";

const SALT_ROUNDS = 10;
const OTP_LENGTH = 6;

const createToken = (userId: string) => {
  return jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: "1h" });
};

const generateOtpCode = () => {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};

const createOtpRecord = async (userId: string, code: string) => {
  const hashedCode = await bcrypt.hash(code, SALT_ROUNDS);
  const expiresAt = new Date(Date.now() + config.otpExpirationMinutes * 60 * 1000);
  return OtpToken.create({
    code: hashedCode,
    expiresAt,
    userId
  });
};

const getValidOtp = async (userId: string, code: string) => {
  const now = new Date();
  const record = await OtpToken.findOne({
    userId,
    used: false,
    expiresAt: { $gt: now }
  }).sort({ createdAt: -1 });
  if (!record) {
    throw new Error("Invalid or expired code");
  }
  const match = await bcrypt.compare(code, record.code);
  if (!match) {
    throw new Error("Invalid or expired code");
  }
  return record;
};

export const signup = async (payload: { email: string; password: string; name?: string }) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new Error("Account already exists");
  }
  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
  const user = await User.create({
    email: payload.email,
    password: hashedPassword,
    name: payload.name
  });
  return { token: createToken(user._id.toString()), userId: user._id.toString() };
};

export const signin = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValid = await bcrypt.compare(payload.password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  return { token: createToken(user._id.toString()), userId: user._id.toString() };
};

export const requestPasswordReset = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Account not found");
  }
  const otp = generateOtpCode();
  await createOtpRecord(user._id.toString(), otp);
  await sendOtpEmail(user.email, otp);
  return { message: "Code sent" };
};

export const verifyOtp = async (email: string, code: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Account not found");
  }
  await getValidOtp(user._id.toString(), code);
  return { message: "Code valid" };
};

export const resetPassword = async (payload: { email: string; code: string; password: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new Error("Account not found");
  }
  const record = await getValidOtp(user._id.toString(), payload.code);
  await OtpToken.updateOne({ _id: record._id }, { used: true });
  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
  await User.updateOne({ _id: user._id }, { password: hashedPassword });
  return { message: "Password updated" };
};

