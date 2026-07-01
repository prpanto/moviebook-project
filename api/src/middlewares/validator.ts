import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

const validate = (schema: ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errors: Record<string, string> = {};

        result.error.issues.forEach((error) => {
          const field = error.path[error.path.length - 1]?.toString() || "unknown";

          if (!errors[field]) {
            errors[field] = error.message;
          }
        })

        return next(errors);
      }

      req.body = result.data;

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default validate;
