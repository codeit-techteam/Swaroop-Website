import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/sanity/lib/posts";

/**
 * Production sitemap only. Hardcoded WWW host so a mis-set
 * NEXT_PUBLIC_SITE_URL=http://localhost:3004 can never leak again.
 */
const SITE = "https://www.polystorex.com";

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/materials", priority: 0.9, changeFrequency: "monthly" },
  { path: "/buy-sell", priority: 0.9, changeFrequency: "monthly" },
  { path: "/import", priority: 0.9, changeFrequency: "monthly" },
  { path: "/credit", priority: 0.9, changeFrequency: "monthly" },
  { path: "/request-credit", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const slugs = await getAllPostSlugs();
  // Only index /blogs when approved posts exist — empty blog must not look active.
  const routes = [
    ...STATIC_ROUTES,
    ...(slugs.length > 0
      ? ([
          {
            path: "/blogs",
            priority: 0.6,
            changeFrequency: "weekly" as const,
          },
        ] as const)
      : []),
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = slugs.map((entry) => ({
    url: `${SITE}/blogs/${entry.slug}`,
    lastModified: entry.updatedAt
      ? new Date(entry.updatedAt)
      : entry.publishedAt
        ? new Date(entry.publishedAt)
        : lastModified,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
