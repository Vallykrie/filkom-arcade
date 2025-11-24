<<<<<<< HEAD
import DeviceCard from '@/components/DeviceCard';
import Colors from '@/constants/Colors';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import { Device, useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
=======
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
>>>>>>> dev/jason
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
<<<<<<< HEAD
} from 'react-native';

// Mock device data - in real app, this would come from API
const MOCK_DEVICES: Device[] = [
  {
    id: '1',
    name: 'PS5',
    image: require('@/assets/images/ps5-placeholder.png'),
    availableDevices: 2,
  },
  {
    id: '2',
    name: 'XBOX',
    image: require('@/assets/images/xbox-placeholder.png'),
    availableDevices: 2,
  },
  {
    id: '3',
    name: 'ROG PC',
    image: require('@/assets/images/rogpc-placeholder.png'),
    availableDevices: 1,
  },
  {
    id: '4',
    name: 'Pump it Up',
    image: require('@/assets/images/pumpit-placeholder.png'),
    availableDevices: 1,
  },
];

export default function HomeScreen() {
  const { devices, setSelectedDevice } = useAppStore();

  // Initialize devices if empty
  useEffect(() => {
    if (devices.length === 0) {
      // In real app, you'd fetch from API
      // For now, we'll use mock data directly
    }
  }, []);

  const handleDevicePress = (device: Device) => {
    setSelectedDevice(device);
    router.push('/device-detail');
  };

  const devicesToDisplay = devices.length > 0 ? devices : MOCK_DEVICES;

=======
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

>>>>>>> dev/jason
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
<<<<<<< HEAD
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          
          <Text style={styles.title}>FILKOM ARCADE</Text>
          
=======
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={Colors.dark.text}
            />
          </TouchableOpacity>

          <Text style={styles.title}>FILKOM ARCADE</Text>

>>>>>>> dev/jason
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>

<<<<<<< HEAD
        {/* Device Grid */}
        <View style={styles.gridContainer}>
          {devicesToDisplay.map((device) => (
            <View key={device.id} style={styles.cardWrapper}>
              <DeviceCard
                device={device}
                onPress={() => handleDevicePress(device)}
              />
            </View>
          ))}
        </View>
=======
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
>>>>>>> dev/jason
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
<<<<<<< HEAD
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
=======
    paddingBottom: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
>>>>>>> dev/jason
  },
  iconButton: {
    width: 40,
    height: 40,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> dev/jason
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
    letterSpacing: 1,
  },
  gridContainer: {
<<<<<<< HEAD
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  cardWrapper: {
    width: '48%',
=======
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
>>>>>>> dev/jason
  },
});
