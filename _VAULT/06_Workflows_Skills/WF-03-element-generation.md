---
type: workflow-step
id: WF-03-element-generation
status: approved
created: 2026-10-17
updated: 2026-10-17
inputs:
  - prompt
outputs:
  - PNG assets
checks:
  - "[[QA Checklist]]"
tags:
  - gba2026
  - workflow
---
# Element generation
ChatGPT generates transparent ~2048 px PNG letterings with the Design System prompt template; James approves download; files go to 06_Photos_and_AI_Assets/ai_assets.

## How to size the request (learned on the 728, [[RUN-2026-10-18-728x90-V10]])
1. Measure the zone first (w × h in css px). The word's aspect must be ≈ w/h, otherwise the zone height limits it and the word looks small. Ask for "ONE line, WIDE (about N:1)" or "EXTENDED letter proportions" — never stretch in CSS.
2. One image per ChatGPT message; name the style anchor ("same heavy condensed 3D block-capital family as the approved DR. SHEKINAIH").
3. Two-tone phrases in one image are fine (POWER OF silver 60 % / HEAVEN gold) — split by the alpha gap for animation.
4. Download only after 批准: pick the image by its position in the latest assistant turn, `fetch(blob)` → anchor download → PowerShell move `v10_*.png` → ai_assets → stage → trim (alpha > 40) → `remotion/public/vN/` + `aspect.json`.
5. Record each file in an AST note ([[TPL-Asset]]): [[AST-v10-wide-letterings]].

Next: [[WF-04-layout-base-frame]] · Hub: [[Workflow Run Sheet]]
