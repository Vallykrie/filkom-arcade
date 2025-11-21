import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import PhotoUpload from '@/components/PhotoUpload';
import Colors from '@/constants/Colors';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function BookingFormScreen() {
  const {
    selectedDevice,
    selectedDate,
    selectedTimeSlot,
    bookingFormData,
    updateBookingFormData,
    addBooking,
    resetBookingData,
  } = useAppStore();

  const handleBook = () => {
    // Validate form
    if (!bookingFormData.name || !bookingFormData.nim || !bookingFormData.email || !bookingFormData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (!selectedDevice || !selectedDate || !selectedTimeSlot) {
      alert('Missing booking information');
      return;
    }

    // Create booking record
    const booking = {
      id: Date.now().toString(),
      deviceName: selectedDevice.name,
      deviceId: selectedDevice.id,
      date: selectedDate.toISOString(),
      timeSlot: `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`,
      timestamp: `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}, ${selectedDate.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][selectedDate.getMonth()]}`,
    };

    // Add to history
    addBooking(booking);

    // Show success message
    alert('Booking successful!');

    // Reset form and navigate back
    resetBookingData();
    router.push('/(tabs)/history');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color={Colors.dark.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Booking Form</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Personal Data Information</Text>
            <Text style={styles.sectionSubtitle}>Your personal data information</Text>

            {/* Photo Upload */}
            <PhotoUpload
              photoUri={bookingFormData.photo}
              onPhotoSelected={(uri) => updateBookingFormData({ photo: uri })}
            />

            {/* Name Input */}
            <CustomInput
              label="Name"
              value={bookingFormData.name}
              onChangeText={(text) => updateBookingFormData({ name: text })}
              placeholder="Pande Kadek Nathan"
            />

            {/* NIM Input */}
            <CustomInput
              label="NIM"
              value={bookingFormData.nim}
              onChangeText={(text) => updateBookingFormData({ nim: text })}
              placeholder="235150207111051"
              keyboardType="numeric"
            />

            {/* Email Input */}
            <CustomInput
              label="Email"
              value={bookingFormData.email}
              onChangeText={(text) => updateBookingFormData({ email: text })}
              placeholder="nathansudiara@student.ub.ac.id"
              keyboardType="email-address"
            />

            {/* Phone Number Input */}
            <CustomInput
              label="Phone Number"
              value={bookingFormData.phoneNumber}
              onChangeText={(text) => updateBookingFormData({ phoneNumber: text })}
              placeholder="08814830912"
              keyboardType="phone-pad"
            />

            {/* Book Button */}
            <CustomButton
              title="Book"
              onPress={handleBook}
              style={styles.bookButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
  },
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
