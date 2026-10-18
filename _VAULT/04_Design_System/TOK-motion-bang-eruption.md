---
type: token
id: TOK-motion-bang-eruption
status: proposed
created: 2026-10-18
updated: 2026-10-18
category: motion
value: "hits at 2-frame spacing (1 · 2 · 3); tilt −0.9→0 rad / 0.2 s; pop 1.16→0.97→1; jitter decay [1,−.85,.65,−.5,.35,−.2,.1,−.05]×amp(3.5/5/6 px); underlight 340×7 #EFC566 0→.55–.85→0 over 4 f; embers 16/28/56, 2–3.5 px, vy −3.5…−7 px/f, g .55, life 5–9 f, colours #CF9635/#EFC566/#FFF3C4; fissures 3 paths y 66–73 #EFC566 peak .75 (triple hit only); lava glow 380×44 amber peak .5"
unit: css px @ 12 fps
scope: BANG! beat (Banner10.tsx eruption(), Bang3D.tsx stamps)
tags: [gba2026, token, motion]
---
# BANG! eruption (V10)
Code: `remotion/src/Banner10.tsx` → `eruption()`, `embers()`, `underlight()`, `fissures()`; `Bang3D.tsx` → `stamps` prop (per-word hit times) + `bright`. Decision: [[DEC-bang-eruption]]. Base stamp: [[TOK-motion-bang-stamp]].
