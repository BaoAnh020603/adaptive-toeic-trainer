import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adaptive TOEIC Trainer",
  description:
    "A personalized TOEIC trainer that diagnoses weak spots, detects overthinking, and builds adaptive study quests.",
  openGraph: {
    title: "Adaptive TOEIC Trainer",
    description:
      "Diagnose weak spots, detect overthinking, and train with personalized quests.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adaptive TOEIC Trainer",
    description:
      "Diagnose weak spots, detect overthinking, and train with personalized quests.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
