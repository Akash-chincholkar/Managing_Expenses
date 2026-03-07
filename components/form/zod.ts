import * as z from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const goalSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Amount must be greater than 0"),

  use_till: z.date().min(today, { message: "Enter a valid date" }),
});

export const AddexpenseSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Amount must be greater than 0"),

  purpose: z.string(),


});

export type GoalInput = z.input<typeof goalSchema>;   // form type
export type GoalData = z.infer<typeof goalSchema>;    // parsed type


export type ExpenseInput = z.input<typeof AddexpenseSchema>;   // form type
export type ExpenseData = z.infer<typeof AddexpenseSchema>;   