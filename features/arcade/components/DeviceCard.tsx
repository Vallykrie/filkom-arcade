import Colors from "@/constants/Colors";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
  commonStyles,
} from "@/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PBDevice } from "../schema/arcade";

interface DeviceCardProps {
  device: PBDevice;
  imageUrl: string | null;
  onPress: () => void;
}

export default function DeviceCard({
  device,
  imageUrl,
  onPress,
}: DeviceCardProps) {
  const source = imageUrl
    ? { uri: imageUrl }
    : require("@/assets/images/ps5-placeholder.png");
  return (
    <TouchableOpacity
      style={[styles.card, commonStyles.shadow]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={source}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceCount}>{device.total_units} devices</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.large,
    overflow: "hidden",
    marginBottom: SPACING.md,
    height: 200,
  },
  imageBackground: {
    backgroundColor: Colors.light.background,
    width: "100%",
    height: "100%",
  },
  image: {
    borderRadius: BORDER_RADIUS.large,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    padding: SPACING.md,
  },
  deviceName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: "#FFFFFF",
    marginBottom: SPACING.xs,
  },
  deviceCount: {
    fontSize: FONT_SIZE.sm,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
