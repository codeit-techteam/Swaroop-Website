import type { MetadataRoute } from "next";

/**
 * Production sitemap only. Hardcoded WWW host so a mis-set
 * NEXT_PUBLIC_SITE_URL=http://localhost:3004 can never leak again.
 */
const SITE = "https://www.polystorex.com";

const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/materials", priority: 0.9, changeFrequency: "monthly" },
  { path: "/buy-sell", priority: 0.9, changeFrequency: "monthly" },
  { path: "/import", priority: 0.9, changeFrequency: "monthly" },
  { path: "/credit", priority: 0.9, changeFrequency: "monthly" },
  { path: "/request-credit", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
