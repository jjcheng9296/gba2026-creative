import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

// 3D BANG! words: metallic planes textured with ChatGPT's forged-gold lettering; each hit stamps the words down
// (tilted 35° → flat) while a hot light sweeps across them, so the gold actually glints instead of being a flat PNG.
// n = how many BANG! are up (1..3); t0 = time of the latest hit; cx/cy/widths in CSS px of the banner; all words shake together.

type Props = { n: number; t0: number; cx: number; cy: number; sizes: number[]; gap: number; bannerW: number; bannerH: number; jit: number; glow: number; bright?: boolean; stamps?: number[]; bangUrl?: (s: number) => string; ar?: number };   // stamps = per-word hit times (V10 rhythm: every word re-stamps in quick succession)

const Word: React.FC<{ url: string; x: number; y: number; w: number; h: number; tilt: number; z: number; bright: boolean }> = ({ url, x, y, w, h, tilt, z, bright }) => {
  const tex = useLoader(THREE.TextureLoader, url);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[x, y, z]} rotation={[tilt, 0, 0]}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial map={tex} transparent metalness={bright ? 0.7 : 0.85} roughness={bright ? 0.3 : 0.28} emissive={new THREE.Color(bright ? "#9a6a14" : "#7a5410")} emissiveMap={tex} emissiveIntensity={bright ? 1.25 : 1.0} />
    </mesh>
  );
};

export const Bang3D: React.FC<Props> = ({ n, t0, cx, cy, sizes, gap, bannerW, bannerH, jit, glow, bright = false, stamps, bangUrl, ar }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - t0;
  const W = bannerW * 2, H = bannerH * 2; // canvas at @2x
  // orthographic-like camera: 1 unit = 1 CSS px
  const tilt = interpolate(t, [0, 0.25], [-0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const sweep = interpolate(t, [0, 0.6], [-1.2, 1.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const AR = ar ?? 2.929; // 3D polished-gold BANG! (ChatGPT v9c) — aspect updated below
  const ws = sizes.map((s) => s * 1.5 * AR * 2), hs = sizes.map((s) => s * 1.5 * 2); // canvas px (@2x)
  const total = ws.reduce((a, b) => a + b, 0) + gap * (n - 1);
  const words = useMemo(() => { let x = cx * 2 - total / 2 + jit * 2; return sizes.map((s, i) => { const o = { x: x + ws[i] / 2, w: ws[i], h: hs[i], s }; x += ws[i] + gap; return o; }); }, [cx, total, jit, sizes.join(","), gap]);
  const yC = H / 2 - cy * 2; // three.js y up, canvas px
  return (
    <ThreeCanvas width={W} height={H} style={{ position: "absolute", left: 0, top: 0, width: W, height: H }} orthographic camera={{ left: -W / 2, right: W / 2, top: H / 2, bottom: -H / 2, near: -1000, far: 1000, position: [0, 0, 100] }} gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}>
      <ambientLight intensity={bright ? 3.0 : 2.1} />
      <directionalLight position={[-240, 400, 600]} intensity={1.8} color="#FFF4D6" />
      <pointLight position={[cx * 2 - W / 2 + sweep * total * 0.6, yC + 60, 120]} intensity={12000 * (0.6 + glow)} distance={520} decay={2} color="#FFF1BF" />
      {words.map((w, i) => {
        const ti = stamps ? frame / fps - stamps[i] : null;
        const tw = ti === null ? (i === n - 1 ? tilt : tilt * 0.4) : ti < 0 ? -0.9 : interpolate(ti, [0, 0.2], [-0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
        const pop = ti === null ? 1 : ti < 0 ? 0 : interpolate(ti, [0, 0.1, 0.25], [1.16, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
        if (pop === 0) return null;
        return <Word key={i} url={bangUrl ? bangUrl(w.s) : staticFile(`v6/bangG_${w.s}@2x.png`)} x={w.x - W / 2} y={yC} w={w.w * pop} h={w.h * pop} tilt={tw} z={i} bright={bright} />;
      })}
    </ThreeCanvas>
  );
};
