import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

// V9 "Boss sequence" (17 Oct 2026 21:25): logos fixed in the top corners (CEG left, CE Global right) on the base;
// bottom row shows ONE phrase at a time, each slammed in: WHEN ALL ELSE FAILS, → CONTACT DR. SHEKINAIH (plaque highlighted too)
// → FULLY BACKED BY → POWER OF HEAVEN → BANG! → BANG! BANG! → BANG! BANG! BANG! (shake together) → hold.
// Timing per ChatGPT storyboard (round 7). Phrase lettering = ChatGPT forged-gold PNGs in public/v9/.

export type Size = "lb" | "mr";
const L = {
  lb: { w: 728, h: 90, row: { cx: 280, cy: 68, maxW: 340, maxH: 42 }, plaque: { x: 326, y: 8, w: 124, h: 40 }, bang: [19, 22, 25] },
  mr: { w: 340, h: 280, row: { cx: 172, cy: 258, maxW: 320, maxH: 40 }, plaque: { x: 232, y: 196, w: 104, h: 40 }, bang: [16, 18, 21] },
};
export const T9 = { when: 0, cta: 2.0, fully: 5.0, power: 6.5, b1: 8.5, b2: 9.5, b3: 10.5, end: 14.0 };
// rev b (22:19): DR. SHEKINAIH stays 2 s longer with white ripple light; everything after shifts +2 s; 16 s loop
export const T9B = { when: 0, cta: 2.0, fully: 7.0, power: 8.5, b1: 10.5, b2: 11.5, b3: 12.5, end: 16.0 };
const HIT = 0.33;
const px = (v: number) => v * 2;
// phrase image aspect ratios (w/h) — filled in by design/v9layers.py (ASPECT below is read from public/v9/aspect.json at build time)
import aspect from "../public/v9/aspect.json";
import { Bang3D } from "./Bang3D";
import { CtaTitle } from "./CtaTitle";
import { SparkleOrbit } from "./SparkleOrbit";

