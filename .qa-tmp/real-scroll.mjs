import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3561/", { waitUntil: "commit", timeout: 20000 });
await page.waitForTimeout(500);

// Simulate a real user: many small wheel ticks over time, like continuous
// trackpad/mouse-wheel scrolling, rather than one giant delta.
for (let i = 0; i < 40; i++) {
  await page.mouse.wheel(0, 250);
  await page.waitForTimeout(60);
}
await page.waitForTimeout(1000);

const state = await page.evaluate(() => ({
  windowScrollY: window.scrollY,
  docHeight: document.documentElement.scrollHeight,
  innerH: innerHeight,
  reachedBottom: window.scrollY >= document.documentElement.scrollHeight - innerHeight - 5,
}));
console.log("after continuous scrolling (40 x 250px ticks):", JSON.stringify(state, null, 2));
await browser.close();
