import {
  date,
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// declaring enum in database
export const expenses = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index('name_idx').on(expenses.userId),
    };
  }
);
// Schema for inserting a user - can be used to validate API requests
export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid monetary value',
  }),
});
// Schema for selecting a user - can be used to validate API responses
export const selectExpenseSchema = createSelectSchema(expenses);
