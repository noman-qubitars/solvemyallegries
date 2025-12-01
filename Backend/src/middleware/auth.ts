import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { User } from "../models/User";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format. Use: Bearer <token>"
      });
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { sub: string };
      req.userId = decoded.sub;
      
      // Check if user is blocked
      const user = await User.findById(decoded.sub);
      if (user && user.status === "Blocked") {
        return res.status(403).json({
          success: false,
          message: "Your account has been blocked. Please contact support"
        });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Authentication error"
    });
  }
};