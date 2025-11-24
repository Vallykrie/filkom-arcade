import pb from "@/lib/pocketbase";

export type PBDeviceUnit = {
  id: string;
  unit_code: string;
  game_device: string;
  status: "active" | "maintenance" | "inactive";
};

export async function getActiveDeviceUnitsByDevice(
  deviceId: string
): Promise<PBDeviceUnit[]> {
  const records = await pb
    .collection("device_units")
    .getFullList<PBDeviceUnit>({
      filter: `game_device="${deviceId}" && status="active"`,
    });

  return records;
}
