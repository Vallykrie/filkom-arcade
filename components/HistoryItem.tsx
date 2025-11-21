import Colors from '@/constants/Colors';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING, commonStyles } from '@/constants/Styles';
import { BookingHistory } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HistoryItemProps {
  booking: BookingHistory;
}

export default function HistoryItem({ booking }: HistoryItemProps) {
  return (
    <View style={[styles.card, commonStyles.shadow]}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="game-controller" size={20} color="#FFFFFF" />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.deviceName}>{booking.deviceName}</Text>
        <View style={styles.timestampContainer}>
          <Ionicons name="time-outline" size={14} color={Colors.dark.textGray} />
          <Text style={styles.timestamp}>{booking.timestamp}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.iconCircle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  deviceName: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.dark.textOnLight,
    marginBottom: SPACING.xs,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.textGray,
    marginLeft: SPACING.xs,
  },
});
