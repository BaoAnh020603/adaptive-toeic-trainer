import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/about",
  "/account",
  "/features",
  "/library",
  "/onboarding",
  "/privacy",
  "/progress",
  "/roadmap",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `https://adaptive-toeic-trainer.vercel.app${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
