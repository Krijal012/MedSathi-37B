import { z } from "zod";

export const ForgotPassSchema = z.object({
    email: z
        .string()
        .nonempty({ message: "Email is required" })
        .email({ message: "Invalid email" }),
});
