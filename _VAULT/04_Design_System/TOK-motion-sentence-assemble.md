---
type: token
id: TOK-motion-sentence-assemble
status: proposed
created: 2026-10-19
updated: 2026-10-19
unit: css px @ 12 fps
used_by: ["[[REV-2026-10-19-02]]", "[[REV-2026-10-19-03]]"]
tags: [gba2026, token, motion]
---
# Motion: the sentence assembles (V11 v2/v3)
A two-line phrase condenses into ONE line so the whole sentence reads as one picture.
- 8 frames (0.67 s; 5 frames was too fast to notice). Line 1 shrinks into its slot first (frames 0–3); line 2 shrinks and slides right while still BELOW line 1 (0–5), then rises into the gap (4–8) — the lines never overlap. On the last frame the one-line asset replaces the moving pieces (same positions → no visible jump).
- Pieces: `try_l1.png`, `try_l2.png` cut from the two-line lettering; target boxes from the one-line asset's word gap (`assemble.json`).
- Nothing else moves while it runs (the comet starts on the frame the assemble ends).
Code: `remotion/src/Banner11v3.tsx` (hero block). Source snapshot: `01_Work_340x280_V11_New_Slogan/source_code/`.
