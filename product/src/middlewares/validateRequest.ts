import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (
  schema: AnyZodObject,
  location: 'body' | 'query' | 'params' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get data from the appropriate request location
      const data = location === 'body' ? req.body : 
                   location === 'query' ? req.query : req.params;
      
      // Validate the data using the provided schema
      const validatedData = await schema.parseAsync(data);
      
      // Store the validated data in a custom property instead of modifying originals
      req.validated = validatedData;
      
      return next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      // Handle other unexpected errors
      console.error('Validation middleware error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error during request validation'
      });
    }
  };
};
