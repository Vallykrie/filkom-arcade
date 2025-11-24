import { PBDevice } from "@/features/arcade/schema/arcade";
import { useQuery } from "@tanstack/react-query";
import { getDeviceById } from "../services/booking";

export function useDevice(deviceId: string) {
  return useQuery<PBDevice>({
    queryKey: ["device", deviceId],
    enabled: !!deviceId,
    queryFn: () => {
      return getDeviceById(deviceId);
    },
  });
}
