"use client";

import { useEffect, useMemo, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  createStudyProfilePatch,
  type StudyProfile,
} from "../lib/study-profile";

type DiagnosticQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  takeaway: string;
  weakArea: string;
};

const questions: DiagnosticQuestion[] = [
  {
    prompt: "Last week, the team _____ a new training schedule.",
    options: ["introduces", "introduced", "has introduced"],
    answer: 1,
    takeaway: "Last week signals past simple.",
    weakArea: "tenses",
  },
  {
    prompt: "The report was sent _____ email to all managers.",
    options: ["by", "in", "on"],
    answer: 0,
    takeaway: "Use by email for delivery method.",
    weakArea: "prepositions",
  },
  {
    prompt: "Please _____ the meeting room before 2 p.m.",
    options: ["reserve", "reserved", "reserving"],
    answer: 0,
    takeaway: "Base verb follows please.",
    weakArea: "grammar patterns",
  },
];

const SLOW_THRESHOLD_MS = 14000;

export function DiagnosticPanel() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [slowHits, setSlowHits] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    const saved = window.localStorage.getItem(STUDY_PROFILE_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<StudyProfile>;
      if (typeof parsed.step === "number") setStep(parsed.step);
      if (typeof parsed.score === "number") setScore(parsed.score);
      if (typeof parsed.complete === "boolean") setComplete(parsed.complete);
      if (Array.isArray(parsed.weakAreas)) setWeakAreas(parsed.weakAreas);
      if (typeof parsed.slowHits === "number") setSlowHits(parsed.slowHits);
      if (typeof parsed.missedCount === "number") setMissedCount(parsed.missedCount);
    } catch {
      window.localStorage.removeItem(STUDY_PROFILE_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STUDY_PROFILE_STORAGE_KEY,
      JSON.stringify(
        createStudyProfilePatch({
          step,
          score,
          complete,
          total: questions.length,
          weakAreas,
          slowHits,
          missedCount,
        }),
      ),
    );
  }, [complete, missedCount, score, slowHits, step, weakAreas]);

  const current = questions[step];
  const elapsedMs = useMemo(
    () => Date.now() - startedAt,
    [startedAt, step, selected],
  );
  const progress = useMemo(
    () => ((step + (complete ? 1 : 0)) / questions.length) * 100,
    [step, complete],
  );
  const overthinkingIndex = useMemo(() => {
    const attempts = score + missedCount;
    if (!attempts) return 0;
    return Math.min(100, Math.round((slowHits / attempts) * 100));
  }, [missedCount, score, slowHits]);

  const handleChoice = (choice: number) => {
    if (selected !== null || complete) return;
    const isCorrect = choice === current.answer;
    const newElapsed = Date.now() - startedAt;
    setSelected(choice);

    if (isCorrect) {
      setScore((value) => value + 1);
      if (newElapsed > SLOW_THRESHOLD_MS) {
        setSlowHits((value) => value + 1);
      }
    } else {
      setMissedCount((value) => value + 1);
      setWeakAreas((value) => Array.from(new Set([...value, current.weakArea])));
    }
  };

  const next = () => {
    const nextStep = step + 1;
    if (nextStep < questions.length) {
      setStep(nextStep);
      setSelected(null);
      setStartedAt(Date.now());
      return;
    }

    setComplete(true);
  };

  const reset = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setComplete(false);
    setWeakAreas([]);
    setSlowHits(0);
    setMissedCount(0);
    setStartedAt(Date.now());
    window.localStorage.removeItem(STUDY_PROFILE_STORAGE_KEY);
  };

  if (complete) {
    return (
      <div className="diagnostic-panel">
        <div className="diagnostic-summary">
          <p className="card-kicker">Diagnostic complete</p>
          <h3>Your personal study profile is ready.</h3>
          <p>
            Score: {score}/{questions.length}. Slow hits: {slowHits}. Misses:{" "}
            {missedCount}. Overthinking index: {overthinkingIndex}/100.
          </p>
          <p className="supporting">
            Next quest focus:{" "}
            {(weakAreas.length ? weakAreas : ["speed recovery", "precision"]).join(", ")}.
          </p>
        </div>
        <button className="primary-btn" onClick={reset}>
          Restart diagnostic
        </button>
      </div>
    );
  }

  return (
    <div className="diagnostic-panel">
      <div className="diagnostic-header">
        <div>
          <p className="card-kicker">Interactive diagnostic</p>
          <h3>{current.prompt}</h3>
          <p className="supporting">
            Weak area: {current.weakArea} · This question is helping build your profile.
          </p>
        </div>
        <span>
          {step + 1}/{questions.length}
        </span>
      </div>

      <div className="bar-track diagnostic-track" aria-hidden="true">
        <div className="bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="diagnostic-options">
        {current.options.map((option, index) => {
          const isCorrect = index === current.answer;
          const isActive = selected === index;
          const className = [
            "diagnostic-option",
            isActive && (isCorrect ? "correct" : "incorrect"),
            selected !== null && isCorrect ? "correct" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={option}
              className={className}
              onClick={() => handleChoice(index)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null ? (
        <div className="diagnostic-feedback">
          <strong>{selected === current.answer ? "Correct" : "Not quite"}</strong>
          <p>{current.takeaway}</p>
          <p className="supporting">
            {elapsedMs > SLOW_THRESHOLD_MS
              ? "This answer was slow enough to count toward overthinking."
              : "This response speed helps shape the next review."}
          </p>
          <button className="secondary-btn" onClick={next}>
            {step + 1 < questions.length ? "Next question" : "Finish diagnostic"}
          </button>
        </div>
      ) : (
        <p className="supporting">Choose one answer to reveal the key takeaway.</p>
      )}
    </div>
  );
}
