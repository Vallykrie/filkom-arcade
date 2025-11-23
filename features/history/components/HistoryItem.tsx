import Colors from "@/constants/Colors";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
  commonStyles,
} from "@/constants/Styles";
import type { BookingHistory } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HistoryItemProps {
  booking: BookingHistory;
}

const statusStyles = {
  pending: { bg: "rgba(250,204,21,0.15)", text: "#EAB308", label: "Pending" },
  confirmed: {
    bg: "rgba(34,197,94,0.15)",
    text: "#22C55E",
    label: "Confirmed",
  },
  checked_in: {
    bg: "rgba(34,197,94,0.15)",
    text: "#22C55E",
    label: "Checked In",
  },
  completed: {
    bg: "rgba(59,130,246,0.15)",
    text: "#3B82F6",
    label: "Completed",
  },
  cancelled: {
    bg: "rgba(239,68,68,0.15)",
    text: "#EF4444",
    label: "Cancelled",
  },
  expired: {
    bg: "rgba(148,163,184,0.15)",
    text: "#94A3B8",
    label: "Expired",
  },
};

type StatusKey = keyof typeof statusStyles;

function getStatusStyle(status: string) {
  const key: StatusKey = (
    status in statusStyles ? status : "pending"
  ) as StatusKey;

  return statusStyles[key];
}

export default function HistoryItem({ booking }: HistoryItemProps) {
  const style = getStatusStyle(booking.status);

  return (
    <View style={[styles.card, commonStyles.shadow]}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="game-controller" size={20} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.deviceName}>{booking.deviceName}</Text>

          <View
            style={[
              styles.badge,
              { backgroundColor: style.bg, borderColor: style.text },
            ]}
          >
            <Text style={[styles.badgeText, { color: style.text }]}>
              {style.label}
            </Text>
          </View>
        </View>

        <View style={styles.time} className="flex-row items-center">
          <Ionicons
            name="time-outline"
            size={14}
            color={Colors.dark.textGray}
          />
          <Text style={styles.timestamp}>{booking.timestamp}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: "center",
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.iconCircle,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  deviceName: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.dark.textOnLight,
    flexShrink: 1,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },
  timestampContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timestamp: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.textGray,
    marginLeft: SPACING.xs,
  },
});
