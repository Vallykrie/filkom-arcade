import * as SecureStore from "expo-secure-store";
import PocketBase from "pocketbase";
import { Platform } from "react-native";

const pb = new PocketBase(process.env.EXPO_PUBLIC_PB_URL);

// Storage helper that works on both native and web
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async deleteItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

async function loadAuth() {
  try {
    const token = await storage.getItem("pb_auth");
    const model = await storage.getItem("pb_model");

    if (token && model) {
      pb.authStore.save(token, JSON.parse(model));
    }
  } catch (err) {
    console.log("restore auth failed", err);
  }
}

loadAuth();

pb.authStore.onChange(async (token, model) => {
  if (!token) {
    await storage.deleteItem("pb_auth");
    await storage.deleteItem("pb_model");
  } else {
    await storage.setItem("pb_auth", token);
    await storage.setItem("pb_model", JSON.stringify(model));
  }
});

export default pb;
