import type { Metadata } from "next";
import Link from "next/link";

const progressCards = [
  { label: "Weekly accuracy", value: "84%", note: "Up 9% from last week" },
  { label: "Weak topics", value: "3", note: "Tenses, prepositions, synonyms" },
  { label: "Streak", value: "12 days", note: "Keep the habit alive" },
  { label: "Fast recalls", value: "26", note: "Answers under 10 seconds" },
];

const timeline = [
  { title: "Diagnostic complete", detail: "The app found your weak grammar patterns." },
  { title: "Quest assigned", detail: "You got a targeted 5-minute rescue mission." },
  { title: "Review scheduled", detail: "Missed items move into spaced repetition." },
];

export const metadata: Metadata = {
  title: "Progress | Adaptive TOEIC Trainer",
  description:
    "Track accuracy, streaks, weak topics, and adaptive learning progress in one view.",
};

export default function ProgressPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Personal progress, not just a list of tests.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/#interactive-diagnostic">Diagnostic</Link>
        </nav>
      </header>

      <section className="section-block progress-hero">
        <div>
          <span className="eyebrow">Progress dashboard</span>
          <h1 className="feature-title">
            See what improved, what slipped, and what should come next.
          </h1>
        </div>
        <p className="lead">
          This page turns learning into a visible loop. You can watch accuracy,
          streaks, and topic weakness evolve over time.
        </p>
      </section>

      <section className="progress-grid">
        {progressCards.map((card) => (
          <article className="info-card progress-card" key={card.label}>
            <span className="card-kicker">{card.label}</span>
            <h2>{card.value}</h2>
            <p>{card.note}</p>
          </article>
        ))}
      </section>

      <section className="section-block progress-section">
        <div>
          <span className="eyebrow">Next actions</span>
          <h2>Your adaptive learning timeline.</h2>
        </div>
        <div className="timeline">
          {timeline.map((item, index) => (
            <article className="timeline-item" key={item.title}>
              <span className="timeline-step">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
