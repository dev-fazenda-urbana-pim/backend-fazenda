import { RequestHandler } from 'express';
import z from 'zod';

export const validateRequest = (
  schema: z.ZodTypeAny,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((issue: z.ZodIssue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(400).send({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  };
};
