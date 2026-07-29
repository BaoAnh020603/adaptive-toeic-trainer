import type { Metadata } from "next";
import Link from "next/link";
import { productPrinciples } from "../../lib/product";

export const metadata: Metadata = {
  title: "About | Adaptive TOEIC Trainer",
  description:
    "Learn the product vision behind the adaptive TOEIC trainer and how it will grow over time.",
};

export default function AboutPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>A product built to grow into a public learning platform.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/onboarding">Onboarding</Link>
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/library">Library</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">About the product</span>
          <h1 className="feature-title">Built to become a long-term study companion.</h1>
        </div>
        <p className="lead">
          The goal is not a one-off practice site. The goal is a system that can
          hold user progress, adapt to weak points, and keep getting better as
          the user returns.
        </p>
      </section>

      <section className="feature-grid">
        {productPrinciples.map((item) => (
          <article className="info-card feature-card" key={item.title}>
            <span className="card-kicker">Principle</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
