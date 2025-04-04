import { z } from 'zod';

export const ProductsSchema = z.object({
  name: z.string(),
  description: z.string().optional()
});

export type ProductsInput = z.infer<typeof ProductsSchema>;