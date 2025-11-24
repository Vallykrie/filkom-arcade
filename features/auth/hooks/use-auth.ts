import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { loginUser, logoutUser } from "../services/auth";

export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => loginUser(email, password),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Login berhasil",
      });
      router.replace("/(tabs)");
    },

    onError: (err: any) => {
      Toast.show({
        type: "error",
        text1: "Login gagal",
        text2: err.message,
      });
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Berhasil logout" });
      router.replace("/sign-in");
    },
  });
}
