import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const skip = new Set([".git", "node_modules", "playwright-report", "test-results"]);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".map", ".md", ".mjs", ".svg", ".ts", ".txt", ".yml", ".yaml"]);
const privateRepo = "ikerperez12/" + "JUEGO";
const privateApi = "/api/" + "(?:guess|daily-run)";
const privateKeyNames = [
  "SUPABASE_" + "SERVICE_ROLE_KEY",
  "ANONYMOUS_" + "HASH_SALT",
  "VERCEL_" + "PROJECT_ID",
  "CLOUDFLARE_" + "ACCOUNT_ID",
  "CLOUDFLARE_" + "ZONE_ID",
  "SENTRY_" + "AUTH_TOKEN",
];

const forbidden = [
  { label: "private repository reference", pattern: new RegExp(privateRepo.replace("/", "\\/"), "i") },
  { label: "production API route", pattern: new RegExp(privateApi, "i") },
  { label: "provider project URL", pattern: /https?:\/\/[a-z0-9]{20}\x2e(?:supabase)\x2eco/i },
  { label: "provider key identifier", pattern: /\bsb_(?:secret|service_role)_/i },
  { label: "private credential name", pattern: new RegExp("\\b(?:" + privateKeyNames.join("|") + ")\\b", "i") },
  { label: "private deployment directory", pattern: new RegExp("\\." + "vercel" + "\\\\/", "i") },
  { label: "author filesystem path", pattern: /(?:[a-z]:[\\/]+Users[\\/]+[^\\/\s]+|\/(?:Users|home)\/[^/\s]+)/i },
];

async function scan(directory) {
  const findings = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skip.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      findings.push(...(await scan(path)));
      continue;
    }
    if (!textExtensions.has(extname(entry.name).toLowerCase())) continue;
    const contents = await readFile(path, "utf8");
    for (const rule of forbidden) {
      if (rule.pattern.test(contents)) {
        findings.push({ path: relative(root, path), rule: rule.label });
      }
    }
  }
  return findings;
}

const findings = await scan(root);
if (findings.length) {
  for (const finding of findings) {
    process.stderr.write(finding.path + ": forbidden " + finding.rule + "\n");
  }
  process.exitCode = 1;
} else {
  process.stdout.write("Forbidden-content scan passed.\n");
}
