import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SignInHeaderProps = {
  title: string;
  subtitle: string;
};

export default function SignInHeader({ title, subtitle }: SignInHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
    marginBottom: SPACING.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: Colors.dark.textGray,
    textAlign: "center",
  },
});
