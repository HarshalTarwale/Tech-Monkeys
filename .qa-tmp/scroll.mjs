import { chromium } from "playwright";
const browser = await chromium.launch();
const errs = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text()); });
await page.goto("http://localhost:3560/", { waitUntil: "networkidle", timeout: 30000 }).catch(e => console.log("nav:", e.message));
await page.waitForTimeout(1500);

console.log("=== HEIGHTS ===");
console.log(await page.evaluate(() => JSON.stringify({
  bodyScrollHeight: document.body.scrollHeight,
  htmlScrollHeight: document.documentElement.scrollHeight,
  innerHeight: window.innerHeight,
  bodyOverflowY: getComputedStyle(document.body).overflowY,
  htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
  bodyPosition: getComputedStyle(document.body).position,
  bodyHeight: getComputedStyle(document.body).height,
  htmlClass: document.documentElement.className,
  bodyClass: document.body.className,
})));

console.log("\n=== SECTION ORDER + HEIGHTS ===");
console.log(await page.evaluate(() => {
  const sections = [...document.querySelectorAll("section, footer")];
  return sections.map(s => {
    const r = s.getBoundingClientRect();
    return ;
  }).join("\n");
}));

console.log("\n=== TRY SCROLLING ===");
const before = await page.evaluate(() => window.scrollY);
await page.mouse.wheel(0, 3000);
await page.waitForTimeout(1000);
const after = await page.evaluate(() => window.scrollY);
console.log("scrollY before wheel:", before, " after wheel:", after);

await page.evaluate(() => window.scrollTo(0, 999999));
await page.waitForTimeout(500);
console.log("scrollY after scrollTo(max):", await page.evaluate(() => window.scrollY));

console.log("\nerrors:", errs.length ? JSON.stringify(errs, null, 2) : "none");
await page.screenshot({ path: "C:/Users/asus/AppData/Local/Temp/claude/c--Users-asus-Desktop-Portfolio-Tech-Monkeys-Tech-Monkeys-tech-monkeys/586f148d-fdf7-4592-b12e-963dee698c7d/scratchpad/scroll-bug-top.png" });
await browser.close();
