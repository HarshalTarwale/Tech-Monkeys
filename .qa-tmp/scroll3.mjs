import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("http://localhost:3560/", { waitUntil: "commit", timeout: 20000 });

// Sample document height at short intervals right after load, to catch a
// late reflow that grows the page after Lenis's first measurement.
const samples = [];
for (let i = 0; i < 25; i++) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => null);
  if (h) samples.push([i * 150, h]);
  await page.waitForTimeout(150);
}
console.log("scrollHeight over first ~3.7s:");
console.log(samples.map(([t, h]) => `${t}ms=${h}`).join("  "));

// Now reproduce the stuck scroll with wheel, immediately (worst case: user
// scrolls right away, before any late reflow settles).
const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page2.goto("http://localhost:3560/", { waitUntil: "commit", timeout: 20000 });
await page2.waitForTimeout(200); // scroll almost immediately, like an impatient real visitor
await page2.mouse.wheel(0, 2000);
await page2.waitForTimeout(1500);
console.log("\nEarly wheel-scroll (200ms after load) settled at:", await page2.evaluate(() => window.scrollY));
await page2.mouse.wheel(0, 5000);
await page2.waitForTimeout(1500);
console.log("second wheel-scroll settled at:", await page2.evaluate(() => window.scrollY), "/ docHeight:", await page2.evaluate(() => document.documentElement.scrollHeight));
await page2.close();
await page.close();
await browser.close();
