// V11 text layers @2x (19 Oct 2026): the Write-to email line in SILVER with a GOLD border (James 16:01 — gold is reserved for
// DR. SHEKINAIH, THE GOD OF THE UNIVERSE and HEAVEN THRONE ROOM MINISTRY; the email gets a gold edge so it reads more easily).
import pw from '/opt/npm-tools/node_modules/playwright/index.js'; const { chromium } = pw;
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const u = (p) => 'file://' + path.join(here, p);
const F = (p) => u('node_modules/@fontsource/' + p);
const OUT = '/home/claude/gba/remotion/public/v11a'; fs.mkdirSync(OUT, { recursive: true });
const css = `
@font-face{font-family:Cond;src:url(${F('barlow-condensed/files/barlow-condensed-latin-600-normal.woff2')});font-weight:600}
@font-face{font-family:Cond;src:url(${F('barlow-condensed/files/barlow-condensed-latin-700-normal.woff2')});font-weight:700}
*{margin:0;padding:0;box-sizing:border-box} html,body{background:transparent;overflow:hidden}
.silver{background:linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%,#F4F6F9 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.t{font-family:Cond;font-weight:700;white-space:nowrap;line-height:1}
.k{position:absolute;left:0;top:0}
.cr{background:linear-gradient(180deg,#FFFFFF 0%,#F3F5F8 24%,#C6CDD6 47%,#8F99A6 54%,#D8DDE4 68%,#FFFFFF 86%,#EEF1F4 100%);-webkit-background-clip:text;background-clip:text;color:transparent;position:relative;display:block}
`;
// two stacked copies: back = gold with a gold stroke (the border), front = silver gradient
const bordered = (text, fs, ls, stroke = 1.6) => `<span style="position:relative;display:inline-block;font-size:${fs}px;letter-spacing:${ls}em">
  <span class="t" style="position:absolute;left:0;top:0;color:#B98A2E;-webkit-text-stroke:${stroke}px #E2B256;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.95))">${text}</span>
  <span class="t silver" style="position:relative;display:block">${text}</span></span>`;
// 3D SILVER (James 16:13 "除非你做成立体的银色"): chrome face, thin dark bevel edge, steel extrusion down-right — no gold stroke closing the counters
const silver3d = (text, fs, ls, d = 2) => {
  const ext = ['#59616C', '#434A53', '#30363E', '#252A31'].slice(0, d);
  let h = `<span class="t k" style="color:rgba(0,0,0,.92);transform:translate(${(0.42 * d + 0.35).toFixed(2)}px,${(0.66 * d + 0.55).toFixed(2)}px);filter:blur(.45px)">${text}</span>`;
  for (let k = d; k >= 1; k--) h += `<span class="t k" style="color:${ext[k - 1]};transform:translate(${(0.42 * k).toFixed(2)}px,${(0.66 * k).toFixed(2)}px)">${text}</span>`;
  return `<span style="position:relative;display:inline-block;font-size:${fs}px;letter-spacing:${ls}em">${h}<span class="t k" style="color:#5A626D;-webkit-text-stroke:.4px #5A626D">${text}</span><span class="t cr">${text}</span></span>`;
};
const STYLE = process.env.EMAIL_STYLE || 'silver3d';   // 'gold' = the 16:01 gold-border version (kept for the record)
const em = (text, fs, ls) => STYLE === 'gold' ? bordered(text, fs, ls, 0.9) : silver3d(text, fs, ls, 2);
const page = (w, h, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${css} html,body{width:${w}px;height:${h}px}</style></head><body>${body}</body></html>`;
const jobs = [
  ['email_v11', 212, 16, `<div style="position:absolute;left:0;top:0;width:212px;height:16px;display:flex;align-items:center;justify-content:center;gap:3px">${em('Write to:', 12.5, 0.03)}${em('ceg@crownedeaglesglobal.org', 13, 0.025)}</div>`],
];
const browser = await chromium.launch();
for (const [name, w, h, html] of jobs) {
  const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: +(process.env.DSF || 2) });
  const f = path.join(here, 'out10_v11layers_' + name + '.html'); fs.writeFileSync(f, page(w, h, html));   // file:// page so the file:// fonts load
  await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const over = await p.evaluate(() => { const d = document.body.firstElementChild; return d.scrollWidth - d.clientWidth; });
  await p.screenshot({ path: path.join(OUT, name + (STYLE === 'gold' ? '_goldborder' : '') + '@' + (process.env.DSF || 2) + 'x.png'), omitBackground: true }); await p.close();
  console.log(name, 'overflow px', over);
}
await browser.close();
