"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultFlashcards,
  FLASHCARD_STORAGE_KEY,
  nextFlashcardInterval,
  type FlashcardItem,
} from "../lib/review";

function loadFlashcards(): FlashcardItem[] {
  if (typeof window === "undefined") return defaultFlashcards;
  const saved = window.localStorage.getItem(FLASHCARD_STORAGE_KEY);
  if (!saved) return defaultFlashcards;

  try {
    const parsed = JSON.parse(saved) as FlashcardItem[];
    return parsed.length ? parsed : defaultFlashcards;
  } catch {
    return defaultFlashcards;
  }
}

export function FlashcardEngine() {
  const [cards, setCards] = useState<FlashcardItem[]>(defaultFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [readyAt, setReadyAt] = useState(Date.now());

  useEffect(() => {
    setCards(loadFlashcards());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const orderedCards = useMemo(
    () => [...cards].sort((left, right) => left.dueAt - right.dueAt),
    [cards],
  );

  const currentCard = orderedCards[currentIndex % orderedCards.length];
  const dueLabel =
    currentCard.dueAt <= Date.now() ? "Due now" : new Date(currentCard.dueAt).toLocaleDateString();

  const gradeCard = (quality: "hard" | "good" | "easy") => {
    setCards((current) =>
      current.map((card) =>
        card.id === currentCard.id
          ? {
              ...card,
              interval: nextFlashcardInterval(card.interval, quality),
              dueAt:
                Date.now() +
                nextFlashcardInterval(card.interval, quality) * 24 * 60 * 60 * 1000,
            }
          : card,
      ),
    );
    setShowAnswer(false);
    setCurrentIndex((value) => value + 1);
    setReadyAt(Date.now());
  };

  return (
    <div className="diagnostic-panel">
      <div className="diagnostic-header">
        <div>
          <p className="card-kicker">Speed review</p>
          <h3>{currentCard.word}</h3>
          <p className="supporting">Next review: {dueLabel}</p>
        </div>
        <span>{currentIndex + 1}/{orderedCards.length}</span>
      </div>

      <div className="mini-card">
        <h3>{currentCard.prompt}</h3>
        {showAnswer ? <p>{currentCard.answer}</p> : <p>Flip to recall the missing meaning.</p>}
      </div>

      <div className="hero-actions">
        <button className="secondary-btn" onClick={() => setShowAnswer((value) => !value)}>
          {showAnswer ? "Hide answer" : "Show answer"}
        </button>
        <button className="secondary-btn" onClick={() => gradeCard("hard")}>
          Hard
        </button>
        <button className="secondary-btn" onClick={() => gradeCard("good")}>
          Good
        </button>
        <button className="primary-btn" onClick={() => gradeCard("easy")}>
          Easy
        </button>
      </div>

      <p className="supporting">
        Card updated {Math.max(0, Math.round((Date.now() - readyAt) / 1000))} seconds ago.
      </p>
    </div>
  );
}
