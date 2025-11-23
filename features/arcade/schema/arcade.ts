import { z } from "zod";

export const deviceRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  category: z.string(),
  image: z.string().nullable().optional(),
  total_units: z.number().int().nonnegative(),
  is_active: z.boolean(),
});

export type PBDevice = z.infer<typeof deviceRecordSchema>;

export const deviceListSchema = z.array(deviceRecordSchema);
