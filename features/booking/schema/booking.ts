import { z } from "zod";

export const bookingFormSchema = z.object({
  student_card: z.string().nullable().optional(),
  name: z.string().min(1, "Name is required"),
  nim: z
    .string()
    .min(8, "NIM must be at least 8 characters")
    .max(30, "NIM is too long"),
  email: z.email("Invalid email address"),
  phone_number: z
    .string()
    .min(8, "Phone number is too short")
    .max(20, "Phone number is too long"),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
