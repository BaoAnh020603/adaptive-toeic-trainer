import type { StudyProfile } from "./study-profile";

export type AdaptiveQuest = {
  title: string;
  description: string;
  meta: string;
};

export type ReviewCard = {
  title: string;
  prompt: string;
  answer: string;
};

export function deriveQuestFromProfile(profile: StudyProfile): AdaptiveQuest {
  const topWeakArea = profile.weakAreas[0] ?? "general review";

  if (profile.complete && profile.score === profile.total) {
    return {
      title: "Mastery maintenance",
      description:
        "Keep the streak alive with a short mixed review that protects what is already strong.",
      meta: "3-minute refresh",
    };
  }

  if (profile.missedCount > 0) {
    return {
      title: `${topWeakArea} recovery`,
      description:
        "Go back to the exact error pattern and remove the trap before it repeats.",
      meta: `${profile.missedCount} errors logged`,
    };
  }

  if (profile.slowHits > 0) {
    return {
      title: "Overthinking breaker",
      description:
        "Focus on fast recognition drills so correct answers become automatic.",
      meta: `${profile.slowHits} slow hits`,
    };
  }

  return {
    title: "Warm-up quest",
    description:
      "Start with a short adaptive drill and let the system learn what to target next.",
    meta: "5 questions",
  };
}

export function deriveReviewCards(profile: StudyProfile): ReviewCard[] {
  const seed = profile.weakAreas.length ? profile.weakAreas : ["grammar", "reading", "vocabulary"];

  return seed.slice(0, 3).map((topic) => ({
    title: topic,
    prompt: `Review the sentence gap that exposes ${topic}.`,
    answer: "Recall the missing pattern from context.",
  }));
}

