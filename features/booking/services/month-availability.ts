import { PBTimeSlot } from "../schema/time-slots";
import { getBookingsByDeviceAndDate } from "./booking";
import { getActiveDeviceUnitsByDevice } from "./device-units";
import { getTimeSlotsByDevice } from "./time-slot";

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export type DayAvailability = {
  day: number;
  hasAvailableSlot: boolean;
};

export async function getMonthAvailability(
  deviceId: string,
  year: number,
  month: number
): Promise<DayAvailability[]> {
  const [slots, units] = await Promise.all([
    getTimeSlotsByDevice(deviceId),
    getActiveDeviceUnitsByDevice(deviceId),
  ]);

  const activeUnits = units.length || 0;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const results: DayAvailability[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = formatDate(date);

    const bookings = await getBookingsByDeviceAndDate(deviceId, dateStr);

    const bookedBySlot: Record<string, number> = {};
    bookings.forEach((b) => {
      bookedBySlot[b.time_slot] = (bookedBySlot[b.time_slot] || 0) + 1;
    });

    const hasAvailableSlot = slots.some((slot: PBTimeSlot) => {
      const capacity =
        slot.max_parallel_bookings && slot.max_parallel_bookings > 0
          ? Math.min(activeUnits, slot.max_parallel_bookings)
          : activeUnits;

      const used = bookedBySlot[slot.id] ?? 0;
      return used < capacity;
    });

    results.push({ day, hasAvailableSlot });
  }

  return results;
}
