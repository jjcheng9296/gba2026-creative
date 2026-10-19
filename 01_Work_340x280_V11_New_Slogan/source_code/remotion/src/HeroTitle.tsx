import React, { useEffect, useState } from "react";
import { Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFonts } from "./CtaTitle";

// V11 (19 Oct 2026, new slogan): same movie-title treatment as CtaTitle (V9C, approved) but with the label and the
// 3D-lettering image as props — "IN" (silver, gold trim) above "DR. SHEKINAIH!" (3D gold). CtaTitle itself stays untouched.
const SILVER = "linear-gradient(180deg,#FFFFFF 0%,#EEF1F5 20%,#C9CFD8 44%,#98A1AE 58%,#D9DEE6 74%,#FFFFFF 92%,#F4F6F9 100%)";

export const HeroTitle: React.FC<{ t0: number; cx: number; top: number; px: (v: number) => number; opacity: number; label: string; labelPx?: number; src: string; ar: number; w: number }> = ({ t0, cx, top, px, opacity, label, labelPx = 9, src, ar, w }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - t0;
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => { loadFonts().then(() => continueRender(handle)); }, [handle]);
  const sc = interpolate(t, [0, 0.25, 0.5], [1.08, 0.995, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const blur = interpolate(t, [0, 0.25], [0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = interpolate(t, [0, 0.167], [0.4, 1],   // vault: first landing frame ≥0.4 so the beat never shows blank
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const track = interpolate(t, [0, 0.5], [0.12, 0.01], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const g = interpolate(t, [0.5, 1.17], [-15, 115], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gOp = t < 0.5 || t > 1.33 ? 0 : interpolate(t, [0.5, 0.6, 1.17, 1.33], [0, 0.45, 0.45, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const url = staticFile(src);
  const h = w / ar;
  return (
    <div style={{ position: "absolute", left: px(cx - 113), top: px(top), width: px(226), height: px(80), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: px(1), opacity: opacity * op, transform: `scale(${sc})`, transformOrigin: "50% 50%", filter: `blur(${px(blur)}px) drop-shadow(0 ${px(1)}px ${px(1)}px rgba(36,20,3,.95)) drop-shadow(0 0 ${px(3)}px rgba(255,226,150,.45))` }}>
      <span style={{ fontFamily: "Cond", fontWeight: 600, fontSize: px(labelPx), letterSpacing: `${0.3 + (track - 0.01) * 1.5}em`, paddingLeft: `${0.3 + (track - 0.01) * 1.5}em`, textTransform: "uppercase", backgroundImage: SILVER, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1, filter: "drop-shadow(0 0 0.6px #E9BC5C) drop-shadow(0 0 0.6px #B98A2E) drop-shadow(0 1px 1px rgba(0,0,0,.9))" }}>{label}</span>
      <span style={{ position: "relative", display: "block", width: px(w), height: px(h) }}>
        <Img src={url} style={{ position: "absolute", left: 0, top: 0, width: px(w), height: px(h) }} />
        {gOp > 0 && <div style={{ position: "absolute", left: 0, top: 0, width: px(w), height: px(h), opacity: gOp, WebkitMaskImage: `url(${url})`, WebkitMaskSize: "100% 100%", maskImage: `url(${url})`, maskSize: "100% 100%", background: `linear-gradient(108deg, rgba(255,212,119,0) ${g - 6}%, #FFF8DC ${g}%, rgba(255,212,119,0) ${g + 6}%)` }} />}
      </span>
    </div>
  );
};
