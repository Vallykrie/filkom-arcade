<<<<<<< HEAD
import Colors from '@/constants/Colors';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
=======
import Colors from "@/constants/Colors";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "@/constants/Styles";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
>>>>>>> dev/jason

interface CustomButtonProps {
  title: string;
  onPress: () => void;
<<<<<<< HEAD
  variant?: 'primary' | 'secondary';
=======
  variant?: "primary" | "secondary";
>>>>>>> dev/jason
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
<<<<<<< HEAD
  variant = 'primary',
=======
  variant = "primary",
>>>>>>> dev/jason
  disabled = false,
  style,
  textStyle,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
<<<<<<< HEAD
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
=======
        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
>>>>>>> dev/jason
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
<<<<<<< HEAD
          variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText,
=======
          variant === "primary"
            ? styles.primaryButtonText
            : styles.secondaryButtonText,
>>>>>>> dev/jason
          disabled && styles.disabledButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.large,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> dev/jason
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary,
  },
  secondaryButton: {
<<<<<<< HEAD
    backgroundColor: 'transparent',
=======
    backgroundColor: "transparent",
>>>>>>> dev/jason
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
  primaryButtonText: {
<<<<<<< HEAD
    color: '#FFFFFF',
=======
    color: "#FFFFFF",
>>>>>>> dev/jason
  },
  secondaryButtonText: {
    color: Colors.dark.primary,
  },
  disabledButtonText: {
    opacity: 0.7,
  },
});
