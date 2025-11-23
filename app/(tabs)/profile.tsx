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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <ProfileInfoCard
          profile={profile ?? null}
          isGuest={isGuest}
          isLoading={isLoading}
        />

        {showLogout && <LogoutButton onPress={handleLogout} />}
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
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.text,
  },
});
