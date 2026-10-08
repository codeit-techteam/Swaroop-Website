import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = new URL("../", import.meta.url);

/** Resolves the `@/` alias and extensionless TypeScript imports for node:test. */
export async function resolve(specifier, context, nextResolve) {
  let target = null;
  if (specifier.startsWith("@/")) {
    target = new URL(specifier.slice(2), root);
  } else if (/^\.{1,2}\//.test(specifier) && context.parentURL?.startsWith("file:")) {
    target = new URL(specifier, context.parentURL);
  }
  if (target && !/\.[cm]?[jt]sx?$/.test(target.pathname)) {
    const path = fileURLToPath(target);
    for (const candidate of [`${path}.ts`, `${path}.tsx`, `${path}/index.ts`]) {
      if (existsSync(candidate)) return nextResolve(pathToFileURL(candidate).href, context);
    }
  }
  return nextResolve(target ? target.href : specifier, context);
}
