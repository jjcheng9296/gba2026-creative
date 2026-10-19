import React, { useEffect, useState } from "react";
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFonts } from "./CtaTitle";
import { Bang3D } from "./Bang3D";
import { SparkleOrbit } from "./SparkleOrbit";
import asp from "../public/v11a/aspect.json";
import asm from "../public/v11a/assemble.json";

// V11A VERSION 2 (19 Oct 2026, James 14:54 "准备做 version 2"; ChatGPT round 13 concept A "the sentence assembles";
// James 15:05: email after the name beat · keep the hero comet (behind letters) · no ministry orbit · block lettering).
// 0–1.5 WHEN ALL ELSE FAILS, → 1.5–3.5 TRY THE GOD / OF THE UNIVERSE → 3.5–4.0 the two-line phrase condenses into ONE line and rises
// while IN DR. SHEKINAIH! lands beneath (the whole sentence = one picture) → 4.0–7.5 hold, one glint, comet behind
// → 7.5 / 8.0 / 8.5 BANG! ×1/×2/×3 (email appears) → 9.4 closing card (equal-height rows, clean cut) + one ministry glint → 10–12 completely still.
export const T11V2 = { when: 0, tryg: 1.5, hero: 3.5, b1: 7.5, b2: 8.0, b3: 8.5, close: 9.4, end: 12.0 };
const px = (v: number) => v * 2;
const SILVER = "linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%)";
const Z = { cx: 116, top: 205, bottom: 278 };              // slogan zone x 10–222
const A = asp as Record<string, number>;
const RING_CY = 232;

