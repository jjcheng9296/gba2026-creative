import React, { useEffect, useState } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing, continueRender, delayRender } from "remotion";
import aspect from "../public/v10/aspect.json";
import { Bang3D } from "./Bang3D";
import { SparkleOrbit } from "./SparkleOrbit";
import { loadFonts } from "./CtaTitle";

// V10 — 728x90 leaderboard in the approved V9C system (James 2026-10-18 09:00–09:34):
// masthead = CROWNED EAGLES GLOBAL (3D rainbow + gold border) & CE GLOBAL NETWORK INTERNATIONAL PTE LTD (3D silver + gold border), both logos left,
// big middle stage x 150–500 for the sequence, photo/rainbow panel on the right untouched.
// 12 s loop (ChatGPT round 10): one moving region per beat; the email is a hard state change at the FULLY beat.
// Every stage word is ChatGPT WIDE 3D lettering (public/v10/*): nothing is stretched.
export const T10 = { when: 0, cta: 1.5, fully: 5.5, power: 7.0, b1: 8.5, b2: 113 / 12, b3: 124 / 12, min: 11.6, end: 15.0 };   // James 09:47: 15 s loop, CONTACT DR. SHEKINAIH holds 2 s longer
// BANG rhythm (James 09:45 "the pace is important"): 1 hit · then 2 quick hits · then 3 quick hits, every word re-stamps, the group shakes harder each time
const BANG_STEP = { b1: 0, b2: 2 / 12, b3: 2 / 12 } as Record<string, number>;   // 2-frame spacing at 12 fps (ChatGPT round 11)
const ST = { x: 150, w: 350, top: 29, bot: 87, emailTop: 73 };
const CX = ST.x + ST.w / 2, FW = ST.w - 4;
const HIT = 0.33;
const px = (v: number) => v * 2;
const A = aspect as unknown as Record<string, number>;
const SILVER = "linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%,#F4F6F9 100%)";

