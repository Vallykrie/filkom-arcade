import pb from "@/lib/pocketbase";

export async function loginUser(identity: string, password: string) {
  const baseUrl = process.env.EXPO_PUBLIC_PB_URL || "";
  
  const response = await fetch(`${baseUrl}/api/collections/users/auth-with-ub`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identity,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Authentication failed");
  }

  const data = await response.json();
  
  if (data.token && data.record) {
    pb.authStore.save(data.token, data.record);
  }
  
  return data;
}

export async function logoutUser() {
  pb.authStore.clear();
}
