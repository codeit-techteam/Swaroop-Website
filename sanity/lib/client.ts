import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

/**
 * Read-only CDN client. No API token — published content via Sanity's public API.
 */
export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
    stega: {
      enabled: false,
    },
  });
}
