import { PrismaClient } from '@prisma/client';
import { LoginInput } from './auth.schema';
import jwt from 'jsonwebtoken';
import { AppError } from '@/utils/errors';

const prisma = new PrismaClient();

export async function login({ email, password }: LoginInput): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return token;
}
