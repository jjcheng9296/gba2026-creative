function bokeh(){return ''}
function rainbow(a){a.op=(a.op||.6)*0.6; a.band=(a.band||30)*0.8; return rainbow_real(a)}
// GBA 2026 — round 7: "The Promise Arc" campaign.
// A luminous rainbow (the promise) crowns the two founders, who stand behind a
// polished black-and-gold stage edge (the promise delivered). Marina Bay at night.
import pw from '/opt/npm-tools/node_modules/playwright/index.js';
const { chromium } = pw;
import fs from 'fs';
import path from 'path';

const here = '/home/claude/gba/design';
const SEVEN = !!process.env.SEVEN;   // V7 (James 19:32): show that DR SHEKINAIH founded 7 companies — all four sizes, V1 untouched
const V11H = process.env.V11H || '';   // V11 headline mock (boss 19 Oct 15:49): '' = V9C band unchanged · 'band' = CE GLOBAL NETWORK INTERNATIONAL / GLOBAL FREIGHT FORWARDING! · 'none' = band name removed
// band6 (James 16:13 "这样看不清楚，除非你做成立体的银色"): 3D SILVER band headline — chrome face like the IN lettering, thin dark bevel edge,
// steel extrusion down-right, soft black drop. No gold stroke on the letters (it closed the counters at 12 px caps).
const silver3dLine = (t, d = 3) => {
  const ext = ['#59616C', '#434A53', '#30363E', '#252A31'].slice(0, d);
  const k0 = 'position:absolute;left:0;top:0';
  let h = `<span style="${k0};color:rgba(0,0,0,.92);transform:translate(${(0.42 * d + 0.35).toFixed(2)}px,${(0.66 * d + 0.55).toFixed(2)}px);filter:blur(.45px)">${t}</span>`;
  for (let k = d; k >= 1; k--) h += `<span style="${k0};color:${ext[k - 1]};transform:translate(${(0.42 * k).toFixed(2)}px,${(0.66 * k).toFixed(2)}px)">${t}</span>`;
  return h + `<span style="${k0};color:#5A626D;-webkit-text-stroke:.45px #5A626D">${t}</span><span style="position:relative;display:block;background:linear-gradient(180deg,#FFFFFF 0%,#F3F5F8 24%,#C6CDD6 47%,#8F99A6 54%,#D8DDE4 68%,#FFFFFF 86%,#EEF1F4 100%);-webkit-background-clip:text;background-clip:text;color:transparent">${t}</span>`;
};
const band6 = () => ['CE GLOBAL NETWORK INTERNATIONAL', 'GLOBAL FREIGHT FORWARDING!'].map((t, i) => `<div style="position:absolute;left:0;top:${i ? 16.5 : 0.5}px;width:214px;text-align:center;font-family:Anton;font-weight:400;font-size:13.9px;line-height:1;letter-spacing:.045em;padding-left:.045em;white-space:nowrap"><span style="position:relative;display:inline-block">${silver3dLine(t)}</span></div>`).join('');
const DSF = +(process.env.DSF || 2);
const OUT = path.join(here, 'out10' + ((process.env.VARIANT || '') ? '_' + process.env.VARIANT : SEVEN ? '_v7' : '') + (V11H ? '_v11h_' + V11H : '') + (process.env.DIMBG ? '_dim' : ''));
const RP = (f) => 'file:///home/claude/gba/remotion/public/' + f;
const u = (p) => 'file://' + path.join(here, p);
const F = (p) => u('node_modules/@fontsource/' + p);
const HEAD = (process.env.HEAD || 'PROMISE|DELIVERED').split('|');
const COVER_HEAD = (process.env.CHEAD || 'WHEN ALL|ELSE FAILS,|CONTACT SHEKINAIH').split('|');
const CH = Math.min(140, Math.floor(860 / (0.72 * Math.max(...COVER_HEAD.map(h => h.length)))));
const CTOP = COVER_HEAD.length > 2 ? 118 : 150;
const WEB = 'ceglobalnetworkinternational.com';
const MAIL = 'shipping@ceglobalnetworkinternational.com';
// Ministry contact (boss's request 2026-10-16: "Contact us — both freight and HEAVEN THRONE ROOM MINISTRY")
const MIN_NAME = 'Heaven Throne Room Ministry';
const MIN_WEB = 'crownedeaglesglobal.org';
const MIN_MAIL = 'ceg@crownedeaglesglobal.org';
const CTA_FREIGHT = process.env.CTA1 ?? '';
const CTA_MIN = process.env.CTA2 ?? 'When all else fails, contact SHEKINAIH';
const FOUNDERS = { src: 'founders_red_hd.png', w: 1085, h: 1431, manX: 290, womanX: 705, split: 510 };
const GOLDGOWN = { src: 'shekinaih_gold_hd.png', w: 1200, h: 2200 };

const fonts = `
@font-face{font-family:Bodoni;src:url(${F('bodoni-moda/files/bodoni-moda-latin-800-normal.woff2')});font-weight:800}
@font-face{font-family:Bodoni;src:url(${F('bodoni-moda/files/bodoni-moda-latin-900-normal.woff2')});font-weight:900}
@font-face{font-family:Cinzel;src:url(${F('cinzel/files/cinzel-latin-600-normal.woff2')});font-weight:600}
@font-face{font-family:Cinzel;src:url(${F('cinzel/files/cinzel-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:Cinzel;src:url(${F('cinzel/files/cinzel-latin-800-normal.woff2')});font-weight:800}
@font-face{font-family:Cond;src:url(${F('barlow-condensed/files/barlow-condensed-latin-500-normal.woff2')});font-weight:500}
@font-face{font-family:Cond;src:url(${F('barlow-condensed/files/barlow-condensed-latin-600-normal.woff2')});font-weight:600}
@font-face{font-family:Cond;src:url(${F('barlow-condensed/files/barlow-condensed-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:Anton;src:url(${F('anton/files/anton-latin-400-normal.woff2')});font-weight:400}
@font-face{font-family:Sans;src:url(${F('manrope/files/manrope-latin-500-normal.woff2')});font-weight:500}
@font-face{font-family:Sans;src:url(${F('manrope/files/manrope-latin-600-normal.woff2')});font-weight:600}
@font-face{font-family:Sans;src:url(${F('manrope/files/manrope-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:Sans;src:url(${F('manrope/files/manrope-latin-800-normal.woff2')});font-weight:800}`;

// Palette
const C = {
  night: '#040817', ink: '#02040C', ivory: '#F7F1E3', champagne: '#F3DDA0', gold: '#E2B354', deep: '#8A5A16',
};

const css = (w, h) => `${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{position:relative;background:${C.night};color:${C.ivory};font-family:Sans;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.a{position:absolute}
/* polished champagne gold — bright, no muddy band */
.gold{background:linear-gradient(180deg,#FFF9E6 0%,#FBE7AE 22%,#EFC566 46%,#CF9635 60%,#E9BC5C 74%,#FFEDB4 92%,#FFF6D9 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.silver{background:linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%,#F4F6F9 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.rbw{background:linear-gradient(90deg,#FF4A4A 0%,#FF9A2E 17%,#FFE23B 33%,#4BE37A 50%,#2EC4FF 67%,#8A6BFF 83%,#FF5FD6 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:.35px #E3B65A;filter:drop-shadow(0 0 .4px #FFE9A8) drop-shadow(0 .6px 0 rgba(0,0,0,.95)) drop-shadow(0 1px 2.5px rgba(0,0,0,.75))}
.gbd{-webkit-text-stroke:.35px #D4A63F;filter:drop-shadow(0 0 .4px #F0CF7E) drop-shadow(0 .6px 0 rgba(0,0,0,.95)) drop-shadow(0 1px 2.5px rgba(0,0,0,.75))}
.ssh{filter:drop-shadow(0 .5px 0 rgba(40,46,56,.95)) drop-shadow(0 1px 3px rgba(0,0,0,.6))}
.gsh{filter:drop-shadow(0 1px 0 rgba(74,44,6,.95)) drop-shadow(0 4px 10px rgba(0,0,0,.55))}
.gsh2{filter:drop-shadow(0 .5px 0 rgba(74,44,6,.95)) drop-shadow(0 1px 3px rgba(0,0,0,.6))}
.cn{font-family:'Noto Serif CJK SC','Noto Serif CJK TC',serif;font-weight:700;white-space:nowrap;display:block;line-height:1.05}
.hl{font-family:Bodoni;font-weight:900;line-height:.9;letter-spacing:-.005em;white-space:nowrap;display:block}
.cin{font-family:Cinzel;font-weight:700;white-space:nowrap;display:block;line-height:1}
.bd{font-family:Bodoni;font-weight:900;white-space:nowrap;display:block;line-height:1;letter-spacing:.01em;text-transform:uppercase}
.cond{font-family:Cond;font-weight:600;text-transform:uppercase;white-space:nowrap}
.ceg{background:url(${u('ceg_logo.png')}) center/contain no-repeat;filter:drop-shadow(0 3px 8px rgba(0,0,0,.6))}
.cetile{background:#FFFDF6 url(${u('logo.jpg')}) center/88% no-repeat;box-shadow:0 0 0 1px #8A5A16,0 0 0 2.5px #F0CF7E,0 6px 16px rgba(0,0,0,.55)}
.cta{display:inline-flex;align-items:center;justify-content:center;gap:.45em;font-family:Sans;font-weight:800;color:#1B1105;border-radius:999px;background:linear-gradient(180deg,#FFF3C9 0%,#F4CF71 45%,#D39A3A 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 0 0 1px #7A4E12,0 6px 18px rgba(240,180,70,.35);white-space:nowrap}
.plq{position:relative;display:inline-block;text-align:center;padding:8px 22px 9px;background:linear-gradient(180deg,#1C1609 0%,#0C0905 100%);box-shadow:0 0 0 1px #C9A24E,inset 0 0 0 1px rgba(255,236,180,.12),0 6px 16px rgba(0,0,0,.55);white-space:nowrap}
.plq .k{position:absolute;width:7px;height:7px;border-color:#F0CF7E;border-style:solid}
.plq .k1{left:3px;top:3px;border-width:1.5px 0 0 1.5px}
.plq .k2{right:3px;top:3px;border-width:1.5px 1.5px 0 0}
.plq .k3{left:3px;bottom:3px;border-width:0 0 1.5px 1.5px}
.plq .k4{right:3px;bottom:3px;border-width:0 1.5px 1.5px 0}
.plq .p1{display:block;font-family:Cond;font-weight:600;font-size:10.5px;letter-spacing:.32em;text-transform:uppercase;color:#D8BE85}
.plq .p2{display:block;font-family:Bodoni;font-weight:900;font-size:16px;letter-spacing:.02em;margin-top:3px;line-height:1}
.btn2{display:inline-block;text-align:center;border-radius:8px;padding:7px 18px 8px;background:linear-gradient(180deg,#F6DE97 0%,#E9C66F 55%,#D4AC4E 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 0 0 1px #8A5A16,0 3px 8px rgba(0,0,0,.45);color:#1B1105;font-family:Sans;white-space:nowrap}
.btn2 .l1{display:block;font-weight:700;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:#4A2F08}
.btn2 .l2{display:block;font-weight:800;font-size:15px;letter-spacing:.01em;margin-top:2px}
.rule{height:1px;background:linear-gradient(90deg,rgba(240,207,126,0),#F0CF7E 20%,#F0CF7E 80%,rgba(240,207,126,0))}
`;
const page = (w, h, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${css(w, h)}</style></head><body>${body}</body></html>`;

// ---------- building blocks ----------
// Night skyline photo placed at width W (css px) with offsets.
const ARCH = { W: 6000, H: 2399, cx: 4276, cy: 1936 }; // photo rainbow geometry in master px (aibg_arch5 = 'Rainbow Over Marina Bay at Night-5', James's pick)
const ARCH_B = { src: 'aibg_archB.jpg', W: 3000, H: 2250, cx: 1565, cy: 1348 }; // 4:3 plate (ChatGPT "CE_Promise_Delivered_B_4x3_composition_reference")
const arch = (k, cxCss, oy = 0, extra = '', fill = 'mirror', M = { src: 'aibg_arch5.jpg', ...ARCH }) => {
  const w = M.W * k, ox = cxCss - M.cx * k;
  const f = 'filter:brightness(1.0) contrast(1.03) saturate(1.08);'; // v21: near-neutral — the raw plate is the look James approved
  const fD = process.env.DIMBG ? `filter:brightness(${process.env.DIMBG}) contrast(1.05) saturate(0.55);` : f;   // VAR1 (James 19:04): 'city lights out' plate; the rainbow is put back from the lit plate in post, founders/logos/text are other layers
  const sides = fill === 'mirror'
    ? `<img class="a" src="${u(M.src)}" style="left:${ox - w}px;top:${oy}px;width:${w}px;transform:scaleX(-1);${fD}">
  <img class="a" src="${u(M.src)}" style="left:${ox + w}px;top:${oy}px;width:${w}px;transform:scaleX(-1);${fD}">`
    : `<div class="a" style="inset:0;background:#06091A"></div>`;
  // Headroom rule (v20): the rainbow apex must sit >= 11% below the top edge (goldenbullaward crops ~3% off the top of the cover).
  // When the photo is pushed down (oy > 0) the gap above it is filled with the photo's own top 1% of sky, stretched and blurred —
  // plain dark sky only, the rainbow itself is never extended or redrawn.
  const strip = oy > 0
    ? `<div class="a" style="left:${ox}px;top:0;width:${w}px;height:${oy}px;overflow:hidden">
    <img src="${u(M.src)}" style="position:absolute;left:0;top:0;width:${w}px;height:${oy * 20}px;filter:blur(1.2px) ${process.env.DIMBG ? `brightness(${process.env.DIMBG}) contrast(1.05) saturate(0.55)` : 'brightness(1.0) contrast(1.03) saturate(1.08)'};"></div>`
    : '';
  return `${sides}${strip}
  <img class="a" src="${u(M.src)}" style="left:${ox}px;top:${oy}px;width:${w}px;${fD}${extra}">`;
};
const VAR = process.env.VARIANT || '';   // '' = v1 · 'v2' = symbols/fewer words · 'v2zh' = Chinese
// gold line icons (sea · air · haulage · warehouse) — the business line said with symbols, not words (V2)
const ICO = {
  ship: '<path d="M3 17h18l-2 4H5zM5 17V9h4V5h6v4h4v8"/><path d="M9 9h6"/>',
  plane: '<path d="M2 14l9-2 4-8h3l-2 8 5 2v2l-6-1-2 6h-2l-1-5-4 1z"/>',
  truck: '<path d="M2 6h11v10H2zM13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  box: '<path d="M3 8l9-4 9 4v9l-9 4-9-4z"/><path d="M3 8l9 4 9-4M12 12v9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
};
const icon = (n, px, col = '#E9C56A') => `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" style="display:inline-block;vertical-align:middle;filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))">${ICO[n]}</svg>`;
const icons = (px, gap = 10) => `<div style="display:flex;gap:${gap}px;align-items:center">${['ship','plane','truck','box'].map(n => icon(n, px)).join('')}</div>`;
const PHONE = process.env.PHONE || '';   // phone withheld in the public repo (set PHONE=… locally)
// BANG! BANG! BANG! — the boss's exclamation, popped in one at a time (frames 3-5 of the V1 GIF); the newest one is biggest
const bangs = (n, base = 13, grow = 1.45, center = false) => n ? `<div class="gsh2" style="display:flex;gap:7px;align-items:baseline;line-height:1;${center ? 'justify-content:center' : ''}">${[...Array(n)].map((_, i) => `<span class="bd gold" style="font-size:${i === n - 1 ? base * grow : base}px;letter-spacing:.02em">BANG!</span>`).join('')}</div>` : '';
const GEO = {}; const geo = (n, o) => { GEO[n] = o; return ''; }; // layout geometry for qa_check.py (v20)
const sky = (W, ox, oy, extra = '') => `<img class="a" src="${u('aibg_marina.jpg')}" style="left:${ox}px;top:${oy}px;width:${W}px;filter:brightness(1.0) contrast(1.05) saturate(1.22);${extra}">`;

