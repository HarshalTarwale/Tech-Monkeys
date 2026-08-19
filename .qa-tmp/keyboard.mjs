import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3561/", { waitUntil: "commit", timeout: 20000 });
await page.waitForTimeout(800);
await page.click("body");

async function tryKey(key, times) {
  const before = await page.evaluate(() => window.scrollY);
  for (let i = 0; i < times; i++) {
    await page.keyboard.press(key);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => window.scrollY);
  console.log(`${key} x${times}:  ${before} -> ${after}  ${after > before ? "moved" : "*** DID NOT MOVE ***"}`);
  return after;
}

await tryKey("PageDown", 6);
await tryKey("Space", 6);
await tryKey("ArrowDown", 20);
await tryKey("End", 1);
await browser.close();
