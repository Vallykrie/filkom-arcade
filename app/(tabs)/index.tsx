import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import DeviceCard from "@/features/arcade/components/DeviceCard";
import { useArcadeDevices } from "@/features/arcade/hooks/use-arcade-devices";
import { getDeviceImageUrl } from "@/features/arcade/services/arcade";
import { useAppStore } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { setSelectedDevice } = useAppStore();
  const { data: devices, isLoading, isError } = useArcadeDevices();

  const handleDevicePress = (device: any) => {
    setSelectedDevice(device);
    router.push({
      pathname: "/device-detail",
      params: { deviceId: device.id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={Colors.dark.text}
            />
          </TouchableOpacity>

          <Text style={styles.title}>FILKOM ARCADE</Text>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>

        {isLoading && (
          <View style={styles.center}>
            <ActivityIndicator color={Colors.dark.primary} />
          </View>
        )}

        {isError && !isLoading && (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              Gagal memuat device. Coba lagi nanti.
            </Text>
          </View>
        )}

        {!isLoading && !isError && devices && (
          <View style={styles.gridContainer}>
            {devices.map((device) => (
              <View key={device.id} style={styles.cardWrapper}>
                <DeviceCard
                  device={device}
                  imageUrl={getDeviceImageUrl(device)}
                  onPress={() => handleDevicePress(device)}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: SPACING.md,
  },
  cardWrapper: {
    width: "48%",
  },
  center: {
    marginTop: SPACING.xl,
    alignItems: "center",
  },
  errorText: {
    color: "#F87171",
    fontSize: FONT_SIZE.sm,
  },
});
