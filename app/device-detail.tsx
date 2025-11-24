import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import { FONT_SIZE, SPACING } from "@/constants/Styles";
import { DatePickerStrip } from "@/features/booking/components/date-picker";
import { DeviceDetailHeader } from "@/features/booking/components/device-detail-header";
import { DeviceDetailImage } from "@/features/booking/components/device-detail-image";
import { MonthSelector } from "@/features/booking/components/month-selector";

import { getDeviceImageUrl } from "@/features/arcade/services/arcade";
import { useMonthAvailability } from "@/features/booking/hooks/use-month-availability";
import { useTimeSlots } from "@/features/booking/hooks/use-time-slots";

import { TimeSlotGrid } from "@/features/booking/components/time-slot";
import { useDevice } from "@/features/booking/hooks/use-device";
import { TimeSlot as TimeSlotType, useAppStore } from "@/store/useAppStore";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeviceDetailScreen() {
  const { deviceId } = useLocalSearchParams<{ deviceId: string }>();

  const { data: device, isLoading, isError } = useDevice(deviceId);

  const {
    selectedDate,
    selectedMonth,
    selectedYear,
    selectedTimeSlot,
    setSelectedDate,
    setSelectedMonth,
    setSelectedTimeSlot,
  } = useAppStore();

  const [currentMonth, setCurrentMonth] = useState<number>(selectedMonth);
  const [currentYear] = useState<number>(selectedYear);

  // time slot tergantung device + tanggal
  const {
    data: timeSlots,
    isLoading: slotsLoading,
    isError: slotsError,
  } = useTimeSlots(deviceId, selectedDate);

  // availability per hari (buat disable tanggal)
  const { data: monthAvailability } = useMonthAvailability(
    deviceId,
    currentYear,
    currentMonth
  );

  // list tanggal yang sudah full (tidak ada slot tersisa)
  const disabledDates =
    monthAvailability
      ?.filter((day) => !day.hasAvailableSlot)
      .map((day) => day.day) ?? [];

  if (!deviceId) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No device id provided</Text>
          <CustomButton title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading || !device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={Colors.dark.primary} />
          <Text style={styles.loadingText}>Loading device...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load device</Text>
          <CustomButton title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = getDeviceImageUrl(device);
  const finalImage: ImageSourcePropType = imageUrl
    ? { uri: imageUrl }
    : require("@/assets/images/xbox-placeholder.png");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    setSelectedTimeSlot(null); // ganti tanggal, reset slot
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlotType) => {
    if (timeSlot.isAvailable) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot");
      return;
    }
    router.push("/booking-form");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DeviceDetailHeader title={device.name} onBack={() => router.back()} />

        <DeviceDetailImage source={finalImage} />

        <MonthSelector
          currentMonth={currentMonth}
          onMonthChange={(index) => {
            setCurrentMonth(index);
            setSelectedMonth(index);
            setSelectedDate(null);
            setSelectedTimeSlot(null);
          }}
        />

        <DatePickerStrip
          dates={dates}
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          currentYear={currentYear}
          disabledDates={disabledDates}
          onSelectDate={handleDateSelect}
        />

        {slotsLoading && (
          <View style={styles.timeSlotsLoading}>
            <ActivityIndicator color={Colors.dark.primary} />
            <Text style={styles.loadingText}>Loading time slots...</Text>
          </View>
        )}

        {slotsError && !slotsLoading && (
          <View style={styles.timeSlotsLoading}>
            <Text style={styles.errorText}>Failed to load time slots</Text>
          </View>
        )}

        {!slotsLoading && !slotsError && selectedDate && (
          <TimeSlotGrid
            slots={timeSlots ?? []}
            selectedTimeSlot={selectedTimeSlot}
            onSelectSlot={handleTimeSlotSelect}
          />
        )}

        <CustomButton
          title="Continue"
          onPress={handleContinue}
          style={styles.continueButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  continueButton: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: FONT_SIZE.lg,
    color: Colors.dark.text,
    marginBottom: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  loadingText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.text,
  },
  timeSlotsLoading: {
    marginTop: SPACING.md,
    alignItems: "center",
  },
});
