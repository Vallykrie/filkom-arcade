import pb from "@/lib/pocketbase";
import { PBDevice } from "../schema/arcade";

export async function getAllDevices(): Promise<PBDevice[]> {
  const records = await pb.collection("game_devices").getFullList<PBDevice>({
    sort: "-created",
    filter: "is_active = true",
  });

  return records;
}

export function getDeviceImageUrl(record: PBDevice): string | null {
  if (!record.image) return null;
  return pb.files.getURL(record, record.image);
}