// Smooth spectral rainbow arc (many thin rings interpolated) with feathered ends.
function rainbow_real({ W, H, cx, cy, R, band, op = .6, id, fadeL = null, fadeR = null, secondary = true, blur = .35 }) {
  const stops = [[255, 70, 70], [255, 150, 60], [255, 226, 100], [110, 220, 140], [80, 170, 255], [110, 110, 255], [170, 110, 255]];
  const N = 28; let rings = '';
  const ring = (r, sw, col) => `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(2)}" fill="none" stroke="${col}" stroke-width="${sw.toFixed(2)}"/>`;
  const colAt = (t) => { const p = t * (stops.length - 1); const i = Math.min(stops.length - 2, Math.floor(p)); const f = p - i; const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * f)); return `rgb(${c.join(',')})`; };
  const step = band / N;
  for (let i = 0; i < N; i++) rings += ring(R - band * 0 - i * step - step / 2, step + .6, colAt(i / (N - 1)));
  let sec = '';
  if (secondary) {
    const R2 = R + band * 1.9, b2 = band * 1.25, s2 = b2 / N;
    for (let i = 0; i < N; i++) sec += ring(R2 - i * s2 - s2 / 2, s2 + .6, colAt(1 - i / (N - 1)));
  }
  const fl = fadeL ?? [cx - R, cx - R * .55];
  const fr = fadeR ?? [cx + R * .55, cx + R];
  return `<svg class="a" style="left:0;top:0;mix-blend-mode:screen;pointer-events:none" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
   <filter id="bl${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${(band * blur).toFixed(2)}"/></filter>
   <filter id="bs${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${(band * .9).toFixed(2)}"/></filter>
   <linearGradient id="h${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">
     <stop offset="${Math.max(0, fl[0] / W)}" stop-color="#fff" stop-opacity="0"/>
     <stop offset="${Math.max(0, fl[1] / W)}" stop-color="#fff" stop-opacity="1"/>
     <stop offset="${Math.min(1, fr[0] / W)}" stop-color="#fff" stop-opacity="1"/>
     <stop offset="${Math.min(1, fr[1] / W)}" stop-color="#fff" stop-opacity="0"/>
   </linearGradient>
   <mask id="m${id}"><rect width="${W}" height="${H}" fill="url(#h${id})"/></mask>
  </defs>
  <g mask="url(#m${id})">
    ${secondary ? `<g filter="url(#bs${id})" opacity="${(op * .22).toFixed(3)}">${sec}</g>` : ''}
    <g filter="url(#bs${id})" opacity="${(op * .55).toFixed(3)}">${rings}</g>
    <g filter="url(#bl${id})" opacity="${op}">${rings}</g>
  </g></svg>`;
}

const glow = (x, y, rx, ry, col, o) => `<div class="a" style="left:${x - rx}px;top:${y - ry}px;width:${rx * 2}px;height:${ry * 2}px;border-radius:50%;background:radial-gradient(closest-side,rgba(${col},${o}),rgba(${col},0));pointer-events:none"></div>`;

// founders image; s = scale vs source; returns html and geometry helpers
function founders(x, y, s, opts = {}) {
  const w = FOUNDERS.w * s;
  return `<img class="a" src="${u(FOUNDERS.src)}" style="left:${x}px;top:${y}px;width:${w}px;filter:contrast(1.04) saturate(1.04) drop-shadow(0 0 ${Math.max(.6, 1.2 * s * 2)}px rgba(255,226,170,.45)) drop-shadow(0 ${14 * s * 2}px ${30 * s * 2}px rgba(0,0,0,.55));${opts.style || ''}">`;
}

// polished stage: black glass with a hot gold edge and a faint reflection
function stage(x, y, w, h, k = 1) {
  return `<div class="a" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;overflow:hidden;
     background:linear-gradient(180deg,#17120B 0%,#0A0805 ${12}%,#050404 55%,#020202 100%)">
    <div class="a" style="left:0;right:0;top:0;height:${Math.max(6, 22 * k)}px;background:linear-gradient(180deg,rgba(255,214,140,.22),rgba(255,214,140,0))"></div>
    <div class="a" style="left:0;right:0;bottom:${6 * k}px;height:1px;background:linear-gradient(90deg,rgba(240,207,126,0),rgba(240,207,126,.35) 15%,rgba(240,207,126,.35) 85%,rgba(240,207,126,0))"></div>
  </div>
  <div class="a" style="left:${x}px;top:${y - Math.max(1, 1.5 * k)}px;width:${w}px;height:${Math.max(2, 3 * k)}px;background:linear-gradient(90deg,#7A4E12 0%,#E9BE5E 12%,#FFF4D0 50%,#E9BE5E 88%,#7A4E12 100%);box-shadow:0 0 ${10 * k}px rgba(255,205,120,.65),0 0 ${36 * k}px rgba(255,190,90,.35)"></div>`;
}

// ---------- COVER 2000x800 ----------
function cover() {
  const W = 2000, H = 800, stageY = 668;
  const s = 0.45, fx = 1181, fy = 196; // founders centred under the photo arch; fy lowered so the arc clears the man's head after the photo shift
  const fw = FOUNDERS.w * s;
  const manC = fx + FOUNDERS.manX * s, womC = fx + FOUNDERS.womanX * s, split = fx + FOUNDERS.split * s;
  const cx = fx + 497 * s; // arc centre over the pair
  const R = 700, band = 56, cy = 44 + R;
  return page(W, H, `
  ${geo('cover', { W, H, master: 'arch5', k: 1 / 3, cxCss: 1425.33, oy: 56, s, fx, fy })}
  ${arch(1 / 3, 1425.33, 56)}
  <div class="a" style="inset:0;background:linear-gradient(180deg,rgba(2,4,14,.22) 0%,rgba(4,8,26,.06) 30%,rgba(4,8,26,0) 62%,rgba(2,3,10,.35) 84%)"></div>
  <div class="a" style="inset:0;background:linear-gradient(90deg,rgba(2,4,14,.96) 0%,rgba(2,4,14,.9) 28%,rgba(2,4,14,.5) 38%,rgba(2,4,14,0) 46%)"></div>
  <div class="a" style="left:${cx - 520}px;top:-80px;width:1040px;height:820px;background:radial-gradient(ellipse at 50% 0%,rgba(255,222,160,.12),rgba(255,222,160,.04) 45%,rgba(255,222,160,0) 70%);"></div>
  ${bokeh(W, H, 110, 23, 1100, 2000, 60, 640)}
  ${glow(640, 330, 640, 300, '2,4,14', .5)}
  ${glow(cx, 400, 430, 330, '255,214,150', .10)}
  ${glow(cx, stageY, 520, 90, '255,200,110', .35)}
  <img class="a" src="${u(FOUNDERS.src)}" style="left:${fx}px;top:${stageY + (stageY - fy - FOUNDERS.h * s) + 2}px;width:${fw}px;transform:scaleY(-1);transform-origin:50% 0;opacity:.28;filter:blur(1.6px) brightness(.8);-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 72%,rgba(0,0,0,.9) 100%);mask-image:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 72%,rgba(0,0,0,.9) 100%)">
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 2px rgba(255,226,170,.75)) drop-shadow(0 0 18px rgba(255,205,120,.28)) drop-shadow(0 16px 36px rgba(0,0,0,.6))' })}
  ${stage(0, stageY, W, H - stageY, 1)}

  <!-- headline column -->
  <div class="a" style="left:96px;top:${CTOP}px">
    <div class="gsh">
      ${COVER_HEAD.map((l, i) => {
        // only SHEKINAIH is gold; the rest of the ministry headline is bright silver
        if (COVER_HEAD.length > 2) {
          const parts = l.split('SHEKINAIH');
          const inner = parts.length > 1 ? `<span class="silver ssh">${parts[0]}</span><span class="gold gsh">SHEKINAIH</span>` : `<span class="silver ssh">${l}</span>`;
          return `<span class="hl" style="font-size:${CH}px;${i ? 'margin-top:6px' : ''}">${inner}</span>`;
        }
        return `<span class="hl gold" style="font-size:${CH}px;${i ? 'margin-top:6px' : ''}">${l}</span>`;
      }).join('')}
    </div>
    <div class="cond" style="margin-top:26px;font-size:38px;line-height:1.18;letter-spacing:.16em;color:#fff;font-weight:600">Singapore Freight Forwarding<br>&amp; Logistics</div>
  </div>

  <!-- company lockup on the stage: CEG left · name · CE Global right -->
  <div class="a" style="left:118px;top:${stageY + 16}px;height:${H - stageY - 30}px;display:flex;align-items:center;gap:22px">
    <div class="ceg" style="width:122px;height:122px"></div>
    <div class="gsh2" style="padding:0 6px">
      <span class="bd gold" style="font-size:50px">CE GLOBAL NETWORK</span>
      <span class="bd gold" style="font-size:50px;letter-spacing:.02em;margin-top:6px">INTERNATIONAL PTE LTD</span>
    </div>
    <div class="cetile" style="width:136px;height:111px;border-radius:12px"></div>
  </div>

  <!-- founders' names on the stage: DR SHEKINAIH (gold) above DR J AARON K DAVID (silver) -->
  <div class="a" style="left:${split - 150}px;top:${stageY + 14}px;width:1px;height:${H - stageY - 28}px;background:linear-gradient(180deg,rgba(240,207,126,0),#8A7A52 25%,#8A7A52 75%,rgba(240,207,126,0))"></div>
  <div class="a" style="left:${split - 122}px;top:${stageY + (SEVEN ? 4 : 13)}px;text-align:left">
    <span class="bd gold gsh2" style="font-size:${SEVEN ? 28 : 31}px">DR SHEKINAIH SIEW SIN YAP</span>
    <div style="font-family:Sans;font-weight:600;font-size:${SEVEN ? 13 : 15}px;color:#ECEAE5;margin-top:${SEVEN ? 2 : 5}px;line-height:1.15">Founder &amp; Managing Director</div>
    ${SEVEN ? SEVEN_LINE(12, 9) : ''}
    <span class="bd silver ssh" style="font-size:${SEVEN ? 20 : 22}px;margin-top:${SEVEN ? 4 : 10}px">DR J AARON K DAVID</span>
    <div style="font-family:Sans;font-weight:600;font-size:${SEVEN ? 13 : 15}px;color:#ECEAE5;margin-top:${SEVEN ? 2 : 5}px;line-height:1.15">Chief Advisory &amp; Support Officer</div>
  </div>
  `);
}

