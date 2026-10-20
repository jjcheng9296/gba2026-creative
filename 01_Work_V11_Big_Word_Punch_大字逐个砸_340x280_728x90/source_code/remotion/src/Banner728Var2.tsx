import React, { useEffect, useState } from "react";
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFonts } from "./CtaTitle";
import { Bang3D } from "./Bang3D";
import { TVAR2 } from "./BannerVar2";
import asp from "../public/v11a/aspect.json";

// V11 728×90 — "大字逐个砸 Big Word Punch" (James 2026-10-20 16:44 "帮我做 那个 大字逐个砸，然后也做 728x90").
// Same concept and SAME timing as the 340×280 VAR2 (TVAR2), so the two banners on one capital.asia page punch together:
// WHEN · ALL ELSE · FAILS, · TRY · THE GOD · OF THE UNIVERSE · IN · DR. · SHEKINAIH! one per beat, each as big as the stage allows
// → 3.75 s the sentence locks (TRY THE GOD OF THE UNIVERSE / IN DR. SHEKINAIH!) → 7.0 / 7.5 / 8.0 BANG ×3 + email
// → 8.5–13 s still closing card in ONE line (the 728 is wide: one line reads bigger than two rows), one ministry glint.
// 728 layout (DEC-728): logos left, masthead (boss headline, base image), stage x 150–500 / y 29–87, photo panel x ≥ 500 never touched.
const px = (v: number) => v * 2;
const A = asp as Record<string, number>;
const ST = { x: 150, w: 350, top: 29, bot: 87 };
const CX = ST.x + ST.w / 2;
const EMAIL = { w: 212, h: 16, top: 71 };                 // 3D silver Write to: ceg@… (same layer as the 340), centred in the stage
const ZB_EMAIL = 70;                                       // word zone bottom once the email is on
const MIN = { x: 180.28, y: 6.094, w: 178.83, h: 15.797 }; // HEAVEN THRONE ROOM MINISTRY in the base masthead (render10 lb11, measured)
const KW: { t: number; n: string; g?: boolean }[] = [
  { t: 0.0, n: "when" }, { t: 0.42, n: "allelse" }, { t: 0.83, n: "fails" }, { t: 1.33, n: "try" },
  { t: 1.75, n: "thegod", g: true }, { t: 2.17, n: "ofuniverse", g: true }, { t: 2.67, n: "in" }, { t: 2.92, n: "dr", g: true }, { t: 3.25, n: "shekinaih", g: true },
];

