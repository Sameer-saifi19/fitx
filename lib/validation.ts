
import { z } from 'zod'

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" })
    .max(15, { message: "First name must be under 16 characters" }),

  lastName: z
    .string().optional(),

  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }).max(20, {message: "Password must be under 20 characters"})
    .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must include at least one special character" }),
});
