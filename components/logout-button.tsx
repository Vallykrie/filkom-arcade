import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
};

export function LogoutButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="log-out-outline" size={24} color={Colors.dark.error} />
      <Text style={styles.logoutText}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 16,
    padding: SPACING.md,
    marginTop: SPACING.xl,
  },
  logoutText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.dark.error,
    marginLeft: SPACING.sm,
  },
});
