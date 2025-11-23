import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import PhotoUpload from "@/components/PhotoUpload";
import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import { BookingFormValues } from "../schema/booking";

type Props = {
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export function BookingForm({ onSubmit, isSubmitting }: Props) {
  const { control } = useFormContext<BookingFormValues>();

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Personal Data Information</Text>
      <Text style={styles.sectionSubtitle}>Your personal data information</Text>

      <Controller
        control={control}
        name="student_card"
        render={({ field }) => (
          <PhotoUpload
            photoUri={field.value ?? null}
            onPhotoSelected={(uri) => field.onChange(uri)}
          />
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <CustomInput
            label="Name"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Pande Kadek Nathan"
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="nim"
        render={({ field, fieldState }) => (
          <CustomInput
            label="NIM"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="235150207111051"
            keyboardType="numeric"
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <CustomInput
            label="Email"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="nathansudiara@student.ub.ac.id"
            keyboardType="email-address"
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone_number"
        render={({ field, fieldState }) => (
          <CustomInput
            label="Phone Number"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="08814830912"
            keyboardType="phone-pad"
            error={fieldState.error?.message}
          />
        )}
      />

      <CustomButton
        title={isSubmitting ? "Booking..." : "Book"}
        onPress={onSubmit}
        style={styles.bookButton}
        disabled={isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.textGray,
    marginBottom: SPACING.lg,
  },
  bookButton: {
    marginTop: SPACING.md,
  },
});