export const Banner10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => { loadFonts().then(() => continueRender(handle)); }, [handle]);

  const beats: [string, number][] = [["when", T10.when], ["cta", T10.cta], ["fully", T10.fully], ["power", T10.power], ["b1", T10.b1], ["b2", T10.b2], ["b3", T10.b3], ["min", T10.min]];
  let cur = 0; for (let i = 0; i < beats.length; i++) if (t >= beats[i][1] - 1e-6) cur = i;
  const [key, t0] = beats[cur];
  const dt = t - t0;
  const emailOn = t >= T10.fully - 1e-6;
  const zoneBot = emailOn ? ST.emailTop : ST.bot;
  const zoneH = zoneBot - ST.top, cy = (ST.top + zoneBot) / 2;

  // slam (approved on the 340): 1.2 → 0.97 → 1 in 0.33 s, flash, shock ring, ±jitter that settles in 4 frames
  const inHit = dt < HIT;
  const slamFrom = key === "b3" ? 1.12 : key === "b2" ? 1.15 : key === "when" || key === "power" ? 1.2 : 1.15;
  const scale = interpolate(dt, [0, 0.12, HIT], [slamFrom, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const amp = ({ when: 4, fully: 3, power: 4, b1: 5, b2: 7, b3: 9 } as Record<string, number>)[key] ?? 0;
  const bangN = key === "b1" ? 1 : key === "b2" ? 2 : key === "b3" ? 3 : 0;
  const stamps = bangN ? [0, 1, 2].slice(0, bangN).map((i) => t0 + i * BANG_STEP[key]) : [];
  const lastStamp = bangN ? stamps[bangN - 1] : t0;
  const dts = t - lastStamp;                                   // time since the latest hit (bang beats) — jitter/flash key off this
  const k = Math.round((bangN ? dts : dt) * fps);
  const decay = bangN ? [1, -0.85, 0.65, -0.5, 0.35, -0.2, 0.1, -0.05] : [1, -0.75, 0.5, -0.25];
  const jit = (bangN ? dts >= 0 && dts < decay.length / fps : inHit) ? decay[Math.min(k, decay.length - 1)] * amp * 0.7 : 0;
  const flash = interpolate(bangN ? dts : dt, [0, 0.08, 0.3], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringR = interpolate(dt, [0, 0.5], [12, 82], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ringO = dt < 0 ? 0 : interpolate(dt, [0, 0.45], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = t > T10.end - 0.25 ? interpolate(t, [T10.end - 0.25, T10.end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;

  // monumental landing (approved recipe): scale 1.08→0.995→1 / 0.5 s, blur 0.6→0, opacity in 0.167 s
  const land = (tt: number) => ({
    sc: interpolate(tt, [0, 0.25, 0.5], [1.08, 0.995, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
    blur: interpolate(tt, [0, 0.25], [0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    op: interpolate(tt, [0, 0.167], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  });
  // one narrow gold glint, alpha-masked to the letters
  const glint = (src: string, w: number, h: number, gs: number, ge: number, peak = 0.45) => {
    const g = interpolate(t, [gs, ge], [-15, 115], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const gOp = t < gs || t > ge + 0.17 ? 0 : interpolate(t, [gs, gs + 0.1, ge, ge + 0.17], [0, peak, peak, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return gOp > 0 ? <div style={{ position: "absolute", left: 0, top: 0, width: px(w), height: px(h), opacity: gOp, WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%", maskImage: `url(${src})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${g - 6}%, #FFF8DC ${g}%, rgba(255,212,119,0) ${g + 6}%)` }} /> : null;
  };
  const fitWH = (ar: number, maxH: number, maxW = FW) => { const h = Math.min(maxH, maxW / ar); return { w: h * ar, h }; };
  const shadow = "drop-shadow(0 1px 1px rgba(0,0,0,.9)) drop-shadow(0 0 3px rgba(0,0,0,.6))";
  const slamImg = (name: string, maxH: number, cyy = cy) => {
    const { w, h } = fitWH(A[name], maxH);
    return <Img src={staticFile(`v10/${name}.png`)} style={{ position: "absolute", left: px(CX - w / 2 + jit), top: px(cyy - h / 2), width: px(w), height: px(h), transform: `scale(${scale})`, opacity: fadeOut, filter: shadow }} />;
  };
  const ring = (
    <>
      <div style={{ position: "absolute", left: px(CX - 120), top: px(cy - 34), width: px(240), height: px(68), borderRadius: "50%", background: "radial-gradient(closest-side,#FFF1BF,rgba(241,210,123,.55) 40%,rgba(163,110,38,0) 100%)", opacity: flash }} />
      <Img src={staticFile("v9/ring.png")} style={{ position: "absolute", left: px(CX - ringR * 2.4), top: px(cy - ringR * 1.2), width: px(ringR * 4.8), height: px(ringR * 2.4), opacity: ringO }} />
    </>
  );

  // POWER OF HEAVEN: POWER OF (silver) slams at the beat, HEAVEN (gold, extended) stamps 0.33 s later with a glint
  const power = () => {
    const hv = A["heaven_x"] ? "heaven_x" : "heaven";
    const po = fitWH(A["power_of"], zoneH * 0.58, 120), hvS = fitWH(A[hv], zoneH, FW - po.w - 10);
    const gap = 10, total = po.w + gap + hvS.w, x0 = CX - total / 2;
    const t1 = dt, t2 = dt - 0.33;
    const sc1 = interpolate(t1, [0, 0.12, HIT], [1.2, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const sc2 = t2 < 0 ? 0 : interpolate(t2, [0, 0.12, 0.4], [1.35, 0.96, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const k2 = Math.round(t2 * fps); const j2 = t2 >= 0 && t2 < HIT ? [1, -0.75, 0.5, -0.25][Math.min(k2, 3)] * 5 * 0.7 : 0;
    const src = staticFile(`v10/${hv}.png`);
    return (<>
      <Img src={staticFile("v10/power_of.png")} style={{ position: "absolute", left: px(x0 + jit), top: px(cy - po.h / 2), width: px(po.w), height: px(po.h), transform: `scale(${sc1})`, opacity: fadeOut, filter: shadow }} />
      {t2 >= 0 && <div style={{ position: "absolute", left: px(x0 + po.w + gap + j2), top: px(cy - hvS.h / 2), width: px(hvS.w), height: px(hvS.h), transform: `scale(${sc2})`, opacity: fadeOut, filter: shadow }}>
        <Img src={src} style={{ position: "absolute", left: 0, top: 0, width: px(hvS.w), height: px(hvS.h) }} />
        {glint(src, hvS.w, hvS.h, t0 + 0.8, t0 + 1.3, 0.45)}
      </div>}
    </>);
  };

  const ctaBeat = () => {
    const L = land(dt);
    const nm = fitWH(A["name_wide"], zoneH - 18);
    const track = interpolate(dt, [0, 0.5], [0.12, 0.01], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const src = staticFile("v10/name_wide.png");
    const top = ST.top + 14 + (zoneH - 14 - nm.h) / 2;
    return (<div style={{ position: "absolute", left: 0, top: 0, width: px(728), height: px(90), opacity: fadeOut * L.op, transform: `scale(${L.sc})`, transformOrigin: `${px(CX)}px ${px(cy)}px`, filter: `blur(${px(L.blur)}px)` }}>
      <div style={{ position: "absolute", left: px(ST.x), top: px(ST.top + 1), width: px(ST.w), textAlign: "center", lineHeight: 1 }}>
        <span style={{ fontFamily: "Cond", fontWeight: 600, fontSize: px(13), letterSpacing: `${0.3 + (track - 0.01) * 1.5}em`, paddingLeft: `${0.3 + (track - 0.01) * 1.5}em`, textTransform: "uppercase", backgroundImage: SILVER, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: "drop-shadow(0 0 0.6px #E9BC5C) drop-shadow(0 0 0.6px #B98A2E) drop-shadow(0 1px 1px rgba(0,0,0,.9))" }}>Contact</span>
      </div>
      <div style={{ position: "absolute", left: px(CX - nm.w / 2), top: px(top), width: px(nm.w), height: px(nm.h), filter: shadow }}>
        <Img src={src} style={{ position: "absolute", left: 0, top: 0, width: px(nm.w), height: px(nm.h) }} />
        {glint(src, nm.w, nm.h, t0 + 0.5, t0 + 1.17, 0.45)}
      </div>
    </div>);
  };

  const ministry = () => {
    const L = land(dt);
    const m = fitWH(A["ministry_wide"], zoneH);
    const src = staticFile("v10/ministry_wide.png");
    return (<div style={{ position: "absolute", left: px(CX - m.w / 2), top: px(cy - m.h / 2), width: px(m.w), height: px(m.h), opacity: fadeOut * L.op, transform: `scale(${L.sc})`, filter: `blur(${px(L.blur)}px) ${shadow}` }}>
      <Img src={src} style={{ position: "absolute", left: 0, top: 0, width: px(m.w), height: px(m.h) }} />
      {glint(src, m.w, m.h, t0 + 1.5, t0 + 2.0, 0.4)}
    </div>);
  };


  // ---- "volcanic eruption" treatment for the BANG beat (James 09:48 + ChatGPT round 11): everything comes from BENEATH the words,
  // stays inside the stage, never touches the letters: bronze underlight strip → amber band fissures → seeded ember burst (gravity). Crescendo = more embers, not more displacement.
  const rnd = (sd: number) => { const x = Math.sin(sd * 9999.1) * 43758.5453; return x - Math.floor(x); };
  const EMB = ["#CF9635", "#EFC566", "#FFF3C4"];
  const embers = (stampT: number, count: number, seed: number, xMin: number, xMax: number) => {
    const f0 = Math.round(stampT * fps), fr = frame - f0; if (fr < 0 || fr > 11) return null;
    const out: React.ReactNode[] = [];
    for (let i = 0; i < count; i++) {
      const life = 5 + Math.floor(rnd(seed + i) * 5), delay = Math.floor(rnd(seed + 50 + i) * 2); const a = fr - delay; if (a < 0 || a > life) continue;
      const x0 = xMin + rnd(seed + 100 + i) * (xMax - xMin), vx = (rnd(seed + 200 + i) - 0.5) * 3.6, vy = -(3.5 + rnd(seed + 300 + i) * 3.5), g = 0.55;
      const x = Math.round(x0 + vx * a), y = Math.round(70 + vy * a + 0.5 * g * a * a), sz = 2 + Math.round(rnd(seed + 400 + i) * 2) * 0.75, streak = a < 3 ? 2.2 : 1;
      const op = a < life - 2 ? 1 : (life - a) / 2;
      out.push(<div key={i} style={{ position: "absolute", left: px(x), top: px(y), width: px(sz), height: px(sz * streak), borderRadius: px(sz / 2), background: EMB[i % 3], opacity: op * 0.95, boxShadow: `0 0 ${px(2)}px rgba(239,197,102,.6)` }} />);
    }
    return <>{out}</>;
  };
  const underlight = (stampT: number, peak: number) => { const o = interpolate(t - stampT, [0, 0.1, 0.33], [0, peak, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); if (t < stampT || o <= 0) return null;
    return <div style={{ position: "absolute", left: px(CX - 170), top: px(68), width: px(340), height: px(7), background: "linear-gradient(90deg,rgba(207,150,53,0),#EFC566 25%,#FFF3C4 50%,#EFC566 75%,rgba(207,150,53,0))", opacity: o, filter: `blur(${px(1)}px)` }} />; };
  const FISS = ["M 170 73 l 14 -4 l 10 2 l 12 -5", "M 310 73 l 9 -5 l 13 1 l 11 -4", "M 452 73 l -12 -4 l -9 2 l -14 -5"];
  const fissures = (stampT: number) => { const o = t < stampT ? 0 : interpolate(t - stampT, [0, 0.08, 0.42], [0, 0.75, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); if (o <= 0) return null;
    return <svg style={{ position: "absolute", left: 0, top: 0, width: px(728), height: px(90) }} viewBox="0 0 728 90">{FISS.map((d, i) => <path key={i} d={d} fill="none" stroke="#EFC566" strokeWidth={1.1} strokeLinejoin="round" opacity={o} />)}</svg>; };
  const eruption = () => { if (!bangN) return null; const bw = 25 * 1.5 * 2.929, gap = 8, total = bangN * bw + (bangN - 1) * gap, x0 = CX - total / 2;
    const n = bangN === 1 ? 16 : bangN === 2 ? 28 : 56;
    return (<>
      {stamps.map((st, i) => underlight(st, 0.4 + 0.15 * bangN))}
      {bangN === 3 && (() => { const o = t < stamps[2] ? 0 : interpolate(t - stamps[2], [0, 0.1, 0.6], [0, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); return o > 0 ? <div style={{ position: "absolute", left: px(CX - 190), top: px(52), width: px(380), height: px(44), borderRadius: "50%", background: "radial-gradient(closest-side,rgba(239,197,102,.9),rgba(207,150,53,.5) 50%,rgba(163,110,38,0) 100%)", opacity: o }} /> : null; })()}
      {bangN === 3 && fissures(stamps[2])}
      {stamps.map((st, i) => embers(st, Math.round(n / bangN) + (i === bangN - 1 ? 6 : 0), 11 + bangN * 7 + i * 3, x0 + i * (bw + gap), x0 + i * (bw + gap) + bw))}
    </>); };
  // per-hit flash under each stamping BANG! (2D, inside the stage clip) + group scale punch on the latest hit
  const bangFlashes = () => { const bw = 25 * 1.5 * 2.929, gap = 8, total = bangN * bw + (bangN - 1) * gap, x0 = CX - total / 2;
    return stamps.map((st, i) => { const f = interpolate(t - st, [0, 0.08, 0.3], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); if (f <= 0 || t < st) return null;
      const wx = x0 + i * (bw + gap) + bw / 2; return <div key={i} style={{ position: "absolute", left: px(wx - 46), top: px(cy - 30), width: px(92), height: px(60), borderRadius: "50%", background: "radial-gradient(closest-side,rgba(255,243,196,.9),rgba(239,197,102,.55) 45%,rgba(163,110,38,0) 100%)", opacity: f * 0.6 }} />; }); };
  const bangScale = bangN ? interpolate(dts, [0, 0.1, 0.35], [1.06 + bangN * 0.03, 0.985, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) : 1;
  return (
    <AbsoluteFill style={{ background: "#040817" }}>
      <Img src={staticFile("v10/lb_base@2x.png")} style={{ position: "absolute", left: 0, top: 0, width: px(728), height: px(90) }} />
      {emailOn && <div style={{ position: "absolute", left: px(ST.x), top: px(75), width: px(ST.w), height: px(12), display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontFamily: "Cond", fontWeight: 600, fontSize: px(11.5), letterSpacing: ".02em", lineHeight: 1, filter: "drop-shadow(0 1px 1px rgba(0,0,0,.95))", opacity: fadeOut }}>
        <span style={{ color: "#FFFFFF" }}>Write to:&nbsp;</span><span style={{ color: "#FFF3C4" }}>ceg@crownedeaglesglobal.org</span></div>}
      {/* stage: clipped so flashes, rings and comet tails never leave it (photo + masthead stay untouched) */}
      <div style={{ position: "absolute", left: px(ST.x - 4), top: px(ST.top - 1), width: px(ST.w + 8), height: px(ST.bot - ST.top + 2), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: px(-(ST.x - 4)), top: px(-(ST.top - 1)), width: px(728), height: px(90) }}>
          {(key === "when" || key === "fully") && ring}
          {bangN > 0 && <>{bangFlashes()}{eruption()}<div style={{ position: "absolute", left: 0, top: 0, width: px(728), height: px(90), transform: `scale(${bangScale})`, transformOrigin: `${px(CX)}px ${px(cy)}px`, opacity: fadeOut }}>
        <Bang3D n={bangN} t0={lastStamp} stamps={stamps} cx={CX} cy={cy} sizes={[25, 25, 25].slice(3 - bangN)} gap={8} bannerW={728} bannerH={90} jit={jit} glow={flash} bright /></div></>}

          {key === "when" && slamImg("when_wide", zoneH - 5)}
          {key === "cta" && <>{ctaBeat()}<SparkleOrbit t0={t0 + 0.2} dur={1.6} cx={CX} cy={cy + 6} rx={168} ry={22} px={px} seed={3} /></>}
          {key === "fully" && slamImg("fully_wide", zoneH)}
          {key === "power" && power()}
          {key === "min" && <>{ministry()}<SparkleOrbit t0={t0 + 0.2} dur={1.6} cx={CX} cy={cy} rx={172} ry={20} px={px} turns={1.25} seed={7} /></>}
        </div>
      </div>
    </AbsoluteFill>
  );
};
