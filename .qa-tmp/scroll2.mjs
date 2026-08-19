import { chromium } from "playwright";
const browser = await chromium.launch();

// Reduced motion -> SmoothScroll explicitly skips Lenis init entirely.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await page.goto("http://localhost:3560/", { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, 999999));
await page.waitForTimeout(400);
console.log("WITHOUT Lenis (reduced motion) -> scrollY:", await page.evaluate(() => window.scrollY), "/ bodyScrollHeight:", await page.evaluate(() => document.body.scrollHeight));
await page.close();

// Normal motion -> Lenis active.
const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page2.goto("http://localhost:3560/", { waitUntil: "domcontentloaded", timeout: 20000 });
await page2.waitForTimeout(1200);
await page2.evaluate(() => window.scrollTo(0, 999999));
await page2.waitForTimeout(400);
console.log("WITH Lenis (normal)       -> scrollY:", await page2.evaluate(() => window.scrollY), "/ bodyScrollHeight:", await page2.evaluate(() => document.body.scrollHeight));

// Check Lenis's own internal limit vs the real content height.
console.log("Lenis internals:", await page2.evaluate(() => {
  const html = document.documentElement;
  return JSON.stringify({
    htmlClasses: html.className,
    windowInnerHeight: innerHeight,
    docScrollHeight: document.documentElement.scrollHeight,
  });
}));
await page2.close();
await browser.close();
