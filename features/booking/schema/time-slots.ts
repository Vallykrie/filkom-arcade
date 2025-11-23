import { z } from "zod";

export const timeSlotRecordSchema = z.object({
  id: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  game_device: z.string(),
  is_active: z.boolean(),
  max_parallel_bookings: z.number().int().nonnegative(),
});

export type PBTimeSlot = z.infer<typeof timeSlotRecordSchema>;

export const timeSlotListSchema = z.array(timeSlotRecordSchema);
