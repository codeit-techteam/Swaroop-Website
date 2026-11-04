import type { MetadataRoute } from "next";

/** Always production WWW — never derive from NEXT_PUBLIC_SITE_URL. */
const SITEMAP = "https://www.polystorex.com/sitemap.xml";
const HOST = "www.polystorex.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/request-credit/track"] }],
    sitemap: SITEMAP,
    host: HOST,
  };
}
