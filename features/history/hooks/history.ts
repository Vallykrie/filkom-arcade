import pb from "@/lib/pocketbase";
import type { BookingHistory } from "@/store/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../services/history";

export function useBookingHistory() {
  const userId = pb.authStore.record?.id;

  return useQuery<BookingHistory[]>({
    queryKey: ["bookingHistory", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];
      return getUserBookings(userId);
    },
  });
}
