<<<<<<< HEAD
import Colors from '@/constants/Colors';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/Styles';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { isAuthenticated, userEmail, isGuest, setAuthenticated } = useAppStore();

  const handleLogout = () => {
    setAuthenticated(false);
    router.replace('/sign-in');
  };

=======
import { LogoutButton } from "@/components/logout-button";
import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import { ProfileInfoCard } from "@/features/profiles/components/profile-info-card";
import { useProfile } from "@/features/profiles/hooks/use-profiles";
import pb from "@/lib/pocketbase";
import { useAppStore } from "@/store/useAppStore";
import { Redirect, router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { isAuthenticated, isGuest, setAuthenticated } = useAppStore();
  const { data: profile, isLoading } = useProfile();

  if (!pb.authStore.record && !isGuest) {
    return <Redirect href="/sign-in" />;
  }

  const handleLogout = () => {
    pb.authStore.clear();
    setAuthenticated(false);
    router.replace("/sign-in");
  };

  const showLogout = isAuthenticated && !isGuest;

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
          <Text style={styles.title}>Profile</Text>
        </View>

<<<<<<< HEAD
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={48} color={Colors.dark.primary} />
          </View>
          
          <Text style={styles.emailText}>
            {isGuest ? 'Guest User' : userEmail || 'Not signed in'}
          </Text>
          
          {isGuest && (
            <Text style={styles.guestBadge}>Guest Mode</Text>
          )}
        </View>

        {/* Logout Button */}
        {isAuthenticated && (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color={Colors.dark.error} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        )}
=======
        <ProfileInfoCard
          profile={profile ?? null}
          isGuest={isGuest}
          isLoading={isLoading}
        />

        {showLogout && <LogoutButton onPress={handleLogout} />}
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
<<<<<<< HEAD
  profileCard: {
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${Colors.dark.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  emailText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.dark.textOnLight,
    marginBottom: SPACING.sm,
  },
  guestBadge: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.warning,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: `${Colors.dark.warning}20`,
    borderRadius: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 16,
    padding: SPACING.md,
    marginTop: SPACING.xl,
  },
  logoutText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: Colors.dark.error,
    marginLeft: SPACING.sm,
  },
=======
>>>>>>> dev/jason
});
