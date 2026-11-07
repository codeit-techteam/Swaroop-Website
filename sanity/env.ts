/**
 * Public Sanity configuration (NEXT_PUBLIC_* only — safe for the browser).
 * Never add write tokens here.
 */

function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export const dataset = clean(process.env.NEXT_PUBLIC_SANITY_DATASET) || "production";

export const projectId = clean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export const apiVersion = clean(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || "2024-01-01";

export function isSanityConfigured(): boolean {
  return projectId.length > 0;
}
