export type LearningStat = {
  label: string;
  value: string;
  note: string;
};

export type LearningMilestone = {
  title: string;
  detail: string;
};

export const learningStats: LearningStat[] = [
  { label: "Weekly accuracy", value: "84%", note: "Up 9% from last week" },
  { label: "Weak topics", value: "3", note: "Tenses, prepositions, synonyms" },
  { label: "Streak", value: "12 days", note: "Keep the habit alive" },
  { label: "Fast recalls", value: "26", note: "Answers under 10 seconds" },
];

export const learningMilestones: LearningMilestone[] = [
  {
    title: "Diagnostic complete",
    detail: "The app found your weak grammar patterns.",
  },
  {
    title: "Quest assigned",
    detail: "You got a targeted 5-minute rescue mission.",
  },
  {
    title: "Review scheduled",
    detail: "Missed items move into spaced repetition.",
  },
];

export const releaseStages = [
  {
    stage: "Private alpha",
    items: ["Local progress", "Diagnostic flow", "Core dashboard"],
  },
  {
    stage: "Public beta",
    items: ["User accounts", "Cloud persistence", "Question tagging"],
  },
  {
    stage: "Launch",
    items: ["Feedback loop", "Pricing", "Content operations"],
  },
] as const;
