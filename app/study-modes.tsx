"use client";

import { useEffect, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  defaultStudyProfile,
  type StudyProfile,
} from "../lib/study-profile";
import { deriveStudyModes } from "../lib/adaptive";

export function StudyModes() {
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

  const modes = deriveStudyModes(profile);

  return (
    <div className="feature-grid">
      {modes.map((mode) => (
        <article className="info-card feature-card" key={mode.duration}>
          <span className="card-kicker">{mode.duration}</span>
          <h2>{mode.title}</h2>
          <p>{mode.focus}</p>
          <ul className="mode-list">
            {mode.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
