import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  dates: number[];
  selectedDate: Date | null;
  currentMonth: number;
  currentYear: number;
  disabledDates?: number[];
  onSelectDate: (day: number) => void;
};

export function DatePickerStrip({
  dates,
  selectedDate,
  currentMonth,
  currentYear,
  disabledDates = [],
  onSelectDate,
}: Props) {
  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.datePicker}
    >
      {dates.map((day) => {
        const date = new Date(currentYear, currentMonth, day);
        const isPastDay = date < todayMidnight;

        const isSelected =
          selectedDate &&
          selectedDate.getDate() === day &&
          selectedDate.getMonth() === currentMonth &&
          selectedDate.getFullYear() === currentYear;

        const isDisabled = isPastDay || disabledDates.includes(day);

        return (
          <TouchableOpacity
            key={day}
            style={[
              styles.dateButton,
              isSelected && styles.dateButtonActive,
              isDisabled && styles.dateButtonDisabled,
            ]}
            disabled={isDisabled}
            onPress={() => onSelectDate(day)}
          >
            <Text
              style={[
                styles.dateText,
                isSelected && styles.dateTextActive,
                isDisabled && styles.dateTextDisabled,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  dateButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
    backgroundColor: "transparent",
  },
  dateButtonActive: {
    backgroundColor: Colors.dark.primary,
  },
  dateButtonDisabled: {
    opacity: 0.35,
  },
  dateText: {
    fontSize: FONT_SIZE.md,
    color: Colors.dark.textGray,
  },
  dateTextActive: {
    color: "#FFFFFF",
    fontWeight: FONT_WEIGHT.bold,
  },
  dateTextDisabled: {
    color: Colors.dark.textGray,
  },
});
