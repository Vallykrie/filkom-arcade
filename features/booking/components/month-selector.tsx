import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type Props = {
  currentMonth: number;
  onMonthChange: (monthIndex: number) => void;
};

export function MonthSelector({ currentMonth, onMonthChange }: Props) {
  return (
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
          onPress={() => onMonthChange(index)}
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
  );
}

const styles = StyleSheet.create({
  monthSelector: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
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
});
