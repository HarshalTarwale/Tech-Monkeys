import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3561/", { waitUntil: "commit", timeout: 20000 });
await page.waitForTimeout(1000);

// Plain, always-visible nav link — "Projects" (no dropdown involved).
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.locator("header a", { hasText: "Projects" }).first().click({ force: false });
await page.waitForTimeout(1000);
console.log("click 'Projects' nav link -> url:", page.url());

// Back to home, then the real dropdown flow: hover Services, click a visible item.
await page.goto("http://localhost:3561/", { waitUntil: "commit", timeout: 20000 });
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /services/i }).hover();
await page.waitForTimeout(600);
const item = page.locator('a[href="/#capabilities"]:visible').first();
const visibleCount = await item.count();
console.log("visible '/#capabilities' dropdown items after hover:", visibleCount);
if (visibleCount) {
  const before = await page.evaluate(() => window.scrollY);
  await item.click({ force: false });
  await page.waitForTimeout(1400);
  const after = await page.evaluate(() => window.scrollY);
  console.log(`visible dropdown-item click: before=${before} after=${after} ${after > 100 ? "navigated correctly" : "*** STUCK ***"}`);
}
await browser.close();
