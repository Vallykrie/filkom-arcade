import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  dates: number[];
  selectedDate: Date | null;
  onSelectDate: (day: number) => void;
};

export function DatePickerStrip({ dates, selectedDate, onSelectDate }: Props) {
  return (
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
            style={[styles.dateButton, isSelected && styles.dateButtonActive]}
            onPress={() => onSelectDate(day)}
          >
            <Text
              style={[styles.dateText, isSelected && styles.dateTextActive]}
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
  dateText: {
    fontSize: FONT_SIZE.md,
    color: Colors.dark.textGray,
  },
  dateTextActive: {
    color: "#FFFFFF",
    fontWeight: FONT_WEIGHT.bold,
  },
});
