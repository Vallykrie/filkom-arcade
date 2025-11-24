import { useQuery } from "@tanstack/react-query";

import { PBDevice } from "../schema/arcade";
import { getAllDevices } from "../services/arcade";

export function useArcadeDevices() {
  return useQuery<PBDevice[]>({
    queryKey: ["devices"],
    queryFn: async () => {
      const records = await getAllDevices();
      return records;
    },
    staleTime: 60_000,
  });
}
