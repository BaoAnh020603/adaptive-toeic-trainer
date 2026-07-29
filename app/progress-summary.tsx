"use client";

import { useEffect, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  defaultStudyProfile,
  type StudyProfile,
} from "../lib/study-profile";

export function ProgressSummary() {
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

  const weakAreas = profile.weakAreas.length
    ? profile.weakAreas.join(", ")
    : "none recorded yet";

  return (
    <div className="diagnostic-panel">
      <div className="diagnostic-summary">
        <p className="card-kicker">Saved study profile</p>
        <h3>
          {profile.complete
            ? "Your last diagnostic is saved locally."
            : "Your learning state is being tracked locally."}
        </h3>
        <p>
          Score {profile.score}/{profile.total} · Current step {profile.step + 1} ·
          Weak areas: {weakAreas}
        </p>
      </div>
      <div className="progress-summary-grid">
        <article className="mini-card">
          <h3>Slow hits</h3>
          <p>{profile.slowHits} answers were correct but slow enough to flag.</p>
        </article>
        <article className="mini-card">
          <h3>Missed count</h3>
          <p>{profile.missedCount} questions were wrong and added to weak review.</p>
        </article>
      </div>
      <p className="supporting">
        This panel is built to later read from a real backend without changing
        the page layout.
      </p>
    </div>
  );
}
