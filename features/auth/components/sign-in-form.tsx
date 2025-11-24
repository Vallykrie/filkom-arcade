import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Colors from "@/constants/Colors";
import { FONT_SIZE, SPACING } from "@/constants/Styles";
import { useLogin } from "../hooks/use-auth";
import { loginSchema, LoginSchema } from "../schema/auth";

export default function SignInForm() {
  const { mutate: login, isPending } = useLogin();

  const { control, handleSubmit, watch, setValue } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <CustomInput
            label="Email"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="My Email"
            icon="mail-outline"
            keyboardType="email-address"
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <CustomInput
            label="Password"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="My Password"
            icon="lock-closed-outline"
            secureTextEntry
            error={fieldState.error?.message}
          />
        )}
      />

      <TouchableOpacity
        style={styles.rememberMeContainer}
        onPress={() => setValue("rememberMe", !rememberMe)}
      >
        <View style={styles.checkbox}>
          {rememberMe && (
            <Ionicons name="checkmark" size={16} color={Colors.dark.primary} />
          )}
        </View>
        <Text style={styles.rememberMeText}>Remember Me</Text>
      </TouchableOpacity>

      <CustomButton
        title={isPending ? "Loading..." : "Sign In"}
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        style={styles.signInButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  rememberMeText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.text,
  },
  signInButton: {
    marginBottom: SPACING.lg,
  },
});
