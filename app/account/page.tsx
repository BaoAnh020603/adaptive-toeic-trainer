import type { Metadata } from "next";
import Link from "next/link";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";

export const metadata: Metadata = {
  title: "Account | Adaptive TOEIC Trainer",
  description:
    "A future-ready account shell for ChatGPT sign-in and user-specific study data.",
};

export default async function AccountPage() {
  const user = await getChatGPTUser();

  return (
    <main className="trainer-shell">
      <header className="site-topbar">
        <div>
          <p className="brand-mark">Adaptive TOEIC Trainer</p>
          <span>Account-ready, even before the full backend arrives.</span>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </header>

      <section className="section-block feature-hero">
        <div>
          <span className="eyebrow">Account</span>
          <h1 className="feature-title">
            Prepare user-specific learning without reworking the app later.
          </h1>
        </div>
        <p className="lead">
          This page is intentionally minimal now, but it is wired for a
          future ChatGPT sign-in and per-user progress history.
        </p>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Session</span>
            <h2>{user ? `Hello, ${user.displayName}` : "You are not signed in yet."}</h2>
          </div>
          {!user ? (
            <Link className="secondary-btn" href={chatGPTSignInPath("/account")}>
              Sign in with ChatGPT
            </Link>
          ) : null}
        </div>
        <div className="timeline">
          <article className="timeline-item">
            <span className="timeline-step">01</span>
            <div>
              <h3>Saved progress</h3>
              <p>Ready to move from browser-only progress to a real user profile.</p>
            </div>
          </article>
          <article className="timeline-item">
            <span className="timeline-step">02</span>
            <div>
              <h3>Personal quests</h3>
              <p>Once accounts are enabled, quests can follow the user between devices.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
