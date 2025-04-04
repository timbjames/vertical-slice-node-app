import { z } from 'zod';

export const __CLASS__Schema = z.object({
  name: z.string(),
  description: z.string().optional()
});

export type __CLASS__Input = z.infer<typeof __CLASS__Schema>;