// ---------- AD 1000x500 ----------
function bokeh_real(W, H, n, seed, x0, x1, y0, y1) {
  let r = seed, out = '';
  const rnd = () => { r = (r * 16807) % 2147483647; return (r - 1) / 2147483646; };
  for (let i = 0; i < n; i++) {
    const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0), d = 2 + rnd() * 7, o = .15 + rnd() * .5;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${d.toFixed(1)}" fill="url(#bk)" opacity="${o.toFixed(2)}"/>`;
  }
  return `<svg class="a" style="left:0;top:0;mix-blend-mode:screen" width="${W}" height="${H}"><defs><radialGradient id="bk"><stop offset="0" stop-color="#FFE9B0"/><stop offset=".6" stop-color="#FFD27A" stop-opacity=".5"/><stop offset="1" stop-color="#FFC24A" stop-opacity="0"/></radialGradient></defs>${out}</svg>`;
}
function ad() {
  const W = 1000, H = 500, stageY = 370;
  const s = 0.30, fx = 595, fy = 86; // v20: smaller + lower so the photo arc passes above both heads with headroom
  const fw = FOUNDERS.w * s, fh = FOUNDERS.h * s;
  const split = fx + FOUNDERS.split * s;
  const cx = fx + 497 * s;
  const R = 335, band = 34, cy = 58 + R;
  const HS = Math.min(66, Math.floor(520 / (0.655 * Math.max(...HEAD.map(h => h.length)))));
  return page(W, H, `
  ${geo('ad', { W, H, master: 'arch5', k: 1 / 6, cxCss: 712.67, oy: 30, s, fx, fy })}
  ${arch(1 / 6, 712.67, 30)}
  <div class="a" style="inset:0;background:linear-gradient(180deg,rgba(2,4,14,.22) 0%,rgba(4,8,26,.06) 32%,rgba(4,8,26,0) 64%,rgba(2,3,10,.35) 82%)"></div>
  <div class="a" style="inset:0;background:linear-gradient(90deg,rgba(2,4,14,.96) 0%,rgba(2,4,14,.9) 30%,rgba(2,4,14,.5) 38%,rgba(2,4,14,0) 44%)"></div>
  <!-- spotlight cone from above onto the founders -->
  <div class="a" style="left:${cx - 260}px;top:-40px;width:520px;height:460px;background:radial-gradient(ellipse at 50% 0%,rgba(255,222,160,.12),rgba(255,222,160,.04) 45%,rgba(255,222,160,0) 70%);"></div>
  ${bokeh(W, H, 70, 11, 560, 1000, 30, 390)}
  ${glow(cx, 250, 250, 200, '255,214,150', .10)}
  ${glow(cx, stageY, 300, 60, '255,200,110', .35)}
  <!-- founders reflection on the glass stage -->
  <img class="a" src="${u(FOUNDERS.src)}" style="left:${fx}px;top:${stageY + (stageY - fy - fh) + 2}px;width:${fw}px;transform:scaleY(-1);transform-origin:50% 0;opacity:.28;filter:blur(1.2px) brightness(.8);-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 68%,rgba(0,0,0,.9) 100%);mask-image:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 68%,rgba(0,0,0,.9) 100%)">
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 1.4px rgba(255,226,170,.75)) drop-shadow(0 0 10px rgba(255,205,120,.28)) drop-shadow(0 10px 22px rgba(0,0,0,.6))' })}
  ${stage(0, stageY, W, H - stageY, .35)}

  <!-- lockup top-left: CEG · name · CE Global -->
  <!-- v23 (James 13:29): lockup tightened so the CE Global tile ends before the rainbow's left leg (bow outer edge x>=571 at y<=100) -->
  <div class="a" style="left:30px;top:22px;display:flex;align-items:center;gap:10px">
    <div class="ceg" style="width:80px;height:80px"></div>
    <div class="gsh2">
      <span class="bd gold" style="font-size:24.5px">CE GLOBAL NETWORK</span>
      <span class="bd gold" style="font-size:24.5px;letter-spacing:.02em;margin-top:4px">INTERNATIONAL PTE LTD</span>
    </div>
    <div class="cetile" style="width:76px;height:62px;border-radius:7px"></div>
  </div>

  <div class="a" style="left:38px;top:134px">
    <div class="gsh">
      <span class="hl gold" style="font-size:${HS}px">${HEAD[0]}</span>
      <span class="hl gold" style="font-size:${HS}px;margin-top:4px">${HEAD[1]}</span>
    </div>
    <div class="cond" style="margin-top:14px;font-size:22px;line-height:1.15;letter-spacing:.15em;color:#fff">Singapore Freight Forwarding<br>&amp; Logistics</div>
    <div class="cond" style="margin-top:6px;font-size:13px;letter-spacing:.2em;color:#E9E4D8;font-weight:500">Sea &nbsp;·&nbsp; Air &nbsp;·&nbsp; Haulage &nbsp;·&nbsp; Warehousing &nbsp;·&nbsp; eCommerce</div>
  </div>

  <!-- stage v23 (James 13:29 "make the words clearer and stand out, same standard as the 728 V10"): V10 3D letterings in the bar -->
  <div class="a" style="left:40px;top:${stageY + 5}px;font-family:Sans;font-weight:800;font-size:12.5px;letter-spacing:.22em;color:#ECEAE5;text-transform:uppercase">Contact us</div>
  <div class="a" style="left:40px;top:${stageY + 21}px"><span class="bd" style="font-size:21px;color:#F4F1EA;text-shadow:0 1px 2px rgba(0,0,0,.7);text-transform:uppercase">Freight &amp; Logistics</span></div>
  <div class="a" style="left:40px;top:${stageY + 47}px;font-family:Sans;font-weight:700;font-size:18.5px;letter-spacing:-.012em;line-height:1;color:#FFFFFF;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.6)">${MAIL}</div>
  <img class="a" src="${RP('v10/ministry_wide.png')}" style="left:40px;top:${stageY + 71}px;height:30px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.6))">
  <div class="a" style="left:40px;top:${stageY + 105}px;font-family:Sans;font-weight:700;font-size:18.5px;letter-spacing:-.012em;line-height:1;color:#FFFFFF;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.6)">${MIN_MAIL}</div>
  <div class="a" style="left:474px;top:${stageY + 9}px;width:226px;display:flex;justify-content:center"><span class="plq" style="padding:7px 9px 8px;width:226px;box-sizing:border-box"><span class="k k1"></span><span class="k k2"></span><span class="k k3"></span><span class="k k4"></span>
    <img src="${RP('v10/when_wide.png')}" style="display:block;width:204px;margin:0 auto">
    <span class="p1" style="font-size:8.5px;letter-spacing:.34em;margin-top:3px;color:#E7CF8E">Contact</span>
    <img src="${RP('v10/name_wide.png')}" style="display:block;width:206px;margin:1px auto 0">
    <span style="display:flex;justify-content:center;align-items:flex-end;gap:6px;margin-top:4px"><img src="${RP('v10/fully_wide.png')}" style="height:15px"><img src="${RP('v10/power_wide.png')}" style="height:17px"></span>
  </span></div>
  <div class="a" style="left:712px;top:${stageY + 14}px;width:1px;height:104px;background:linear-gradient(180deg,rgba(240,207,126,0),#8A7A52 25%,#8A7A52 75%,rgba(240,207,126,0))"></div>
  <div class="a" style="left:736px;top:${stageY + (SEVEN ? 8 : 14)}px;text-align:left">
    <span class="bd gold gsh2" style="font-size:${SEVEN ? 18.5 : 22}px">DR SHEKINAIH</span><span class="bd gold gsh2" style="font-size:${SEVEN ? 18.5 : 22}px;margin-top:2px">SIEW SIN YAP</span>
    <div style="font-family:Sans;font-weight:600;font-size:${SEVEN ? 10.5 : 11.5}px;color:#ECEAE5;margin-top:${SEVEN ? 3 : 4}px;line-height:1.2">Founder &amp; Managing Director</div>
    ${SEVEN ? SEVEN_LINE(8, 6) : ''}
    <span class="bd silver ssh" style="font-size:${SEVEN ? 14 : 16.5}px;margin-top:${SEVEN ? 5 : 8}px">DR J AARON K DAVID</span>
    <div style="font-family:Sans;font-weight:600;font-size:${SEVEN ? 10.5 : 11}px;color:#ECEAE5;margin-top:${SEVEN ? 3 : 4}px;line-height:1.2">Chief Advisory &amp; Support Officer</div>
  </div>
  `);
}

