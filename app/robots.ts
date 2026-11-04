import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Production robots.txt.
 * Client requirement (4 Nov 2026): Sitemap must be https://www.polystorex.com/sitemap.xml
 * Do not derive this from localhost or preview SITE_URL values.
 */
export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${env.sitemapHost}/sitemap.xml`;
  // Never emit preview/localhost hosts into production robots.txt.
  const rawHost = env.siteUrl.replace(/^https?:\/\//, "").split("/")[0] ?? "polystorex.com";
  const host =
    /vercel\.app$|localhost|127\./i.test(rawHost) ? "polystorex.com" : rawHost;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/request-credit/track"] }],
    sitemap: sitemapUrl,
    host,
  };
}
