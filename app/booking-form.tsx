import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import { BookingForm } from "@/features/booking/components/booking-form";

import { useCreateBooking } from "@/features/booking/hooks/use-create-booking";
import {
  bookingFormSchema,
  BookingFormValues,
} from "@/features/booking/schema/booking";
import pb from "@/lib/pocketbase";
import { useAppStore } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingFormScreen() {
  const { selectedDevice, selectedDate, selectedTimeSlot, resetBookingData } =
    useAppStore();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      student_card: null,
      name: "",
      nim: "",
      email: "",
      phone_number: "",
    },
  });

  const { handleSubmit } = form;

  const { mutate: createBooking, isPending } = useCreateBooking({
    onSuccess: () => {
      resetBookingData();
      router.push("/(tabs)/history");
      form.reset();
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    if (!selectedDevice || !selectedDate || !selectedTimeSlot) {
      alert("Please select device, date, and time slot.");
      return;
    }

    const bookingCode = `BK-${Date.now()}`;
    const bookingDate = selectedDate.toISOString().split("T")[0];
    const userId = pb.authStore.record?.id ?? null;

    const notes = [
      `name: ${values.name}`,
      `nim: ${values.nim}`,
      `email: ${values.email}`,
      `phone: ${values.phone_number}`,
    ].join(" | ");

    createBooking({
      booking_code: bookingCode,
      game_device: selectedDevice.id,
      time_slot: selectedTimeSlot.id,
      booking_date: bookingDate,
      status: "pending",
      notes,
      user: userId ?? undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={Colors.dark.text}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Booking Form</Text>
            <View style={{ width: 40 }} />
          </View>

          <FormProvider {...form}>
            <BookingForm
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={isPending}
            />
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
  },
});
