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

export type StudyMode = {
  duration: string;
  title: string;
  focus: string;
  tasks: string[];
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

export function deriveStudyModes(profile: StudyProfile): StudyMode[] {
  const quest = deriveQuestFromProfile(profile);
  const primaryWeakArea = profile.weakAreas[0] ?? "mixed review";

  return [
    {
      duration: "5 minutes",
      title: "Quick rescue",
      focus: quest.title,
      tasks: [
        `1 diagnostic question from ${primaryWeakArea}`,
        "1 contextual flashcard sprint",
        "1 explanation recap",
      ],
    },
    {
      duration: "10 minutes",
      title: "Focus drill",
      focus: `Recover ${primaryWeakArea} and cut overthinking`,
      tasks: [
        "2 targeted grammar questions",
        "2 speed recalls",
        "1 mistake review",
      ],
    },
    {
      duration: "15 minutes",
      title: "Deep training",
      focus: "Build consistency across weak areas",
      tasks: [
        "Mini diagnostic loop",
        "Adaptive quest block",
        "Flashcard review with spaced repetition",
      ],
    },
  ];
}
