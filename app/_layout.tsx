import pb from "@/lib/pocketbase";
import { useAppStore } from "@/store/useAppStore";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import Toast, {
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();

const toastConfig: ToastConfig = {
  success: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View style={styles.toastContainer}>
      {text1 ? <Text style={styles.successText}>{text1}</Text> : null}
      {text2 ? <Text style={styles.bodyText}>{text2}</Text> : null}
    </View>
  ),

  error: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View style={styles.toastContainer}>
      {text1 ? <Text style={styles.errorText}>{text1}</Text> : null}
      {text2 ? <Text style={styles.bodyText}>{text2}</Text> : null}
    </View>
  ),
};

export default function RootLayout() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);

  useEffect(() => {
    const record = pb.authStore.record;

    if (record) {
      setAuthenticated(true, record.email, false);
    } else {
      setAuthenticated(false, undefined, false);
    }

    const removeListener = pb.authStore.onChange((token, model) => {
      if (model) {
        setAuthenticated(true, model.email, false);
      } else {
        setAuthenticated(false, undefined, false);
      }
    });

    return () => {
      removeListener?.();
    };
  }, [setAuthenticated]);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="device-detail" options={{ headerShown: false }} />
          <Stack.Screen name="booking-form" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>

      <Toast position="bottom" bottomOffset={35} config={toastConfig} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 24,
  },
  successText: {
    color: "#4ADE80",
    fontWeight: "600",
    fontSize: 15,
  },
  errorText: {
    color: "#F87171",
    fontWeight: "600",
    fontSize: 15,
  },
  bodyText: {
    color: "#D1D5DB",
    marginTop: 4,
    fontSize: 13,
  },
});
