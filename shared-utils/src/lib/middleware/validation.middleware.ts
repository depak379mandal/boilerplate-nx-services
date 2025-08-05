import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { UnprocessableEntityResponse } from '../helpers/response.handler';

export const validationMiddleware = (
  schema: z.ZodSchema,
  path: 'query' | 'body' | 'params' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.safeParse(req[path]);
    if (error) {
      UnprocessableEntityResponse(
        {
          message: 'Validation error',
          data: extractZodErrors(error),
        },
        res
      );
    }
    next();
  };
};

function extractZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return errors;
}
