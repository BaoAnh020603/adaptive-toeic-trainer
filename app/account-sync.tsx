"use client";

import { useEffect, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  defaultStudyProfile,
  type StudyProfile,
} from "../lib/study-profile";
import { exportSyncPack, importSyncPack } from "../lib/sync";

export function AccountSync() {
  const [profile, setProfile] = useState<StudyProfile>(defaultStudyProfile);
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState("Ready to export your local study profile.");

  useEffect(() => {
    const saved = window.localStorage.getItem(STUDY_PROFILE_STORAGE_KEY);
    if (!saved) return;

    try {
      setProfile({ ...defaultStudyProfile, ...JSON.parse(saved) });
    } catch {
      window.localStorage.removeItem(STUDY_PROFILE_STORAGE_KEY);
    }
  }, []);

  const handleExport = () => {
    const pack = exportSyncPack(profile);
    setRaw(pack);
    setStatus("Sync pack generated. Copy it or keep it as a backup.");
  };

  const handleImport = () => {
    const imported = importSyncPack(raw);
    if (!imported) {
      setStatus("That sync pack could not be read.");
      return;
    }

    window.localStorage.setItem(
      STUDY_PROFILE_STORAGE_KEY,
      JSON.stringify(imported),
    );
    setProfile(imported);
    setStatus("Sync pack imported and stored locally.");
  };

  return (
    <div className="diagnostic-panel">
      <div className="diagnostic-summary">
        <p className="card-kicker">Sync pack</p>
        <h3>Prepare for backend sync without changing the UI later.</h3>
        <p>{status}</p>
      </div>

      <div className="progress-summary-grid">
        <article className="mini-card">
          <h3>Local profile</h3>
          <p>Score {profile.score}/{profile.total} · Streak {profile.streak}</p>
        </article>
        <article className="mini-card">
          <h3>Portability</h3>
          <p>Export now, or swap the storage layer to cloud sync later.</p>
        </article>
      </div>

      <textarea
        className="sync-textarea"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="Exported sync pack will appear here."
        rows={10}
      />

      <div className="hero-actions">
        <button className="primary-btn" onClick={handleExport}>
          Export sync pack
        </button>
        <button className="secondary-btn" onClick={handleImport}>
          Import sync pack
        </button>
      </div>
    </div>
  );
}
