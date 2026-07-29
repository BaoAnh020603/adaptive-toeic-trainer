export type LibraryTopic = {
  title: string;
  focus: string;
  cards: string[];
};

export const libraryTopics: LibraryTopic[] = [
  {
    title: "Grammar",
    focus: "Fix the patterns that cost points fastest.",
    cards: ["Tenses", "Prepositions", "Relative clauses", "Agreement"],
  },
  {
    title: "Reading",
    focus: "Train speed, precision, and distractor detection.",
    cards: ["Part 5 traps", "Part 6 logic", "Part 7 scanning", "Inference"],
  },
  {
    title: "Vocabulary",
    focus: "Learn words through sentences instead of isolated lists.",
    cards: ["Office life", "Scheduling", "Marketing", "Email tone"],
  },
  {
    title: "Review",
    focus: "Revisit items that are weak, slow, or forgotten.",
    cards: ["Spaced repetition", "Fast recalls", "Missed items", "Streak repair"],
  },
];
