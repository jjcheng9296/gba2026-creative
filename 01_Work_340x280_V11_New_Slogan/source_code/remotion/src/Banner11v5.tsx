import React, { useEffect, useState } from "react";
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFonts } from "./CtaTitle";
import { Bang3D } from "./Bang3D";
import asp from "../public/v11a/aspect.json";
import asm from "../public/v11a/assemble.json";
import namePts from "../public/v11a/name_points.json";

// V11A VERSION 2 (19 Oct 2026, James 14:54 "准备做 version 2"; ChatGPT round 13 concept A "the sentence assembles";
// James 15:05: email after the name beat · keep the hero comet (behind letters) · no ministry orbit · block lettering).
// 0–1.5 WHEN ALL ELSE FAILS, → 1.5–3.5 TRY THE GOD / OF THE UNIVERSE → 3.5–4.0 the two-line phrase condenses into ONE line and rises
// while IN DR. SHEKINAIH! lands beneath (the whole sentence = one picture) → 4.0–7.5 hold, one glint, comet behind
// → 7.5 / 8.0 / 8.5 BANG! ×1/×2/×3 (email appears) → 9.4 closing card (equal-height rows, clean cut) + one ministry glint → 10–12 completely still.
// V3 (15:30, James "做第三版"): ChatGPT R14 fixes (hero row ≤204 px + 1.03 landing, closing card from 9.0 s, protected email strip) + Claude (3D silver IN, slower assemble, bigger phrase line) + the breakthrough name reveal.
// BREAKTHROUGH (Claude + ChatGPT R15 merged): "the comet writes her name in three strokes" — the kept comet now has a job: it runs along the
// baseline and, in three beats (DR. | SHEK | INAIH!), gold dots gather and the letters rise from the baseline like molten metal; the later
// BANG! BANG! BANG! repeats the same three-beat rhythm. 13 s loop, closing card 9.5–13 (still from 10.0).
export const T11V5 = { when: 0, tryg: 1.5, hero: 3.5, b1: 8.0, b2: 8.5, b3: 9.0, close: 9.5, end: 13.0 };
const px = (v: number) => v * 2;
// V5 = v4 + WHEN ALL ELSE FAILS re-centred and rebuilt as a two-line heavy 3D chrome block (James 16:36). V4 stays untouched.
// V4 = v3 + the boss's headline (19 Oct 15:49, mock A4 → A5 16:13): top CROWNED EAGLES GLOBAL (3D rainbow, gold border) over
// HEAVEN THRONE ROOM MINISTRY (3D gold), band CE GLOBAL NETWORK INTERNATIONAL / GLOBAL FREIGHT FORWARDING! in 3D SILVER (base image),
// email in 3D silver; the slogan column moves down DY px to clear the two-line band. Version 3 (MR11A3) stays untouched.
const DY = 4;
const Z = { cx: 116, top: 205 + DY, bottom: 278 };         // slogan zone x 10–222
const A = asp as Record<string, number>;
const RING_CY = 232 + DY;
const WHEN_CY = 243.5, WHEN_H = 62;   // V5: optical centre of the free space y 209–278; two-line block 62 px (slam 1.1 → 68 px, stays inside)

