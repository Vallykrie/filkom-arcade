import pb from "@/lib/pocketbase";
import { PBTimeSlot } from "../schema/time-slots";

export async function getTimeSlotsByDevice(
  deviceId: string
): Promise<PBTimeSlot[]> {
  const records = await pb.collection("time_slots").getFullList<PBTimeSlot>({
    filter: `game_device = "${deviceId}" && is_active = true`,
    sort: "start_time",
  });
  return records;
}
