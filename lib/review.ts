export type FlashcardItem = {
  id: string;
  word: string;
  prompt: string;
  answer: string;
  interval: number;
  dueAt: number;
};

export const FLASHCARD_STORAGE_KEY = "adaptive-toeic-flashcards";

export const defaultFlashcards: FlashcardItem[] = [
  {
    id: "allocate",
    word: "allocate",
    prompt: "The manager will _____ budget to each team.",
    answer: "assign resources strategically",
    interval: 1,
    dueAt: Date.now(),
  },
  {
    id: "adjust",
    word: "adjust",
    prompt: "We need to _____ the schedule after the delay.",
    answer: "change to fit a new condition",
    interval: 1,
    dueAt: Date.now(),
  },
  {
    id: "confirm",
    word: "confirm",
    prompt: "Please _____ the reservation by email.",
    answer: "verify or make certain",
    interval: 1,
    dueAt: Date.now(),
  },
];

export function nextFlashcardInterval(currentInterval: number, quality: "hard" | "good" | "easy") {
  if (quality === "hard") return 1;
  if (quality === "good") return Math.min(currentInterval + 1, 6);
  return Math.min(currentInterval + 2, 8);
}

