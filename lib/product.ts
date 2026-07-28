export type StudyQuest = {
  title: string;
  description: string;
  meta: string;
};

export type ProgressSnapshot = {
  label: string;
  value: string;
  note: string;
};

export const productPrinciples = [
  {
    title: "Personalized from first use",
    description:
      "The app should infer weakness patterns quickly and shape the next practice loop around them.",
  },
  {
    title: "Progress is visible",
    description:
      "Users should always know what improved, what slipped, and what to do next.",
  },
  {
    title: "Storage is replaceable",
    description:
      "Local persistence works today, while the data model stays ready for a server later.",
  },
] as const;

export const onboardingSteps = [
  {
    title: "Take the diagnostic",
    description: "Answer a short starter test to identify the first weak topics.",
  },
  {
    title: "Follow the quests",
    description: "The app will surface short, focused practice sessions that match your level.",
  },
  {
    title: "Review and repeat",
    description: "Track progress, revisit missed patterns, and keep the streak alive.",
  },
] as const;

export const publicRoadmap = [
  {
    phase: "MVP",
    items: ["Diagnostic", "Quests", "Progress dashboard", "Local persistence"],
  },
  {
    phase: "Public beta",
    items: ["User accounts", "Server storage", "Question bank scaling", "Analytics"],
  },
  {
    phase: "Launch",
    items: ["Pricing", "Email onboarding", "Feedback loop", "Content ops"],
  },
] as const;
