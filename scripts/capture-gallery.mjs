import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = fileURLToPath(new URL("../", import.meta.url));
const host = "http://127.0.0.1:4173";
const output = join(root, "public", "gallery");
const tempRoot = resolve(tmpdir());
const scratch = await mkdtemp(join(tempRoot, "one-click-gallery-"));
const relativeScratch = relative(tempRoot, resolve(scratch));
if (!relativeScratch.startsWith("one-click-gallery-") || isAbsolute(relativeScratch)) {
  throw new Error("Refusing to use an unexpected temporary directory");
}
const server = spawn(
  process.execPath,
  [join(root, "node_modules", "vite", "bin", "vite.js"), "preview", "--host", "127.0.0.1", "--port", "4173", "--strictPort"],
  { cwd: root, stdio: "ignore" },
);

async function waitForPreview() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(host);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("Local preview did not start");
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(command + " exited with " + code));
    });
  });
}

let browser;
try {
  await waitForPreview();
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
  await page.goto(host + "/gallery/social-preview.svg");
  await page.screenshot({ path: join(output, "social-preview.png") });

  await page.goto(host);
  const demo = page.locator(".demo-grid");
  await demo.scrollIntoViewIfNeeded();
  const states = [];
  states.push(join(scratch, "state-0.png"));
  await demo.screenshot({ path: states[0] });
  await page.locator("[data-map]").click({ position: { x: 180, y: 90 } });
  states.push(join(scratch, "state-1.png"));
  await demo.screenshot({ path: states[1] });
  await page.getByRole("button", { name: /reveal the place/i }).click();
  states.push(join(scratch, "state-2.png"));
  await demo.screenshot({ path: states[2] });

  await run("ffmpeg", [
    "-y",
    "-framerate", "1",
    "-start_number", "0",
    "-i", join(scratch, "state-%d.png"),
    "-filter_complex", "scale=900:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse=dither=bayer",
    "-loop", "0",
    join(output, "gameplay.gif"),
  ]);
  process.stdout.write("Updated social-preview.png and gameplay.gif from the local build.\n");
} finally {
  await browser?.close();
  server.kill();
  await rm(scratch, { recursive: true, force: true });
}
