import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/sanity/lib/posts";

/** Always production WWW — never derive from NEXT_PUBLIC_SITE_URL. */
const SITEMAP = "https://www.polystorex.com/sitemap.xml";
const HOST = "www.polystorex.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const slugs = await getAllPostSlugs();
  const disallow = ["/request-credit/track"];
  if (slugs.length === 0) disallow.push("/blogs");

  return {
    rules: [{ userAgent: "*", allow: "/", disallow }],
    sitemap: SITEMAP,
    host: HOST,
  };
}