// ---------- LEADERBOARD 728x90 ----------
// f0 brand (CE Global logo) · f1 CONTACT US FOR LOGISTICS SOLUTIONS (CE Global logo) · f2 CONTACT US FOR HEAVEN THRONE ROOM MINISTRY (CEG crest + plaque)
function lb(f) {
  const W = 728, H = 90;
  let seven = false; if (SEVEN) { if (f === 1) seven = true; else if (f > 1) f -= 1; }
  const bang = f >= 3 ? f - 2 : 0; if (f >= 3) f = 2;
  const k = 0.062;                       // master scale: right edge of the photo lands on the banner's right edge
  const C = W - (ARCH.W - ARCH.cx) * k;  // arch centre (614)
  const s = 0.09, fy = 28, fx = Math.round(C - 497 * s); // v20: arc headroom + clears heads
  const logo = ((f === 2 && !(VAR.startsWith('v3') || VAR.startsWith('v4'))) || (f === 0 && VAR.startsWith('v4')))
    ? `<div class="a ceg" style="left:12px;top:8px;width:74px;height:74px"></div>`
    : `<div class="a cetile" style="left:12px;top:${VAR ? 9 : 12}px;width:${VAR ? 88 : 82}px;height:${VAR ? 72 : 67}px;border-radius:7px"></div>`;
  const midV2 = {
    0: `<div class="gsh2"><span class="hl gold" style="font-size:32px;line-height:.96">PROMISE</span><span class="hl gold" style="font-size:32px;line-height:.96">DELIVERED</span></div>
        <div style="margin-top:6px">${icons(17, 12)}</div>`,
    1: `<div class="gsh2"><span class="hl gold" style="font-size:30px;line-height:.96">CONTACT US</span></div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:7px">${icons(16, 9)}<span style="color:#C9A24E;font-size:16px">|</span>${icon('mail', 16, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:13.5px;color:#fff">${MAIL}</span></div>`,
    2: `<span class="bd gold gsh2" style="font-size:16px">${MIN_NAME}</span>
        <div style="display:flex;align-items:center;gap:7px;margin-top:8px">${icon('mail', 15, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:13.5px;color:#fff">${MIN_MAIL}</span></div>`,
  };
  const midZH = {
    0: `<div class="gsh2"><span class="cn gold" style="font-size:38px;letter-spacing:.08em">承诺必达</span></div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:5px">${icons(16, 10)}<span class="cn" style="font-size:13px;color:#fff;letter-spacing:.2em">新加坡国际货运</span></div>`,
    1: `<div class="gsh2"><span class="cn gold" style="font-size:30px;letter-spacing:.1em">联系我们 · 货运物流</span></div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:7px">${icon('mail', 15, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:13.5px;color:#fff">${MAIL}</span></div>`,
    2: `<div class="gsh2"><span class="cn gold" style="font-size:28px;letter-spacing:.1em">天国宝座事工</span></div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:7px">${icon('mail', 15, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:13.5px;color:#fff">${MIN_MAIL}</span></div>`,
  };
  const V3MAIL = `<div style="display:flex;align-items:center;gap:7px">${icon('mail', 15, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:13.5px;color:#fff">${MAIL}</span><span style="color:#C9A24E;margin:0 4px">|</span>${icon('phone', 14, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:13.5px;color:#fff">${PHONE}</span></div>`;
  const midV3 = {   // V3: first frame complete (hook = buyer's problem), one moving line, icons fixed
    0: `<div class="gsh2"><span class="hl silver ssh" style="font-size:15px;letter-spacing:.06em">WHEN ALL ELSE FAILS,</span><span class="hl gold" style="font-size:24px;margin-top:3px">CONTACT SHEKINAIH</span></div>`,
    1: `<div class="gsh2"><span class="hl gold" style="font-size:28px;line-height:1">PROMISE DELIVERED</span></div>`,
    2: `<div class="gsh2"><span class="hl gold" style="font-size:28px;line-height:1">CONTACT US</span></div><div style="margin-top:6px">${V3MAIL}</div>`,
  };
  const midZH3 = {
    0: `<div class="gsh2"><span class="cn" style="font-size:14px;color:#ECEAE5;letter-spacing:.22em">万策皆尽时</span><span class="cn gold" style="font-size:24px;letter-spacing:.06em;margin-top:2px">请找 SHEKINAIH</span></div>`,
    1: `<div class="gsh2"><span class="cn gold" style="font-size:36px;letter-spacing:.1em">承诺必达</span></div>`,
    2: `<div class="gsh2"><span class="cn gold" style="font-size:30px;letter-spacing:.1em">联系我们</span></div><div style="margin-top:5px">${V3MAIL}</div>`,
  };
  const midV4 = { ...midV3, 0: `<div class="gsh2"><span class="hl silver ssh" style="font-size:12.5px;letter-spacing:.04em">WHEN ALL ELSE FAILS, CONTACT DR SHEKINAIH</span><span class="bd gold gsh2" style="font-size:17px;margin-top:4px">${MIN_NAME}</span></div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:3px"><span class="cond" style="font-size:10.5px;letter-spacing:.2em;color:#fff">Fully backed by the power of Heaven</span><span style="display:flex;align-items:center;gap:5px">${icon('phone', 12, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:12px;color:#fff">${PHONE}</span></span></div>` };
  const midZH4 = { ...midZH3, 0: `<div class="gsh2"><span class="cn" style="font-size:12px;color:#ECEAE5;letter-spacing:.12em">万策皆尽时 · 请找 SHEKINAIH 博士</span><span class="cn gold" style="font-size:22px;letter-spacing:.1em;margin-top:1px">天国宝座事工</span></div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:2px"><span class="cn" style="font-size:10.5px;color:#fff;letter-spacing:.2em">天上大能 · 全力护航</span><span style="display:flex;align-items:center;gap:5px">${icon('phone', 12, '#fff')}<span style="font-family:Sans;font-weight:700;font-size:12px;color:#fff">${PHONE}</span></span></div>` };
  const midSeven = `<span class="bd gold gsh2" style="font-size:19px">DR SHEKINAIH SIEW SIN YAP</span><div class="cond" style="font-size:12px;letter-spacing:.14em;color:#fff;margin-top:4px">Founder &amp; Managing Director</div>${SEVEN_LINE(10, 7)}`;
  const mid = seven ? midSeven : VAR === 'v4' ? midV4[f] : VAR === 'v4zh' ? midZH4[f] : VAR === 'v3' ? midV3[f] : VAR === 'v3zh' ? midZH3[f] : VAR === 'v2' ? midV2[f] : VAR === 'v2zh' ? midZH[f] : {
    0: `<div class="gsh2"><span class="hl gold" style="font-size:30px;line-height:.96">PROMISE</span><span class="hl gold" style="font-size:30px;line-height:.96">DELIVERED</span></div>
        <div class="cond" style="font-size:14px;letter-spacing:.12em;color:#fff;margin-top:5px">Singapore Freight Forwarding &amp; Logistics</div>`,
    1: `<div class="cond" style="font-size:18px;letter-spacing:.1em;color:#fff;font-weight:700;line-height:1">Contact us for logistics solutions</div>
        <span class="bd gold gsh2" style="font-size:18.5px;margin-top:6px">CE GLOBAL NETWORK INTERNATIONAL PTE LTD</span>
        <div style="display:flex;align-items:center;gap:6px;font-family:Sans;font-weight:700;font-size:13.5px;color:#fff;margin-top:6px">${icon('mail', 14, '#fff')}${MAIL}<span style="color:#C9A24E;margin:0 3px">|</span>${icon('phone', 13, '#fff')}${PHONE}</div>`,
    2: `${bang ? bangs(bang, 12) : `<div class="cond" style="font-size:13px;letter-spacing:.2em;color:#fff;font-weight:700;line-height:1">Contact us for</div>`}
        <span class="bd gold gsh2" style="font-size:14px;margin-top:5px">${MIN_NAME}</span>
        <div style="display:flex;align-items:center;gap:5px;font-family:Sans;font-weight:700;font-size:10.5px;color:#fff;margin-top:5px">${icon('mail', 12, '#fff')}${MIN_MAIL}<span style="color:#C9A24E;margin:0 2px">|</span>${icon('phone', 11, '#fff')}${PHONE}</div>`,
  }[f];
  const plaque = (f === 2 && !(VAR.startsWith('v3') || VAR.startsWith('v4'))) ? `<div class="a" style="left:${VAR === 'v2' ? 418 : 404}px;top:0;height:88px;display:flex;align-items:center">
    <span class="plq" style="padding:5px 9px 6px"><span class="k k1"></span><span class="k k2"></span><span class="k k3"></span><span class="k k4"></span>${VAR === 'v2zh'
      ? `<span class="p1 cn" style="font-size:9px;letter-spacing:.3em;text-transform:none">万策皆尽时</span><span class="p2 gold gsh2" style="font-size:10.5px;margin-top:2px">CONTACT SHEKINAIH</span>`
      : `<span class="p1" style="font-size:7.5px;letter-spacing:.24em">When all else fails,</span><span class="p2 gold gsh2" style="font-size:10.5px;margin-top:2px">CONTACT DR SHEKINAIH</span><span class="p1" style="font-size:6.5px;letter-spacing:.14em;margin-top:3px">Fully backed by the power of Heaven</span>`}</span></div>` : '';
  return page(W, H, `
  ${geo('lb_f' + (bang ? bang + 2 : f), { W, H, master: 'arch5', k, cxCss: C, oy: 4, s, fx, fy })}
  ${arch(k, C, 4, '', 'navy')}
  <div class="a" style="inset:0;background:linear-gradient(90deg,rgba(2,4,14,.97) 0%,rgba(2,4,14,.92) 46%,rgba(2,4,14,.55) 56%,rgba(2,4,14,0) 66%)"></div>
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 .8px rgba(255,226,170,.8)) drop-shadow(0 0 6px rgba(255,205,120,.3)) drop-shadow(0 4px 10px rgba(0,0,0,.6))' })}
  <div class="a" style="left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,#7A4E12,#E9BE5E 15%,#FFF4D0 55%,#E9BE5E 85%,#7A4E12);box-shadow:0 0 8px rgba(255,205,120,.6)"></div>
  ${logo}
  <div class="a" style="left:110px;top:0;height:88px;display:flex;flex-direction:column;justify-content:center">${mid}</div>
  ${((VAR.startsWith('v3') || VAR.startsWith('v4')) && !(VAR.startsWith('v4') && f === 0)) ? `<div class="a" style="left:452px;top:0;height:88px;display:flex;align-items:center">${icons(18, 10)}</div>` : ''}
  ${plaque}
  `);
}

