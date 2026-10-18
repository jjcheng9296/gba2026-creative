---
type: workflow-step
id: WF-05-remotion-animation
status: approved
created: 2026-10-17
updated: 2026-10-17
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
Shared motion tokens: [[TOK-motion-slam]], [[TOK-motion-landing]], [[TOK-motion-sparkle-comet]], [[TOK-motion-glint]], [[TOK-motion-bang-stamp]], [[TOK-motion-bang-eruption]].
Rules of thumb: one moving region per beat; every effect inside the stage clip; first frame of a landing at opacity ≥0.4 (not 0) so the beat never shows blank; keep approved components untouched — add props (`bright`, `stamps`) instead of editing behaviour.

Next: [[WF-06-gif-export]] · Hub: [[Workflow Run Sheet]]
