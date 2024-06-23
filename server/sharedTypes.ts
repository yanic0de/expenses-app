import { z } from 'zod';
import { insertExpenseSchema } from './db/schema/expenses.ts';

export const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
  id: true,
});

// type Expense = z.infer<typeof expenseSchema>;
//
// export const createExpenseSchema = expenseSchema.omit({ id: true });

export type CreateExpense = z.infer<typeof createExpenseSchema>;
