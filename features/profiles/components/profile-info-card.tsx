import Colors from "@/constants/Colors";
import { FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/Styles";
import pb from "@/lib/pocketbase";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import type { Profile } from "../services/profile";

type Props = {
  profile: Profile | null;
  isGuest: boolean;
  isLoading: boolean;
};

export function ProfileInfoCard({ profile, isGuest, isLoading }: Props) {
  const email = isGuest ? "Guest User" : profile?.email ?? "Not signed in";
  const name = profile?.name ?? null;

  const avatarUrl =
    profile?.avatar && profile.collectionId
      ? pb.files.getURL(profile as any, profile.avatar)
      : null;

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        {isLoading ? (
          <ActivityIndicator color={Colors.dark.primary} />
        ) : avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person" size={48} color={Colors.dark.primary} />
        )}
      </View>

      {!isLoading && (
        <>
          {name && <Text style={styles.nameText}>{name}</Text>}
          <Text style={styles.emailText}>{email}</Text>

          {isGuest && <Text style={styles.guestBadge}>Guest Mode</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${Colors.dark.primary}20`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    overflow: "hidden",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  nameText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: Colors.dark.textOnLight,
    marginBottom: SPACING.xs,
  },
  emailText: {
    fontSize: FONT_SIZE.md,
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
});
