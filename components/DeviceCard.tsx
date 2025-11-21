import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING, commonStyles } from '@/constants/Styles';
import { Device } from '@/store/useAppStore';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DeviceCardProps {
  device: Device;
  onPress: () => void;
}

export default function DeviceCard({ device, onPress }: DeviceCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, commonStyles.shadow]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={device.image}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceCount}>{device.availableDevices} devices</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.large,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    height: 200,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: BORDER_RADIUS.large,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: SPACING.md,
  },
  deviceName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
    marginBottom: SPACING.xs,
  },
  deviceCount: {
    fontSize: FONT_SIZE.sm,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});
