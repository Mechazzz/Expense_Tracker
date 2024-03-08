import { z } from "zod";

export const expense = z.object({
  activity: z.string(),
  category: z.string(),
  amount: z.number(),
  currency: z.string(),
  id: z.string().optional(),
  date: z.coerce.date().optional(),
});

export type ExpensesType = z.infer<typeof expense>;
