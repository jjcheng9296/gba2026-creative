import React, { useEffect, useState } from "react";
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFonts } from "./CtaTitle";
import { Bang3D } from "./Bang3D";
import { HeroTitle } from "./HeroTitle";
import { SparkleOrbit } from "./SparkleOrbit";
import aspA from "../public/v11a/aspect.json";
import aspB from "../public/v11b/aspect.json";

// V11 — NEW SLOGAN (James, 19 Oct 2026): "WHEN ALL ELSE FAILS, TRY THE GOD OF THE UNIVERSE IN DR. SHEKINAIH! BANG! BANG! BANG!"
// Built on V9C (340x280, approved — untouched): same base frame, same layout, same motion language.
// set "a" = same 3D polished-gold / silver lettering as V9C · set "b" = new font recommended by ChatGPT.
// Beats: WHEN ALL ELSE FAILS, (silver) → TRY THE GOD / OF THE UNIVERSE (slam) → IN + DR. SHEKINAIH! (hero, 5 s, glint + sparkle orbit)
// → Write-to email appears → BANG! ×1/×2/×3 → ministry glint finale → hold.
export const T11 = { when: 0, tryg: 1.75, hero: 4.5, b1: 8.5, b2: 9.0, b3: 9.5, close: 10.5, end: 14.0 };   // rhythm per James + ChatGPT R12 (19 Oct): name gets the hero hold AND the closing card
const HIT = 0.33;
const px = (v: number) => v * 2;
const G = { w: 340, h: 280, row: { cx: 116, cy: 232, maxW: 212, maxH: 54 }, bang: [12.5, 14.5, 17], ministry: { cx: 170, top: 8, w: 214, h: 19 } };

type Set = "a" | "b";
const ASSETS: Record<Set, { dir: string; when: string; whenAr: number; asp: Record<string, number>; bang?: (s: number) => string; bangAr?: number }> = {
  a: { dir: "v11a", when: "v9/when_silver.png", whenAr: 2.898550724637681, asp: aspA as Record<string, number>, bang: (s) => staticFile(`v11a/bang_${s}@2x.png`), bangAr: 2.9298 },   // same V9C 3D-gold BANG!, resized to 12.5/14.5/17
  b: { dir: "v11b", when: "v11b/when.png", whenAr: (aspB as Record<string, number>).when ?? 2.9, asp: aspB as Record<string, number>, bang: (s) => staticFile(`v11b/bang_${s}@2x.png`), bangAr: (aspB as Record<string, number>).bang },
};

