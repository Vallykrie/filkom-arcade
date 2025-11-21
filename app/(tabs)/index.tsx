import DeviceCard from '@/components/DeviceCard';
import Colors from '@/constants/Colors';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import { Device, useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          
          <Text style={styles.title}>FILKOM ARCADE</Text>
          
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>

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
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  cardWrapper: {
    width: '48%',
  },
});
