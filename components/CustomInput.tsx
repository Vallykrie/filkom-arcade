<<<<<<< HEAD
import Colors from '@/constants/Colors';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
=======
import Colors from "@/constants/Colors";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
>>>>>>> dev/jason

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
<<<<<<< HEAD
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
=======
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
>>>>>>> dev/jason
  editable?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
<<<<<<< HEAD
=======
  error?: string;
>>>>>>> dev/jason
}

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry = false,
<<<<<<< HEAD
  keyboardType = 'default',
=======
  keyboardType = "default",
>>>>>>> dev/jason
  editable = true,
  style,
  inputStyle,
  showPasswordToggle = false,
  onTogglePassword,
<<<<<<< HEAD
=======
  error,
>>>>>>> dev/jason
}: CustomInputProps) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={Colors.dark.primary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.dark.textGray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
        />
        {showPasswordToggle && (
          <Ionicons
<<<<<<< HEAD
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
=======
            name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
>>>>>>> dev/jason
            size={20}
            color={Colors.dark.primary}
            style={styles.icon}
            onPress={onTogglePassword}
          />
        )}
      </View>
<<<<<<< HEAD
=======
      {error && <Text style={styles.error}>{error}</Text>}
>>>>>>> dev/jason
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.textLightGray,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.md,
    minHeight: 56,
=======
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.md,
    minHeight: 12,
>>>>>>> dev/jason
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: Colors.dark.textOnLight,
    paddingVertical: SPACING.md,
  },
<<<<<<< HEAD
=======
  error: {
    color: Colors.dark.error,
    fontSize: FONT_SIZE.xs,
    marginTop: 4,
  },
>>>>>>> dev/jason
});
