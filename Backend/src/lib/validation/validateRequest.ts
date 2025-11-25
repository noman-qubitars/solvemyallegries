import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError && error.issues && error.issues.length > 0) {
        const firstError = error.issues[0];
        return res.status(400).json({
          success: false,
          message: firstError.message
        });
      }
      return res.status(400).json({
        success: false,
        message: "Validation error"
      });
    }
  };
};

