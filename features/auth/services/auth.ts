import pb from "@/lib/pocketbase";

export async function loginUser(email: string, password: string) {
  return await pb.collection("users").authWithPassword(email, password);
}

export async function logoutUser() {
  pb.authStore.clear();
}
