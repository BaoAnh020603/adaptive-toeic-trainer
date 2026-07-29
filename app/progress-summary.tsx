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

  return (
    <div className="diagnostic-panel">
      <div className="diagnostic-summary">
        <p className="card-kicker">Saved study profile</p>
        <h3>
          {profile.complete
            ? "You have a completed diagnostic snapshot."
            : "Your learning state is being tracked locally."}
        </h3>
        <p>
          Score {profile.score}/{profile.total} · Current step {profile.step + 1} ·
          Weak areas: {profile.weakAreas.join(", ")}
        </p>
      </div>
      <p className="supporting">
        This panel is built to later read from a real backend without changing
        the page layout.
      </p>
    </div>
  );
}
