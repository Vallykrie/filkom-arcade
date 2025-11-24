<<<<<<< HEAD
import CustomButton from '@/components/CustomButton';
import TimeSlot from '@/components/TimeSlot';
import Colors from '@/constants/Colors';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING, commonStyles } from '@/constants/Styles';
import { TimeSlot as TimeSlotType, useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Mock time slots
const MOCK_TIME_SLOTS: TimeSlotType[] = [
  { id: '1', startTime: '08:00', endTime: '09:00', isAvailable: true },
  { id: '2', startTime: '09:15', endTime: '10:15', isAvailable: false },
  { id: '3', startTime: '10:30', endTime: '11:30', isAvailable: true },
  { id: '4', startTime: '11:45', endTime: '12:45', isAvailable: true },
  { id: '5', startTime: '13:00', endTime: '14:00', isAvailable: true },
  { id: '6', startTime: '14:15', endTime: '15:15', isAvailable: true },
  { id: '7', startTime: '15:30', endTime: '16:30', isAvailable: true },
  { id: '8', startTime: '16:45', endTime: '17:45', isAvailable: true },
];

export default function DeviceDetailScreen() {
  const {
    selectedDevice,
=======
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
>>>>>>> dev/jason
    selectedDate,
    selectedMonth,
    selectedYear,
    selectedTimeSlot,
    setSelectedDate,
    setSelectedMonth,
<<<<<<< HEAD
    setSelectedYear,
    setSelectedTimeSlot,
  } = useAppStore();

  const [currentMonth, setCurrentMonth] = useState(selectedMonth);
  const [currentYear] = useState(selectedYear);

  // Generate dates for the selected month
=======
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

>>>>>>> dev/jason
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
<<<<<<< HEAD
=======
    setSelectedTimeSlot(null); // ganti tanggal, reset slot
>>>>>>> dev/jason
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlotType) => {
    if (timeSlot.isAvailable) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTimeSlot) {
<<<<<<< HEAD
      alert('Please select a date and time slot');
      return;
    }
    router.push('/booking-form');
  };

  if (!selectedDevice) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No device selected</Text>
          <CustomButton
            title="Go Back"
            onPress={() => router.back()}
          />
        </View>
      </SafeAreaView>
    );
  }

=======
      alert("Please select a date and time slot");
      return;
    }
    router.push("/booking-form");
  };

>>>>>>> dev/jason
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
<<<<<<< HEAD
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedDevice.name}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Device Image */}
        <View style={styles.imageContainer}>
          <Image
            source={selectedDevice.image}
            style={styles.deviceImage}
            resizeMode="cover"
          />
        </View>

        {/* Month Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.monthSelector}
        >
          {MONTHS.map((month, index) => (
            <TouchableOpacity
              key={month}
              style={[
                styles.monthButton,
                index === currentMonth && styles.monthButtonActive,
              ]}
              onPress={() => {
                setCurrentMonth(index);
                setSelectedMonth(index);
              }}
            >
              <Text
                style={[
                  styles.monthText,
                  index === currentMonth && styles.monthTextActive,
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Date Picker */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datePicker}
        >
          {dates.map((day) => {
            const isSelected = selectedDate?.getDate() === day;
            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dateButton,
                  isSelected && styles.dateButtonActive,
                ]}
                onPress={() => handleDateSelect(day)}
              >
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.dateTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time Slots */}
        <View style={styles.timeSlotsContainer}>
          <View style={styles.timeSlotsGrid}>
            {MOCK_TIME_SLOTS.map((timeSlot) => (
              <View key={timeSlot.id} style={styles.timeSlotWrapper}>
                <TimeSlot
                  timeSlot={timeSlot}
                  isSelected={selectedTimeSlot?.id === timeSlot.id}
                  onPress={() => handleTimeSlotSelect(timeSlot)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Continue Button */}
=======
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

>>>>>>> dev/jason
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
<<<<<<< HEAD
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
  },
  imageContainer: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.large,
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
  deviceImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.dark.textGray,
  },
  monthSelector: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  monthButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
  },
  monthButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.primary,
  },
  monthText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.textGray,
  },
  monthTextActive: {
    color: Colors.dark.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
  datePicker: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  dateButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    backgroundColor: 'transparent',
  },
  dateButtonActive: {
    backgroundColor: Colors.dark.primary,
  },
  dateText: {
    fontSize: FONT_SIZE.md,
    color: Colors.dark.textGray,
  },
  dateTextActive: {
    color: '#FFFFFF',
    fontWeight: FONT_WEIGHT.bold,
  },
  timeSlotsContainer: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotWrapper: {
    width: '48%',
  },
=======
>>>>>>> dev/jason
  continueButton: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  errorContainer: {
    flex: 1,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> dev/jason
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: FONT_SIZE.lg,
    color: Colors.dark.text,
    marginBottom: SPACING.lg,
  },
<<<<<<< HEAD
=======
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
>>>>>>> dev/jason
});
