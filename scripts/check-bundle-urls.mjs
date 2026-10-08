#!/usr/bin/env node
/**
 * Fails if a production build ships development URLs to the browser.
 * Scans client JS chunks and prerendered HTML in `.next` after `next build`.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd(), ".next");
const targets = [path.join(root, "static"), path.join(root, "server", "app")];
const patterns = [/https?:\/\/localhost(?::\d+)?/gi, /https?:\/\/127\.0\.0\.1(?::\d+)?/gi, /https?:\/\/0\.0\.0\.0(?::\d+)?/gi];

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(js|html|rsc|body|json)$/.test(entry.name)) yield full;
  }
}

try {
  await stat(root);
} catch {
  console.error("No .next directory found. Run `npm run build` first.");
  process.exit(1);
}

const findings = [];
for (const target of targets) {
  for await (const file of walk(target)) {
    const content = await readFile(file, "utf8");
    for (const pattern of patterns) {
      for (const match of content.matchAll(pattern)) {
        findings.push(`${path.relative(process.cwd(), file)}: ${match[0]}`);
      }
    }
  }
}

if (findings.length) {
  console.error(`Found ${findings.length} development URL(s) in the production build:`);
  for (const finding of [...new Set(findings)].slice(0, 50)) console.error(`  ${finding}`);
  process.exit(1);
}

console.log("No localhost / 127.0.0.1 URLs found in client bundles or prerendered pages.");
