import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@/utils/errors';
import { logger } from '@/utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, _: NextFunction): void => {
  logger.error(`[ERROR] ${req.method} ${req.url}:`, err);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation error',
      details: err.errors,
    });
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
}

