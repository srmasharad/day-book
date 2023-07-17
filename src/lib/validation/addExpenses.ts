import { z } from "zod";

const stringValidate = z
  .string()
  .nonempty("Required field")
  .min(2, "Cannot be less than 2 character");

const stringNotRequired = z
  .string()
  .nonempty("Required field")
  .min(50, "Must be minimum 50 character")
  .optional()
  .or(z.literal(""));

const numberValidate = z
  .string()
  .nonempty("Required field")
  .regex(/^\d+$/, "Must be a positive number");

export const expensesSchema = z.object({
  name: stringValidate,
  category: stringValidate,
  quantity: z
    .string()
    .nonempty("Required field")
    .regex(/^\d+$/, "Must be a positive number"),
  amount: numberValidate,
  total: numberValidate,
  note: stringNotRequired,
  date: z.coerce
    .date({
      required_error: "Required field",
    })
    .min(new Date("1920-01-01"), "Date cannot go past January 1, 1920")
    .max(new Date(), "Date must be in the past"),
});

export type ExpensesSchemaType = z.infer<typeof expensesSchema>;