// ---------- MEDIUM RECTANGLE 340x280 ----------
// f0 brand (CE Global logo) · f1 CONTACT US FOR LOGISTICS SOLUTIONS (CE Global logo) · f2 CONTACT US FOR HEAVEN THRONE ROOM MINISTRY (CEG crest + plaque)
function mr(f) {
  const W = 340, H = 280, stageY = 186;
  let seven = false; if (SEVEN) { if (f === 1) seven = true; else if (f > 1) f -= 1; }
  const bang = f >= 3 ? f - 2 : 0; if (f >= 3) f = 2;
  const s = 0.19, fx = 126, fy = 54; // v20: arc headroom + clears heads
  const cx = 180;
  const top = ((f === 2 && !(VAR.startsWith('v3') || VAR.startsWith('v4'))) || (f === 0 && VAR.startsWith('v4')))
    ? `<div class="a ceg" style="left:6px;top:${stageY + 16}px;width:60px;height:60px"></div>`
    : `<div class="a cetile" style="left:7px;top:${stageY + 20}px;width:58px;height:48px;border-radius:6px"></div>`;   // v24: logo lives in the band, the photo + rainbow stay untouched
  const PLQ = (p1, p1cls = '') => `<span class="plq" style="padding:2px 12px 2px"><span class="k k1"></span><span class="k k2"></span><span class="k k3"></span><span class="k k4"></span><span class="p1 ${p1cls}" style="font-size:${p1cls ? 9 : 7.5}px;letter-spacing:.26em;${p1cls ? 'text-transform:none' : ''}">${p1}</span><span class="p2 gold gsh2" style="font-size:11.5px;margin-top:2px">CONTACT SHEKINAIH</span></span>`;
  const row = (inner) => `<div style="display:flex;justify-content:center;align-items:center;gap:9px">${inner}</div>`;
  const bodyV2 = {
    0: `<div style="text-align:center" class="gsh2"><span class="hl gold" style="font-size:26px;line-height:.95">PROMISE DELIVERED</span></div>
        <div style="margin-top:12px">${row(icons(22, 18))}</div>`,
    1: `<div style="text-align:center" class="gsh2"><span class="hl gold" style="font-size:30px;line-height:.95">CONTACT US</span></div>
        <div style="margin-top:9px">${row(icons(19, 14))}</div>
        <div style="margin-top:8px">${row(icon('mail', 15, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:12.5px;color:#fff">${MAIL}</span>`)}</div>`,
    2: `<span class="bd gold gsh2" style="text-align:center;font-size:15.5px">${MIN_NAME}</span>
        <div style="margin-top:5px">${row(icon('mail', 14, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:12.5px;color:#fff">${MIN_MAIL}</span>`)}</div>
        <div style="text-align:center;margin-top:5px">${PLQ('When all else fails,')}</div>`,
  };
  const bodyZH = {
    0: `<div style="text-align:center" class="gsh2"><span class="cn gold" style="font-size:40px;letter-spacing:.1em">承诺必达</span></div>
        <div style="margin-top:8px">${row(icons(20, 14) + `<span class="cn" style="font-size:13px;color:#fff;letter-spacing:.18em;margin-left:4px">新加坡国际货运</span>`)}</div>`,
    1: `<div style="text-align:center" class="gsh2"><span class="cn gold" style="font-size:28px;letter-spacing:.1em">联系我们 · 货运物流</span></div>
        <div style="margin-top:8px">${row(icons(18, 12))}</div>
        <div style="margin-top:7px">${row(icon('mail', 14, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:12.5px;color:#fff">${MAIL}</span>`)}</div>`,
    2: `<div style="text-align:center" class="gsh2"><span class="cn gold" style="font-size:26px;letter-spacing:.1em">天国宝座事工</span></div>
        <div style="margin-top:4px">${row(icon('mail', 14, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:12.5px;color:#fff">${MIN_MAIL}</span>`)}</div>
        <div style="text-align:center;margin-top:5px">${PLQ('万策皆尽时', 'cn')}</div>`,
  };
  const MAILROW = row(icon('mail', 14, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:12.5px;color:#fff">${MAIL}</span>`) + `<div style="margin-top:3px">` + row(icon('phone', 13, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:13px;color:#fff;letter-spacing:.04em">${PHONE}</span>`) + `</div>`;
  const ICONROW = `<div style="margin-top:7px">${row(icons(19, 16))}</div>`;
  const bodyV3 = {
    0: `<div style="text-align:center" class="gsh2"><span class="hl silver ssh" style="font-size:14px;letter-spacing:.08em">WHEN ALL ELSE FAILS,</span><span class="hl gold" style="font-size:24px;margin-top:4px">CONTACT SHEKINAIH</span></div>${ICONROW}`,
    1: `<div style="text-align:center;height:46px;display:flex;align-items:center;justify-content:center" class="gsh2"><span class="hl gold" style="font-size:26px">PROMISE DELIVERED</span></div>${ICONROW}`,
    2: `<div style="text-align:center" class="gsh2"><span class="hl gold" style="font-size:26px">CONTACT US</span></div><div style="margin-top:5px">${MAILROW}</div>${ICONROW}`,
  };
  const bodyZH3 = {
    0: `<div style="text-align:center" class="gsh2"><span class="cn" style="font-size:13px;color:#ECEAE5;letter-spacing:.22em">万策皆尽时</span><span class="cn gold" style="font-size:25px;letter-spacing:.06em;margin-top:2px">请找 SHEKINAIH</span></div>${ICONROW}`,
    1: `<div style="text-align:center;height:46px;display:flex;align-items:center;justify-content:center" class="gsh2"><span class="cn gold" style="font-size:34px;letter-spacing:.12em">承诺必达</span></div>${ICONROW}`,
    2: `<div style="text-align:center" class="gsh2"><span class="cn gold" style="font-size:26px;letter-spacing:.1em">联系我们</span></div><div style="margin-top:5px">${MAILROW}</div>${ICONROW}`,
  };
  const bodyV4 = { ...bodyV3, 0: `<div style="text-align:center" class="gsh2"><span class="hl silver ssh" style="font-size:11px;letter-spacing:.03em">WHEN ALL ELSE FAILS, CONTACT DR SHEKINAIH</span><span class="bd gold gsh2" style="font-size:15.5px;margin-top:5px">${MIN_NAME}</span></div>
        <div class="cond" style="text-align:center;font-size:10.5px;letter-spacing:.18em;color:#fff;margin-top:4px">Fully backed by the power of Heaven</div><div style="margin-top:3px">${row(icon('phone', 13, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:13px;color:#fff;letter-spacing:.04em">${PHONE}</span>`)}</div>` };
  const bodyZH4 = { ...bodyZH3, 0: `<div style="text-align:center" class="gsh2"><span class="cn" style="font-size:12px;color:#ECEAE5;letter-spacing:.1em">万策皆尽时 · 请找 SHEKINAIH 博士</span><span class="cn gold" style="font-size:24px;letter-spacing:.1em;margin-top:1px">天国宝座事工</span></div>
        <div class="cn" style="text-align:center;font-size:11px;color:#fff;letter-spacing:.2em;margin-top:3px">天上大能 · 全力护航</div><div style="margin-top:3px">${row(icon('phone', 13, '#fff') + `<span style="font-family:Sans;font-weight:700;font-size:13px;color:#fff;letter-spacing:.04em">${PHONE}</span>`)}</div>` };
  const bodySeven = `<div style="text-align:center" class="gsh2"><span class="bd gold" style="font-size:17px">DR SHEKINAIH</span><span class="bd gold" style="font-size:17px;margin-top:2px">SIEW SIN YAP</span></div><div class="cond" style="text-align:center;font-size:11px;letter-spacing:.14em;color:#fff;margin-top:4px">Founder &amp; Managing Director</div><div style="display:flex;justify-content:center">${SEVEN_LINE(9, 6)}</div>`;
  const body = seven ? bodySeven : VAR === 'v4' ? bodyV4[f] : VAR === 'v4zh' ? bodyZH4[f] : VAR === 'v3' ? bodyV3[f] : VAR === 'v3zh' ? bodyZH3[f] : VAR === 'v2' ? bodyV2[f] : VAR === 'v2zh' ? bodyZH[f] : {
    0: `<div style="text-align:center" class="gsh2"><span class="hl gold" style="font-size:27px;line-height:.95">PROMISE DELIVERED</span></div>
        <div class="cond" style="text-align:center;font-size:13.5px;letter-spacing:.12em;color:#fff;margin-top:8px">Singapore Freight Forwarding &amp; Logistics</div>
        <div style="text-align:center;font-family:Sans;font-weight:700;font-size:12px;color:#fff;margin-top:8px">${MAIL}</div>`,
    1: `<div class="cond" style="text-align:center;font-size:15.5px;letter-spacing:.1em;color:#fff;font-weight:700;line-height:1">Contact us for logistics solutions</div>
        <div style="text-align:center" class="gsh2"><span class="bd gold" style="font-size:17px;margin-top:5px">CE GLOBAL NETWORK</span><span class="bd gold" style="font-size:17px;letter-spacing:.02em;margin-top:2px">INTERNATIONAL PTE LTD</span></div>
        <div style="display:flex;justify-content:center;align-items:center;gap:4px;font-family:Sans;font-weight:700;font-size:10.5px;color:#fff;margin-top:6px;white-space:nowrap">${icon('mail', 12, '#fff')}${MAIL}<span style="color:#C9A24E;margin:0 2px">|</span>${icon('phone', 11, '#fff')}${PHONE}</div>`,
    2: `${bang ? `<div style="display:flex;justify-content:center">${bangs(bang, 12)}</div>` : `<div class="cond" style="text-align:center;font-size:11.5px;letter-spacing:.22em;color:#fff;font-weight:700;line-height:1">Contact us for</div>`}
        <span class="bd gold gsh2" style="text-align:center;font-size:15px;margin-top:3px">${MIN_NAME}</span>
        <div style="display:flex;justify-content:center;align-items:center;gap:4px;font-family:Sans;font-weight:700;font-size:10.5px;color:#fff;margin-top:2px;line-height:1.1;white-space:nowrap">${icon('mail', 12, '#fff')}${MIN_MAIL}<span style="color:#C9A24E;margin:0 2px">|</span>${icon('phone', 11, '#fff')}${PHONE}</div>
        <div style="text-align:center;margin-top:3px"><span class="plq" style="padding:2px 12px 2px"><span class="k k1"></span><span class="k k2"></span><span class="k k3"></span><span class="k k4"></span><span class="p1" style="font-size:7.5px;letter-spacing:.26em">When all else fails,</span><span class="p2 gold gsh2" style="font-size:11.5px;margin-top:2px">CONTACT DR SHEKINAIH</span><span class="p1" style="font-size:6.5px;letter-spacing:.14em;margin-top:2px">Fully backed by the power of Heaven</span></span></div>`,
  }[f];
  return page(W, H, `
  ${geo('mr_f' + (bang ? bang + 2 : f), { W, H, master: 'arch5', k: 0.0986, cxCss: 170, oy: 22, s, fx, fy })}
  ${arch(0.0986, 170, 22, '', 'navy')}  <!-- k chosen so the plate's right edge = frame edge (no navy strip); 6000*k - 4276*k + 170 = 340 -->
  <div class="a" style="left:-40px;top:-40px;width:200px;height:170px;background:radial-gradient(ellipse at 40% 40%,rgba(2,4,14,.42),rgba(2,4,14,0) 68%)"></div>
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 1px rgba(255,226,170,.8)) drop-shadow(0 0 8px rgba(255,205,120,.3)) drop-shadow(0 6px 14px rgba(0,0,0,.6))' })}
  ${stage(0, stageY, W, H - stageY, .3)}
  ${top}
  <div class="a" style="left:70px;right:4px;top:${stageY + 6}px"><div style="zoom:${VAR.endsWith("zh") ? .92 : VAR ? .76 : .84}">${body}</div></div>
  `);
}

// ---------- V5 (ChatGPT GPT-6 Pro ad plan, 2026-10-17 11:06): the three BANGs as three visual beats, never as text ----------
// v5a "Light from Above"  · v5b "Crowned Signature" · v5c "Three Resonant Rings"   (+ 'zh' suffix = Chinese line on the brand frame)
// Fixed on every frame: logo, CE GLOBAL NETWORK INTERNATIONAL PTE LTD, HEAVEN THRONE ROOM MINISTRY, WHEN ALL ELSE FAILS, + the one plaque CONTACT DR SHEKINAIH.
// f0 brand (4.0s) · f1 freight mail (2.5s) · f2 ministry mail + unlit motif (2.5s) · f3/f4/f5 = beat 1/2/3 (0.7/0.7/3.6s). Photo, rainbow, faces never move.
const SEVEN_DIAMOND = (px) => `<span style="width:${Math.round(px * .45)}px;height:${Math.round(px * .45)}px;background:linear-gradient(135deg,#FFF4D0,#E9BE5E 60%,#8A5A16);transform:rotate(45deg);box-shadow:0 0 2px rgba(255,220,150,.6)"></span>`;
const SEVEN_LINE = (px, gap = 6) => `<div style="display:flex;align-items:center;gap:${gap}px;margin-top:${Math.round(px * .3)}px"><span class="gold gsh2" style="font-family:Bodoni;font-weight:900;font-size:${px * 2.6}px;line-height:.9">7</span><span class="cond" style="font-size:${px}px;letter-spacing:.2em;color:#F0CF7E;line-height:1.15">COMPANIES<br>SINGAPORE &amp; MALAYSIA</span><span style="display:flex;gap:${Math.round(px * .25)}px;margin-left:${Math.round(px * .4)}px">${SEVEN_DIAMOND(px).repeat(7)}</span></div>`;
const V9 = VAR.startsWith('v9'); const V9B = VAR === 'v9b'; const V9C = VAR === 'v9c';   // v9c = 728x90 leaderboard (ChatGPT round 9 layout: hero name, ministry 3D in the zone, email in the zone, slam row full width)   // v9b = 340x280 boss revision (silver company name, ministry moves to the photo top, email under the plaque)
//                        // V9 'Boss sequence': logos in the top corners (CEG left / CE Global right), empty bottom row, phrases + BANG animated in Remotion
const V6 = VAR.startsWith('v6') || V9;                        // V6 'Three Strikes': base layers only (gate/plaque/BANG animated in Remotion)
const V5 = VAR.startsWith('v5') ? VAR[2] : V6 ? 'f' : '';          // 'a' | 'b' | 'c' ... ; V6 borrows the V5F layout
const V5ZH = V5 && VAR.endsWith('zh');
const P5 = { dim: '#758294', sil: '#D8DEE6', hi: '#F0D69C' };   // ChatGPT palette: silver light around, gold only on the plaque
const V5LINE = { a: '困局当前，信仰引路', b: '以信仰为本，与您同行', c: '凝聚信念，共寻出路', d: '困局当前，信仰引路', e: '困局当前，信仰引路', f: '困局当前，信仰引路', g: '困局当前，信仰引路' };   // d = A + the boss's BANG! words popping with each strike
const v5plaque = (p2px, pad, extra = '') => `<span class="plq" style="padding:${pad};${V5 === 'b' ? 'box-shadow:0 0 0 1px #4A5262,0 6px 16px rgba(0,0,0,.55);' : ''}${extra}"><span class="k k1"${V5 === 'b' ? ' style="display:none"' : ''}></span><span class="k k2"${V5 === 'b' ? ' style="display:none"' : ''}></span><span class="k k3"${V5 === 'b' ? ' style="display:none"' : ''}></span><span class="k k4"${V5 === 'b' ? ' style="display:none"' : ''}></span><span class="p1" style="font-size:7.5px;letter-spacing:.3em">Contact</span><span class="p2 gold gsh2" style="font-size:${p2px}px;margin-top:2px">DR SHEKINAIH</span></span>`;
// motif above the plaque (pocket PW x MH); beat -1 = absent, 0 = unlit (f2), 1..3 = strikes
function v5motif(beat, PW, MH, big) {
  if (beat < 0) return '';
  const sw = big ? 5 : 4, dot = big ? 7 : 6, xs = [0.22, 0.5, 0.78].map((p) => Math.round(PW * p));
  if (V5 === 'a' || V5 === 'd') {
    if (beat === 0) return xs.map((x) => `<div class="a" style="left:${x - 1.5}px;top:${MH - 3}px;width:3px;height:3px;border-radius:50%;background:${P5.dim};opacity:.6"></div>`).join('');
    const hot = V5 === 'd';   // D ("震撼"): wider, whiter shafts — the BANG! words and the gold burst are added by lb5/mr5
    return xs.slice(0, beat).map((x, i) => `<div class="a" style="left:${x - (hot ? sw + 1 : sw) / 2}px;top:0;width:${hot ? sw + 1 : sw}px;height:${MH}px;background:linear-gradient(180deg,rgba(216,222,230,.05) 0%,rgba(216,222,230,${hot ? .85 : .7}) 35%,#FFFFFF 100%);box-shadow:0 0 ${big ? 9 : 7}px ${big ? 4 : 3}px rgba(${hot ? '255,240,200' : '216,222,230'},${hot ? .45 : .3})"></div>
      <div class="a" style="left:${x - dot / 2}px;top:${MH - dot / 2 - 1}px;width:${dot}px;height:${dot}px;border-radius:50%;background:${P5.hi};box-shadow:0 0 ${big ? 6 : 4}px 1px rgba(240,214,156,.85)"></div>`).join('');
  }
  if (V5 === 'c') {
    const cx = PW / 2, cy = MH / 2, ds = big ? [12, 22, 32] : [8, 16, 24], op = [1, .72, .48];
    const pt = (col, o = 1) => `<div class="a" style="left:${cx - 2}px;top:${cy - 2}px;width:4px;height:4px;border-radius:50%;background:${col};opacity:${o};${col === P5.hi ? 'box-shadow:0 0 4px 1px rgba(240,214,156,.8)' : ''}"></div>`;
    if (beat === 0) return pt(P5.dim, .6);
    return pt(P5.hi) + ds.slice(0, beat).map((d, i) => `<div class="a" style="left:${cx - d / 2}px;top:${cy - d / 2}px;width:${d}px;height:${d}px;border-radius:50%;border:1px solid ${P5.sil};opacity:${op[i]}"></div>`).join('');
  }
  return '';
}
// Crowned Signature: the beats finish the plaque's own frame (overlay placed over the plaque box)
function v5edge(beat, big) {
  if (V5 !== 'b' || beat < 0) return '';
  const t = big ? 3 : 2, b = big ? 14 : 10, g = `box-shadow:0 0 4px 1px rgba(240,214,156,.6)`;
  if (beat === 0) return `<div class="a" style="left:10%;right:10%;top:0;height:${t}px;background:${P5.dim};opacity:.4"></div>`;
  let h = `<div class="a" style="left:${big ? 10 : 7}px;right:${big ? 10 : 7}px;top:-1px;height:${t}px;background:${P5.hi};${g}"></div>`;
  if (beat >= 2) h += `<div class="a" style="left:-1px;top:-1px;width:${t}px;height:${b}px;background:${P5.hi};${g}"></div><div class="a" style="right:-1px;top:-1px;width:${t}px;height:${b}px;background:${P5.hi};${g}"></div>`;
  if (beat >= 3) h += `<div class="a" style="left:28%;right:28%;bottom:-1px;height:${t}px;background:${P5.hi};${g}"></div>`;
  return h;
}
const v5info = (f, px, center, phoneOnMail = true) => {
  if (V6) phoneOnMail = false;   // the one changing line; 340 has no room for mail + phone on one line (phone lives on the brand frame = static fallback)
  const ic = (n, p) => icon(n, p, '#fff').replace('style="', 'style="flex-shrink:0;');
  const mail = (m) => `${ic('mail', px + 3)}<span style="font-family:Sans;font-weight:700;font-size:${px}px;color:#fff">${m}</span>`;
  const ph = `${ic('phone', px + 2)}<span style="font-family:Sans;font-weight:700;font-size:${px}px;color:#fff">${PHONE}</span>`;
  const sep = `<span style="color:#C9A24E;margin:0 3px">|</span>`;
  const inner = f === 0
    ? (V5ZH ? `<span class="cn" style="font-size:${px + 1.5}px;color:#fff;letter-spacing:.14em">${V5LINE[V5]}</span>` : `<span class="cond" style="font-size:${px + .5}px;letter-spacing:${phoneOnMail ? '.18em' : '.1em'};color:#fff">Fully backed by the power of Heaven</span>`) + (V6 ? '' : sep + ph)
    : (f === 1 ? mail(MAIL) : mail(MIN_MAIL)) + (phoneOnMail ? sep + ph : '');
  return `<div style="display:flex;align-items:center;gap:5px;white-space:nowrap;${center ? 'justify-content:center' : ''}">${inner}</div>`;
};
// D: gold burst behind the plaque, growing with each beat (radial, soft, never touches the photo's rainbow or the faces)
const v5burst = (beat, cx, cy, big) => (V5 === 'd' && beat > 0) ? (() => { const R = (big ? [52, 78, 110] : [40, 62, 88])[beat - 1], a = [.38, .48, .6][beat - 1];
  return `<div class="a" style="left:${cx - R}px;top:${cy - R}px;width:${R * 2}px;height:${R * 2}px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,226,150,${a}),rgba(240,200,110,${a * .45}) 45%,rgba(240,200,110,0) 100%);pointer-events:none"></div>`; })() : '';
const v5flare = (beat) => ((V5 === 'd' || V5 === 'e' || V5 === 'f' || V5 === 'g') && beat > 0) ? `box-shadow:0 0 0 1px #F0D69C,0 0 ${6 + beat * 5}px ${1 + beat * 2}px rgba(255,226,150,${.35 + beat * .15}),0 6px 16px rgba(0,0,0,.55);` : '';
// V5E (James 12:26): gold FIREWORK at the upper-left of the rainbow from frame 1, then BANG! BANG! BANG! — each beat adds a smaller burst + a BANG! word
function firework(cx, cy, R, phase, seed = 1) {
  const N = 28, rays = [], sparks = [];
  let s = seed; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + rnd() * 0.12, len = R * (0.62 + rnd() * 0.38) * (phase === 1 ? .6 : phase === 2 ? .85 : 1);
    const x2 = cx + Math.cos(a) * len, y2 = cy + Math.sin(a) * len;
    rays.push(`<line x1="${cx + Math.cos(a) * R * .08}" y1="${cy + Math.sin(a) * R * .08}" x2="${x2}" y2="${y2}" stroke="url(#ray)" stroke-width="${i % 2 ? 1.1 : 1.6}" stroke-linecap="round"/>`);
    sparks.push(`<circle cx="${x2}" cy="${y2}" r="${1.2 + rnd() * 1.3}" fill="#FFF3C4"/>`);
    if (phase >= 2 && i % 3 === 0) { const l2 = len * (1.08 + rnd() * .12); sparks.push(`<circle cx="${cx + Math.cos(a + .05) * l2}" cy="${cy + Math.sin(a + .05) * l2}" r="${.8 + rnd()}" fill="#FFE9A8" opacity=".9"/>`); }
  }
  const glowR = R * (phase === 1 ? .7 : phase === 2 ? .95 : 1.15);
  return `<svg class="a" style="left:${cx - R * 1.3}px;top:${cy - R * 1.3}px;overflow:visible" width="${R * 2.6}" height="${R * 2.6}" viewBox="${cx - R * 1.3} ${cy - R * 1.3} ${R * 2.6} ${R * 2.6}">
  <defs>
    <radialGradient id="glow"><stop offset="0" stop-color="#FFF6D9" stop-opacity="1"/><stop offset=".16" stop-color="#F6D784" stop-opacity=".7"/><stop offset=".5" stop-color="#C8902E" stop-opacity=".26"/><stop offset="1" stop-color="#8A5A16" stop-opacity="0"/></radialGradient>
    <linearGradient id="ray" gradientUnits="userSpaceOnUse" x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}"><stop offset="0" stop-color="#FFF6D9"/><stop offset=".5" stop-color="#F0CF7E"/><stop offset="1" stop-color="#C8902E" stop-opacity=".6"/></linearGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${glowR}" fill="url(#glow)"/>
  ${rays.join('')}
  <circle cx="${cx}" cy="${cy}" r="${R * .09}" fill="#FFFBEA"/><circle cx="${cx}" cy="${cy}" r="${R * .2}" fill="#FFF3C4" opacity=".5"/>
  ${sparks.join('')}
  </svg>`;
}
const V5FW = { lb: [[V5 === 'f' ? 490 : 497, V5 === 'f' ? 29 : 31, V5 === 'f' ? 26 : 30, 1], [466, 13, 12, 7], [540, 12, 13, 3]], mr: [[V5 === 'f' ? 46 : 50, V5 === 'f' ? 32 : 36, V5 === 'f' ? 30 : 34, 1], [20, 78, 14, 7], [100, 16, 14, 3]] };   // [cx, cy, R, seed] — all outside the rainbow band and off the faces
// V5G: REAL firework plates (ChatGPT-generated, pure-black background, screen-blended) — fw_stage1..4.png in design/; stage 2 on the flash frame, 3 when settled
const FWIMG = (cx, cy, R, stage) => `<img class="a" src="${u('fw_stage' + stage + '.png')}" style="left:${cx - R}px;top:${cy - R}px;width:${R * 2}px;height:${R * 2}px;mix-blend-mode:screen;pointer-events:none">`;
const V5G_POS = { lb: [[490, 29, 30], [462, 14, 17], [536, 14, 17], [514, 46, 12]], mr: [[46, 32, 32], [98, 14, 17], [16, 78, 17], [48, 70, 13]] };
const v5real = (nB, flash, key) => { if (V5 !== 'g') return ''; const P = V5G_POS[key]; let h = FWIMG(...P[0], 3);
  for (let i = 1; i <= nB; i++) h += FWIMG(...P[i], (flash && i === nB) ? 2 : 3); return h; };
// James 19:28: the drawn SVG firework looks bad — removed from V6
const v5fire = (beat, key) => (!V6 && (V5 === 'e' || V5 === 'f')) ? V5FW[key].slice(0, V5 === 'f' ? 1 : 1 + Math.max(0, beat - 1)).map(([x, y, R, sd]) => firework(x, y, R, 3, sd)).join('') : '';

// ---------- V5F "Gold Detonation" (ChatGPT Part C, 12:21 + James's firework 12:26) — 9 frames: 3 messages + 3 × (flash, settle) ----------
// Each BANG! = faceted gold flash core + starburst rays + thin shock ring + a few sparks (hard edges, no blur — GIF-safe), the word on top.
const DG = { core: '#FFF1BF', hi: '#F1D27B', mid: '#D9AB4C', deep: '#A36E26', edge: '#4A3012' };
function detonate(cx, cy, S, flash, seed = 1) {   // S = scale 1 (728) / 1.25 (340); flash: 1 = max, 0 = settled
  let sd = seed; const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
  const N = 10, L = 12 * S, l = 8 * S, w = 2.3 * S, rr = 12.5 * S, star = 7 * S, core = 3.2 * S;
  const pt = (a, r) => `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  let rays = '';
  for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2 - Math.PI / 2 + rnd() * .1, len = (i % 2 ? l : L) * (flash ? 1.12 : 1);
    rays += `<polygon points="${pt(a - Math.PI / 2, w / 2)} ${pt(a, len)} ${pt(a + Math.PI / 2, w / 2)}" fill="${i % 2 ? DG.hi : DG.mid}"/>`; }
  let st = ''; for (let i = 0; i < 12; i++) st += (i ? ' ' : '') + pt((i / 12) * Math.PI * 2 - Math.PI / 2, i % 2 ? star * .45 : star);
  let sparks = ''; const ns = flash ? 5 : 2;
  for (let i = 0; i < ns; i++) { const a = rnd() * Math.PI * 2, r = rr * (1.05 + rnd() * .35), sx = cx + Math.cos(a) * r, sy = cy + Math.sin(a) * r;
    sparks += `<rect x="${(sx - 1.2 * S).toFixed(1)}" y="${(sy - 2.4 * S).toFixed(1)}" width="${2.4 * S}" height="${4.8 * S}" fill="${DG.core}" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${sx.toFixed(1)} ${sy.toFixed(1)})"/>`; }
  return `<svg class="a" style="left:0;top:0;overflow:visible;pointer-events:none" width="1" height="1">
    <circle cx="${cx}" cy="${cy}" r="${rr * (flash ? 1.15 : 1)}" fill="none" stroke="${DG.hi}" stroke-width="${1.4 * S}" opacity="${flash ? 1 : .35}"/>
    <circle cx="${cx}" cy="${cy}" r="${(rr * (flash ? 1.15 : 1) + 1.2 * S).toFixed(1)}" fill="none" stroke="${DG.deep}" stroke-width="${.8 * S}" opacity="${flash ? .7 : .25}"/>
    ${rays}<polygon points="${st}" fill="${DG.hi}" stroke="${DG.deep}" stroke-width=".5"/><circle cx="${cx}" cy="${cy}" r="${core}" fill="${DG.core}"/>${sparks}</svg>`;
}
// the BANG! word: newest 100% (112% on its flash frame), previous 88%/72%, oldest 78%/48%; slight tilt −4/+2/−2; dark-bronze stroke, hard shadow
function bangword(i, n, flash, px) {
  const age = n - 1 - i, sc = age === 0 ? (flash ? 1.12 : 1) : age === 1 ? .88 : .78, op = age === 0 ? 1 : age === 1 ? .72 : .48, rot = [-4, 2, -2][i];
  return `<span class="bd" style="font-size:${(px * sc).toFixed(1)}px;opacity:${op};transform:rotate(${rot}deg);display:inline-block;letter-spacing:.01em;background:linear-gradient(180deg,#FFF1BF 0%,#E3BC63 55%,#A36E26 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:.8px #4B3214;filter:drop-shadow(0 1px 0 rgba(36,23,10,.9)) drop-shadow(0 0 2.5px rgba(0,0,0,.95)) drop-shadow(0 0 1px rgba(0,0,0,.9))">BANG!</span>`;
}
// 9-frame beat table: frame 3..8 → [bangs shown, newest flashing]
const V5F_BEATS = [[1, 1], [1, 0], [2, 1], [2, 0], [3, 1], [3, 0]];
function lb5(f) {
  const W = 728, H = 90; let beat = f >= 3 ? f - 2 : f === 2 ? 0 : -1, nB = 0, flash = 0;
  const f6 = f; if (!V6 && (V5 === 'f' || V5 === 'g') && f >= 3) { [nB, flash] = V5F_BEATS[f - 3]; beat = nB; } if (f >= 3) f = V6 ? 3 : 2; if (V6) beat = -1;
  const k = 0.062, Cc = W - (ARCH.W - ARCH.cx) * k, s = 0.09, fy = 28, fx = Math.round(Cc - 497 * s);
  const logo = V9 ? `<div class="a ceg" style="left:10px;top:7px;width:76px;height:76px"></div><div class="a cetile" style="left:680px;top:3px;width:42px;height:33px;border-radius:5px"></div>`
    : V5 === 'b' ? `<div class="a ceg" style="left:12px;top:8px;width:74px;height:74px"></div>`
    : `<div class="a cetile" style="left:12px;top:12px;width:82px;height:67px;border-radius:7px"></div>`;
  const PW = 124, MH = 26;
  return page(W, H, `
  ${geo('lb_f' + (beat > 0 ? beat + 2 : f), { W, H, master: 'arch5', k, cxCss: Cc, oy: 4, s, fx, fy })}
  ${arch(k, Cc, 4, '', 'navy')}
  <div class="a" style="inset:0;background:linear-gradient(90deg,rgba(2,4,14,.97) 0%,rgba(2,4,14,.92) 46%,rgba(2,4,14,.55) 56%,rgba(2,4,14,0) 66%)"></div>
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 .8px rgba(255,226,170,.8)) drop-shadow(0 0 6px rgba(255,205,120,.3)) drop-shadow(0 4px 10px rgba(0,0,0,.6))' })}
  <div class="a" style="left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,#7A4E12,#E9BE5E 15%,#FFF4D0 55%,#E9BE5E 85%,#7A4E12);box-shadow:0 0 8px rgba(255,205,120,.6)"></div>
  ${v5burst(beat, 388, 46, false)}
  ${v5fire(beat, 'lb')}${v5real(nB, flash, 'lb')}
  ${logo}
  <div class="a gsh2" style="left:110px;top:${V9C ? 4 : (V5 === 'f' || V5 === 'g') ? 4 : 6}px;width:212px">
    <span class="bd ${V9C ? 'silver' : 'gold'}" style="font-size:${V9C ? 12 : 13}px">CE GLOBAL NETWORK</span><span class="bd ${V9C ? 'silver' : 'gold'}" style="font-size:${V9C ? 12 : 13}px;margin-top:${(V5 === 'f' || V5 === 'g') ? 1 : 2}px">INTERNATIONAL PTE LTD</span>
    ${V9C ? '' : `<span class="bd gold" style="font-size:9.5px;margin-top:${(V5 === 'f' || V5 === 'g') ? 3 : 5}px;letter-spacing:.06em">${MIN_NAME}</span>`}
    ${V9 ? '' : `<span class="hl silver ssh" style="font-size:10px;margin-top:${(V5 === 'f' || V5 === 'g') ? 3 : 5}px;letter-spacing:.06em">WHEN ALL ELSE FAILS,</span>`}
  </div>
  ${V9C ? `<img src="file:///home/claude/gba/remotion/public/v9/ministry3d.png" style="position:absolute;left:328px;top:3px;width:118px;height:auto;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9))">
  <div class="a" style="left:326px;top:44px;width:122px;text-align:center;line-height:1.15"><span class="cond silver" style="font-size:8.6px;letter-spacing:.03em;text-transform:none;filter:drop-shadow(0 1px 2px rgba(0,0,0,.9))">Write to: ceg@</span><br><span class="cond silver" style="font-size:8.6px;letter-spacing:.03em;text-transform:none;filter:drop-shadow(0 1px 2px rgba(0,0,0,.9))">crownedeaglesglobal.org</span></div>` : ''}
  ${V6 ? '' : `<div class="a" style="left:326px;top:2px;width:${PW}px;height:${MH}px">${v5motif(beat, PW, MH, false)}</div>
  <div class="a" style="left:326px;top:${MH + 2}px;width:${PW}px;text-align:center"><span style="position:relative;display:inline-block">${v5plaque(12, '3px 10px 3px', v5flare(beat))}${v5edge(beat, false)}</span></div>`}
  ${V6 ? (f === 3 ? '' : `<div class="a" style="left:110px;top:70px;width:368px">${v5info(f, f ? 9.8 : 10.5, false)}</div>`) : (V5 === 'f' || V5 === 'g') && nB > 0 ? (V5 === 'f' ? [[466, 13, .8], [540, 12, .8], [524, 40, .7]].slice(0, nB).map(([x, y, S], i) => detonate(x, y, S, flash && i === nB - 1 ? 1 : 0, 3 + i)).join('') : '') + `<div class="a" style="left:110px;width:300px;top:63px;height:26px;display:flex;align-items:center;gap:8px">${[18, 20, 23].slice(0, nB).map((px, i) => bangword(i, nB, flash, px)).join('')}</div>`
    : `<div class="a" style="left:110px;top:${(V5 === 'd' || V5 === 'e') && beat > 0 ? 66 : 70}px;width:368px">${(V5 === 'd' || V5 === 'e') && beat > 0 ? bangs(beat, 16, 1.4) : v5info(f, f ? 9.8 : 10.5, false)}</div>`}
  `);
}
function mr5(f) {
  const W = 340, H = 280, stageY = V9B ? 174 : 186; let beat = f >= 3 ? f - 2 : f === 2 ? 0 : -1, nB = 0, flash = 0;
  const f6 = f; if (!V6 && (V5 === 'f' || V5 === 'g') && f >= 3) { [nB, flash] = V5F_BEATS[f - 3]; beat = nB; } if (f >= 3) f = V6 ? 3 : 2; if (V6) beat = -1;
  const s = 0.19, fx = 126, fy = 54;
  const logo = V9B ? `<div class="a ceg" style="left:8px;top:6px;width:50px;height:50px"></div><div class="a cetile" style="left:282px;top:6px;width:50px;height:50px;border-radius:6px;background-size:86%"></div>`
    : V9 ? `<div class="a ceg" style="left:8px;top:6px;width:52px;height:52px"></div><div class="a cetile" style="left:282px;top:8px;width:50px;height:40px;border-radius:5px"></div>`
    : V5 === 'b' ? `<div class="a ceg" style="left:4px;top:${stageY + 8}px;width:46px;height:46px"></div>`
    : `<div class="a cetile" style="left:6px;top:${stageY + 10}px;width:44px;height:36px;border-radius:5px"></div>`;
  const PW = 104, MH = 34;
  return page(W, H, `
  ${geo('mr_f' + (beat > 0 ? beat + 2 : f), { W, H, master: 'arch5', k: 0.0986, cxCss: 170, oy: 22, s, fx, fy })}
  ${arch(0.0986, 170, 22, '', 'navy')}
  <div class="a" style="left:-40px;top:-40px;width:200px;height:170px;background:radial-gradient(ellipse at 40% 40%,rgba(2,4,14,.42),rgba(2,4,14,0) 68%)"></div>
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 1px rgba(255,226,170,.8)) drop-shadow(0 0 8px rgba(255,205,120,.3)) drop-shadow(0 6px 14px rgba(0,0,0,.6))' })}
  ${stage(0, stageY, W, H - stageY, .3)}
  ${v5burst(beat, 284, stageY + 56, true)}
  ${v5fire(beat, 'mr')}${v5real(nB, flash, 'mr')}
  ${logo}
  ${V9B ? `<div class="a" style="left:218px;top:${stageY + 5}px;width:122px;height:98px;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;text-align:center;line-height:1.1">
    <img src="file:///home/claude/gba/remotion/public/v9/fullname3d.png" style="display:block;width:112px;height:auto;margin:0 auto;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9))">
    <div style="font-family:Sans;font-weight:700;font-size:7.4px;color:#F4F1EA;margin-top:0;letter-spacing:.02em">Founder &amp; Managing Director</div>
    <img src="file:///home/claude/gba/remotion/public/v9/david3d.png" style="display:block;width:106px;height:auto;margin:0 auto;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9))">
    <div style="font-family:Sans;font-weight:700;font-size:7px;color:#F4F1EA;margin-top:0;letter-spacing:.02em">Chief Advisory &amp; Support Officer</div>
  </div>` : ''}
  <div class="a gsh2" style="left:${V9 ? 10 : 56}px;top:${stageY + (V9B ? ((V11H === 'band3' || V11H === 'band4') ? 0.5 : (V11H === 'band5' || V11H === 'band6') ? 1.5 : V11H === 'band2' ? 2 : 3) : 8)}px;width:${V9 ? 214 : 172}px">
    ${V9B && V11H === 'none' ? '' : V9B && V11H === 'band6' ? `<div style="position:relative;width:214px;height:30px">${band6()}</div>` : V9B && V11H === 'band5' ? `<div style="position:relative;width:208px;height:30px"><div id="h1" style="position:absolute;left:0;top:0.5px;width:208px;text-align:center;font-family:Anton;font-weight:400;font-size:14.5px;line-height:1;letter-spacing:0;white-space:nowrap"><span style="position:relative;display:inline-block"><span style="position:absolute;left:0;top:0;color:#B98A2E;-webkit-text-stroke:1.1px #E2B256;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))">CE GLOBAL NETWORK INTERNATIONAL</span><span class="silver" style="position:relative;display:block">CE GLOBAL NETWORK INTERNATIONAL</span></span></div><div id="h2" style="position:absolute;left:0;top:16.5px;width:208px;text-align:center;font-family:Anton;font-weight:400;font-size:14.5px;line-height:1;letter-spacing:0;white-space:nowrap"><span style="position:relative;display:inline-block"><span style="position:absolute;left:0;top:0;color:#B98A2E;-webkit-text-stroke:1.1px #E2B256;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))">GLOBAL FREIGHT FORWARDING!</span><span class="silver" style="position:relative;display:block">GLOBAL FREIGHT FORWARDING!</span></span></div></div>` : V9B && V11H === 'band4' ? `<div id="h1" style="position:relative;width:max-content;font-size:13.6px;line-height:1;margin-top:0px"><span class="cond" style="position:absolute;left:0;top:0;font-weight:700;letter-spacing:.02em;color:#B98A2E;-webkit-text-stroke:1.9px #E2B256;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))">CE GLOBAL NETWORK INTERNATIONAL</span><span class="cond silver" style="position:relative;display:block;font-weight:700;letter-spacing:.02em">CE GLOBAL NETWORK INTERNATIONAL</span></div><div id="h2" style="position:relative;width:max-content;font-size:13.6px;line-height:1;margin-top:2px"><span class="cond" style="position:absolute;left:0;top:0;font-weight:700;letter-spacing:.02em;color:#B98A2E;-webkit-text-stroke:1.9px #E2B256;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))">GLOBAL FREIGHT FORWARDING!</span><span class="cond silver" style="position:relative;display:block;font-weight:700;letter-spacing:.02em">GLOBAL FREIGHT FORWARDING!</span></div><script>document.fonts.ready.then(()=>{for(const id of ['h1','h2']){const e=document.getElementById(id);let f=parseFloat(e.style.fontSize);while(e.getBoundingClientRect().width>205&&f>8){f-=.1;e.style.fontSize=f+'px'}}})</script>` : V9B && (V11H === 'band2' || V11H === 'band3') ? `<span id="h1" class="cond silver" style="display:block;width:max-content;font-weight:700;font-size:${V11H === 'band3' ? 13.6 : 15}px;line-height:1;letter-spacing:.02em;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))">CE GLOBAL NETWORK INTERNATIONAL</span><span id="h2" class="cond gold" style="display:block;width:max-content;font-weight:700;font-size:${V11H === 'band3' ? 13.6 : 15}px;line-height:1;letter-spacing:.02em;margin-top:${V11H === 'band3' ? 2 : 1}px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))">GLOBAL FREIGHT FORWARDING!</span><script>document.fonts.ready.then(()=>{for(const id of ['h1','h2']){const e=document.getElementById(id);let f=parseFloat(e.style.fontSize);while(e.getBoundingClientRect().width>206&&f>8){f-=.1;e.style.fontSize=f+'px'}}})</script>` : V9B && V11H === 'band' ? `<span id="h1" class="bd silver" style="font-size:11.5px;letter-spacing:0;white-space:nowrap">CE GLOBAL NETWORK INTERNATIONAL</span><span id="h2" class="bd gold" style="font-size:12.5px;letter-spacing:.01em;margin-top:2px;white-space:nowrap">GLOBAL FREIGHT FORWARDING!</span><script>document.fonts.ready.then(()=>{for(const id of ['h1','h2']){const e=document.getElementById(id);let f=parseFloat(e.style.fontSize);while(e.getBoundingClientRect().width>206&&f>7){f-=.1;e.style.fontSize=f+'px'}}})</script>` : `<span class="bd ${V9B ? 'silver' : 'gold'}" style="font-size:${V9B ? 11.5 : V9 ? 13 : 11.5}px;letter-spacing:0">CE GLOBAL NETWORK</span><span class="bd ${V9B ? 'silver' : 'gold'}" style="font-size:${V9B ? 11.5 : V9 ? 13 : 11.5}px;letter-spacing:0;margin-top:${V9B ? 1 : 2}px">INTERNATIONAL PTE LTD</span>`}
    ${V9B ? '' : `<span class="bd gold" style="font-size:${V9 ? 9.5 : 8.6}px;margin-top:5px;letter-spacing:.02em">${MIN_NAME}</span>`}
    ${V9 ? '' : `<span class="hl silver ssh" style="font-size:9.5px;margin-top:5px;letter-spacing:.06em">WHEN ALL ELSE FAILS,</span>`}
  </div>
  ${V6 ? '' : `<div class="a" style="left:232px;top:${stageY + 4}px;width:${PW}px;height:${MH}px">${v5motif(beat, PW, MH, true)}</div>
  <div class="a" style="left:232px;top:${stageY + 4 + MH}px;width:${PW}px;text-align:center"><span style="position:relative;display:inline-block">${v5plaque(11, '3px 8px 3px', v5flare(beat))}${v5edge(beat, true)}</span></div>`}
  ${V6 ? (f === 3 ? '' : `<div class="a" style="left:56px;right:4px;top:${stageY + 81}px">${v5info(f, f ? 9 : 8.5, true, false)}</div>`) : (V5 === 'f' || V5 === 'g') && nB > 0 ? (V5 === 'f' ? [[98, 14, .8], [16, 78, .8], [48, 70, .7]].slice(0, nB).map(([x, y, S], i) => detonate(x, y, S, flash && i === nB - 1 ? 1 : 0, 3 + i)).join('') : '') + `<div class="a" style="left:56px;width:172px;top:${stageY + 62}px;height:26px;display:flex;align-items:center;justify-content:center;gap:6px">${[14, 16, 18.5].slice(0, nB).map((px, i) => bangword(i, nB, flash, px)).join('')}</div>`
    : (V5 === 'd' || V5 === 'e') && beat > 0 ? `<div class="a" style="left:56px;width:172px;top:${stageY + 62}px">${bangs(beat, 13, 1.3, true)}</div>` : `<div class="a" style="left:56px;right:4px;top:${stageY + 68}px">${v5info(f, f ? 9.5 : 8.5, true, false)}</div>`}
  `);
}

// ---------- V10 728x90 base draft (James 2026-10-18 09:00/09:02): both logos left, company name one line on top, big middle stage ----------
const V10 = VAR === 'v10';
const R = (f) => 'file:///home/claude/gba/remotion/public/' + f;
const BANG3D = 'file:///home/claude/gba/assets/v9c_bang_3dgold.png';
const ST = { x: 150, w: 350, top: 29, bot: 87 };   // James 09:16: extend further right (stage ends before the rainbow foot at x~510)
const MH_ = { x: 6, w: 540 };   // masthead ends at x 546, still ~20 px clear of the rainbow apex zone   // masthead: full width above logos + stage, ends before the photo's rainbow            // stage zone (css px)
function stageBeat(beat) {
  // James 09:10: every word extends left and right to fill the stage (draft = CSS scaleX; production = ChatGPT wide letterings)
  const cx = ST.x + ST.w / 2, emailOn = ['fully', 'power', 'bang', 'ministry'].includes(beat);
  const bot = emailOn ? 73 : ST.bot, cy = (ST.top + bot) / 2, h = bot - ST.top, FW = ST.w - 4;
  const fit = (src, ar, maxH, targetW, maxSx, extra = '') => { const hh = Math.min(maxH, targetW / ar), w = hh * ar, sx = Math.min(maxSx, targetW / w);
    return `<img src="${src}" style="position:absolute;left:${(cx - w / 2).toFixed(1)}px;top:${(cy - hh / 2).toFixed(1)}px;width:${w.toFixed(1)}px;height:${hh.toFixed(1)}px;transform:scaleX(${sx.toFixed(3)});transform-origin:50% 50%;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9)) drop-shadow(0 0 3px rgba(0,0,0,.6));${extra}">`; };
  let el = '';
  if (beat === 'when') el = fit(R('v10/when_wide.png'), 6.038, h - 5, FW, 1.0);
  if (beat === 'cta') { const nh = Math.min(h - 18, FW / 7.6923), nw = nh * 7.6923, top = ST.top + 14 + (h - 14 - nh) / 2;
    el = `<div style="position:absolute;left:${ST.x}px;top:${ST.top + 1}px;width:${ST.w}px;text-align:center;line-height:1"><span class="cond silver" style="font-size:13px;letter-spacing:.3em;filter:drop-shadow(0 0 .6px #E9BC5C) drop-shadow(0 0 .6px #B98A2E) drop-shadow(0 1px 1px rgba(0,0,0,.9))">CONTACT</span></div>
    <img src="${RP('v10/name_wide.png')}" style="position:absolute;left:${(cx - nw / 2).toFixed(1)}px;top:${top.toFixed(1)}px;width:${nw.toFixed(1)}px;height:${nh.toFixed(1)}px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9))">`; }
  if (beat === 'fully') el = fit(R('v10/fully_wide.png'), 7.111, h, FW, 1.0);
  if (beat === 'power') el = fit(R('v10/power_wide.png'), 5.5172, h, FW, 1.0);   // ChatGPT two-tone wide lettering (POWER OF silver / HEAVEN gold); split parts power_of.png + heaven.png for the animation
  if (beat === 'bang') { const gap = 5, bw = (FW - 2 * gap) / 3, bh = Math.min(h - 2, bw / 2.929), x0 = cx - (3 * bw + 2 * gap) / 2, sx = bw / (bh * 2.929);
    el = [0, 1, 2].map((i) => `<img src="${BANG3D}" style="position:absolute;left:${(x0 + i * (bw + gap)).toFixed(1)}px;top:${(cy - bh / 2 + [1, -1, 1][i]).toFixed(1)}px;width:${(bh * 2.929).toFixed(1)}px;height:${bh.toFixed(1)}px;transform:scaleX(${sx.toFixed(3)});transform-origin:0 50%;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9))">`).join(''); }
  if (beat === 'ministry') el = fit(R('v10/ministry_wide.png'), 9.1429, h, FW, 1.0);
  const email = emailOn ? `<div class="a" style="left:${ST.x}px;top:75px;width:${ST.w}px;height:12px;display:flex;align-items:center;justify-content:center;white-space:nowrap;font-family:Cond;font-weight:600;font-size:11.5px;letter-spacing:.02em;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))"><span style="color:#FFFFFF">Write to:&nbsp;</span><span style="color:#FFF3C4">ceg@crownedeaglesglobal.org</span></div>` : '';
  return el + email;
}
function lb10(beat) {
  const W = 728, H = 90, k = 0.062, Cc = W - (ARCH.W - ARCH.cx) * k, s = 0.09, fy = 28, fx = Math.round(Cc - 497 * s);
  return page(W, H, `
  ${geo('lb10_' + beat, { W, H, master: 'arch5', k, cxCss: Cc, oy: 4, s, fx, fy })}
  ${arch(k, Cc, 4, '', 'navy')}
  <div class="a" style="inset:0;background:linear-gradient(90deg,rgba(2,4,14,.97) 0%,rgba(2,4,14,.93) 56%,rgba(2,4,14,.65) 63%,rgba(2,4,14,0) 70%)"></div>
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 .8px rgba(255,226,170,.8)) drop-shadow(0 0 6px rgba(255,205,120,.3)) drop-shadow(0 4px 10px rgba(0,0,0,.6))' })}
  <div class="a" style="left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,#7A4E12,#E9BE5E 15%,#FFF4D0 55%,#E9BE5E 85%,#7A4E12);box-shadow:0 0 8px rgba(255,205,120,.6)"></div>
  <div class="a ceg" style="left:8px;top:29px;width:56px;height:56px"></div>
  <div class="a cetile" style="left:76px;top:29px;width:56px;height:56px;border-radius:7px;background-size:86%"></div>
  <div id="co" class="a" style="left:${MH_.x}px;top:0px;width:${MH_.w}px;height:27px;display:flex;align-items:center;justify-content:center;gap:9px;white-space:nowrap;line-height:1"><img src="${RP('v10/ceg_rainbow.png')}" style="height:26px;width:auto;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9))"><img src="${RP('v10/company_silver.png')}" style="height:22px;width:auto;margin-top:1px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.9))"></div>
  <div id="rl" class="a" style="left:${MH_.x + 16}px;top:16px;width:${MH_.w - 32}px;height:1px;background:linear-gradient(90deg,rgba(240,207,126,0),rgba(240,207,126,.75) 12%,rgba(240,207,126,.75) 88%,rgba(240,207,126,0))"></div>
  ${stageBeat(beat)}
  <script>document.fonts.ready.then(()=>{const b=document.querySelector('#co'),t=b.lastElementChild,i=b.firstElementChild;let hh=22;while(i.getBoundingClientRect().width+9+t.getBoundingClientRect().width>b.clientWidth-2&&hh>14){hh-=.25;t.style.height=hh+'px'};document.querySelector('#rl').style.top='27px'})</script>
  `);
}


// ---------- V11 728x90 "Big Word Punch" base (James 2026-10-20 16:44 "帮我做 那个 大字逐个砸，然后也做 728x90") ----------
// 728 layout kept from DEC-728 (logos left, masthead on top, stage x 150–500, photo panel x ≥ 500 untouched); masthead = the boss's
// headline (19 Oct 15:49) like the 340 V11: CROWNED EAGLES GLOBAL (3D rainbow, gold border) · HEAVEN THRONE ROOM MINISTRY (3D gold)
// · CE GLOBAL NETWORK INTERNATIONAL / GLOBAL FREIGHT FORWARDING! in 3D SILVER (band6 recipe, no gold stroke).
const V11LB = VAR === 'v11lb';
function lb11() {
  const W = 728, H = 90, k = 0.062, Cc = W - (ARCH.W - ARCH.cx) * k, s = 0.09, fy = 28, fx = Math.round(Cc - 497 * s);
  const FS = +(process.env.LBF || 12.0);
  const line = (t) => `<span style="position:relative;display:inline-block;font-family:Anton;font-weight:400;font-size:${FS}px;line-height:1;letter-spacing:.045em;white-space:nowrap">${silver3dLine(t)}</span>`;
  return page(W, H, `
  ${geo('lb11_base', { W, H, master: 'arch5', k, cxCss: Cc, oy: 4, s, fx, fy })}
  ${arch(k, Cc, 4, '', 'navy')}
  <div class="a" style="inset:0;background:linear-gradient(90deg,rgba(2,4,14,.97) 0%,rgba(2,4,14,.93) 56%,rgba(2,4,14,.65) 63%,rgba(2,4,14,0) 70%)"></div>
  ${founders(fx, fy, s, { style: 'filter:contrast(1.05) saturate(1.05) drop-shadow(0 0 .8px rgba(255,226,170,.8)) drop-shadow(0 0 6px rgba(255,205,120,.3)) drop-shadow(0 4px 10px rgba(0,0,0,.6))' })}
  <div class="a" style="left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,#7A4E12,#E9BE5E 15%,#FFF4D0 55%,#E9BE5E 85%,#7A4E12);box-shadow:0 0 8px rgba(255,205,120,.6)"></div>
  <div class="a ceg" style="left:8px;top:29px;width:56px;height:56px"></div>
  <div class="a cetile" style="left:76px;top:29px;width:56px;height:56px;border-radius:7px;background-size:86%"></div>
  <div id="co" class="a" style="left:${MH_.x}px;top:0px;width:${MH_.w}px;height:27px;display:flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;line-height:1">
    <img id="m1" src="${RP('v11a/ceg3d.png')}" style="height:21.5px;width:auto;filter:drop-shadow(0 1px 1px rgba(0,0,0,.95))">
    <img id="m2" src="${RP('v9/ministry3d1.png')}" style="height:15.8px;width:auto;margin-top:1px;filter:drop-shadow(0 1px 1px rgba(36,20,3,.95)) drop-shadow(0 0 2px rgba(255,226,150,.45))">
    <div id="m3" style="display:flex;flex-direction:column;align-items:center;gap:1.4px;margin-top:-0.4px">${line('CE GLOBAL NETWORK INTERNATIONAL')}${line('GLOBAL FREIGHT FORWARDING!')}</div>
  </div>
  <div class="a" style="left:${MH_.x + 16}px;top:27px;width:${MH_.w - 32}px;height:1px;background:linear-gradient(90deg,rgba(240,207,126,0),rgba(240,207,126,.75) 12%,rgba(240,207,126,.75) 88%,rgba(240,207,126,0))"></div>
  <script>document.fonts.ready.then(()=>{const b=document.querySelector('#co');const r=[...b.children].map(e=>e.getBoundingClientRect());window.__mh={m1:r[0],m2:r[1],m3:r[2],sum:r.reduce((a,x)=>a+x.width,0)+16,box:b.clientWidth}})</script>
  `);
}

const V5N = V9 ? 4 : V6 ? 4 : (V5 === 'f' || V5 === 'g') ? 9 : 6;
const jobs = V11LB ? [['lb11_base', 728, 90, lb11()]] : V10 ? ['base','when','cta','fully','power','bang','ministry'].map((b) => ['lb10_' + b, 728, 90, lb10(b)]) : (V5 || V6) ? [
  ...[...Array(V5N).keys()].map((i) => ['lb_f' + i, 728, 90, lb5(i)]),
  ...[...Array(V5N).keys()].map((i) => ['mr_f' + i, 340, 280, mr5(i)]),
] : [
  ['cover', 2000, 800, cover()],
  ['ad', 1000, 500, ad()],
  ...[0, 1, 2, ...(VAR ? [] : SEVEN ? [3, 4, 5, 6] : [3, 4, 5])].map((i) => ['lb_f' + i, 728, 90, lb(i)]),
  ...[0, 1, 2, ...(VAR ? [] : SEVEN ? [3, 4, 5, 6] : [3, 4, 5])].map((i) => ['mr_f' + i, 340, 280, mr(i)]),
];
const only = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'geometry.json'), JSON.stringify(GEO, null, 1));
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const [name, w, h, html] of jobs) {
  if (only.length && !only.some((o) => name.startsWith(o))) continue;
  const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });   // DSF=4 → true high-res base (James 16:25 "I WANT high resolution version")
  const f = path.join(OUT, `${name}.html`);
  fs.writeFileSync(f, html);
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(OUT, `${name}@${DSF}x.png`) });
  if (V11LB) console.log(JSON.stringify(await p.evaluate(() => window.__mh)));
  await p.close();
}
await browser.close();
console.log('rendered', only.join(',') || 'all');
