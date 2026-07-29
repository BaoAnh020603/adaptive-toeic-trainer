"use client";

import { useEffect, useMemo, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  defaultStudyProfile,
  type StudyProfile,
} from "../lib/study-profile";

function getIntensity(label: string, weakAreas: string[]) {
  return weakAreas.includes(label) ? 86 : 24;
}

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
    ? profile.weakAreas
    : ["tenses", "prepositions", "reading detail"];

  const overthinkingIndex = useMemo(() => {
    const attempts = profile.score + profile.missedCount;
    if (!attempts) return 0;
    return Math.min(100, Math.round((profile.slowHits / attempts) * 100));
  }, [profile.missedCount, profile.score, profile.slowHits]);

  const heatmap = [
    "tenses",
    "prepositions",
    "reading detail",
    "grammar patterns",
    "vocabulary",
  ];

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
          Overthinking index {overthinkingIndex}/100
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

      <div className="mini-card">
        <h3>Weakness heatmap</h3>
        <div className="heatmap-grid compact">
          {heatmap.map((topic) => (
            <div className="heatmap-cell" key={topic}>
              <div className="heatmap-label">
                <span>{topic}</span>
                <strong>{getIntensity(topic, weakAreas)}%</strong>
              </div>
              <div className="bar-track" aria-hidden="true">
                <div
                  className="bar-fill"
                  style={{ width: `${getIntensity(topic, weakAreas)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="supporting">
        This panel is built to later read from a real backend without changing
        the page layout.
      </p>
    </div>
  );
}
