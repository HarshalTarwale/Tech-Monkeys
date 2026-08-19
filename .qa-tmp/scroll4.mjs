import { chromium } from "playwright";
const browser = await chromium.launch();

for (let run = 1; run <= 4; run++) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3560/", { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(1200);
  const afterWheel = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => window.scrollTo(0, 999999));
  await page.waitForTimeout(500);
  const afterMax = await page.evaluate(() => window.scrollY);
  console.log(`run ${run}: afterWheel(3000)=${afterWheel}  afterScrollToMax=${afterMax}  ${afterMax > 7000 ? "OK reaches bottom" : "STUCK"}`);
  await page.close();
}
await browser.close();
