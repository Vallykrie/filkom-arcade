import { useAppStore } from '@/store/useAppStore';
import { Redirect } from 'expo-router';

export default function Index() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/sign-in" />;
}
