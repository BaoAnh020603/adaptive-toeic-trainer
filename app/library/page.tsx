import type { Metadata } from "next";
import Link from "next/link";
import { AdaptiveSummary } from "../adaptive-summary";
import { FlashcardEngine } from "../review-engine";
import { libraryTopics } from "../../lib/library";

export const metadata: Metadata = {
  title: "Library | Adaptive TOEIC Trainer",
  description:
    "A structured learning library for grammar, reading, vocabulary, and review.",
};

export default function LibraryPage() {
  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>A structured content hub for public learning.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/roadmap">Roadmap</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">Library</span>
          <h1 className="feature-title">
            Organize learning content by what actually matters.
          </h1>
        </div>
        <p className="lead">
          A public product needs a place where users can browse, understand, and
          revisit the training structure. This page becomes that stable entry point.
        </p>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Adaptive queue</span>
            <h2>What the user should study next.</h2>
          </div>
        </div>
        <AdaptiveSummary />
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Flashcard engine</span>
            <h2>Review vocabulary from sentence gaps, not a flat word list.</h2>
          </div>
        </div>
        <FlashcardEngine />
      </section>

      <section className="feature-grid">
        {libraryTopics.map((topic) => (
          <article className="info-card feature-card" key={topic.title}>
            <span className="card-kicker">{topic.title}</span>
            <h2>{topic.focus}</h2>
            <p>{topic.cards.join(" · ")}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
