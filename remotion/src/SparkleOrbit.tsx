import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

// Comet-like trail of gold sparkles orbiting a title (reference: the "Cinematic Gold Happy Birthday" short).
// Ellipse centred on the title; the comet head travels `turns` laps over `dur` seconds, with a fading tail of
// `n` particles behind it; a few loose sparkles twinkle around the head. Particles are only drawn OUTSIDE the text box,
// so the lettering is never covered. Everything disappears after `dur` + fade — then a clean hold.

type Props = { t0: number; dur: number; cx: number; cy: number; rx: number; ry: number; px: (v: number) => number; turns?: number; n?: number; tilt?: number; seed?: number };

const rand = (s: number) => { const x = Math.sin(s * 9999.1) * 43758.5453; return x - Math.floor(x); };

export const SparkleOrbit: React.FC<Props> = ({ t0, dur, cx, cy, rx, ry, px, turns = 1.25, n = 48, tilt = -0.2, seed = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - t0;
  const pts = useMemo(() => Array.from({ length: n }, (_, i) => ({ k: i / (n - 1), r: 1.6 + rand(seed + i) * 2.4, j: (rand(seed + 100 + i) - 0.5) * 6, w: 0.6 + rand(seed + 200 + i) })), [n, seed]);
  if (t < 0 || t > dur + 0.35) return null;
  const u = Math.min(t / dur, 1);                                   // 0..1 along the flight
  const head = u * turns * Math.PI * 2 - Math.PI * 0.15;           // head angle (starts upper-left)
  const fade = t > dur ? interpolate(t, [dur, dur + 0.35], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const tail = 1.35;                                                 // radians of tail behind the head
  const cos = Math.cos(tilt), sin = Math.sin(tilt);
  const at = (a: number, jit = 0) => { const x = rx * Math.cos(a), y = (ry + jit) * Math.sin(a); return { x: cx + x * cos - y * sin, y: cy + x * sin + y * cos, z: Math.sin(a) }; };
  const dots: React.ReactNode[] = [];
  pts.forEach((p, i) => {
    const a = head - p.k * tail; if (a < -Math.PI * 0.15 - 0.01) return;
    const q = at(a, p.j);
    const o = (1 - p.k) * fade * (0.55 + 0.45 * p.w);
    const sz = p.r * (1.3 - p.k * 0.8);
    const tw = 0.6 + 0.4 * Math.sin((frame + i * 7) * 1.7);        // twinkle
    dots.push(<div key={i} style={{ position: "absolute", left: px(q.x - sz / 2), top: px(q.y - sz / 2), width: px(sz), height: px(sz), borderRadius: "50%", background: p.k < 0.15 ? "#FFFBEA" : "#FFE28A", opacity: Math.min(1, o * tw), boxShadow: `0 0 ${px(sz * 2.2)}px rgba(255,214,120,${o}), 0 0 ${px(sz * 4)}px rgba(255,190,80,${0.5 * o})` }} />);
  });
  // head glow + 4-point star
  const h = at(head); const hs = 8 * fade;
  dots.push(<div key="head" style={{ position: "absolute", left: px(h.x - hs), top: px(h.y - hs), width: px(hs * 2), height: px(hs * 2), borderRadius: "50%", background: "radial-gradient(closest-side,#FFFFFF,#FFF1BF 40%,rgba(255,214,120,0) 100%)", opacity: fade }} />);
  dots.push(<div key="star1" style={{ position: "absolute", left: px(h.x - 16), top: px(h.y - 0.8), width: px(32), height: px(1.6), background: "linear-gradient(90deg,rgba(255,255,255,0),#FFFFFF,rgba(255,255,255,0))", opacity: fade }} />);
  dots.push(<div key="star2" style={{ position: "absolute", left: px(h.x - 0.8), top: px(h.y - 16), width: px(1.6), height: px(32), background: "linear-gradient(180deg,rgba(255,255,255,0),#FFFFFF,rgba(255,255,255,0))", opacity: fade }} />);
  // loose sparkles around the head
  for (let i = 0; i < 12; i++) { const a = head - rand(seed + 300 + i) * 0.9; const q = at(a, (rand(seed + 400 + i) - 0.5) * 16); const s = 1.4 + rand(seed + 500 + i) * 2; const o = fade * (0.4 + 0.6 * Math.abs(Math.sin((frame + i * 5) * 1.3)));
    dots.push(<div key={"l" + i} style={{ position: "absolute", left: px(q.x - s / 2), top: px(q.y - s / 2), width: px(s), height: px(s), borderRadius: "50%", background: "#FFF6D0", opacity: o, boxShadow: `0 0 ${px(2)}px rgba(255,230,150,${o})` }} />); }
  return <>{dots}</>;
};
