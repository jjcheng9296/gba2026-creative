import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

// V6 "Three Strikes Break Through" — the plaque is revealed behind an obsidian-and-gold gate.
// Layers (all @2x PNG, rendered by design/render10.mjs VARIANT=v6 and design/v6layers.mjs):
//   base_f0..f3  full banner minus gate/plaque/BANG (f0 brand, f1 freight, f2 ministry, f3 empty bottom row)
//   gate_<size>_1..4  closed / crack / light / open   (placeholder now; ChatGPT's PNGs drop in with the same names)
//   plaque_<size>, bang_<px>
// Timeline (s): 0 brand · 4 freight · 6.5 ministry · 9.0 strike 1 · 9.667 strike 2 · 10.333 strike 3 · 11.17–14.57 hold

export type Size = "lb" | "mr";
const LAYOUT = {
  lb: { w: 728, h: 90, gate: { x: 326, y: 2, w: 124, h: 62 }, plaque: { x: 326, y: 24, w: 124, h: 40 }, bangs: [[136, 16], [214, 18], [298, 21]] as [number, number][], bangY: 74 },
  mr: { w: 340, h: 280, gate: { x: 232, y: 190, w: 104, h: 74 }, plaque: { x: 232, y: 224, w: 104, h: 40 }, bangs: [[82, 14], [140, 16], [202, 18.5]] as [number, number][], bangY: 261 },
};
export const T = { freight: 4.0, ministry: 6.5, s1: 9.0, s2: 9.667, s3: 10.333, end: 14.5 };

const px = (v: number) => v * 2; // layers are @2x

