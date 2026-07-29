import type { Metadata } from "next";
import Link from "next/link";
import { DiagnosticPanel } from "./diagnostic-panel";
import { onboardingSteps, productPrinciples } from "../lib/product";

const diagnostics = [
  {
    label: "Grammar drift",
    score: "62%",
    detail: "Relative clauses, tense matching, prepositions",
  },
  {
    label: "Reading traps",
    score: "41%",
    detail: "Distractors, synonym confusion, detail scanning",
  },
  {
    label: "Vocabulary recall",
    score: "78%",
    detail: "Contextual recall, phrasal verbs, office themes",
  },
];

const quests = [
  {
    title: "5-minute grammar rescue",
    description: "Adaptive drills for the mistakes you repeat most.",
    meta: "12 questions",
  },
  {
    title: "Part 5 trap breaker",
    description: "Time pressure + explanation tiers + pattern matching.",
    meta: "Focus mode",
  },
  {
    title: "Office vocab sprint",
    description: "Spaced repetition cards built from real sentence gaps.",
    meta: "1 minute review",
  },
];

const heatmap = [
  { topic: "Tenses", intensity: 92, label: "Critical" },
  { topic: "Prepositions", intensity: 74, label: "Weak" },
  { topic: "Collocations", intensity: 51, label: "Mixed" },
  { topic: "Reading detail", intensity: 39, label: "Stable" },
  { topic: "Synonyms", intensity: 66, label: "Weak" },
  { topic: "Email vocabulary", intensity: 28, label: "Strong" },
];

const flashcards = [
  {
    word: "allocate",
    hint: "The manager will _____ budget to each team.",
    answer: "assign resources strategically",
  },
  {
    word: "adjust",
    hint: "We need to _____ the schedule after the delay.",
    answer: "change to fit a new condition",
  },
  {
    word: "confirm",
    hint: "Please _____ the reservation by email.",
    answer: "verify or make certain",
  },
];

export const metadata: Metadata = {
  title: "Adaptive TOEIC Trainer",
  description:
    "A personalized TOEIC trainer that diagnoses weak spots, detects overthinking, and builds adaptive study quests.",
};

export default function Home() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Built for personal weak-point recovery.</span>
        </div>
        <nav className="site-nav">
          <Link href="#diagnostic">Diagnostic</Link>
          <Link href="#quests">Quests</Link>
          <Link href="/onboarding">Onboarding</Link>
          <Link href="/about">About</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/features">Features</Link><Link href="/library">Library</Link>
        </nav>
      </header>

      <section className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Adaptive & focus-driven TOEIC trainer</span>
          <h1>
            Study less.
            <br />
            Target the exact weakness.
          </h1>
          <p className="lead">
            A one-of-one exam assistant that diagnoses gaps, detects overthinking,
            and turns every wrong answer into a personalized study path.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#interactive-diagnostic">
              Start diagnostic mode
            </a>
            <Link className="secondary-btn" href="/features">
              View features
            </Link>
          </div>
          <div className="hero-metrics">
            <div>
              <strong>5</strong>
              <span>diagnostic questions</span>
            </div>
            <div>
              <strong>3 tiers</strong>
              <span>of explanation depth</span>
            </div>
            <div>
              <strong>FSRS+</strong>
              <span>vocab review engine</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-top">
            <div>
              <p className="card-kicker">Weakness heatmap</p>
              <h2>Personal progress OS</h2>
            </div>
            <div className="streak-pill">
              <span>Streak</span>
              <strong>12 days</strong>
            </div>
          </div>

          <div className="heatmap-grid" aria-label="Weakness heatmap">
            {heatmap.map((item) => (
              <article key={item.topic} className="heatmap-cell">
                <div className="heatmap-label">
                  <span>{item.topic}</span>
                  <strong>{item.label}</strong>
                </div>
                <div className="bar-track" aria-hidden="true">
                  <div
                    className="bar-fill"
                    style={{ width: `${item.intensity}%` }}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="card-panel">
            <p className="card-kicker">Overthinking index</p>
            <div className="overthinking">
              <strong>74</strong>
              <span>Good answer, but too slow</span>
            </div>
            <p className="supporting">
              Fast + correct means mastery. Slow + correct gets flagged as
              uncertain recall so the system can schedule a sharper review.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block" id="diagnostic">
        <div className="section-head">
          <div>
            <span className="eyebrow">Diagnostic snapshot</span>
            <h2>Find the gap before you waste time on the whole set.</h2>
          </div>
          <p>
            The first five questions map your response speed, mistake type, and
            confidence profile, then build the next mini-test automatically.
          </p>
        </div>

        <div className="diagnostic-grid">
          {diagnostics.map((item) => (
            <article className="info-card" key={item.label}>
              <span className="info-score">{item.score}</span>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="interactive-diagnostic">
        <div className="section-head">
          <div>
            <span className="eyebrow">Interactive diagnostic</span>
            <h2>Tap through a short test and watch the study path adapt.</h2>
          </div>
          <p>
            This is the first live behavior in the product, so the landing page
            is no longer just a brochure.
          </p>
        </div>
        <DiagnosticPanel />
      </section>

      <section className="section-block split-layout">
        <div>
          <span className="eyebrow">Product principles</span>
          <h2>What keeps the product healthy as it grows.</h2>
        </div>
        <div className="principles-list">
          {productPrinciples.map((item) => (
            <article className="mini-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Getting started</span>
            <h2>Onboarding that teaches the app how to help you.</h2>
          </div>
          <Link className="secondary-btn" href="/onboarding">
            Open onboarding
          </Link>
        </div>
        <div className="timeline">
          {onboardingSteps.map((item, index) => (
            <article className="timeline-item" key={item.title}>
              <span className="timeline-step">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block split-layout" id="quests">
        <div>
          <span className="eyebrow">Dynamic quests</span>
          <h2>Replace static sets with missions that match the learner's state.</h2>
        </div>

        <div className="quest-list">
          {quests.map((quest) => (
            <article className="quest-card" key={quest.title}>
              <div>
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
              </div>
              <span>{quest.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block split-layout reverse">
        <div className="flashcard-stack">
          {flashcards.map((card, index) => (
            <article
              className="flashcard"
              key={card.word}
              style={{ transform: `translateX(${index * 12}px) rotate(${index * 1.4}deg)` }}
            >
              <span className="card-kicker">Contextual recall</span>
              <h3>{card.word}</h3>
              <p>{card.hint}</p>
              <strong>{card.answer}</strong>
            </article>
          ))}
        </div>

        <div>
          <span className="eyebrow">Flashcard engine</span>
          <h2>Review vocabulary from a sentence gap, not a flat word list.</h2>
          <p className="supporting">
            This is built for speed review, keyboard-first practice, and spaced
            repetition that adapts to recall difficulty.
          </p>

          <div className="explanation-card">
            <p className="card-kicker">3-tier explanation</p>
            <ol>
              <li>
                <strong>Key takeaway:</strong> one signal that solves the question
                quickly.
              </li>
              <li>
                <strong>Deep dive:</strong> translation, why distractors fail, and
                the grammar rule.
              </li>
              <li>
                <strong>Pattern match:</strong> one similar example to transfer the
                skill immediately.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