export const Banner728Var2: React.FC<{ hi?: boolean }> = ({ hi = false }) => {
  const X = hi ? "@4x" : "@2x";
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const T = TVAR2;
  const [fh] = useState(() => delayRender("fonts728"));
  useEffect(() => { loadFonts().then(() => continueRender(fh)); }, [fh]);
  const ease = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const beats: [string, number][] = [["kin", T.kin], ["hero", T.hero], ["b1", T.b1], ["b2", T.b2], ["b3", T.b3], ["close", T.close]];
  let cur = 0; for (let i = 0; i < beats.length; i++) if (t >= beats[i][1] - 1e-6) cur = i;
  const [key, t0] = beats[cur];
  const dt = t - t0;
  const k = Math.round(dt * fps);
  const emailOn = t >= T.b1 - 1e-6;
  const zb = emailOn ? ZB_EMAIL : ST.bot, cy = (ST.top + zb) / 2, zh = zb - ST.top;

  // slam overshoot sized so the peak never leaves the zone: hero 1.04, BANG ×1/×2 1.06, BANG ×3 1.03
  const slamFrom = key === "hero" ? 1.04 : key === "b3" ? 1.03 : 1.06;
  const scale = interpolate(dt, [0, 0.12, 0.33], [slamFrom, 0.97, 1], { ...ease, easing: Easing.out(Easing.cubic) });
  const jx = k < 4 ? (key === "b3" ? [2, -2, 1, -1][k] : key === "b1" || key === "b2" ? [1, -0.75, 0.5, -0.25][k] * 3 : 0) : 0;
  const jy = key === "b3" && k < 4 ? [1, -1, 0.5, 0][k] : 0;
  const flash = interpolate(dt, [0, 0.08, 0.3], [0, 1, 0], ease);
  // gold-word impact: soft flash behind + a ripple that starts at the word's own outline and runs outward (on the 728 the words are wide,
  // so a small centred ring would only peep through the word gaps as a scratch — draft 1 frame 1.75 s)
  const ringFx = (w: number, h: number, d: number, fl: number) => {
    const g = interpolate(d, [0, 0.45], [0, 34], { ...ease, easing: Easing.out(Easing.cubic) }), o = interpolate(d, [0, 0.45], [0.85, 0], ease);
    const rw = w * 1.1 + 2 * g, rh = h * 0.95 + g * 0.7, fw = Math.min(320, w * 0.7 + 40);
    return (<>
      <div style={{ position: "absolute", left: px(CX - fw / 2), top: px(cy - 30), width: px(fw), height: px(60), borderRadius: "50%", background: "radial-gradient(closest-side,#FFF1BF,rgba(241,210,123,.55) 40%,rgba(163,110,38,0) 100%)", opacity: fl }} />
      <Img src={staticFile("v9/ring.png")} style={{ position: "absolute", left: px(CX - rw / 2), top: px(cy - rh / 2), width: px(rw), height: px(rh), opacity: o }} />
    </>);
  };

  // ---- kinetic words: one per beat, as big as the stage allows (≤ 336 × 50), hard cut ----
  let kin: React.ReactNode = null;
  if (key === "kin") {
    let wi = 0; for (let i = 0; i < KW.length; i++) if (t >= KW[i].t - 1e-6) wi = i;
    const W = KW[wi], wdt = t - W.t, ar = A["kw_" + W.n];
    const h = Math.min(50, 336 / ar), w = h * ar;
    const peak = Math.min(1.15, (zh - 2) / h, 346 / w);
    const sc = interpolate(wdt, [0, 0.083, 0.25], [peak, 0.985, 1], { ...ease, easing: Easing.out(Easing.cubic) });
    const fl = interpolate(wdt, [0, 0.06, 0.3], [0, 1, 0], ease);
    kin = (<>
      {W.g && ringFx(w, h, wdt, fl)}
      <Img src={staticFile(`v11a/kw_${W.n}.png`)} style={{ position: "absolute", left: px(CX - w / 2), top: px(cy - h / 2), width: px(w), height: px(h), opacity: wdt < 0.04 ? 0.85 : 1, transform: `scale(${sc})`, transformOrigin: "50% 50%", filter: `drop-shadow(0 ${px(1)}px ${px(1)}px rgba(0,0,0,.9))` }} />
    </>);
  }

  // ---- hero: the sentence locks together (TRY THE GOD OF THE UNIVERSE / IN DR. SHEKINAIH!) ----
  const r1 = 21, r2 = 28.5, rg = 3.5;
  const L1w = r1 * A.tryline, nameW = r2 * A.name, inH = r2 * 0.62, inW = inH * (A.in3d ?? 1.1), inGap = 5;
  const rowW = inW + inGap + nameW, heroTop = cy - (r1 + rg + r2) / 2;
  const nameShadow = `drop-shadow(0 ${px(1)}px ${px(1)}px rgba(36,20,3,.95)) drop-shadow(0 0 ${px(3)}px rgba(255,226,150,.45))`;
  const hero = key === "hero" ? (
    <div style={{ position: "absolute", left: 0, top: 0, width: px(728), height: px(90), transform: `scale(${scale})`, transformOrigin: `${px(CX)}px ${px(cy)}px` }}>
      <Img src={staticFile("v11a/tryline.png")} style={{ position: "absolute", left: px(CX - L1w / 2), top: px(heroTop), width: px(L1w), height: px(r1) }} />
      <div style={{ position: "absolute", left: px(CX - rowW / 2), top: px(heroTop + r1 + rg), width: px(rowW), height: px(r2), filter: nameShadow }}>
        <Img src={staticFile("v11a/in3d.png")} style={{ position: "absolute", left: 0, top: px(r2 - inH - r2 * 0.1), width: px(inW), height: px(inH) }} />
        <Img src={staticFile("v11a/name.png")} style={{ position: "absolute", left: px(inW + inGap), top: 0, width: px(nameW), height: px(r2) }} />
      </div>
    </div>
  ) : null;

  // ---- closing card: ONE line, same letter height for the phrase and the name, completely still ----
  const gap = 5, rhMax = (344 - 2 * gap) / (A.tryline + 0.62 * (A.in3d ?? 1.1) + A.name);
  const rh = Math.min(rhMax, zh - 4);
  const cIn = { h: rh * 0.62, w: rh * 0.62 * (A.in3d ?? 1.1) }, cW = rh * A.tryline + gap + cIn.w + gap + rh * A.name, cL = CX - cW / 2, cTop = cy - rh / 2;
  const close = key === "close" ? (<>
    <Img src={staticFile("v11a/tryline.png")} style={{ position: "absolute", left: px(cL), top: px(cTop), width: px(rh * A.tryline), height: px(rh), filter: `drop-shadow(0 ${px(1)}px ${px(1)}px rgba(0,0,0,.9))` }} />
    <div style={{ position: "absolute", left: px(cL + rh * A.tryline + gap), top: px(cTop), width: px(cIn.w + gap + rh * A.name), height: px(rh), filter: nameShadow }}>
      <Img src={staticFile("v11a/in3d.png")} style={{ position: "absolute", left: 0, top: px(rh - cIn.h - rh * 0.1), width: px(cIn.w), height: px(cIn.h) }} />
      <Img src={staticFile("v11a/name.png")} style={{ position: "absolute", left: px(cIn.w + gap), top: 0, width: px(rh * A.name), height: px(rh) }} />
    </div>
  </>) : null;

  // ---- ministry in the masthead: ONE glint right after the closing card appears (alpha-masked to the letters) ----
  const msrc = staticFile("v9/ministry3d1.png");
  const mg = interpolate(t, [T.close, T.close + 0.5], [-15, 115], ease);
  const mgOp = t < T.close || t > T.close + 0.5 ? 0 : interpolate(t, [T.close, T.close + 0.08, T.close + 0.42, T.close + 0.5], [0, 0.3, 0.3, 0], ease);

  const n = key === "b1" ? 1 : key === "b2" ? 2 : key === "b3" ? 3 : 0;
  const bangSizes = [20, 22.5, 25].slice(3 - Math.max(n, 1));
  return (
    <AbsoluteFill style={{ background: "#02040E" }}>
      <Img src={staticFile(`v11lb/lb_base${X}.png`)} style={{ position: "absolute", left: 0, top: 0, width: px(728), height: px(90) }} />
      {mgOp > 0 && <div style={{ position: "absolute", left: px(MIN.x), top: px(MIN.y), width: px(MIN.w), height: px(MIN.h), opacity: mgOp, WebkitMaskImage: `url(${msrc})`, WebkitMaskSize: "100% 100%", maskImage: `url(${msrc})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${mg - 6}%, #FFF3C4 ${mg}%, rgba(255,212,119,0) ${mg + 6}%)` }} />}
      {emailOn && <Img src={staticFile(`v11a/email_v11${X}.png`)} style={{ position: "absolute", left: px(CX - EMAIL.w / 2), top: px(EMAIL.top), width: px(EMAIL.w), height: px(EMAIL.h) }} />}
      {/* stage, clipped so nothing ever leaves it (never reaches the photo panel, the masthead or the email) */}
      <div style={{ position: "absolute", left: px(140), top: px(ST.top - 0.5), width: px(365), height: px(zb - ST.top + 0.5), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: px(-140), top: px(-(ST.top - 0.5)), width: px(728), height: px(90) }}>
          {key === "hero" && ringFx(Math.max(L1w, rowW), r1 + rg + r2, dt, flash)}
          {n > 0 && ringFx([25, 22.5, 20].slice(0, n).reduce((a, b) => a + b * 1.5 * 2.9298, 0) + (n - 1) * 6, 37.5, dt, flash)}
          {kin}
          {hero}
          {close}
        </div>
      </div>
      {/* BANG! words above the ring layer (light never covers text) */}
      {n > 0 && (
        <div style={{ position: "absolute", left: 0, top: px(jy), width: px(728), height: px(90), transform: `scale(${scale})`, transformOrigin: `${px(CX)}px ${px(cy)}px` }}>
          <Bang3D n={n} t0={t0} cx={CX} cy={cy} sizes={bangSizes} gap={12} bannerW={728} bannerH={90} jit={jx} glow={flash} bangUrl={(s) => staticFile(`v11lb/bang_${s}${X}.png`)} ar={2.9298} />
        </div>
      )}
    </AbsoluteFill>
  );
};
