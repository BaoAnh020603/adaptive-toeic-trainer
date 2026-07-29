"use client";

import { useEffect, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  defaultStudyProfile,
  type StudyProfile,
} from "../lib/study-profile";
import { deriveQuestFromProfile, deriveReviewCards } from "../lib/adaptive";

export function AdaptiveSummary() {
  const [profile, setProfile] = useState<StudyProfile>(defaultStudyProfile);

  useEffect(() => {
    const saved = window.localStorage.getItem(STUDY_PROFILE_STORAGE_KEY);
    if (!saved) return;

    try {
      setProfile({ ...defaultStudyProfile, ...JSON.parse(saved) });
    } catch {
      window.localStorage.removeItem(STUDY_PROFILE_STORAGE_KEY);
    }
  }, []);

  const quest = deriveQuestFromProfile(profile);
  const cards = deriveReviewCards(profile);

  return (
    <div className="feature-grid">
      <article className="info-card feature-card">
        <span className="card-kicker">Next quest</span>
        <h2>{quest.title}</h2>
        <p>{quest.description}</p>
        <strong>{quest.meta}</strong>
      </article>
      <article className="info-card feature-card">
        <span className="card-kicker">Review queue</span>
        <h2>Sentence-gap flashcards</h2>
        <div className="mini-stack">
          {cards.map((card) => (
            <div className="mini-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.prompt}</p>
              <strong>{card.answer}</strong>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
