<<<<<<< HEAD
import { useAppStore } from '@/store/useAppStore';
import { Redirect } from 'expo-router';

export default function Index() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
=======
import pb from "@/lib/pocketbase";
import { Redirect } from "expo-router";

export default function Index() {
  const hasSession = !!pb.authStore.record;

  if (hasSession) return <Redirect href="/(tabs)" />;
>>>>>>> dev/jason

  return <Redirect href="/sign-in" />;
}
