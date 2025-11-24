import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  rememberMe: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
