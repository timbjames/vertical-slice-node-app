import { z } from 'zod';

export const OrdersSchema = z.object({
  name: z.string(),
  description: z.string().optional()
});

export type OrdersInput = z.infer<typeof OrdersSchema>;