export type Mode = "gate" | "bang"; // V6.2 three strikes on the gate · V8 one BANG! slammed three times, no gate
export const Banner: React.FC<{ size: Size; mode?: Mode }> = ({ size, mode = "gate" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const L = LAYOUT[size];

  // base frame
  const baseIdx = t < T.freight ? 0 : t < T.ministry ? 1 : t < T.s1 ? 2 : 3;

  // gate state crossfades
  const fade = (t0: number, dur: number) => interpolate(t, [t0, t0 + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const crack = fade(T.s1, 0.25); // 1 -> 2
  const light = fade(T.s2, 0.25); // 2 -> 3
  const open = fade(T.s3, 0.5);   // 3 -> 4 (halves slide apart)
  const strikePop = (t0: number) => {
    const p = interpolate(t, [t0, t0 + 0.08, t0 + 0.3], [1, 1.04, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return p;
  };
  const gateScale = Math.max(strikePop(T.s1), strikePop(T.s2), strikePop(T.s3));
  const flash = (t0: number) => interpolate(t, [t0, t0 + 0.06, t0 + 0.35], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ring = (t0: number) => ({ r: interpolate(t, [t0, t0 + 0.45], [6, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }), o: t < t0 ? 0 : interpolate(t, [t0, t0 + 0.45], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) });

  // plaque reveal
  // V6.1 (ChatGPT Part D): the CTA is readable from frame 1 — the gate moves BEHIND the plaque
  const plaqueGlow = interpolate(t, [T.s3 + 0.1, T.s3 + 0.5, T.end], [0, 1, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // BANG! words: newest 112% -> 100%, previous 88%/72%, oldest 78%/48%
  const bangState = (i: number) => {
    const t0 = [T.s1, T.s2, T.s3][i];
    if (t < t0) return null;
    // slam: 150% -> 108% overshoot -> 100% settle (ease-out), then the word stays put; older words keep size, intensity 75% / 85% / 100%
    const peak = size === "lb" ? 1.08 : 1.12;
    const pop = interpolate(t, [t0, t0 + 0.1, t0 + 0.25], [1.5, peak, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const op = [0.75, 0.85, 1][i];
    return { scale: pop, opacity: op, rot: 0 };
  };

  // V8: the same word slammed three times, centred in the bottom row, each slam bigger with flash + shock ring + a 2-frame jolt
  const V8 = mode === "bang";
  const v8 = (() => {
    if (!V8) return null;
    const hits = [T.s1, T.s2, T.s3];
    let k = -1; for (let i = 0; i < 3; i++) if (t >= hits[i]) k = i;
    if (k < 0) return { k, scale: 0, op: 0, jolt: 0, flash: 0, ring: { r: 0, o: 0 } };
    const t0 = hits[k];
    const sizeMul = [1, 1.11, 1.22][k];
    const slam = interpolate(t, [t0, t0 + 0.1, t0 + 0.25], [1.8, 0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const jolt = t < t0 + 0.17 ? ((Math.round((t - t0) * fps) % 2 === 0) ? 1 : 0.4) * (k + 1) * 0.008 : 0;
    return { k, scale: slam * sizeMul, op: 1, jolt, flash: flash(t0), ring: ring(t0) };
  })();
  const G = L.gate;
  const half = (side: "left" | "right", state: number, opacity: number, shift: number) => (
    <div style={{ position: "absolute", left: px(G.x) + (side === "left" ? 0 : px(G.w / 2)), top: px(G.y), width: px(G.w / 2), height: px(G.h), overflow: "hidden", opacity, transform: `translateX(${(side === "left" ? -1 : 1) * shift * px(G.w) * 0.5}px)` }}>
      <Img src={staticFile(`v6/gate_${size}_${state}@2x.png`)} style={{ position: "absolute", left: side === "left" ? 0 : -px(G.w / 2), top: 0, width: px(G.w), height: px(G.h) }} />
    </div>
  );

  return (
    <AbsoluteFill style={{ background: "#040817" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: px(L.w), height: px(L.h),  }}>
      <Img src={staticFile(`v6/${size}_f${baseIdx}@2x.png`)} style={{ position: "absolute", left: 0, top: 0, width: px(L.w), height: px(L.h) }} />
      {V8 ? (<>
        <Img src={staticFile(`v6/plaque_${size}@2x.png`)} style={{ position: "absolute", left: px(L.plaque.x), top: px(G.y + (G.h - L.plaque.h) / 2), width: px(L.plaque.w), height: px(L.plaque.h), filter: `drop-shadow(0 0 ${7 * plaqueGlow}px rgba(255,226,150,${0.85 * plaqueGlow}))`, transform: v8 && v8.jolt ? `scale(${1 + v8.jolt * 3})` : undefined }} />
        {v8 && v8.k >= 0 && (() => {
          const sz = size === "lb" ? 17 : 15; const h = sz * 1.5, w = h * 2.327;
          const cx = size === "lb" ? 262 : 142, cy = size === "lb" ? 75 : 261;
          const rr = v8.ring.r * (size === "lb" ? 1.1 : 0.9);
          return (<>
            <div style={{ position: "absolute", left: px(cx - 30), top: px(cy - 30), width: px(60), height: px(60), borderRadius: "50%", background: "radial-gradient(closest-side,#FFF1BF,rgba(241,210,123,.55) 40%,rgba(163,110,38,0) 100%)", opacity: v8.flash }} />
            <div style={{ position: "absolute", left: px(cx - rr), top: px(cy - rr), width: px(rr * 2), height: px(rr * 2), borderRadius: "50%", border: `${px(1.5)}px solid #F1D27B`, opacity: v8.ring.o }} />
            <Img src={staticFile(`v6/bangB_21@2x.png`)} style={{ position: "absolute", left: px(cx - w / 2), top: px(cy - h / 2), width: px(w), height: px(h), opacity: v8.op, transform: `scale(${v8.scale})`, filter: v8.k === 2 ? "drop-shadow(0 0 6px rgba(255,226,150,.8))" : undefined }} />
          </>);
        })()}
      </>) : (<>

      {/* gate: state 4 (open, gold light) underneath; states 1-3 as sliding halves on top */}
      <div style={{ position: "absolute", left: px(G.x), top: px(G.y), width: px(G.w), height: px(G.h), overflow: "hidden", transform: `scale(${gateScale})`, transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", left: -px(G.x), top: -px(G.y), width: px(L.w), height: px(L.h) }}>
        <Img src={staticFile(`v6/gate_${size}_4@2x.png`)} style={{ position: "absolute", left: px(G.x), top: px(G.y), width: px(G.w), height: px(G.h), opacity: open > 0 ? 1 : 0 }} />
        {/* narrow jambs (the doorway stays) */}
        {(["left", "right"] as const).map((side) => (
          <div key={"jamb" + side} style={{ position: "absolute", top: px(G.y), [side]: side === "left" ? px(G.x) : px(L.w - G.x - G.w), width: px(size === "lb" ? 2 : 3), height: px(G.h), background: "#8F713D" }} />
        ))}
        {(["left", "right"] as const).map((side) => (
          <React.Fragment key={side}>
            {half(side, 1, 1 - crack, open)}
            {half(side, 2, crack * (1 - light), open)}
            {half(side, 3, light, open)}
          </React.Fragment>
        ))}
        {/* impact flash + shock rings */}
        {[T.s1, T.s2, T.s3].map((t0, i) => {
          const f = flash(t0); const rg = ring(t0);
          if (f <= 0 && rg.o <= 0) return null;
          const cx = px(G.x + G.w / 2), cy = px(G.y + (i === 2 ? G.h / 2 : 2));
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: cx - px(14), top: cy - px(14), width: px(28), height: px(28), borderRadius: "50%", background: "radial-gradient(closest-side,#FFF1BF,rgba(241,210,123,.6) 40%,rgba(163,110,38,0) 100%)", opacity: f }} />
              <div style={{ position: "absolute", left: cx - px(rg.r), top: cy - px(rg.r), width: px(rg.r * 2), height: px(rg.r * 2), borderRadius: "50%", border: `${px(1.2)}px solid #F1D27B`, opacity: rg.o }} />
            </React.Fragment>
          );
        })}
      </div>

      </div>
      {/* stationary CTA plaque in front of the gate (V6.1) */}
      <Img src={staticFile(`v6/plaque_${size}@2x.png`)} style={{ position: "absolute", left: px(L.plaque.x), top: px(L.plaque.y), width: px(L.plaque.w), height: px(L.plaque.h), filter: `drop-shadow(0 0 ${7 * plaqueGlow}px rgba(255,226,150,${0.85 * plaqueGlow}))` }} />
      {/* BANG! BANG! BANG! */}
      {L.bangs.map(([x, sz], i) => {
        const b = bangState(i);
        if (!b) return null;
        // V6.2: ChatGPT forged-gold BANG! lettering (bangB), aspect 2.33, glow included → taller box than the typeset word
        const h = sz * 1.5, w = h * 2.327;
        return (
          <Img key={i} src={staticFile(`v6/bangB_${sz}@2x.png`)} style={{ position: "absolute", left: px(x - w / 2), top: px(L.bangY - h / 2), width: px(w), height: px(h), opacity: b.opacity, transform: `scale(${b.scale}) rotate(${b.rot}deg)` }} />
        );
      })}
      </>)}
      </div>
    </AbsoluteFill>
  );
};
