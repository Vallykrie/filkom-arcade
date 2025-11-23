import { PBDevice } from "@/features/arcade/schema/arcade";
import pb from "@/lib/pocketbase";

export async function getDeviceById(id: string): Promise<PBDevice> {
  const record = await pb.collection("game_devices").getOne<PBDevice>(id);
  return record;
}

export type BookingPayload = {
  booking_code: string;
  game_device: string;
  time_slot: string;
  device_unit?: string;
  booking_date: string;
  status?:
    | "pending"
    | "confirmed"
    | "checked_in"
    | "cancelled"
    | "completed"
    | "expired";
  cancel_reason?: string;
  notes?: string;
  user?: string | null;
  cancelled_at?: string;
};

export async function createBooking(payload: BookingPayload) {
  const finalPayload: BookingPayload = { ...payload };

  if (!finalPayload.device_unit) {
    const unit = await pb
      .collection("device_units")
      .getFirstListItem(
        `game_device="${finalPayload.game_device}" && status="active"`
      );
    finalPayload.device_unit = unit.id;
  }

  const record = await pb.collection("bookings").create(finalPayload);
  return record;
}

export async function getBookingsByDeviceAndDate(
  deviceId: string,
  dateStr: string
): Promise<BookingPayload[]> {
  const start = `${dateStr} 00:00:00`;
  const baseDate = new Date(dateStr);
  baseDate.setDate(baseDate.getDate() + 1);
  const endYear = baseDate.getFullYear();
  const endMonth = String(baseDate.getMonth() + 1).padStart(2, "0");
  const endDay = String(baseDate.getDate()).padStart(2, "0");
  const end = `${endYear}-${endMonth}-${endDay} 00:00:00`;

  const records = await pb.collection("bookings").getFullList<BookingPayload>({
    filter: `
      game_device = "${deviceId}"
      && booking_date >= "${start}"
      && booking_date < "${end}"
      && (status = "pending" || status = "confirmed" || status = "checked_in")
    `,
  });

  return records;
}
