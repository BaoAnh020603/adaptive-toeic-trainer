import type { Metadata } from "next";
import Link from "next/link";
import { releaseStages } from "../../lib/learning";

export const metadata: Metadata = {
  title: "Roadmap | Adaptive TOEIC Trainer",
  description:
    "A clear product roadmap for the long-term growth of the adaptive TOEIC platform.",
};

export default function RoadmapPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Long-term product direction in one place.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/onboarding">Onboarding</Link>
          <Link href="/library">Library</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">Roadmap</span>
          <h1 className="feature-title">
            Designed to evolve from MVP to public launch.
          </h1>
        </div>
        <p className="lead">
          The roadmap is intentionally simple so you can keep shipping without
          losing focus on the core learning loop.
        </p>
      </section>

      <section className="feature-grid">
        {releaseStages.map((phase) => (
          <article className="info-card feature-card" key={phase.stage}>
            <span className="card-kicker">{phase.stage}</span>
            <h2>{phase.items[0]}</h2>
            <p>{phase.items.slice(1).join(" · ")}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
