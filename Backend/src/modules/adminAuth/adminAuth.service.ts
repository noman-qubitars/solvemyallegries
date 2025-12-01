import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { Admin } from "../../models/Admin";
import { OtpToken } from "../../models/OtpToken";
import { sendOtpEmail } from "../../services/mailService";

const SALT_ROUNDS = 10;
const OTP_LENGTH = 4;
const ADMIN_EMAIL = "nomanshabbir10@gmail.com";

const createToken = (adminId: string) => {
  return jwt.sign({ sub: adminId, role: "admin" }, config.jwtSecret, { expiresIn: "1h" })
};

const generateOtpCode = () => {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};

const createOtpRecord = async (adminId: string, code: string) => {
  const hashedCode = await bcrypt.hash(code, SALT_ROUNDS);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  return OtpToken.create({
    code: hashedCode,
    expiresAt,
    userId: adminId
  });
};

const getValidOtp = async (adminId: string, code: string) => {
  const now = new Date();
  const record = await OtpToken.findOne({
    userId: adminId,
    used: false,
    expiresAt: { $gt: now }
  }).sort({ createdAt: -1 });
  if (!record) {
    const expiredRecord = await OtpToken.findOne({
      userId: adminId,
      used: false
    }).sort({ createdAt: -1 });
    if (expiredRecord) {
      throw new Error("OTP code has expired. Please request a new code");
    }
    throw new Error("Invalid OTP code. Please check and try again");
  }
  const match = await bcrypt.compare(code, record.code);
  if (!match) {
    throw new Error("Invalid OTP code. Please check and try again");
  }
  return record;
};

const getLatestUnusedOtp = async (adminId: string) => {
  const now = new Date();
  const verifiedRecord = await OtpToken.findOne({
    userId: adminId,
    used: false,
    verified: true
  }).sort({ verifiedAt: -1 });
  
  if (verifiedRecord) {
    const verifiedTime = verifiedRecord.verifiedAt ? new Date(verifiedRecord.verifiedAt).getTime() : 0;
    const timeSinceVerification = now.getTime() - verifiedTime;
    const fiveMinutes = 5 * 60 * 1000;
    
    if (timeSinceVerification <= fiveMinutes) {
      return verifiedRecord;
    } else {
      throw new Error("OTP verification has expired. Please verify OTP again");
    }
  }
  
  const unexpiredRecord = await OtpToken.findOne({
    userId: adminId,
    used: false,
    expiresAt: { $gt: now }
  }).sort({ createdAt: -1 });
  
  if (unexpiredRecord) {
    throw new Error("Please verify OTP first");
  }
  
  throw new Error("No verified OTP found. Please verify OTP first");
};

export const adminSignin = async (payload: { email: string; password: string }) => {
  if (payload.email !== ADMIN_EMAIL) {
    throw new Error("Your email is incorrect");
  }
  
  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    throw new Error("Your email is incorrect");
  }
  
  const isValid = await bcrypt.compare(payload.password, admin.password);
  if (!isValid) {
    throw new Error("Your password is incorrect");
  }
  
  const adminId = admin._id.toString();
  return { 
    success: true,
    token: createToken(adminId), 
    adminId: adminId,
    email: payload.email
  };
};

export const adminRequestPasswordReset = async (email: string) => {
  if (email !== ADMIN_EMAIL) {
    throw new Error("Only admin email is allowed");
  }
  
  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const adminId = admin._id.toString();
  const otp = generateOtpCode();
  await createOtpRecord(adminId, otp);
  await sendOtpEmail(email, otp);
  return { 
    success: true,
    message: "OTP sent to your email" 
  };
};

export const adminResendOtp = async (email: string) => {
  if (email !== ADMIN_EMAIL) {
    throw new Error("Only admin email is allowed");
  }
  
  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const adminId = admin._id.toString();
  const otp = generateOtpCode();
  await createOtpRecord(adminId, otp);
  await sendOtpEmail(email, otp);
  return { 
    success: true,
    message: "OTP resent to your email" 
  };
};

export const adminVerifyOtp = async (email: string, code: string) => {
  if (email !== ADMIN_EMAIL) {
    throw new Error("Only admin email is allowed");
  }
  
  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const adminId = admin._id.toString();
  const record = await getValidOtp(adminId, code);
  await OtpToken.updateOne({ _id: record._id }, { verified: true, verifiedAt: new Date() });
  return { 
    success: true,
    message: "OTP verified successfully" 
  };
};

export const adminResetPassword = async (payload: { email: string; password: string }) => {
  if (payload.email !== ADMIN_EMAIL) {
    throw new Error("Only admin email is allowed");
  }
  
  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const adminId = admin._id.toString();
  const record = await getLatestUnusedOtp(adminId);
  await OtpToken.updateOne({ _id: record._id }, { used: true });
  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
  await Admin.updateOne({ _id: admin._id }, { password: hashedPassword });
  
  return { 
    success: true,
    message: "Password reset successfully" 
  };
};

