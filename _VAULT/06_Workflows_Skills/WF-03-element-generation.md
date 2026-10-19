---
type: workflow-step
id: WF-03-element-generation
status: approved
created: 2026-10-17
updated: 2026-10-19
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
ChatGPT generates transparent ~2048 px PNG letterings with the Design System prompt template; James approves download; files go to 06_Photos_and_AI_Assets/ai_assets (V11: ai_assets_v11_new_slogan).

## How to size the request (learned on the 728, [[RUN-2026-10-18-728x90-V10]])
1. Measure the zone first (w × h in css px). The word's aspect must be ≈ w/h, otherwise the zone height limits it and the word looks small. Ask for "ONE line, WIDE (about N:1)" or "EXTENDED letter proportions" — never stretch in CSS.
2. One image per ChatGPT message; name the style anchor ("same heavy condensed 3D block-capital family as the approved DR. SHEKINAIH").
3. Two-tone phrases in one image are fine (POWER OF silver 60 % / HEAVEN gold; TRY silver / THE GOD OF THE UNIVERSE gold) — or silver one word in code with `design/silver_region.py in out x0 x1 [y0 y1]` (restrict y to that line!).
4. Two-line letterings: ask for "a clear empty gap between the lines (≈12 % of cap height)". If the lines still touch (no empty alpha row), split at the first row of line 2 and open the gap in code ([[AST-v11-try-the-god-2line]]).
5. Download only after 批准 (per batch of images): pick the image by its position in the latest assistant turn.
   - Claude in Chrome: `fetch(blob)` → anchor download → PowerShell move → ai_assets.
   - **Built-in browser (19 Oct):** image → Share → Download leaves an unfinished `*.tmp` in Downloads that already holds the whole PNG → run `C:\Users\chang\OneDrive\Documents\grab_tmp_download.ps1 -Name <v11_name.png>` (copies the newest .tmp to the asset folder, checks PNG signature + IEND) → `device_stage_files` → trim (alpha > 40, ≤1200 px) → `remotion/public/vN/` + `aspect.json`.
6. Record each file in an AST note ([[TPL-Asset]]): [[AST-v10-wide-letterings]], [[AST-v11-try-the-god-2line]], [[AST-v11-dr-shekinaih-excl]], [[AST-v11-try-the-god-oneline]].

Next: [[WF-04-layout-base-frame]] · Hub: [[Workflow Run Sheet]]
