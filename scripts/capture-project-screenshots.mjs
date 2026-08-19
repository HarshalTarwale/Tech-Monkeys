// Captures a cover screenshot for every publishable project and writes it
// to public/projects/{slug}.jpg.
//
// Why this exists: the project grid used to embed each project's actual
// site as a live iframe, mounted the moment the tile scrolled near the
// viewport. Verified via PerformanceObserver: 6 embeds on the homepage
// blocked the main thread for 1.1s total (worst single block 550ms), 12 on
// /projects blocked it for 1.4s. Lenis drives scrolling from a
// requestAnimationFrame loop, so those blocks are exactly when scrolling
// visibly stalls — confirmed as the cause of the reported "page stops
// scrolling below the services section" bug.
//
// A screenshot costs nothing at runtime — it's a static <img>, no embedded
// browser instance, no cross-origin network traffic the parent page can't
// even see the weight of. The live embed still exists (see
// components/ui/project-tile.tsx) but now only mounts on hover, on
// pointer-fine devices, replacing the screenshot rather than sitting
// underneath it from page load.
//
// Run with: npm run capture:projects
// Re-run any time a project's live site changes and the cover looks stale.
//
// Uses `node --experimental-strip-types` to import content/projects/index.ts
// directly (Node 22.6+) — the real project data, not a duplicated list that
// could drift out of sync with what the site actually publishes.
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

import { projects } from "../content/projects/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "projects");

// Width matches the hover-embed's own logical viewport
// (components/ui/project-tile.tsx's EMBED_WIDTH), so the static cover and
// the live embed show the same layout rather than two different crops.
//
// The 4:3 height is deliberate. Every tile in the grid is 4:3 or wider, and
// covers are pinned to `object-top` — so a 4:3 source is either shown whole
// (in a 4:3 tile) or cropped only from the bottom (in a wider one). Nothing
// is ever cropped horizontally, which is what was chopping the sides off
// each project's hero. Capture taller than this and 4:3 tiles start cropping
// sideways again; capture wider and the hero loses its lower half.
const VIEWPORT = { width: 1280, height: 960 };

// Retina capture. The featured tile renders ~1360px wide on a 1440 viewport,
// so a 1x source would be upscaled and visibly soft — the "not clear" part
// of the problem. next/image downscales and re-encodes these per breakpoint,
// so the extra source pixels cost repo weight, never page weight.
const DEVICE_SCALE = 2;

const NAV_TIMEOUT_MS = 20_000;
const SETTLE_MS = 600;

const targets = projects.filter(
  (p) => p.status === "live" && p.nameApproved && p.url,
);

if (targets.length === 0) {
  console.log("No publishable projects with a URL — nothing to capture.");
  process.exit(0);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

console.log(`Capturing ${targets.length} project screenshot(s)...\n`);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: VIEWPORT,
  deviceScaleFactor: DEVICE_SCALE,
});

const results = [];
for (const project of targets) {
  const dest = join(OUT_DIR, `${project.slug}.jpg`);
  try {
    await page.goto(project.url, {
      waitUntil: "networkidle",
      timeout: NAV_TIMEOUT_MS,
    });
  } catch {
    // A slow or unresponsive site should not abort the whole run — fall
    // back to whatever painted, same principle as the tile's own timeout.
    console.warn(`  ${project.slug}: networkidle timed out, capturing anyway`);
  }
  await page.waitForTimeout(SETTLE_MS);
  // Explicit clip: some sites set a body height that makes Playwright's
  // default capture taller than the viewport, which would break the 4:3
  // contract the tile crops rely on.
  await page.screenshot({
    path: dest,
    type: "jpeg",
    quality: 85,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
  });
  console.log(`  ✓ ${project.slug} -> public/projects/${project.slug}.jpg`);
  results.push(project.slug);
}

await browser.close();

console.log(`\nDone. ${results.length}/${targets.length} captured.`);
console.log(
  "Set `image: \"/projects/<slug>.jpg\"` on each project in content/projects/index.ts to use them.",
);
