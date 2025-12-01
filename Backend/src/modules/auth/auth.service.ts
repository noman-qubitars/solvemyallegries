import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { User } from "../../models/User";
import { Subscription } from "../../models/Subscription";
import { OtpToken } from "../../models/OtpToken";
import { sendOtpEmail } from "../../services/mailService";

const SALT_ROUNDS = 10;
const OTP_LENGTH = 4;

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
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
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
    const expiredRecord = await OtpToken.findOne({
      userId,
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

const getLatestUnusedOtp = async (userId: string) => {
  const now = new Date();
  const verifiedRecord = await OtpToken.findOne({
    userId,
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
    userId,
    used: false,
    expiresAt: { $gt: now }
  }).sort({ createdAt: -1 });
  
  if (unexpiredRecord) {
    throw new Error("Please verify OTP first");
  }
  
  throw new Error("No verified OTP found. Please verify OTP first");
};

export const signin = async (payload: { email: string; password: string }) => {
  // Always check User model first for status (User model is source of truth for account status)
  const user = await User.findOne({ email: payload.email });
  
  // Check if user is blocked BEFORE checking password or subscription
  if (user && user.status === "Blocked") {
    throw new Error("Your account has been blocked. Please contact support");
  }
  
  // Check Subscription model as well (user might exist in both)
  const subscription = await Subscription.findOne({ email: payload.email });
  
  if (!user && !subscription) {
    throw new Error("Your email is incorrect");
  }
  
  // Try to validate password against User model first, then Subscription
  let isValid = false;
  let account = null;
  let userId = null;
  
  if (user) {
    isValid = await bcrypt.compare(payload.password, user.password);
    if (isValid) {
      account = user;
      userId = user._id.toString();
    }
  }
  
  // If User password doesn't match, try Subscription password
  if (!isValid && subscription) {
    isValid = await bcrypt.compare(payload.password, subscription.password);
    if (isValid) {
      account = subscription;
      userId = subscription._id.toString();
      
      // If password matches Subscription but User exists, sync the password to User model
      if (user) {
        user.password = subscription.password;
        await user.save();
      }
    }
  }
  
  if (!isValid || !account || !userId) {
    throw new Error("Your password is incorrect");
  }
  
  let userName = "";
  
  if (user && user.name) {
    userName = user.name;
  } else if (subscription) {
    userName = `${subscription.firstName} ${subscription.lastName}`.trim();
  }
  
  if (!userName) {
    userName = payload.email.split("@")[0];
  }
  
  if (user) {
    user.activity = new Date();
    if (!user.name && subscription) {
      user.name = userName;
    }
    await user.save();
  } else if (subscription) {
    const createdUser = await User.findOneAndUpdate(
      { email: payload.email },
      {
        email: payload.email,
        password: subscription.password,
        name: userName,
        status: "Active",
        activity: new Date()
      },
      { upsert: true, new: true }
    );
    if (createdUser) {
      userId = createdUser._id.toString();
    }
  }
  
  return { 
    success: true,
    token: createToken(userId as string), 
    userId: userId as string,
    email: payload.email,
    name: userName
  };
};

export const requestPasswordReset = async (email: string) => {
  let subscription = await Subscription.findOne({ email });
  let user = null;
  
  if (!subscription) {
    user = await User.findOne({ email });
  }
  
  if (!subscription && !user) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const account = subscription || user;
  if (!account) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const userId = account._id.toString();
  const otp = generateOtpCode();
  await createOtpRecord(userId, otp);
  await sendOtpEmail(email, otp);
  return { 
    success: true,
    message: "OTP sent to your email" 
  };
};

export const resendOtp = async (email: string) => {
  let subscription = await Subscription.findOne({ email });
  let user = null;
  
  if (!subscription) {
    user = await User.findOne({ email });
  }
  
  if (!subscription && !user) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const account = subscription || user;
  if (!account) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const userId = account._id.toString();
  const otp = generateOtpCode();
  await createOtpRecord(userId, otp);
  await sendOtpEmail(email, otp);
  return { 
    success: true,
    message: "OTP resent to your email" 
  };
};

export const verifyOtp = async (email: string, code: string) => {
  let subscription = await Subscription.findOne({ email });
  let user = null;
  
  if (!subscription) {
    user = await User.findOne({ email });
  }
  
  if (!subscription && !user) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const account = subscription || user;
  if (!account) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const userId = account._id.toString();
  const record = await getValidOtp(userId, code);
  await OtpToken.updateOne({ _id: record._id }, { verified: true, verifiedAt: new Date() });
  return { 
    success: true,
    message: "OTP verified successfully" 
  };
};

export const resetPassword = async (payload: { email: string; password: string }) => {
  let subscription = await Subscription.findOne({ email: payload.email });
  let user = null;
  
  if (!subscription) {
    user = await User.findOne({ email: payload.email });
  }
  
  if (!subscription && !user) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const account = subscription || user;
  if (!account) {
    throw new Error("Email not found. Please check your email address");
  }
  
  const userId = account._id.toString();
  const record = await getLatestUnusedOtp(userId);
  await OtpToken.updateOne({ _id: record._id }, { used: true });
  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
  
  if (subscription) {
    await Subscription.updateOne({ _id: account._id }, { password: hashedPassword });
  } else {
    await User.updateOne({ _id: account._id }, { password: hashedPassword });
  }
  
  return { 
    success: true,
    message: "Password reset successfully" 
  };
};