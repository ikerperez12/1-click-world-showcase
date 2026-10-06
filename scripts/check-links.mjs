import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = [
  "README.md",
  "README.es.md",
  "ATTRIBUTION.md",
  "CONTRIBUTING.md",
  "NOTICE.md",
  "SECURITY.md",
  "docs/ENGINEERING_OVERVIEW.md",
  "docs/GALLERY.md",
  "docs/PUBLIC_CONTENT_POLICY.md",
  "index.html",
];
const failures = [];
const external = new Set();

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

for (const file of files) {
  const contents = await readFile(join(root, file), "utf8");
  const links = [
    ...contents.matchAll(/!?(?:\[[^\]]*\])\(([^)\s]+)(?:\s+"[^"]*")?\)/g),
    ...contents.matchAll(/(?:href|src)="([^"]+)"/g),
  ].map((match) => match[1]);

  for (const link of links) {
    if (link.startsWith("#") || link.startsWith("mailto:")) continue;
    if (/^https?:\/\//i.test(link)) {
      if (!link.startsWith("https://")) failures.push(`${file}: external link must use HTTPS: ${link}`);
      else external.add(link);
      continue;
    }

    const clean = decodeURIComponent(link.split(/[?#]/, 1)[0]);
    const candidates = clean.startsWith("/")
      ? [join(root, "public", clean), join(root, clean)]
      : [join(root, dirname(file), clean)];
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      failures.push(`${file}: missing local target: ${link}`);
    }
  }
}

for (const link of external) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    let response = await fetch(link, { method: "HEAD", redirect: "follow", signal: controller.signal });
    if (response.status === 405) response = await fetch(link, { redirect: "follow", signal: controller.signal });
    if (!response.ok) failures.push(`unreachable external link (${response.status}): ${link}`);
  } catch (error) {
    failures.push(`unreachable external link (${error instanceof Error ? error.message : "unknown error"}): ${link}`);
  } finally {
    clearTimeout(timeout);
  }
}

if (failures.length) {
  for (const failure of failures) process.stderr.write(`${failure}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Link check passed (${external.size} external URL${external.size === 1 ? "" : "s"}).\n`);
}