// rev "b" = 340x280 boss revision (17 Oct 21:48): silver WHEN ALL ELSE FAILS (bigger), plaque slams then stabilises, words shake together,
// silver company name, gold HEAVEN THRONE ROOM MINISTRY lettering at the top of the photo, CONTACT silver / DR. SHEKINAIH gold, CEG email under the plaque.
// band starts at y 178: company name 180–207 · slam row 208–266 (WHEN beat may use 208–278 because the email line only appears with the CTA) · email 267–279 · plaque 180–220 + names 223–262
const LB_ = { w: 340, h: 280, row: { cx: 116, cy: 232, maxW: 212, maxH: 54 }, plaque: { x: 230, y: 176, w: 104, h: 36 }, bang: [13, 15, 17.5], ministry: { cx: 170, top: 8, w: 214, h: 19 } };
export const Banner9: React.FC<{ size: Size; rev?: "a" | "b" }> = ({ size, rev = "a" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const B = rev === "b";
  const G = B ? LB_ : L[size];
  const TT = B ? T9B : T9;

  const beats: [string, number][] = [["when", TT.when], ["cta", TT.cta], ["fully", TT.fully], ["power", TT.power], ["b1", TT.b1], ["b2", TT.b2], ["b3", TT.b3]];
  let cur = 0; for (let i = 0; i < beats.length; i++) if (t >= beats[i][1] - 1e-6) cur = i;
  const [key, t0] = beats[cur];
  const dt = t - t0;
  const inHit = dt < HIT;
  const slamFrom = key === "b3" ? 1.25 : key === "when" || key === "power" ? 1.2 : 1.15;
  const scale = interpolate(dt, [0, 0.12, HIT], [slamFrom, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const amp = { when: 4, cta: 3, fully: 3, power: 4, b1: 4, b2: 5, b3: 6 }[key] ?? 3;
  const k = Math.round(dt * fps);
  const jit = inHit ? [1, -0.75, 0.5, -0.25][Math.min(k, 3)] * amp * (size === "lb" ? 0.6 : 0.8) : 0; // ±amp px → settles within 4 frames
  const flash = interpolate(dt, [0, 0.08, 0.3], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringR = interpolate(dt, [0, 0.45], [6, size === "lb" ? 40 : 34], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ringO = dt < 0 ? 0 : interpolate(dt, [0, 0.45], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // CTA plaque highlight: scale + halo during the CTA beat, then steady glow
  const ctaGlow = t < TT.cta ? 0 : interpolate(t, [TT.cta, TT.cta + 0.15, TT.cta + 0.6, TT.fully, TT.end], B ? [0, 1.3, 1, 0.9, 0.9] : [0, 1, 0.9, 0.7, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaScale = t < TT.cta ? 1 : B ? interpolate(t, [TT.cta, TT.cta + 0.08, TT.cta + 0.2, TT.cta + 0.35], [1.6, 1.18, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : interpolate(t, [TT.cta, TT.cta + 0.1, TT.cta + 0.35, TT.fully - 0.3, TT.fully], [1.45, 1.22, 1.3, 1.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // BIG highlight: plaque grows 30% (anchored top-left) for the whole CTA hold
  const fadeOut = t > TT.end - 0.25 ? interpolate(t, [TT.end - 0.25, TT.end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;

  const R = G.row;
  const phrase = (name: string, maxH = R.maxH, cy = R.cy) => {
    const ar = (aspect as Record<string, number>)[name] ?? 6;
    let h = maxH, w = h * ar; if (w > R.maxW) { w = R.maxW; h = w / ar; }
    return <Img src={staticFile(`v9/${name}.png`)} style={{ position: "absolute", left: px(R.cx - w / 2 + jit), top: px(cy - h / 2), width: px(w), height: px(h), transform: `scale(${scale})`, opacity: fadeOut }} />;
  };
  const bangs = (n: number) => {
    const sizes = G.bang.slice(3 - n), gap = size === "lb" ? 14 : 8;
    const ws = sizes.map((s) => s * 1.5 * 2.327), hs = sizes.map((s) => s * 1.5);
    const total = ws.reduce((a, b) => a + b, 0) + gap * (n - 1);
    let x = R.cx - total / 2;
    return sizes.map((s, i) => { const left = x; x += ws[i] + gap; return <Img key={i} src={staticFile(`v6/bangB_${s}@2x.png`)} style={{ position: "absolute", left: px(left + jit), top: px(R.cy - hs[i] / 2), width: px(ws[i]), height: px(hs[i]), transform: `scale(${scale})`, opacity: fadeOut }} />; });
  };
  const ring = (
    <>
      <div style={{ position: "absolute", left: px(R.cx - 26), top: px(R.cy - 26), width: px(52), height: px(52), borderRadius: "50%", background: "radial-gradient(closest-side,#FFF1BF,rgba(241,210,123,.55) 40%,rgba(163,110,38,0) 100%)", opacity: flash }} />
      <Img src={staticFile("v9/ring.png")} style={{ position: "absolute", left: px(R.cx - ringR * 2.4), top: px(R.cy - ringR * 1.2), width: px(ringR * 4.8), height: px(ringR * 2.4), opacity: ringO }} />
    </>
  );
  return (
    <AbsoluteFill style={{ background: "#040817" }}>
      <Img src={staticFile(`v9/${size}_base${B ? "_b" : ""}@2x.png`)} style={{ position: "absolute", left: 0, top: 0, width: px(G.w), height: px(G.h) }} />
      {!B && <Img src={staticFile(`v6/plaque_${size}@2x.png`)} style={{ position: "absolute", left: px(G.plaque.x), top: px(G.plaque.y), width: px(G.plaque.w), height: px(G.plaque.h), transform: `scale(${ctaScale})`, transformOrigin: B ? "50% 50%" : size === "lb" ? "0% 0%" : "100% 0%", filter: `drop-shadow(0 0 ${9 * ctaGlow}px rgba(255,226,150,${0.95 * ctaGlow})) drop-shadow(0 0 ${3 * ctaGlow}px rgba(255,241,191,${ctaGlow}))` }} />}
      {B && (() => { const M = LB_.ministry; const src = staticFile("v9/ministry3d1.png");
        // ChatGPT round 8, recipe 2: fully readable from frame 1; finale = ONE narrow gold glint (18°, 10 % wide, peak 0.3) 13.167–13.833 s, fade by 14.0, then a clean hold
        const gs = TT.end - 2.833, ge = TT.end - 2.167;
        const g = interpolate(t, [gs, ge], [-15, 115], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const gOp = t < gs || t > ge + 0.17 ? 0 : interpolate(t, [gs, gs + 0.1, ge, ge + 0.17], [0, 0.3, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (<><div style={{ position: "absolute", left: px(60), top: 0, width: px(220), height: px(40), overflow: "hidden" }}><div style={{ position: "absolute", left: px(-60), top: 0, width: px(G.w), height: px(G.h) }}><SparkleOrbit t0={TT.end - 3} dur={2.0} cx={M.cx} cy={M.top + M.h / 2} rx={108} ry={16} px={px} turns={1.5} seed={7} /></div></div><div style={{ position: "absolute", left: px(M.cx - M.w / 2), top: px(M.top), width: px(M.w), height: px(M.h) }}>
          <Img src={src} style={{ position: "absolute", left: 0, top: 0, width: px(M.w), height: px(M.h), filter: "drop-shadow(0 1px 1px rgba(36,20,3,.95)) drop-shadow(0 0 2px rgba(255,226,150,.45))" }} />
          {gOp > 0 && <div style={{ position: "absolute", left: 0, top: 0, width: px(M.w), height: px(M.h), opacity: gOp, WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%", maskImage: `url(${src})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${g - 6}%, #FFF3C4 ${g}%, rgba(255,212,119,0) ${g + 6}%)` }} />}
        </div></>); })()}
      {B && t >= TT.fully && <Img src={staticFile("v9/email_b@2x.png")} style={{ position: "absolute", left: px(10), top: px(261), width: px(212), height: px(16) }} />}
      {B && (key === "b1" || key === "b2" || key === "b3") && (() => { const n = key === "b1" ? 1 : key === "b2" ? 2 : 3;
        return <div style={{ position: "absolute", left: 0, top: 0, width: px(G.w), height: px(G.h), transform: `scale(${scale})`, transformOrigin: `${px(R.cx)}px ${px(R.cy)}px`, opacity: fadeOut }}><Bang3D n={n} t0={t0} cx={R.cx} cy={R.cy} sizes={G.bang.slice(3 - n)} gap={8} bannerW={G.w} bannerH={G.h} jit={jit} glow={flash} /></div>; })()}
      {/* bottom row: clipped so halos never leave the row */}
      <div style={{ position: "absolute", left: 0, top: px(B ? 203 : R.cy - R.maxH / 2 - 2), width: px(G.w), height: px(B ? 77 : R.maxH + 4), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: px(-(B ? 203 : R.cy - R.maxH / 2 - 2)), width: px(G.w), height: px(G.h) }}>
          {!(B && key === "cta") && ring}
          {key === "when" && (B ? phrase("when_silver", 65, 242) : phrase("when"))}
          {key === "cta" && (B ? <><CtaTitle t0={t0} cx={R.cx} cy={R.cy} px={px} opacity={fadeOut} /><div style={{ position: "absolute", left: px(8), top: px(205), width: px(220), height: px(56), overflow: "hidden" }}><div style={{ position: "absolute", left: px(-8), top: px(-205), width: px(G.w), height: px(G.h) }}><SparkleOrbit t0={t0 + 0.2} dur={1.6} cx={R.cx} cy={R.cy + 1} rx={104} ry={26} px={px} seed={3} /></div></div></> : phrase("contact"))}
          {key === "fully" && phrase(B ? "fully_silver" : "fully")}
          {key === "power" && (B ? <Img src={staticFile("v9/power_b@2x.png")} style={{ position: "absolute", left: px(R.cx - 106 + jit), top: px(R.cy - 28), width: px(212), height: px(56), transform: `scale(${scale})`, opacity: fadeOut }} /> : phrase("power"))}
          {!B && key === "b1" && bangs(1)}
          {!B && key === "b2" && bangs(2)}
          {!B && key === "b3" && bangs(3)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
