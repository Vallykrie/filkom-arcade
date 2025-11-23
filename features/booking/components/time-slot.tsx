import TimeSlot from "@/components/TimeSlot";
import { SPACING } from "@/constants/Styles";
import { TimeSlot as TimeSlotType } from "@/store/useAppStore";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  slots: TimeSlotType[];
  selectedTimeSlot: TimeSlotType | null;
  onSelectSlot: (slot: TimeSlotType) => void;
};

export function TimeSlotGrid({ slots, selectedTimeSlot, onSelectSlot }: Props) {
  return (
    <View style={styles.timeSlotsContainer}>
      <View style={styles.timeSlotsGrid}>
        {slots.map((timeSlot) => (
          <View key={timeSlot.id} style={styles.timeSlotWrapper}>
            <TimeSlot
              timeSlot={timeSlot}
              isSelected={selectedTimeSlot?.id === timeSlot.id}
              onPress={() => onSelectSlot(timeSlot)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeSlotsContainer: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlotWrapper: {
    width: "48%",
  },
});
