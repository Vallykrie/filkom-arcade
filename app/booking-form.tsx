<<<<<<< HEAD
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import PhotoUpload from '@/components/PhotoUpload';
import Colors from '@/constants/Colors';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function BookingFormScreen() {
  const {
    selectedDevice,
    selectedDate,
    selectedTimeSlot,
    bookingFormData,
    updateBookingFormData,
    addBooking,
    resetBookingData,
  } = useAppStore();

  const handleBook = () => {
    // Validate form
    if (!bookingFormData.name || !bookingFormData.nim || !bookingFormData.email || !bookingFormData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (!selectedDevice || !selectedDate || !selectedTimeSlot) {
      alert('Missing booking information');
      return;
    }

    // Create booking record
    const booking = {
      id: Date.now().toString(),
      deviceName: selectedDevice.name,
      deviceId: selectedDevice.id,
      date: selectedDate.toISOString(),
      timeSlot: `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`,
      timestamp: `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}, ${selectedDate.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][selectedDate.getMonth()]}`,
    };

    // Add to history
    addBooking(booking);

    // Show success message
    alert('Booking successful!');

    // Reset form and navigate back
    resetBookingData();
    router.push('/(tabs)/history');
=======
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
>>>>>>> dev/jason
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
<<<<<<< HEAD
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
=======
        behavior={Platform.OS === "ios" ? "padding" : "height"}
>>>>>>> dev/jason
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
<<<<<<< HEAD
          {/* Header */}
=======
>>>>>>> dev/jason
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
<<<<<<< HEAD
              <Ionicons name="chevron-back" size={24} color={Colors.dark.text} />
=======
              <Ionicons
                name="chevron-back"
                size={24}
                color={Colors.dark.text}
              />
>>>>>>> dev/jason
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Booking Form</Text>
            <View style={{ width: 40 }} />
          </View>

<<<<<<< HEAD
          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Personal Data Information</Text>
            <Text style={styles.sectionSubtitle}>Your personal data information</Text>

            {/* Photo Upload */}
            <PhotoUpload
              photoUri={bookingFormData.photo}
              onPhotoSelected={(uri) => updateBookingFormData({ photo: uri })}
            />

            {/* Name Input */}
            <CustomInput
              label="Name"
              value={bookingFormData.name}
              onChangeText={(text) => updateBookingFormData({ name: text })}
              placeholder="Pande Kadek Nathan"
            />

            {/* NIM Input */}
            <CustomInput
              label="NIM"
              value={bookingFormData.nim}
              onChangeText={(text) => updateBookingFormData({ nim: text })}
              placeholder="235150207111051"
              keyboardType="numeric"
            />

            {/* Email Input */}
            <CustomInput
              label="Email"
              value={bookingFormData.email}
              onChangeText={(text) => updateBookingFormData({ email: text })}
              placeholder="nathansudiara@student.ub.ac.id"
              keyboardType="email-address"
            />

            {/* Phone Number Input */}
            <CustomInput
              label="Phone Number"
              value={bookingFormData.phoneNumber}
              onChangeText={(text) => updateBookingFormData({ phoneNumber: text })}
              placeholder="08814830912"
              keyboardType="phone-pad"
            />

            {/* Book Button */}
            <CustomButton
              title="Book"
              onPress={handleBook}
              style={styles.bookButton}
            />
          </View>
=======
          <FormProvider {...form}>
            <BookingForm
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={isPending}
            />
          </FormProvider>
>>>>>>> dev/jason
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
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
=======
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
>>>>>>> dev/jason
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> dev/jason
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
  },
<<<<<<< HEAD
  formContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.textGray,
    marginBottom: SPACING.lg,
  },
  bookButton: {
    marginTop: SPACING.md,
  },
=======
>>>>>>> dev/jason
});
