---
type: asset
id: AST-v11-try-the-god-2line
status: proposed
created: 2026-10-19
updated: 2026-10-19
file: 06_Photos_and_AI_Assets/ai_assets_v11_new_slogan/v11_try_the_god_of_the_universe_2line_3dgold.png
checksum: ""
dimensions: 2128×739
alpha: true
prompt: See Design System → 3D lettering prompt template (TEXT "TRY THE GOD / OF THE UNIVERSE", two lines, gold)
used_by:
  - "[[REV-2026-10-19-01]]"
sources:
  - ChatGPT GPT-6 Astra, chat "Banner animation design", 2026-10-19
tags: [gba2026, asset, asset/lettering]
---
# TRY THE GOD / OF THE UNIVERSE (3D gold, two lines)
- Style: 3D polished gold block capitals, same family as [[AST-v9c-dr-shekinaih-3dgold]].
- Known issue: line 1 extrusion touches line 2 (no empty row). Fix used: split at source row 361, open a 34 px gap; TRY silvered in code on line 1 only (`design/silver_region.py … 331 839 0 363`) → `remotion/public/v11a/try.png` (1200×365).
- Used: TRY beat 1.75–4.5 s of V11A, 198 px wide.
