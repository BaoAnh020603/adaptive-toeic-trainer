"use client";

import { useEffect, useMemo, useState } from "react";
import {
  STUDY_PROFILE_STORAGE_KEY,
  createStudyProfilePatch,
  type StudyProfile,
} from "../lib/study-profile";

const questions = [
  {
    prompt: "Last week, the team _____ a new training schedule.",
    options: ["introduces", "introduced", "has introduced"],
    answer: 1,
    takeaway: "Last week signals past simple.",
  },
  {
    prompt: "The report was sent _____ email to all managers.",
    options: ["by", "in", "on"],
    answer: 0,
    takeaway: "Use by email for delivery method.",
  },
  {
    prompt: "Please _____ the meeting room before 2 p.m.",
    options: ["reserve", "reserved", "reserving"],
    answer: 0,
    takeaway: "Base verb follows please.",
  },
] as const;

export function DiagnosticPanel() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("adaptive-toeic-diagnostic");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<StudyProfile>;

      if (typeof parsed.step === "number") setStep(parsed.step);
      if (typeof parsed.score === "number") setScore(parsed.score);
      if (typeof parsed.complete === "boolean") setComplete(parsed.complete);
    } catch {
      window.localStorage.removeItem("adaptive-toeic-diagnostic");
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
        }),
      ),
    );
  }, [complete, score, step]);

  const current = questions[step];
  const progress = useMemo(() => ((step + (complete ? 1 : 0)) / questions.length) * 100, [step, complete]);

  const handleChoice = (choice: number) => {
    if (selected !== null || complete) return;
    setSelected(choice);
    if (choice === current.answer) setScore((value) => value + 1);
  };

  const next = () => {
    if (step + 1 < questions.length) {
      setStep((value) => value + 1);
      setSelected(null);
      return;
    }

    setComplete(true);
  };

  const reset = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setComplete(false);
    window.localStorage.removeItem(STUDY_PROFILE_STORAGE_KEY);
  };

  if (complete) {
    return (
      <div className="diagnostic-panel">
        <div className="diagnostic-summary">
          <p className="card-kicker">Diagnostic complete</p>
          <h3>Your personal study profile is ready.</h3>
          <p>
            Score: {score}/{questions.length}. The next quest would focus on
            past tense, prepositions, and fast recall.
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
        </div>
        <span>{step + 1}/{questions.length}</span>
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
