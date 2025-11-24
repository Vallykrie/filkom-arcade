import pb from "@/lib/pocketbase";
import { Redirect } from "expo-router";

export default function Index() {
  const hasSession = !!pb.authStore.record;

  if (hasSession) return <Redirect href="/(tabs)" />;

  return <Redirect href="/sign-in" />;
}
