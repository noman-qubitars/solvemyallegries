import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { Admin } from "../models/Admin";

export interface AdminAuthRequest extends Request {
  adminId?: string;
}

/**
 * Middleware to authenticate admin requests using Bearer token
 */
export const authenticateAdmin = async (
  req: AdminAuthRequest,
  res: Response,
  next: NextFunction
) => {
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
      req.adminId = decoded.sub;
      
      const admin = await Admin.findById(decoded.sub);
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid admin token"
        });
      }
      
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please sign in again"
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token format"
        });
      }
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

