import type { Metadata } from "next";
import Link from "next/link";
import { onboardingSteps, publicRoadmap } from "../../lib/product";

export const metadata: Metadata = {
  title: "Onboarding | Adaptive TOEIC Trainer",
  description:
    "A simple onboarding flow that prepares new users for diagnostic practice and adaptive study.",
};

export default function OnboardingPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Help new users get value in the first 2 minutes.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">Onboarding</span>
          <h1 className="feature-title">
            Teach the app who the user is and what they need.
          </h1>
        </div>
        <p className="lead">
          The onboarding flow should reduce friction, capture intent, and point
          the learner toward the right first practice path.
        </p>
      </section>

      <section className="timeline">
        {onboardingSteps.map((step, index) => (
          <article className="timeline-item" key={step.title}>
            <span className="timeline-step">0{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Roadmap</span>
            <h2>What gets added as the product grows.</h2>
          </div>
        </div>
        <div className="feature-grid">
          {publicRoadmap.map((phase) => (
            <article className="info-card feature-card" key={phase.phase}>
              <span className="card-kicker">{phase.phase}</span>
              <h2>{phase.items[0]}</h2>
              <p>{phase.items.slice(1).join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
