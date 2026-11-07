import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

/**
 * Sanity Studio config. Run locally after `npx sanity login`:
 *   npm run studio
 *
 * Relative imports only — Sanity Vite does not resolve Next.js `@/` aliases.
 */
export default defineConfig({
  name: "polystorex-website",
  title: "PolyStoreX Blog",
  projectId: projectId || "2qeel1cr",
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