const glintMask = (src: string, w: number, h: number, g: number, op: number, color = "#FFF8DC") => op > 0 ? (
  <div style={{ position: "absolute", left: 0, top: 0, width: px(w), height: px(h), opacity: op, WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%", maskImage: `url(${src})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${g - 6}%, ${color} ${g}%, rgba(255,212,119,0) ${g + 6}%)` }} />
) : null;

export const Banner11v5: React.FC<{ hi?: boolean; whenV?: "v4" | "a" | "b" }> = ({ hi = false, whenV = "b" }) => {
  const X = hi ? '@4x' : '@2x';   // hi = true high-res layers for the 1360×1120 renders (James 16:25 "I WANT high resolution version")
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const T = T11V5;
  const [fh] = useState(() => delayRender("fonts11v5"));
  useEffect(() => { loadFonts().then(() => continueRender(fh)); }, [fh]);

  const beats: [string, number][] = [["when", T.when], ["tryg", T.tryg], ["hero", T.hero], ["b1", T.b1], ["b2", T.b2], ["b3", T.b3], ["close", T.close]];
  let cur = 0; for (let i = 0; i < beats.length; i++) if (t >= beats[i][1] - 1e-6) cur = i;
  const [key, t0] = beats[cur];
  const dt = t - t0;
  const k = Math.round(dt * fps);
  const ease = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // slam overshoot sized so the peak never leaves the zone (vault WF-07): WHEN 188 px wide → 1.1; wide TRY card → 1.03 without shake
  const slamFrom = key === "when" ? (whenV === "b" ? 1.05 : 1.1) :   // B: ChatGPT R18 — 62 px block peaks at 65 px, clear of the band
    key === "tryg" ? 1.03 : key === "b3" ? 1.03 : 1.15;
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
  const L1 = { w: 206, h: 206 / lineAr, top: Z.top };                                   // TRY THE GOD OF THE UNIVERSE (one line)
  const inAr = A.in3d ?? 1.1;
  const heroNameW = 178, heroNameH = heroNameW / nameAr;                                // row = IN + gap + name ≤ 204 px (ChatGPT R14)
  const heroIn = { h: heroNameH * 0.62, gap: 5 }; const heroInW = heroIn.h * inAr;
    const heroRowTop = L1.top + L1.h + 5, heroRowW = heroInW + heroIn.gap + heroNameW, heroRowL = Z.cx - heroRowW / 2;
  const rh = 22.8;                                                                       // closing card: both rows the same letter height (James)
  const clInH = rh * 0.62, cl = { pw: rh * lineAr, nw: rh * nameAr, inW: clInH * (A.in3d ?? 1.1), inGap: 4, top2: Z.top + rh + 4 };
  const clRow = cl.inW + cl.inGap + cl.nw;

  // ---- hero landing (3.5–4.0 assemble, then hold) ----
  const hero = key === "hero" ? (() => {
    const a = dt;                                                                          // 0..4 s into the beat
    // 1) ASSEMBLE 0–0.42 s: line 1 (TRY THE GOD) and line 2 (OF THE UNIVERSE) of the two-line card travel and shrink into
    //    their places in the one-line phrase (line 2 moves up beside line 1); the one-line asset takes over at the end.
    const cw = 198, ch = cw / tryAr, cL = Z.cx - cw / 2, cT = 241.5 + DY - ch / 2;            // two-line card as shown in the TRY beat
    const [s1, s2] = asm.line_split;
    const lineL = Z.cx - L1.w / 2;
    const from1 = { x: cL + asm.card_box1[0] * cw, y: cT + asm.card_box1[1] * ch, w: asm.card_box1[2] * cw, h: asm.card_box1[3] * ch };
    const from2 = { x: cL + asm.card_box2[0] * cw, y: cT + asm.card_box2[1] * ch, w: asm.card_box2[2] * cw, h: asm.card_box2[3] * ch };
    const to1 = { x: lineL, y: L1.top, w: s1 * L1.w, h: L1.h };
    const to2 = { x: lineL + s2 * L1.w, y: L1.top, w: (1 - s2) * L1.w, h: L1.h };
    // choreography (5 frames): line 1 shrinks into place first; line 2 shrinks and slides right while still below, then rises
    // into the gap → the lines never overlap; on the last frame the one-line asset takes over (same positions).
    const m = interpolate(a, [0, 0.67], [0, 1], ease);   // 8 frames (v2: 5) so the eye sees the sentence assemble
    const io = (v: number) => Easing.inOut(Easing.cubic)(Math.min(1, Math.max(0, v)));
    const f1 = io(m / 0.4), f2x = io(m / 0.6), f2y = io((m - 0.5) / 0.5);
    const lerp = (p: { x: number; y: number; w: number; h: number }, q: typeof p, fx: number, fy: number) => ({ x: p.x + (q.x - p.x) * fx, y: p.y + (q.y - p.y) * fy, w: p.w + (q.w - p.w) * fx, h: p.h + (q.h - p.h) * fx });
    const b1 = lerp(from1, to1, f1, f1), b2 = lerp(from2, to2, f2x, f2y);
    const swap = a >= 0.66 ? 1 : 0;                                                       // last frame: hand over to the one-line asset
    // 2) THREE STROKES (rel. to the hero beat): comet enters at 0.67 s; groups DR. | SHEK | INAIH! rise from the baseline at 0.92 / 1.25 / 1.58 s
    //    (0.42 s each); gold dots fly from the comet to their places in each group just before it rises and are hidden by the letters
    //    (drawn behind them); one narrow glint at 2.4 s; then the whole sentence rests until the BANGs.
    const RS = [0.833, 1.333, 1.833], RD = 0.5, SPLIT = [0, 0.2408, 0.5867, 1];   // R16: same half-second pulse as BANG! BANG! BANG! (frames 52 / 58 / 64 = 4.33 / 4.83 / 5.33 s, done 5.83; comet starts as the assemble ends)
    const rise = (g: number) => interpolate(a, [RS[g], RS[g] + RD], [0, 1], { ...ease, easing: Easing.out(Easing.cubic) });
    const prog = [rise(0), rise(1), rise(2)];
    const nameL = heroRowL + heroInW + heroIn.gap, base = heroRowTop + heroNameH * 0.9;
    const cStart = RS[0] - 0.167, cEnd = RS[2] + RD;
    const cu = interpolate(a, [cStart, cEnd], [0, 1], ease);
    const cOp = a < cStart ? 0 : interpolate(a, [cStart, cStart + 0.08, cEnd, cEnd + 0.25], [0, 1, 1, 0], ease);
    const headX = nameL - 8 + cu * (heroNameW + 14), headY = base + 2;
    const inOp = interpolate(a, [RS[0], RS[0] + 0.25], [0, 1], ease), inY = interpolate(a, [RS[0], RS[0] + 0.25], [3, 0], { ...ease, easing: Easing.out(Easing.cubic) });
    const g = interpolate(a, [2.4, 3.07], [-15, 115], ease);
    const gOp = 0;   // R16: no glint over the finished name — the three strokes are its signature; the name rests 5.67–8.0 s
    const GOLD = ["#FFE9A8", "#F2C75C", "#C99A3A"];
    const dots = (namePts as number[][]).map((pt, i) => {
      const grp = pt[0] < SPLIT[1] ? 0 : pt[0] < SPLIT[2] ? 1 : 2;
      const arrive = RS[grp] + (1 - pt[1]) * RD - 0.04, leave = Math.max(arrive - 0.25, RS[grp] - 0.167);
      if (a < leave || a > RS[grp] + RD + 0.1) return null;
      const r = (k: number) => { const v = Math.sin((i + 1) * 12.9898 * k) * 43758.5453; return v - Math.floor(v); };
      const u = interpolate(a, [leave, arrive], [0, 1], { ...ease, easing: Easing.out(Easing.quad) });
      const sx = headX - 4 + (r(1) - 0.5) * 10, sy = headY + (r(2) - 0.5) * 6;
      const tx = nameL + pt[0] * heroNameW, ty = heroRowTop + pt[1] * heroNameH;
      const sz = 1.2 + r(3) * 0.9;
      return <div key={i} style={{ position: "absolute", left: px(sx + (tx - sx) * u - sz / 2), top: px(sy + (ty - sy) * u - sz / 2), width: px(sz), height: px(sz), borderRadius: "50%", background: GOLD[i % 3], opacity: 0.95 }} />;
    });
    const nsrc = staticFile("v11a/name.png");
    return (<>
      {/* comet + dots BEHIND the letters (clipped to the slogan column); the letters hide every dot they reach */}
      {cOp > 0 && <div style={{ position: "absolute", left: px(10), top: px(203 + DY), width: px(212), height: px(72 - DY), overflow: "hidden" }}>   {/* x 10–222; down to y 275 only while the email is not yet on screen */}<div style={{ position: "absolute", left: px(-10), top: px(-203 - DY), width: px(340), height: px(280) }}>
        {dots}
        <div style={{ position: "absolute", left: px(headX - 3.5), top: px(headY - 3.5), width: px(7), height: px(7), borderRadius: "50%", background: "radial-gradient(closest-side,#FFFFFF,#FFF1BF 45%,rgba(255,214,120,0) 100%)", opacity: cOp }} />
        <div style={{ position: "absolute", left: px(headX - 3), top: px(headY - 0.5), width: px(6), height: px(1), background: "linear-gradient(90deg,rgba(255,255,255,0),#FFFFFF,rgba(255,255,255,0))", opacity: cOp }} />
        <div style={{ position: "absolute", left: px(headX - 0.5), top: px(headY - 2), width: px(1), height: px(4), background: "linear-gradient(180deg,rgba(255,255,255,0),#FFFFFF,rgba(255,255,255,0))", opacity: cOp }} />
        {[1, 2, 3, 4, 5].map((k) => <div key={"tl" + k} style={{ position: "absolute", left: px(headX - k * 5 - 1), top: px(headY - 1), width: px(2.2 - k * 0.3), height: px(2.2 - k * 0.3), borderRadius: "50%", background: "#FFE28A", opacity: cOp * (1 - k / 6) }} />)}
      </div></div>}
      {swap < 1 && <>
        <Img src={staticFile("v11a/try_l1.png")} style={{ position: "absolute", left: px(b1.x), top: px(b1.y), width: px(b1.w), height: px(b1.h), opacity: 1 - swap }} />
        <Img src={staticFile("v11a/try_l2.png")} style={{ position: "absolute", left: px(b2.x), top: px(b2.y), width: px(b2.w), height: px(b2.h), opacity: 1 - swap }} />
      </>}
      {swap > 0 && <Img src={staticFile("v11a/tryline.png")} style={{ position: "absolute", left: px(lineL), top: px(L1.top), width: px(L1.w), height: px(L1.h), opacity: swap }} />}
      <div style={{ position: "absolute", left: px(heroRowL), top: px(heroRowTop), width: px(heroRowW), height: px(heroNameH), filter: `drop-shadow(0 ${px(1)}px ${px(1)}px rgba(36,20,3,.95)) drop-shadow(0 0 ${px(3)}px rgba(255,226,150,.45))` }}>
        <Img src={staticFile("v11a/in3d.png")} style={{ position: "absolute", left: 0, top: px(heroNameH - heroIn.h - heroNameH * 0.1 + inY), width: px(heroInW), height: px(heroIn.h), opacity: inOp }} />
        <div style={{ position: "absolute", left: px(heroInW + heroIn.gap), top: 0, width: px(heroNameW), height: px(heroNameH) }}>
          {[0, 1, 2].map((gi) => prog[gi] > 0 && (
            <div key={gi} style={{ position: "absolute", left: 0, top: 0, width: px(heroNameW), height: px(heroNameH), clipPath: `inset(${(1 - prog[gi]) * 100}% ${(1 - SPLIT[gi + 1]) * 100}% 0 ${SPLIT[gi] * 100}%)` }}>
              <Img src={nsrc} style={{ position: "absolute", left: 0, top: 0, width: px(heroNameW), height: px(heroNameH) }} />
              {prog[gi] < 1 && <div style={{ position: "absolute", left: 0, top: px((1 - prog[gi]) * heroNameH), width: px(heroNameW), height: px(1.6), opacity: 0.7, WebkitMaskImage: `url(${nsrc})`, WebkitMaskSize: `${px(heroNameW)}px ${px(heroNameH)}px`, WebkitMaskPosition: `0 ${-px((1 - prog[gi]) * heroNameH)}px`, background: "#FFF3C4" }} />}
            </div>))}
          {glintMask(nsrc, heroNameW, heroNameH, g, gOp)}
        </div>
      </div>
    </>);
  })() : null;

  // ---- closing card: clean cut, equal letter height, completely still ----
  const close = key === "close" ? (<>
    <Img src={staticFile("v11a/tryline.png")} style={{ position: "absolute", left: px(Z.cx - cl.pw / 2), top: px(Z.top), width: px(cl.pw), height: px(rh) }} />
    <Img src={staticFile("v11a/in3d.png")} style={{ position: "absolute", left: px(Z.cx - clRow / 2), top: px(cl.top2 + rh - clInH - rh * 0.1), width: px(cl.inW), height: px(clInH) }} />
    <Img src={staticFile("v11a/name.png")} style={{ position: "absolute", left: px(Z.cx - clRow / 2 + cl.inW + cl.inGap), top: px(cl.top2), width: px(cl.nw), height: px(rh), filter: "drop-shadow(0 1px 1px rgba(36,20,3,.95))" }} />
  </>) : null;

  // ---- ministry: static all loop; ONE glint right after the closing card appears, finished before the last 2 s ----
  const MAR = 1200 / 106;                                                                 // v9/ministry3d1.png
  const M = { cx: 170, top: 42 - 186 / MAR, w: 186, h: 186 / MAR };                      // HEAVEN THRONE ROOM MINISTRY 186 × 16.4, bottom y 42 (rainbow apex ≈ 45)
  const C = { cx: 170, top: 2, w: 167, h: 167 / A.ceg3d };                               // CROWNED EAGLES GLOBAL 167 × 22 (never stretched)
  const msrc = staticFile("v9/ministry3d1.png");
  const mg = interpolate(t, [T.close, T.close + 0.5], [-15, 115], ease);
  const mgOp = t < T.close || t > T.close + 0.5 ? 0 : interpolate(t, [T.close, T.close + 0.08, T.close + 0.42, T.close + 0.5], [0, 0.3, 0.3, 0], ease);

  const n = key === "b1" ? 1 : key === "b2" ? 2 : key === "b3" || key === "close" ? 3 : 0;
  const bangSizes = [12.5, 14.5, 17].slice(3 - Math.max(n, 1));
  return (
    <AbsoluteFill style={{ background: "#040817" }}>
      <Img src={staticFile(`v11a/mr_base_hl${X}.png`)} style={{ position: "absolute", left: 0, top: 0, width: px(340), height: px(280) }} />
      <div style={{ position: "absolute", left: px(M.cx - M.w / 2), top: px(M.top), width: px(M.w), height: px(M.h) }}>
        <Img src={msrc} style={{ position: "absolute", left: 0, top: 0, width: px(M.w), height: px(M.h), filter: "drop-shadow(0 1px 1px rgba(36,20,3,.95)) drop-shadow(0 0 2px rgba(255,226,150,.45))" }} />
        {glintMask(msrc, M.w, M.h, mg, mgOp, "#FFF3C4")}
      </div>
      <Img src={staticFile("v11a/ceg3d.png")} style={{ position: "absolute", left: px(C.cx - C.w / 2), top: px(C.top), width: px(C.w), height: px(C.h), filter: "drop-shadow(0 1px 1px rgba(0,0,0,.95))" }} />
      {t >= T.b1 && <Img src={staticFile(`v11a/email_v11${X}.png`)} style={{ position: "absolute", left: px(10), top: px(262), width: px(212), height: px(16) }} />}
      {/* slogan zone, clipped so nothing leaves it */}
      <div style={{ position: "absolute", left: 0, top: px(203 + DY), width: px(340), height: px(t >= T.b1 ? 58 - DY : 77 - DY), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: px(-203 - DY), width: px(340), height: px(280) }}>
          {(key === "when" || key === "tryg" || key === "b1" || key === "b2" || key === "b3") && ring}
          {key === "when" && whenV === "v4" && (() => { const h = 65, w = h * 2.898550724637681; return <Img src={staticFile("v9/when_silver.png")} style={{ position: "absolute", left: px(Z.cx - w / 2 + jx), top: px(242 + DY - h / 2), width: px(w), height: px(h), transform: `scale(${scale})` }} />; })()}
          {/* V5 (James 16:36 "WHEN ALL ELSE FAILS 是不是没有正中间 … 字体 是不是没有震撼力"): centred in the free space between the band and the frame bottom (y 209–278, centre 243.5).
              a = same lettering, ink centred; b = new two-line heavy 3D chrome block WHEN ALL / ELSE FAILS, (same family as the band and IN) filling the zone like the TRY card. */}
          {key === "when" && whenV === "a" && (() => { const w = 192, h = w / 2.898550724637681; return <Img src={staticFile("v9/when_silver.png")} style={{ position: "absolute", left: px(Z.cx - w / 2 + jx), top: px(WHEN_CY - 0.529 * h), width: px(w), height: px(h), transform: `scale(${scale})` }} />; })()}
          {key === "when" && whenV === "b" && (() => { const h = WHEN_H, w = h * A.when2_chrome; return <Img src={staticFile("v11a/when2_chrome.png")} style={{ position: "absolute", left: px(Z.cx - w / 2 + jx), top: px(WHEN_CY - h / 2), width: px(w), height: px(h), transform: `scale(${scale})` }} />; })()}
          {key === "tryg" && (() => { const w = 198, h = w / tryAr; return <Img src={staticFile("v11a/try.png")} style={{ position: "absolute", left: px(Z.cx - w / 2), top: px(241.5 + DY - h / 2), width: px(w), height: px(h), transform: `scale(${scale})` }} />; })()}
          {hero}
          {close}
        </div>
      </div>
      {/* BANG! words above the ring layer (light never covers text) */}
      {(key === "b1" || key === "b2" || key === "b3") && (
        <div style={{ position: "absolute", left: 0, top: px(jy), width: px(340), height: px(280), transform: `scale(${scale})`, transformOrigin: `${px(Z.cx)}px ${px(RING_CY)}px` }}>
          <Bang3D n={n} t0={t0} cx={Z.cx} cy={RING_CY} sizes={bangSizes} gap={8} bannerW={340} bannerH={280} jit={jx} glow={flash} bangUrl={(s) => staticFile(`v11a/bang_${s}${X}.png`)} ar={2.9298} />
        </div>
      )}
    </AbsoluteFill>
  );
};