export const Banner11: React.FC<{ set?: Set }> = ({ set = "a" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const A = ASSETS[set];
  const [fh] = useState(() => delayRender("fonts11"));
  useEffect(() => { loadFonts().then(() => continueRender(fh)); }, [fh]);
  const TT = T11;
  const R = G.row;

  const beats: [string, number][] = [["when", TT.when], ["tryg", TT.tryg], ["hero", TT.hero], ["b1", TT.b1], ["b2", TT.b2], ["b3", TT.b3], ["close", TT.close]];
  let cur = 0; for (let i = 0; i < beats.length; i++) if (t >= beats[i][1] - 1e-6) cur = i;
  const [key, t0] = beats[cur];
  const dt = t - t0;
  const inHit = dt < HIT;
  const slamFrom = key === "b3" ? 1.03 : key === "when" ? 1.2 : key === "tryg" ? 1.07 : 1.15;   // b3: the 3-word group is ~210 px wide — a bigger overshoot would run under the names block   // TRY card is wide: 1.07 keeps the peak inside x 10–222 (never under the names block)
  const scale = interpolate(dt, [0, 0.12, HIT], [slamFrom, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const amp = { when: 4, tryg: 4, hero: 3, b1: 4, b2: 4, b3: 3, close: 0 }[key] ?? 3;
  const k = Math.round(dt * fps);
  const jit = inHit ? [1, -0.75, 0.5, -0.25][Math.min(k, 3)] * amp * 0.8 : 0;
  const flash = interpolate(dt, [0, 0.08, 0.3], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringR = interpolate(dt, [0, 0.45], [6, 34], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ringO = dt < 0 ? 0 : interpolate(dt, [0, 0.45], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = t > TT.end - 0.25 ? interpolate(t, [TT.end - 0.25, TT.end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;

  // fit an image of aspect ar into maxW × maxH, centred on (R.cx, cy)
  const slam = (src: string, ar: number, maxH: number, cy: number, maxW = R.maxW) => {
    let h = maxH, w = h * ar; if (w > maxW) { w = maxW; h = w / ar; }
    return <Img src={staticFile(src)} style={{ position: "absolute", left: px(R.cx - w / 2 + jit), top: px(cy - h / 2), width: px(w), height: px(h), transform: `scale(${scale})`, opacity: fadeOut }} />;
  };
  const ring = (
    <>
      <div style={{ position: "absolute", left: px(R.cx - 26), top: px(R.cy - 26), width: px(52), height: px(52), borderRadius: "50%", background: "radial-gradient(closest-side,#FFF1BF,rgba(241,210,123,.55) 40%,rgba(163,110,38,0) 100%)", opacity: flash }} />
      <Img src={staticFile("v9/ring.png")} style={{ position: "absolute", left: px(R.cx - ringR * 2.4), top: px(R.cy - ringR * 1.2), width: px(ringR * 4.8), height: px(ringR * 2.4), opacity: ringO }} />
    </>
  );
  const M = G.ministry; const msrc = staticFile("v9/ministry3d1.png");
  const gs = TT.end - 2.833, ge = TT.end - 2.167;
  const mg = interpolate(t, [gs, ge], [-15, 115], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mgOp = t < gs || t > ge + 0.17 ? 0 : interpolate(t, [gs, gs + 0.1, ge, ge + 0.17], [0, 0.3, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameAr = A.asp.name ?? 3.3;
  const tryAr = A.asp.try ?? 2.88;
  return (
    <AbsoluteFill style={{ background: "#040817" }}>
      <Img src={staticFile("v9/mr_base_b@2x.png")} style={{ position: "absolute", left: 0, top: 0, width: px(G.w), height: px(G.h) }} />
      {/* HEAVEN THRONE ROOM MINISTRY (gold, top of photo) — readable from frame 1; finale glint + sparkle orbit */}
      <div style={{ position: "absolute", left: px(60), top: 0, width: px(220), height: px(40), overflow: "hidden" }}><div style={{ position: "absolute", left: px(-60), top: 0, width: px(G.w), height: px(G.h) }}><SparkleOrbit t0={TT.end - 3} dur={2.0} cx={M.cx} cy={M.top + M.h / 2} rx={108} ry={16} px={px} turns={1.5} seed={7} /></div></div>
      <div style={{ position: "absolute", left: px(M.cx - M.w / 2), top: px(M.top), width: px(M.w), height: px(M.h) }}>
        <Img src={msrc} style={{ position: "absolute", left: 0, top: 0, width: px(M.w), height: px(M.h), filter: "drop-shadow(0 1px 1px rgba(36,20,3,.95)) drop-shadow(0 0 2px rgba(255,226,150,.45))" }} />
        {mgOp > 0 && <div style={{ position: "absolute", left: 0, top: 0, width: px(M.w), height: px(M.h), opacity: mgOp, WebkitMaskImage: `url(${msrc})`, WebkitMaskSize: "100% 100%", maskImage: `url(${msrc})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${mg - 6}%, #FFF3C4 ${mg}%, rgba(255,212,119,0) ${mg + 6}%)` }} />}
      </div>
      {/* Write-to line only after the hero beat */}
      {t >= TT.b1 && <Img src={staticFile("v9/email_b@2x.png")} style={{ position: "absolute", left: px(10), top: px(261), width: px(212), height: px(16) }} />}
      {/* slogan row: clipped so halos never leave the row (y 203–280) */}
      <div style={{ position: "absolute", left: 0, top: px(203), width: px(G.w), height: px(77), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: px(-203), width: px(G.w), height: px(G.h) }}>
          {key !== "hero" && key !== "close" && ring}
          {key === "when" && slam(A.when, A.whenAr, 65, 242)}
          {key === "tryg" && slam(`${A.dir}/try.png`, tryAr, 70, 241.5, 198)}
          {key === "hero" && <>{/* orbit BEHIND the 3D name: the opaque letters hide any sparkle that crosses them (light never covers text) */}
            <div style={{ position: "absolute", left: px(8), top: px(205), width: px(220), height: px(70), overflow: "hidden" }}><div style={{ position: "absolute", left: px(-8), top: px(-205), width: px(G.w), height: px(G.h) }}><SparkleOrbit t0={t0 + 0.2} dur={1.6} cx={R.cx} cy={R.cy + 6} rx={106} ry={28} px={px} seed={3} /></div></div>
            <HeroTitle t0={t0} cx={R.cx} top={208} px={px} opacity={fadeOut} label="In" labelPx={16} src={`${A.dir}/name.png`} ar={nameAr} w={204} /></>}
          {key === "close" && (() => {   // closing card = static JPG: phrase on one line (small) over IN + name (big); still, 4-frame fade-in
            const op = interpolate(dt, [0, 0.33], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * fadeOut;
            const lAr = A.asp.tryline ?? 11;
            // James 14:43: GOD OF THE UNIVERSE and DR. SHEKINAIH the SAME size on the closing card → both rows share one letter height
            const rh = 22.8, pw = rh * lAr, nw = rh * nameAr, inW = 15, inGap = 3, row2 = inW + inGap + nw, top2 = 205 + rh + 4;
            return (<div style={{ opacity: op }}>
              <Img src={staticFile(`${A.dir}/tryline.png`)} style={{ position: "absolute", left: px(R.cx - pw / 2), top: px(205), width: px(pw), height: px(rh) }} />
              <span style={{ position: "absolute", left: px(R.cx - row2 / 2), top: px(top2 + rh / 2 - 7.8), width: px(inW), fontFamily: "Cond", fontWeight: 600, fontSize: px(16), lineHeight: 1, textAlign: "center", letterSpacing: "0.04em", backgroundImage: "linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: "drop-shadow(0 0 0.6px #E9BC5C) drop-shadow(0 0 0.6px #B98A2E) drop-shadow(0 1px 1px rgba(0,0,0,.9))" }}>IN</span>
              <Img src={staticFile(`${A.dir}/name.png`)} style={{ position: "absolute", left: px(R.cx - row2 / 2 + inW + inGap), top: px(top2), width: px(nw), height: px(rh), filter: "drop-shadow(0 1px 1px rgba(36,20,3,.95))" }} />
            </div>); })()}
        </div>
      </div>
      {/* BANG! words drawn AFTER the slogan row so the amber flash/ring sits behind them (light never covers text) */}
      {(key === "b1" || key === "b2" || key === "b3") && (() => { const n = key === "b1" ? 1 : key === "b2" ? 2 : 3;
        return <div style={{ position: "absolute", left: 0, top: 0, width: px(G.w), height: px(G.h), transform: `scale(${scale})`, transformOrigin: `${px(R.cx)}px ${px(R.cy)}px`, opacity: fadeOut }}><Bang3D n={n} t0={t0} cx={R.cx} cy={R.cy} sizes={G.bang.slice(3 - n)} gap={8} bannerW={G.w} bannerH={G.h} jit={jit} glow={flash} bangUrl={A.bang} ar={A.bangAr} /></div>; })()}
    </AbsoluteFill>
  );
};
