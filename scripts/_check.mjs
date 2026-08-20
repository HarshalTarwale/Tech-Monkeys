import { chromium } from "playwright";

const OUT = "C:/Users/asus/AppData/Local/Temp/claude/c--Users-asus-Desktop-Portfolio-Tech-Monkeys-Tech-Monkeys-tech-monkeys/586f148d-fdf7-4592-b12e-963dee698c7d/scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:3100/", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(1000);

// Work section
const work = await page.locator("#work").scrollIntoViewIfNeeded().then(async () => {
  await page.waitForTimeout(800);
  return page.evaluate(() => {
    const section = document.querySelector("#work");
    const tiles = section ? [...section.querySelectorAll("a.group h3")] : [];
    return { tileCount: tiles.length, names: tiles.map((t) => t.textContent.trim()) };
  });
});
console.log("WORK SECTION:", JSON.stringify(work));
await page.screenshot({ path: `${OUT}/work-section.jpg`, type: "jpeg", quality: 85 });

// Divisions section — check each division block's shown projects
await page.locator("#divisions").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const divisions = await page.evaluate(() => {
  const blocks = [...document.querySelectorAll("#divisions > div")].filter((d) => d.querySelector("h2"));
  return blocks.map((b) => ({
    name: b.querySelector("h2")?.textContent?.trim(),
    showcaseProjectName: b.querySelector('[class*="ShowcaseFrame"], .group\\/frame')?.parentElement?.textContent?.slice(0, 50),
    hasCarousel: !!b.querySelector('[class*="aspect-4/3"], [class*="aspect-16/11"]'),
    emptyMsg: b.textContent.includes("being prepared for publication"),
  }));
});
console.log("\nDIVISIONS:", JSON.stringify(divisions, null, 1));
await page.screenshot({ path: `${OUT}/divisions-section.jpg`, type: "jpeg", quality: 85 });

await browser.close();
