// V6 layers for Remotion: transparent PNGs @2x — plaque (glowing), BANG! words (3 sizes), placeholder gate (4 states, replaced by ChatGPT's PNGs when they land)
import pw from '/opt/npm-tools/node_modules/playwright/index.js'; const { chromium } = pw;
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const u = (p) => 'file://' + path.join(here, p);
const F = (p) => u('node_modules/@fontsource/' + p);
const OUT = path.join(here, 'out10_v6', 'layers'); fs.mkdirSync(OUT, { recursive: true });
const css = `
@font-face{font-family:Bodoni;src:url(${F('bodoni-moda/files/bodoni-moda-latin-900-normal.woff2')});font-weight:900}
@font-face{font-family:Cond;src:url(${F('barlow-condensed/files/barlow-condensed-latin-600-normal.woff2')});font-weight:600}
*{margin:0;padding:0;box-sizing:border-box} html,body{background:transparent;overflow:hidden} body{position:relative;font-family:Bodoni}
.a{position:absolute}
.gold{background:linear-gradient(180deg,#FFF9E6 0%,#FBE7AE 22%,#EFC566 46%,#CF9635 60%,#E9BC5C 74%,#FFEDB4 92%,#FFF6D9 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.silver{background:linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%,#F4F6F9 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.gsh2{filter:drop-shadow(0 .5px 0 rgba(74,44,6,.95)) drop-shadow(0 1px 3px rgba(0,0,0,.6))}
.plq{position:relative;display:inline-block;text-align:center;background:linear-gradient(180deg,#1C1609 0%,#0C0905 100%);box-shadow:0 0 0 1px #F0D69C,0 0 14px 4px rgba(255,226,150,.55),0 6px 16px rgba(0,0,0,.55);white-space:nowrap}
.plq .k{position:absolute;width:7px;height:7px;border-color:#F0CF7E;border-style:solid}
.plq .k1{left:3px;top:3px;border-width:1.5px 0 0 1.5px}.plq .k2{right:3px;top:3px;border-width:1.5px 1.5px 0 0}.plq .k3{left:3px;bottom:3px;border-width:0 0 1.5px 1.5px}.plq .k4{right:3px;bottom:3px;border-width:0 1.5px 1.5px 0}
.plq .p1{display:block;font-family:Cond;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#D8BE85;font-size:7.5px}
.plq .p2{display:block;font-family:Bodoni;font-weight:900;letter-spacing:.02em;margin-top:2px;line-height:1}
.bang{font-family:Bodoni;font-weight:900;letter-spacing:.01em;display:inline-block;background:linear-gradient(180deg,#FFF1BF 0%,#E3BC63 55%,#A36E26 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:.8px #4B3214;filter:drop-shadow(0 1px 0 rgba(36,23,10,.9)) drop-shadow(0 0 2.5px rgba(0,0,0,.95)) drop-shadow(0 0 1px rgba(0,0,0,.9))}
`;
const page = (w, h, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${css} html,body{width:${w}px;height:${h}px}</style></head><body>${body}</body></html>`;
// placeholder gate: two obsidian panels with gold trim; state 1 closed, 2 crack, 3 light, 4 open (panels slid 70%)
function gate(W, H, state) {
  const open = state === 4 ? 0.35 : 0;   // each panel slides out by 35% of W
  const panel = (side) => `<div class="a" style="top:0;width:${W / 2}px;height:${H}px;${side}:${-open * W}px;background:linear-gradient(${side === 'left' ? '90deg' : '270deg'},#0B0F1A 0%,#141a2a 60%,#0B0F1A 100%);box-shadow:inset 0 0 0 1.5px #99753E,inset 0 0 0 3px rgba(229,197,123,.35),0 0 0 1px #E5C57B"></div>`;
  const glow = state >= 3 ? `<div class="a" style="left:${W / 2 - (state === 4 ? W * .35 : 10)}px;top:0;width:${state === 4 ? W * .7 : 20}px;height:${H}px;background:radial-gradient(ellipse at 50% 50%,#FFF1BF 0%,#F1D27B 30%,#A36E26 75%,rgba(163,110,38,0) 100%)"></div>` : '';
  const crack = state === 2 || state === 3 ? `<svg class="a" style="left:0;top:0" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><path d="M${W / 2} 0 l-2 ${H * .18} l3 ${H * .14} l-2 ${H * .16} l2 ${H * .22}" fill="none" stroke="#FFF1BF" stroke-width="${state === 2 ? 1.6 : 4}" stroke-linejoin="round" style="filter:drop-shadow(0 0 ${state === 2 ? 2 : 6}px #F1D27B)"/><circle cx="${W / 2}" cy="2" r="${state === 2 ? 3 : 5}" fill="#FFF1BF" style="filter:drop-shadow(0 0 4px #F1D27B)"/></svg>` : '';
  const seam = state === 1 ? `<div class="a" style="left:${W / 2 - .5}px;top:0;width:1px;height:${H}px;background:rgba(229,197,123,.35)"></div>` : '';
  return `<div class="a" style="left:0;top:0;width:${W}px;height:${H}px;overflow:hidden">${glow}${panel('left')}${panel('right')}${seam}${crack}</div>`;
}
const jobs = process.env.ONLY === 'v9b' ? [
  ['ministry_big', 232, 46, `<div class="a" style="left:0;top:0;width:232px;height:46px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1"><span class="gold gsh2" style="font-family:Bodoni;font-weight:900;font-size:17.5px;white-space:nowrap">HEAVEN THRONE ROOM</span><span class="gold gsh2" style="font-family:Bodoni;font-weight:900;font-size:17.5px;margin-top:2px;white-space:nowrap">MINISTRY</span></div>`],
  ['cta_big', 220, 50, `<div class="a" style="left:0;top:0;width:220px;height:50px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1"><span class="silver" style="font-family:Cond;font-weight:600;font-size:12px;letter-spacing:.42em;text-transform:uppercase;filter:drop-shadow(0 1px 2px rgba(0,0,0,.9))">Contact</span><span class="gold gsh2" style="font-family:Bodoni;font-weight:900;font-size:26px;margin-top:2px;white-space:nowrap;filter:drop-shadow(0 0 6px rgba(255,226,150,.9)) drop-shadow(0 1px 2px rgba(0,0,0,.9))">DR. SHEKINAIH</span></div>`],
  ['power_b', 212, 56, `<div class="a" style="left:0;top:0;width:212px;height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1"><span class="silver" style="font-family:Cond;font-weight:600;font-size:13px;letter-spacing:.4em;text-transform:uppercase;filter:drop-shadow(0 1px 2px rgba(0,0,0,.9))">Power of</span><span class="gold gsh2" style="font-family:Bodoni;font-weight:900;font-size:34px;margin-top:1px;white-space:nowrap;filter:drop-shadow(0 0 6px rgba(255,226,150,.9)) drop-shadow(0 1px 2px rgba(0,0,0,.9))">HEAVEN</span></div>`],
  ['email_b', 212, 16, `<div class="a" style="left:0;top:0;width:212px;height:16px;display:flex;align-items:center;justify-content:center;white-space:nowrap"><span style="font-family:Cond;font-weight:600;font-size:11px;letter-spacing:.05em;color:#FFFFFF;white-space:nowrap;filter:drop-shadow(0 1px 2px rgba(0,0,0,.95))">Write to:&nbsp;</span><span style="font-family:Cond;font-weight:600;font-size:11px;letter-spacing:.02em;color:#FFF3C4;white-space:nowrap;filter:drop-shadow(0 1px 2px rgba(0,0,0,.95))">ceg@crownedeaglesglobal.org</span></div>`],
] : process.env.ONLY === 'plaque_b' ? [
  ['plaque_mr_b', 104, 40, `<div class="a" style="left:0;top:0;width:104px;height:40px;display:flex;align-items:center;justify-content:center"><span class="plq" style="padding:3px 8px 3px"><span class="k k1"></span><span class="k k2"></span><span class="k k3"></span><span class="k k4"></span><span class="p1 silver" style="color:transparent;font-size:8px;letter-spacing:.28em">Contact</span><span class="p2 gold gsh2" style="font-size:11.5px">DR. SHEKINAIH</span></span></div>`],
] : [
  ['plaque_lb', 124, 40, `<div class="a" style="left:0;top:0;width:124px;height:40px;display:flex;align-items:center;justify-content:center"><span class="plq" style="padding:3px 10px 3px"><span class="k k1"></span><span class="k k2"></span><span class="k k3"></span><span class="k k4"></span><span class="p1">Contact</span><span class="p2 gold gsh2" style="font-size:12px">DR SHEKINAIH</span></span></div>`],
  ['plaque_mr', 104, 40, `<div class="a" style="left:0;top:0;width:104px;height:40px;display:flex;align-items:center;justify-content:center"><span class="plq" style="padding:3px 8px 3px"><span class="k k1"></span><span class="k k2"></span><span class="k k3"></span><span class="k k4"></span><span class="p1">Contact</span><span class="p2 gold gsh2" style="font-size:11px">DR SHEKINAIH</span></span></div>`],
  ...[18, 20, 23, 14, 16, 18.5].map((px) => [`bang_${px}`, Math.ceil(px * 4.2), Math.ceil(px * 1.5), `<div class="a" style="left:0;top:0;width:${Math.ceil(px * 4.2)}px;height:${Math.ceil(px * 1.5)}px;display:flex;align-items:center;justify-content:center"><span class="bang" style="font-size:${px}px">BANG!</span></div>`]),
  ...[1, 2, 3, 4].map((st) => [`gate_lb_${st}`, 124, 62, gate(124, 62, st)]),
  ...[1, 2, 3, 4].map((st) => [`gate_mr_${st}`, 104, 74, gate(104, 74, st)]),
];
const browser = await chromium.launch();
for (const [name, w, h, html] of jobs) {
  const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await p.setContent(page(w, h, html)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
  await p.screenshot({ path: path.join(OUT, name + '@2x.png'), omitBackground: true }); await p.close();
}
await browser.close(); console.log('layers ok', jobs.length);
