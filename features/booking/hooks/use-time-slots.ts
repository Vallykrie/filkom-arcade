import { TimeSlot as TimeSlotType } from "@/store/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { PBTimeSlot } from "../schema/time-slots";
import { getBookingsByDeviceAndDate } from "../services/booking";
import { getActiveDeviceUnitsByDevice } from "../services/device-units";
import { getTimeSlotsByDevice } from "../services/time-slot";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function useTimeSlots(deviceId?: string, date?: Date | null) {
  const dateStr = date ? formatDate(date) : undefined;

  return useQuery<TimeSlotType[]>({
    queryKey: ["timeSlots", deviceId, dateStr],
    enabled: !!deviceId && !!dateStr,
    queryFn: async () => {
      if (!deviceId || !dateStr) return [];

      const [slots, bookings, units] = await Promise.all([
        getTimeSlotsByDevice(deviceId),
        getBookingsByDeviceAndDate(deviceId, dateStr),
        getActiveDeviceUnitsByDevice(deviceId),
      ]);

      const activeUnits = units.length || 0;

      const bookedBySlot: Record<string, number> = {};
      bookings.forEach((b) => {
        bookedBySlot[b.time_slot] = (bookedBySlot[b.time_slot] || 0) + 1;
      });

      return slots.map((slot: PBTimeSlot) => {
        const capacity =
          slot.max_parallel_bookings && slot.max_parallel_bookings > 0
            ? Math.min(activeUnits, slot.max_parallel_bookings)
            : activeUnits;

        const used = bookedBySlot[slot.id] ?? 0;
        console.log(
          `[Slot ${slot.start_time}-${slot.end_time}]`,
          "booked:",
          used,
          "capacity:",
          capacity,
          "isAvailable:",
          used < capacity
        );
        const isAvailable = capacity > 0 && used < capacity;

        const mapped: TimeSlotType = {
          id: slot.id,
          label: `${slot.start_time} - ${slot.end_time}`,
          startTime: slot.start_time,
          endTime: slot.end_time,
          isAvailable,
        };

        return mapped;
      });
    },
  });
}
