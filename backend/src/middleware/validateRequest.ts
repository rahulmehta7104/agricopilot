import { Request, Response, NextFunction } from 'express';
import { Schema, ZodError } from 'zod';

export const validateRequest = (schema: Schema) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // parseAsync strips out unknown keys and strictly validates the types
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.issues.map((e: any) => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
        return;
      }
      next(error);
    }
  };
