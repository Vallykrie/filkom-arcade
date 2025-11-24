import pb from "@/lib/pocketbase";
import type { BookingHistory } from "@/store/useAppStore";

type PBBooking = {
  id: string;
  game_device: string;
  time_slot: string;
  booking_date: string;
  created: string;
  status: string;
  expand?: {
    game_device?: {
      id: string;
      name: string;
    };
    time_slot?: {
      id: string;
      label?: string;
      start_time?: string;
      end_time?: string;
    };
  };
};

export async function getUserBookings(
  userId: string
): Promise<BookingHistory[]> {
  const res = await pb.collection("bookings").getList<PBBooking>(1, 50, {
    filter: `user="${userId}"`,
    sort: "-created",
    expand: "game_device,time_slot",
  });

  return res.items.map((b) => {
    const deviceName = b.expand?.game_device?.name ?? "Unknown device";

    const timeSlotLabel =
      b.expand?.time_slot?.label ??
      (b.expand?.time_slot?.start_time && b.expand?.time_slot?.end_time
        ? `${b.expand.time_slot.start_time} - ${b.expand.time_slot.end_time}`
        : "");

    const timestamp = new Date(b.created).toLocaleString();

    return {
      id: b.id,
      deviceId: b.game_device,
      deviceName,
      date: b.booking_date,
      timeSlot: timeSlotLabel,
      timestamp,
      status: b.status ?? "pending",
    };
  });
}