const inLabel = (left: number, top: number, w: number, fs: number) => (
  <span style={{ position: "absolute", left: px(left), top: px(top), width: px(w), fontFamily: "Cond", fontWeight: 600, fontSize: px(fs), lineHeight: 1, textAlign: "center", letterSpacing: "0.04em", backgroundImage: SILVER, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: "drop-shadow(0 0 0.6px #E9BC5C) drop-shadow(0 0 0.6px #B98A2E) drop-shadow(0 1px 1px rgba(0,0,0,.9))" }}>IN</span>
);
const glintMask = (src: string, w: number, h: number, g: number, op: number, color = "#FFF8DC") => op > 0 ? (
  <div style={{ position: "absolute", left: 0, top: 0, width: px(w), height: px(h), opacity: op, WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%", maskImage: `url(${src})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${g - 6}%, ${color} ${g}%, rgba(255,212,119,0) ${g + 6}%)` }} />
) : null;

export const Banner11v2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const T = T11V2;
  const [fh] = useState(() => delayRender("fonts11v2"));
  useEffect(() => { loadFonts().then(() => continueRender(fh)); }, [fh]);

  const beats: [string, number][] = [["when", T.when], ["tryg", T.tryg], ["hero", T.hero], ["b1", T.b1], ["b2", T.b2], ["b3", T.b3], ["close", T.close]];
  let cur = 0; for (let i = 0; i < beats.length; i++) if (t >= beats[i][1] - 1e-6) cur = i;
  const [key, t0] = beats[cur];
  const dt = t - t0;
  const k = Math.round(dt * fps);
  const ease = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // slam overshoot sized so the peak never leaves the zone (vault WF-07): WHEN 188 px wide → 1.1; wide TRY card → 1.03 without shake
  const slamFrom = key === "when" ? 1.1 : key === "tryg" ? 1.03 : key === "b3" ? 1.03 : 1.15;
  const settle = key === "tryg" ? 0.995 : 0.97;
  const scale = interpolate(dt, [0, 0.12, 0.33], [slamFrom, settle, 1], { ...ease, easing: Easing.out(Easing.cubic) });
  // shake: WHEN / b1 / b2 small horizontal; b3 = ChatGPT ±2 px x / ±1 px y for 4 frames, then still
  const jx = key === "tryg" ? 0 : k < 4 ? (key === "b3" ? [2, -2, 1, -1][k] : [1, -0.75, 0.5, -0.25][k] * 3) : 0;
  const jy = key === "b3" && k < 4 ? [1, -1, 0.5, 0][k] : 0;
  const flash = interpolate(dt, [0, 0.08, 0.3], [0, 1, 0], ease);
  const ringR = interpolate(dt, [0, 0.45], [6, 34], { ...ease, easing: Easing.out(Easing.cubic) });
  const ringO = interpolate(dt, [0, 0.45], [0.9, 0], ease);
  const ring = (
    <>
      <div style={{ position: "absolute", left: px(Z.cx - 26), top: px(RING_CY - 26), width: px(52), height: px(52), borderRadius: "50%", background: "radial-gradient(closest-side,#FFF1BF,rgba(241,210,123,.55) 40%,rgba(163,110,38,0) 100%)", opacity: flash }} />
      <Img src={staticFile("v9/ring.png")} style={{ position: "absolute", left: px(Z.cx - ringR * 2.4), top: px(RING_CY - ringR * 1.2), width: px(ringR * 4.8), height: px(ringR * 2.4), opacity: ringO }} />
    </>
  );

  // ---- geometry of the assembled sentence (hero) and of the closing card ----
  const lineAr = A.tryline, nameAr = A.name, tryAr = A.try;
  const L1 = { w: 196, h: 196 / lineAr, top: Z.top };                                   // TRY THE GOD OF THE UNIVERSE (one line)
  const heroIn = { w: 20, fs: 22, gap: 3 };                                              // IN, a little bigger than v1 (James 14:43)
  const heroNameW = 212 - heroIn.w - heroIn.gap - 6, heroNameH = heroNameW / nameAr;    // ≈183 × 30 px → caps ≈ 25 px
  const heroRowTop = L1.top + L1.h + 6, heroRowW = heroIn.w + heroIn.gap + heroNameW, heroRowL = Z.cx - heroRowW / 2;
  const rh = 22.8;                                                                       // closing card: both rows the same letter height (James)
  const cl = { pw: rh * lineAr, nw: rh * nameAr, inW: 15, inGap: 3, top2: Z.top + rh + 4 };
  const clRow = cl.inW + cl.inGap + cl.nw;

  // ---- hero landing (3.5–4.0 assemble, then hold) ----
  const hero = key === "hero" ? (() => {
    const a = dt;                                                                          // 0..4 s into the beat
    // 1) ASSEMBLE 0–0.42 s: line 1 (TRY THE GOD) and line 2 (OF THE UNIVERSE) of the two-line card travel and shrink into
    //    their places in the one-line phrase (line 2 moves up beside line 1); the one-line asset takes over at the end.
    const cw = 198, ch = cw / tryAr, cL = Z.cx - cw / 2, cT = 241.5 - ch / 2;            // two-line card as shown in the TRY beat
    const [s1, s2] = asm.line_split;
    const lineL = Z.cx - L1.w / 2;
    const from1 = { x: cL + asm.card_box1[0] * cw, y: cT + asm.card_box1[1] * ch, w: asm.card_box1[2] * cw, h: asm.card_box1[3] * ch };
    const from2 = { x: cL + asm.card_box2[0] * cw, y: cT + asm.card_box2[1] * ch, w: asm.card_box2[2] * cw, h: asm.card_box2[3] * ch };
    const to1 = { x: lineL, y: L1.top, w: s1 * L1.w, h: L1.h };
    const to2 = { x: lineL + s2 * L1.w, y: L1.top, w: (1 - s2) * L1.w, h: L1.h };
    // choreography (5 frames): line 1 shrinks into place first; line 2 shrinks and slides right while still below, then rises
    // into the gap → the lines never overlap; on the last frame the one-line asset takes over (same positions).
    const m = interpolate(a, [0, 0.42], [0, 1], ease);
    const io = (v: number) => Easing.inOut(Easing.cubic)(Math.min(1, Math.max(0, v)));
    const f1 = io(m / 0.4), f2x = io(m / 0.6), f2y = io((m - 0.5) / 0.5);
    const lerp = (p: { x: number; y: number; w: number; h: number }, q: typeof p, fx: number, fy: number) => ({ x: p.x + (q.x - p.x) * fx, y: p.y + (q.y - p.y) * fy, w: p.w + (q.w - p.w) * fx, h: p.h + (q.h - p.h) * fx });
    const b1 = lerp(from1, to1, f1, f1), b2 = lerp(from2, to2, f2x, f2y);
    const swap = a >= 0.41 ? 1 : 0;                                                       // last frame: hand over to the one-line asset
    // 2) the name lands AFTER the phrase is in place (0.42 s): 1.08 → 0.995 → 1, blur 0.6 → 0, first frame 0.4
    const h0 = 0.42;
    const sc = interpolate(a, [h0, h0 + 0.25, h0 + 0.5], [1.08, 0.995, 1], { ...ease, easing: Easing.bezier(0.16, 1, 0.3, 1) });
    const blur = interpolate(a, [h0, h0 + 0.25], [0.6, 0], ease);
    const op = a < h0 ? 0 : interpolate(a, [h0, h0 + 0.167], [0.4, 1], ease);
    const g = interpolate(a, [h0 + 0.5, h0 + 1.17], [-15, 115], ease);
    const gOp = a < h0 + 0.5 || a > h0 + 1.33 ? 0 : interpolate(a, [h0 + 0.5, h0 + 0.6, h0 + 1.17, h0 + 1.33], [0, 0.45, 0.45, 0], ease);
    const nsrc = staticFile("v11a/name.png");
    return (<>
      {/* comet BEHIND the assembled sentence, clipped to the slogan column */}
      <div style={{ position: "absolute", left: px(8), top: px(203), width: px(220), height: px(77), overflow: "hidden" }}><div style={{ position: "absolute", left: px(-8), top: px(-203), width: px(340), height: px(280) }}><SparkleOrbit t0={t0 + h0 + 0.3} dur={1.6} cx={Z.cx} cy={heroRowTop + heroNameH / 2} rx={106} ry={20} px={px} seed={3} /></div></div>
      {swap < 1 && <>
        <Img src={staticFile("v11a/try_l1.png")} style={{ position: "absolute", left: px(b1.x), top: px(b1.y), width: px(b1.w), height: px(b1.h), opacity: 1 - swap }} />
        <Img src={staticFile("v11a/try_l2.png")} style={{ position: "absolute", left: px(b2.x), top: px(b2.y), width: px(b2.w), height: px(b2.h), opacity: 1 - swap }} />
      </>}
      {swap > 0 && <Img src={staticFile("v11a/tryline.png")} style={{ position: "absolute", left: px(lineL), top: px(L1.top), width: px(L1.w), height: px(L1.h), opacity: swap }} />}
      {op > 0 && <div style={{ position: "absolute", left: px(heroRowL), top: px(heroRowTop), width: px(heroRowW), height: px(heroNameH), opacity: op, transform: `scale(${sc})`, transformOrigin: "50% 50%", filter: `blur(${px(blur)}px) drop-shadow(0 ${px(1)}px ${px(1)}px rgba(36,20,3,.95)) drop-shadow(0 0 ${px(3)}px rgba(255,226,150,.45))` }}>
        {inLabel(0, heroNameH / 2 - heroIn.fs * 0.36, heroIn.w, heroIn.fs)}
        <div style={{ position: "absolute", left: px(heroIn.w + heroIn.gap), top: 0, width: px(heroNameW), height: px(heroNameH) }}>
          <Img src={nsrc} style={{ position: "absolute", left: 0, top: 0, width: px(heroNameW), height: px(heroNameH) }} />
          {glintMask(nsrc, heroNameW, heroNameH, g, gOp)}
        </div>
      </div>}
    </>);
  })() : null;

  // ---- closing card: clean cut, equal letter height, completely still ----
  const close = key === "close" ? (<>
    <Img src={staticFile("v11a/tryline.png")} style={{ position: "absolute", left: px(Z.cx - cl.pw / 2), top: px(Z.top), width: px(cl.pw), height: px(rh) }} />
    {inLabel(Z.cx - clRow / 2, cl.top2 + rh / 2 - 16 * 0.36 - 1.5, cl.inW, 16)}
    <Img src={staticFile("v11a/name.png")} style={{ position: "absolute", left: px(Z.cx - clRow / 2 + cl.inW + cl.inGap), top: px(cl.top2), width: px(cl.nw), height: px(rh), filter: "drop-shadow(0 1px 1px rgba(36,20,3,.95))" }} />
  </>) : null;

  // ---- ministry: static all loop; ONE glint right after the closing card appears, finished before the last 2 s ----
  const M = { cx: 170, top: 8, w: 214, h: 19 }; const msrc = staticFile("v9/ministry3d1.png");
  const mg = interpolate(t, [T.close + 0.05, T.end - 2.0], [-15, 115], ease);
  const mgOp = t < T.close + 0.05 || t > T.end - 2.0 ? 0 : interpolate(t, [T.close + 0.05, T.close + 0.13, T.end - 2.08, T.end - 2.0], [0, 0.3, 0.3, 0], ease);

  const n = key === "b1" ? 1 : key === "b2" ? 2 : key === "b3" || key === "close" ? 3 : 0;
  const bangSizes = [12.5, 14.5, 17].slice(3 - Math.max(n, 1));
  return (
    <AbsoluteFill style={{ background: "#040817" }}>
      <Img src={staticFile("v9/mr_base_b@2x.png")} style={{ position: "absolute", left: 0, top: 0, width: px(340), height: px(280) }} />
      <div style={{ position: "absolute", left: px(M.cx - M.w / 2), top: px(M.top), width: px(M.w), height: px(M.h) }}>
        <Img src={msrc} style={{ position: "absolute", left: 0, top: 0, width: px(M.w), height: px(M.h), filter: "drop-shadow(0 1px 1px rgba(36,20,3,.95)) drop-shadow(0 0 2px rgba(255,226,150,.45))" }} />
        {glintMask(msrc, M.w, M.h, mg, mgOp, "#FFF3C4")}
      </div>
      {t >= T.b1 && <Img src={staticFile("v9/email_b@2x.png")} style={{ position: "absolute", left: px(10), top: px(261), width: px(212), height: px(16) }} />}
      {/* slogan zone, clipped so nothing leaves it */}
      <div style={{ position: "absolute", left: 0, top: px(203), width: px(340), height: px(77), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: px(-203), width: px(340), height: px(280) }}>
          {(key === "when" || key === "tryg" || key === "b1" || key === "b2" || key === "b3") && ring}
          {key === "when" && (() => { const h = 65, w = h * 2.898550724637681; return <Img src={staticFile("v9/when_silver.png")} style={{ position: "absolute", left: px(Z.cx - w / 2 + jx), top: px(242 - h / 2), width: px(w), height: px(h), transform: `scale(${scale})` }} />; })()}
          {key === "tryg" && (() => { const w = 198, h = w / tryAr; return <Img src={staticFile("v11a/try.png")} style={{ position: "absolute", left: px(Z.cx - w / 2), top: px(241.5 - h / 2), width: px(w), height: px(h), transform: `scale(${scale})` }} />; })()}
          {hero}
          {close}
        </div>
      </div>
      {/* BANG! words above the ring layer (light never covers text) */}
      {(key === "b1" || key === "b2" || key === "b3") && (
        <div style={{ position: "absolute", left: 0, top: px(jy), width: px(340), height: px(280), transform: `scale(${scale})`, transformOrigin: `${px(Z.cx)}px ${px(RING_CY)}px` }}>
          <Bang3D n={n} t0={t0} cx={Z.cx} cy={RING_CY} sizes={bangSizes} gap={8} bannerW={340} bannerH={280} jit={jx} glow={flash} bangUrl={(s) => staticFile(`v11a/bang_${s}@2x.png`)} ar={2.9298} />
        </div>
      )}
    </AbsoluteFill>
  );
};
