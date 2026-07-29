import { STUDY_PROFILE_STORAGE_KEY, type StudyProfile } from "./study-profile";

export type SyncPack = {
  version: number;
  exportedAt: string;
  profile: StudyProfile;
};

export function exportSyncPack(profile: StudyProfile): string {
  const pack: SyncPack = {
    version: 1,
    exportedAt: new Date().toISOString(),
    profile,
  };

  return JSON.stringify(pack, null, 2);
}

export function importSyncPack(raw: string): StudyProfile | null {
  try {
    const parsed = JSON.parse(raw) as Partial<SyncPack>;
    if (!parsed.profile || typeof parsed.profile !== "object") return null;
    return parsed.profile as StudyProfile;
  } catch {
    return null;
  }
}

export function saveSyncPackToStorage(profile: StudyProfile) {
  window.localStorage.setItem(STUDY_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
