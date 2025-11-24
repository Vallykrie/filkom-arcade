<<<<<<< HEAD
import HistoryItem from '@/components/HistoryItem';
import Colors from '@/constants/Colors';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import { useAppStore } from '@/store/useAppStore';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen() {
  const bookingHistory = useAppStore((state) => state.bookingHistory);
=======
import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import HistoryItem from "@/features/history/components/HistoryItem";
import { useBookingHistory } from "@/features/history/hooks/history";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const { data: bookingHistory, isLoading, isError } = useBookingHistory();
>>>>>>> dev/jason

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
<<<<<<< HEAD
        {/* Header */}
=======
>>>>>>> dev/jason
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
        </View>

<<<<<<< HEAD
        {/* History List */}
        {bookingHistory.length > 0 ? (
          <View style={styles.listContainer}>
            {bookingHistory.map((booking) => (
              <HistoryItem key={booking.id} booking={booking} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No booking history yet</Text>
            <Text style={styles.emptySubtext}>
              Your bookings will appear here after you make a reservation
            </Text>
          </View>
        )}
=======
        {isLoading && (
          <View style={styles.center}>
            <ActivityIndicator color={Colors.dark.primary} />
          </View>
        )}

        {isError && !isLoading && (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              Gagal memuat riwayat booking. Coba lagi nanti.
            </Text>
          </View>
        )}

        {!isLoading &&
          !isError &&
          bookingHistory &&
          bookingHistory.length > 0 && (
            <View style={styles.listContainer}>
              {bookingHistory.map((booking) => (
                <HistoryItem key={booking.id} booking={booking} />
              ))}
            </View>
          )}

        {!isLoading &&
          !isError &&
          (!bookingHistory || bookingHistory.length === 0) && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No booking history yet</Text>
              <Text style={styles.emptySubtext}>
                Your bookings will appear here after you make a reservation
              </Text>
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
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingVertical: SPACING.lg,
<<<<<<< HEAD
    alignItems: 'center',
=======
    alignItems: "center",
>>>>>>> dev/jason
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
  },
  listContainer: {
    marginTop: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> dev/jason
    paddingVertical: SPACING.xxl * 2,
  },
  emptyText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.dark.text,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.textGray,
<<<<<<< HEAD
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
=======
    textAlign: "center",
    paddingHorizontal: SPACING.xl,
  },
  center: {
    marginTop: SPACING.xl,
    alignItems: "center",
  },
  errorText: {
    fontSize: FONT_SIZE.sm,
    color: "#F97373",
  },
>>>>>>> dev/jason
});
