import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3561/", { waitUntil: "commit", timeout: 20000 });
await page.waitForTimeout(1000);

// First, confirm Lenis actively re-asserts its own position (not passive).
await page.evaluate(() => window.scrollTo(0, 4000));
const immediately = await page.evaluate(() => window.scrollY);
await page.waitForTimeout(150); // a few RAF ticks
const afterRaf = await page.evaluate(() => window.scrollY);
console.log("raw scrollTo(4000): immediately =", immediately, " | after ~150ms of Lenis RAF =", afterRaf, afterRaf !== 4000 ? "*** Lenis reverted it ***" : "held");

// Now the real-world case: click an in-page anchor nav link.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
const before = await page.evaluate(() => window.scrollY);
await page.locator('header a[href="/#capabilities"]').first().click().catch(async () => {
  await page.locator("header", { hasText: "Services" }).first().click();
});
await page.waitForTimeout(150);
const justAfter = await page.evaluate(() => window.scrollY);
await page.waitForTimeout(1200);
const settled = await page.evaluate(() => window.scrollY);
console.log(`anchor-click to #capabilities: before=${before} justAfterClick=${justAfter} settledAfter1.2s=${settled}`);
console.log(settled < 200 ? "*** NAV LINK DID NOT ACTUALLY NAVIGATE / SNAPPED BACK ***" : "nav worked");

await browser.close();
