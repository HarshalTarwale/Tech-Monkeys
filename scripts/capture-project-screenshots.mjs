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

// 1440x900 — a real, extremely common laptop resolution (16:10), not the
// 4:3 this used to be. Width matches the hover-embed's own logical
// viewport (components/ui/project-tile.tsx's EMBED_WIDTH), so the static
// cover and the live embed show the same layout rather than two different
// crops.
//
// The 4:3 predecessor (1280x960) was the actual cause of a reported
// "images look chopped" complaint: no real hero section is designed for a
// squarish 4:3 box, so capturing one into that ratio was cropping content
// no real visitor on a real laptop would ever see cropped. Tile aspect
// ratios in project-tile.tsx were changed to match this viewport — regular
// tiles are exactly 8:5 (1440/900, zero crop), wide/featured tiles are
// 16:9 (a hair wider, so only ever a small trim off the bottom, never the
// sides).
const VIEWPORT = { width: 1440, height: 900 };

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

// Best-effort cookie/consent banner dismissal. A handful of the real
// client sites (EU/UK-facing ones especially) show one of these on first
// load, and it sits directly on top of the hero — exactly the kind of
// "other issue" behind captures that "aren't looking that good". This is
// deliberately generic (common button text across common consent
// libraries) rather than one selector per site, and every step is
// wrapped so a banner that isn't found — most sites don't have one —
// never blocks or slows the capture.
async function dismissConsentBanner(page) {
  const selectors = [
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
    'button:has-text("Accept")',
    'button:has-text("I agree")',
    'button:has-text("I Agree")',
    'button:has-text("Got it")',
    'button:has-text("Allow all")',
    '#onetrust-accept-btn-handler',
    '[aria-label="Accept cookies"]',
  ];
  for (const selector of selectors) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 800 })) {
        await btn.click({ timeout: 800 });
        await page.waitForTimeout(300);
        return;
      }
    } catch {
      // Not present, not visible, or not clickable in time — try the
      // next one. A missing banner is the common case, not an error.
    }
  }
}

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
  await dismissConsentBanner(page);
  await page.waitForTimeout(SETTLE_MS);
  // Explicit clip: some sites set a body height that makes Playwright's
  // default capture taller than the viewport, which would break the
  // aspect-ratio contract the tiles rely on (see VIEWPORT above).
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
