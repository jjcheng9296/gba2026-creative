// WHEN ALL / ELSE FAILS, — heavy 3D chrome block lettering (James 16:36 "字体 是不是没有震撼力"); two stacked lines like the TRY card.
// Rendered big (S = px per 1x px) with transparency, then trimmed; same chrome family as the band / IN.
import pw from '/opt/npm-tools/node_modules/playwright/index.js'; const { chromium } = pw;
import fs from 'fs'; import path from 'path';
const here = '/home/claude/gba/design';
const F = (p) => 'file://' + path.join(here, 'node_modules/@fontsource/' + p);
const DX = +(process.env.DX || 1.3), DY = +(process.env.DY || 2.0), LH = +(process.env.LH || 0.9);
const S = 8, FS = +(process.env.FS || 36), LS = +(process.env.LS || 0.02), GAP = +(process.env.GAP || 2), D = +(process.env.D || 8);
const OUT = process.env.OUT || path.join(here, 'whentest/when2_chrome.png');
const lines = (process.env.LINES || 'WHEN ALL|ELSE FAILS,').split('|');
const ext = (k) => { const t = k / D; const c = (a, b) => Math.round(a + (b - a) * t); return `rgb(${c(112, 22)},${c(121, 26)},${c(133, 32)})`; };
const one = (t) => {
  const st = (k) => `position:absolute;left:0;top:0;transform:translate(${(DX * S * k / D).toFixed(2)}px,${(DY * S * k / D).toFixed(2)}px)`;   // total depth DX/DY in 1x px
  let h = `<span style="${st(D * 1.25)};color:rgba(0,0,0,.9);filter:blur(${S * 0.4}px)">${t}</span>`;
  for (let k = D; k >= 1; k--) h += `<span style="${st(k)};color:${ext(k)}">${t}</span>`;
  h += `<span style="position:absolute;left:0;top:0;color:#262B32;-webkit-text-stroke:${(0.55 * S).toFixed(1)}px #262B32">${t}</span>`;
  h += `<span style="position:relative;display:block;background:linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 16%,#BCC4CF 38%,#6B7582 49%,#4E5763 51%,#C3CAD3 58%,#F2F4F7 78%,#FFFFFF 92%,#DDE2E8 100%);-webkit-background-clip:text;background-clip:text;color:transparent">${t}</span>`;
  h += `<span style="position:absolute;left:0;top:0;background:linear-gradient(180deg,rgba(255,255,255,.85) 0%,rgba(255,255,255,0) 22%);-webkit-background-clip:text;background-clip:text;color:transparent">${t}</span>`;
  return h;
};
const W = 260 * S, H = 110 * S;
const body = lines.map((t, i) => `<div style="position:relative;text-align:center;line-height:${LH};margin-top:${i ? GAP * S : 0}px"><span style="position:relative;display:inline-block;font-family:Anton;font-size:${FS * S}px;letter-spacing:${LS}em;padding-left:${LS}em;white-space:nowrap">${one(t)}</span></div>`).join('');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Anton;src:url(${F('anton/files/anton-latin-400-normal.woff2')})}*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}</style></head><body><div style="position:absolute;left:0;top:${4 * S}px;width:${W}px">${body}</div></body></html>`;
const f = path.join(here, 'whentest/when3d.html'); fs.writeFileSync(f, html);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
await p.screenshot({ path: OUT, omitBackground: true }); await b.close();
console.log('wrote', OUT);
