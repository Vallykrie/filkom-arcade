import Colors from "@/constants/Colors";
import { BORDER_RADIUS, SPACING, commonStyles } from "@/constants/Styles";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  source: ImageSourcePropType;
};

export function DeviceDetailImage({ source }: Props) {
  return (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.deviceImage} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.large,
    overflow: "hidden",
    ...commonStyles.shadow,
  },
  deviceImage: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.dark.textGray,
  },
});
