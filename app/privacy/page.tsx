import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | Adaptive TOEIC Trainer",
  description:
    "A plain-language privacy page for users who want to know how learning data is handled.",
};

const policies = [
  "Progress is stored locally in the browser until server storage is introduced.",
  "We only collect the minimum data needed to personalize practice.",
  "Future account features should clearly separate profile data from learning analytics.",
  "Any public release should include a real privacy policy and contact path.",
];

export default function PrivacyPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Privacy-first by design.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/onboarding">Onboarding</Link>
          <Link href="/terms">Terms</Link><Link href="/library">Library</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">Privacy</span>
          <h1 className="feature-title">
            Clear rules now so public launch can stay trustworthy later.
          </h1>
        </div>
        <p className="lead">
          This page is a foundation for public release. It keeps the product
          honest about what data is stored today and what should change once a
          backend is added.
        </p>
      </section>

      <section className="feature-grid">
        {policies.map((policy) => (
          <article className="info-card feature-card" key={policy}>
            <span className="card-kicker">Policy</span>
            <h2>Learning data</h2>
            <p>{policy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
