import { z } from "zod";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { zodErrorFormatter } from "@/utils";

const validator = <T extends z.ZodTypeAny>(schema: T): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {     
      return res.status(400).json({
        message: "Validation failed",
        errors: zodErrorFormatter(validation.error)
      });
    }

    req.body = validation.data;

    next(); 
  }
}

export default validator;
