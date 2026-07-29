export type StudyProfile = {
  score: number;
  total: number;
  step: number;
  complete: boolean;
  weakAreas: string[];
  slowHits: number;
  missedCount: number;
  streak: number;
  sessions: StudySession[];
  updatedAt: string;
};

export type StudySession = {
  date: string;
  score: number;
  total: number;
  slowHits: number;
  missedCount: number;
  weakAreas: string[];
};

export const STUDY_PROFILE_STORAGE_KEY = "adaptive-toeic-study-profile";

export const defaultStudyProfile: StudyProfile = {
  score: 0,
  total: 3,
  step: 0,
  complete: false,
  weakAreas: ["tenses", "prepositions", "reading detail"],
  slowHits: 0,
  missedCount: 0,
  streak: 1,
  sessions: [],
  updatedAt: new Date().toISOString(),
};

export function createStudyProfilePatch(
  partial: Partial<StudyProfile>,
): StudyProfile {
  return {
    ...defaultStudyProfile,
    ...partial,
    updatedAt: new Date().toISOString(),
  };
}
