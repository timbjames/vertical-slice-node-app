import { Request, Response, NextFunction } from 'express';
import { loginSchema } from './auth.schema';
import * as authService from './auth.service';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = loginSchema.parse(req.body);
    const token = await authService.login(validated);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
