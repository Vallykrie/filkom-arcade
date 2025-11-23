import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { BookingPayload, createBooking } from "../services/booking";

type UseCreateBookingOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useCreateBooking(options?: UseCreateBookingOptions) {
  return useMutation({
    mutationFn: (payload: BookingPayload) => createBooking(payload),

    onSuccess: (_data, _variables) => {
      Toast.show({
        type: "success",
        text1: "Booking Berhasil!",
      });

      options?.onSuccess?.();
    },

    onError: (err: any) => {
      console.log("Create booking error:", err);

      Toast.show({
        type: "error",
        text1: "Booking gagal",
        text2:
          err?.data?.message ??
          err?.message ??
          "Terjadi kesalahan saat membuat booking",
      });

      options?.onError?.();
    },
  });
}
