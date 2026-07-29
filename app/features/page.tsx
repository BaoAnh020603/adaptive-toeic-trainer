import type { Metadata } from "next";
import Link from "next/link";
import { AdaptiveSummary } from "../adaptive-summary";

const pillars = [
  {
    name: "Diagnostic mode",
    copy: "Start with five questions, then let the app infer which grammar and reading patterns need attention first.",
  },
  {
    name: "Overthinking index",
    copy: "Correct but slow answers are flagged so review time goes to confidence and speed, not just accuracy.",
  },
  {
    name: "3-tier explanation",
    copy: "A quick signal, a deep breakdown, and a pattern-matching example keep explanations useful at every pace.",
  },
  {
    name: "Contextual flashcards",
    copy: "Vocabulary is reviewed from sentence gaps, which trains real recall instead of memorizing isolated words.",
  },
];

export const metadata: Metadata = {
  title: "Features | Adaptive TOEIC Trainer",
  description:
    "Explore the diagnostic, adaptive, and review systems that make the trainer feel personal from the first minute.",
};

export default function FeaturesPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Designed as a personal study OS.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/#diagnostic">Diagnostic</Link>
          <Link href="/#quests">Quests</Link>
          <Link href="/library">Library</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">Product features</span>
          <h1 className="feature-title">
            Everything is tuned to what the learner actually needs next.
          </h1>
        </div>
        <p className="lead">
          This is not a static set of practice tests. It is a personalized
          workflow that spots weak points, schedules targeted drills, and
          compresses review time.
        </p>
      </section>

      <section className="feature-grid">
        {pillars.map((pillar) => (
          <article className="info-card feature-card" key={pillar.name}>
            <span className="card-kicker">Core system</span>
            <h2>{pillar.name}</h2>
            <p>{pillar.copy}</p>
          </article>
        ))}
      </section>

      <section className="section-block feature-banner">
        <div>
          <span className="eyebrow">Why it feels different</span>
          <h2>Every action pushes the next review forward.</h2>
        </div>
        <p>
          The app combines speed signals, mistake categories, and recall
          confidence to build a study loop that looks and feels uniquely yours.
        </p>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Live adaptive preview</span>
            <h2>What the user sees after a diagnostic run.</h2>
          </div>
        </div>
        <AdaptiveSummary />
      </section>
    </main>
  );
}
