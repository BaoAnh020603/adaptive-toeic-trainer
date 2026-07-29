"use client";

import { useEffect, useMemo, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  defaultStudyProfile,
  type StudyProfile,
} from "../lib/study-profile";
import { deriveQuestFromProfile, deriveStudyModes } from "../lib/adaptive";

export function QuestPlayer() {
  const [profile, setProfile] = useState<StudyProfile>(defaultStudyProfile);
  const [started, setStarted] = useState(false);
  const [modeIndex, setModeIndex] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(STUDY_PROFILE_STORAGE_KEY);
    if (!saved) return;
    try {
      setProfile({ ...defaultStudyProfile, ...JSON.parse(saved) });
    } catch {
      window.localStorage.removeItem(STUDY_PROFILE_STORAGE_KEY);
    }
  }, []);

  const quest = useMemo(() => deriveQuestFromProfile(profile), [profile]);
  const modes = useMemo(() => deriveStudyModes(profile), [profile]);
  const activeMode = modes[modeIndex] ?? modes[0];

  return (
    <div className="diagnostic-panel">
      <div className="diagnostic-summary">
        <p className="card-kicker">Quest player</p>
        <h3>{started ? activeMode.title : quest.title}</h3>
        <p>
          {started
            ? activeMode.focus
            : quest.description}
        </p>
      </div>

      <div className="feature-grid">
        {modes.map((mode, index) => (
          <button
            key={mode.duration}
            className={`mini-card quest-mode ${index === modeIndex ? "active" : ""}`}
            onClick={() => setModeIndex(index)}
          >
            <span className="card-kicker">{mode.duration}</span>
            <h3>{mode.title}</h3>
            <p>{mode.focus}</p>
          </button>
        ))}
      </div>

      <div className="mini-card">
        <h3>Session plan</h3>
        <ul className="mode-list">
          {activeMode.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>

      <div className="hero-actions">
        <button className="primary-btn" onClick={() => setStarted(true)}>
          Start quest
        </button>
        <button className="secondary-btn" onClick={() => setStarted(false)}>
          Reset preview
        </button>
      </div>
    </div>
  );
}
