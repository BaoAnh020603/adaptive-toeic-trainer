import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms | Adaptive TOEIC Trainer",
  description:
    "Plain-language terms for a future public release of the adaptive TOEIC platform.",
};

const terms = [
  "The product is currently provided as-is for learning and evaluation.",
  "Users should not rely on the app as the only source of exam preparation.",
  "Future public launch should include explicit pricing, support, and refund terms.",
  "Any account or progress data should be treated as user-owned learning history.",
];

export default function TermsPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Simple terms for a product that will grow.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/roadmap">Roadmap</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">Terms</span>
          <h1 className="feature-title">
            Keep the rules understandable before the audience gets bigger.
          </h1>
        </div>
        <p className="lead">
          These terms are a placeholder foundation for a real public release.
          They help set expectations without hiding behind legal noise.
        </p>
      </section>

      <section className="feature-grid">
        {terms.map((term) => (
          <article className="info-card feature-card" key={term}>
            <span className="card-kicker">Term</span>
            <h2>Plain language</h2>
            <p>{term}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
