import pb from "@/lib/pocketbase";

export type Profile = {
  id: string;
  collectionId: string;
  collectionName: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const authRecord = pb.authStore.record as any;

  if (!authRecord) return null;

  return {
    id: authRecord.id,
    collectionId: authRecord.collectionId,
    collectionName: authRecord.collectionName,
    name: authRecord.name ?? null,
    email: authRecord.email ?? null,
    avatar: authRecord.avatar ?? null,
  };
}
