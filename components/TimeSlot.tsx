import Colors from '@/constants/Colors';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import { TimeSlot as TimeSlotType } from '@/store/useAppStore';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TimeSlotProps {
  timeSlot: TimeSlotType;
  isSelected: boolean;
  onPress: () => void;
}

export default function TimeSlot({ timeSlot, isSelected, onPress }: TimeSlotProps) {
  const disabled = !timeSlot.isAvailable;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          isSelected && styles.selectedText,
          disabled && styles.disabledText,
        ]}
      >
        {timeSlot.startTime} - {timeSlot.endTime}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.dark.textGray,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginBottom: SPACING.sm,
  },
  selected: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: Colors.dark.textGray,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: FONT_WEIGHT.semibold,
  },
  disabledText: {
    color: Colors.dark.textGray,
  },
});
