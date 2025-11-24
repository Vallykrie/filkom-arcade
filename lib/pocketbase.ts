import * as SecureStore from "expo-secure-store";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.EXPO_PUBLIC_PB_URL);

async function loadAuth() {
  try {
    const token = await SecureStore.getItemAsync("pb_auth");
    const model = await SecureStore.getItemAsync("pb_model");

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
    await SecureStore.deleteItemAsync("pb_auth");
    await SecureStore.deleteItemAsync("pb_model");
  } else {
    await SecureStore.setItemAsync("pb_auth", token);
    await SecureStore.setItemAsync("pb_model", JSON.stringify(model));
  }
});

export default pb;
