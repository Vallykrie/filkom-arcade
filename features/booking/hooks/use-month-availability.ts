import { useQuery } from "@tanstack/react-query";
import {
  DayAvailability,
  getMonthAvailability,
} from "../services/month-availability";

export function useMonthAvailability(
  deviceId?: string,
  year?: number,
  month?: number
) {
  return useQuery<DayAvailability[]>({
    queryKey: ["monthAvailability", deviceId, year, month],
    enabled: !!deviceId && year !== undefined && month !== undefined,
    queryFn: () => getMonthAvailability(deviceId!, year!, month!),
  });
}
