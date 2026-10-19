---
type: workflow-step
id: WF-05-remotion-animation
status: approved
created: 2026-10-17
updated: 2026-10-19
inputs:
  - layers
outputs:
  - frame PNGs
checks:
  - "[[QA Checklist]]"
tags:
  - gba2026
  - workflow
---
# Remotion + three.js
Banner9.tsx (rev b), CtaTitle.tsx, SparkleOrbit.tsx, Bang3D.tsx; render the beat frames with --sequence.

## Per size
| Size | Composition | Scenes | Timeline |
|---|---|---|---|
| 340×280 (approved) | `MR9B` → Banner9.tsx rev b | render10.mjs VARIANT=v9b | T9B 16 s |
| 728×90 (V10, in review) | `LB10` → Banner10.tsx | render10.mjs VARIANT=v10 (`stageBeat()`) | T10 15 s |
| 340×280 V11 new slogan (in review) | `MR11A` / `MR11B` → Banner11.tsx (`set` a = block letters, b = new font) | reuses V9C base `v9/mr_base_b@2x.png` | T11 14 s |
Shared motion tokens: [[TOK-motion-slam]], [[TOK-motion-landing]], [[TOK-motion-sparkle-comet]], [[TOK-motion-glint]], [[TOK-motion-bang-stamp]], [[TOK-motion-bang-eruption]].
Rules of thumb: one moving region per beat; every effect inside the stage clip; first frame of a landing at opacity ≥0.4 (not 0) so the beat never shows blank; keep approved components untouched — add props (`bright`, `stamps`, `bangUrl`, `ar`) or a new component (`HeroTitle` = CtaTitle with label/image props) instead of editing behaviour.
V11 additions: slam overshoot sized to the card (peak width ≤ zone: 1.2 narrow words, 1.07 wide two-line card, 1.03 three BANGs); orbit/flash layers drawn BEFORE the letters; Bang3D textures must exist at the exact sizes used (`v11a/bang_12.5@2x.png` …) — a missing size aborts the render at that frame; a component that draws live text outside HeroTitle must `delayRender` until `loadFonts()` resolves.

Next: [[WF-06-gif-export]] · Hub: [[Workflow Run Sheet]]
