import { z } from "zod";
export const RegisterSchema = z
  .object({
    registerAs: z.enum(["patient", "staff", "pharmacist"], {
      errorMap: () => ({ message: "Please select a role" }),
    }),
    fullName: z.string().nonempty({ message: "Full Name is required" }),
    email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string().nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
