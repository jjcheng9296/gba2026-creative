import React, { useEffect, useState } from "react";
import { Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

// Movie-title treatment for CONTACT / DR. SHEKINAIH (ChatGPT round 8, recipe 1 + a restrained recipe-2 glint):
// live text (so the tracking can animate) — letters land from wide tracking + slight scale + blur into a crisp hold,
// then ONE narrow gold glint crosses the gold word; nothing ever covers the text; after 1.2 s it is perfectly still.
const SILVER = "linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%,#F4F6F9 100%)";

let fontsReady: Promise<void> | null = null;
export const loadFonts = () => {
  if (!fontsReady) {
    const f1 = new FontFace("Bodoni", `url(${staticFile("fonts/bodoni-moda-latin-900-normal.woff2")})`, { weight: "900" });
    const f2 = new FontFace("Cond", `url(${staticFile("fonts/barlow-condensed-latin-600-normal.woff2")})`, { weight: "600" });
    fontsReady = Promise.all([f1.load(), f2.load()]).then((fs) => { fs.forEach((f) => document.fonts.add(f)); });
  }
  return fontsReady;
};

export const CtaTitle: React.FC<{ t0: number; cx: number; cy: number; px: (v: number) => number; opacity: number }> = ({ t0, cx, cy, px, opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - t0;
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => { loadFonts().then(() => continueRender(handle)); }, [handle]);
  // recipe 1: approach 0–0.25 s, settle 0.25–0.5 s, hold
  const sc = interpolate(t, [0, 0.25, 0.5], [1.08, 0.995, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const blur = interpolate(t, [0, 0.25], [0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = interpolate(t, [0, 0.167], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const track = interpolate(t, [0, 0.5], [0.12, 0.01], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }); // em — classic title tracking-in
  // recipe 2: one glint 0.5–1.17 s, 18° band, 10 % wide, peak 0.3
  const g = interpolate(t, [0.5, 1.17], [-15, 115], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gOp = t < 0.5 || t > 1.33 ? 0 : interpolate(t, [0.5, 0.6, 1.17, 1.33], [0, 0.45, 0.45, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: px(cx - 113), top: px(206), width: px(220), height: px(80), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: px(1), opacity: opacity * op, transform: `scale(${sc})`, transformOrigin: "50% 50%", filter: `blur(${px(blur)}px) drop-shadow(0 ${px(1)}px ${px(1)}px rgba(36,20,3,.95)) drop-shadow(0 0 ${px(3)}px rgba(255,226,150,.45))` }}>
      <span style={{ fontFamily: "Cond", fontWeight: 600, fontSize: px(9), letterSpacing: `${0.3 + (track - 0.01) * 1.5}em`, paddingLeft: `${0.3 + (track - 0.01) * 1.5}em`, textTransform: "uppercase", backgroundImage: SILVER, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1, filter: "drop-shadow(0 0 0.6px #E9BC5C) drop-shadow(0 0 0.6px #B98A2E) drop-shadow(0 1px 1px rgba(0,0,0,.9))" }}>Contact</span>
      {(() => { const src = staticFile("v9/name3d.png"); const w = 208, h = w / 2.976;   // CONTACT above, big 3D name below; the Write-to line only appears after this beat so the name owns the row   // ChatGPT 3D polished-gold lettering (reference: cinematic gold title)
        return (<span style={{ position: "relative", display: "block", width: px(w), height: px(h), marginTop: px(0) }}>
          <Img src={src} style={{ position: "absolute", left: 0, top: 0, width: px(w), height: px(h) }} />
          {gOp > 0 && <div style={{ position: "absolute", left: 0, top: 0, width: px(w), height: px(h), opacity: gOp, WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%", maskImage: `url(${src})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${g - 6}%, #FFF8DC ${g}%, rgba(255,212,119,0) ${g + 6}%)` }} />}
        </span>); })()}
    </div>
  );
};
