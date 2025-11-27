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
    <View style={[styles.toastContainer, styles.successContainer]}>
      {text1 ? <Text style={styles.successText}>{text1}</Text> : null}
      {text2 ? <Text style={styles.bodyText}>{text2}</Text> : null}
    </View>
  ),

  error: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View style={[styles.toastContainer, styles.errorContainer]}>
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
    width: "85%",
    alignSelf: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,

    backgroundColor: "rgba(255, 255, 255, 0.15)",

    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",

    backdropFilter: "blur(10px)",

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    marginBottom: 32,
  },

  successContainer: {},
  successText: {
    color: "#34D399",
    fontWeight: "700",
    fontSize: 15,
  },

  errorContainer: {},
  errorText: {
    color: "#F87171",
    fontWeight: "700",
    fontSize: 15,
  },

  bodyText: {
    color: "#F3F4F6",
    marginTop: 4,
    fontSize: 13,
  },
});
