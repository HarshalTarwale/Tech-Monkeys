import { chromium } from "playwright";
const browser = await chromium.launch();

for (let run = 1; run <= 3; run++) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3561/", { waitUntil: "commit", timeout: 20000 });
  await page.waitForTimeout(300); // scroll fairly soon, like a real impatient visitor

  const before = await page.evaluate(() => {
    const l = window.__lenis;
    return l ? { limit: l.limit, dimW: l.dimensions?.height, docH: document.documentElement.scrollHeight, innerH: innerHeight } : "lenis not ready yet";
  });

  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(1300);

  const after = await page.evaluate(() => {
    const l = window.__lenis;
    return {
      limit: l?.limit,
      dimH: l?.dimensions?.height,
      docH: document.documentElement.scrollHeight,
      innerH: innerHeight,
      lenisScroll: l?.scroll,
      lenisTargetScroll: l?.targetScroll,
      windowScrollY: window.scrollY,
    };
  });

  console.log(`run ${run}`);
  console.log("  BEFORE wheel:", JSON.stringify(before));
  console.log("  AFTER  wheel:", JSON.stringify(after));
  console.log("  expected limit = docH - innerH =", (after.docH - after.innerH), " | actual limit =", after.limit, after.limit === (after.docH - after.innerH) ? "MATCH" : "*** MISMATCH ***");
  await page.close();
}
await browser.close();
