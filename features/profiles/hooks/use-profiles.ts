import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { getCurrentProfile, type Profile } from "../services/profile";

export function useProfile() {
  const userId = pb.authStore.record?.id;

  return useQuery<Profile | null>({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: getCurrentProfile,
  });
}
