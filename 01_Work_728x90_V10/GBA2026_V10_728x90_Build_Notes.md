# GBA 2026 · 728×90 V10 — build notes (draft 2, 2026-10-18 09:55, NOT yet approved; draft 1 = Snapshot_V10a_12s_0941)

How the 728×90 leaderboard was built in the approved V9C system, following James's 09:00–09:34 direction. Approved baseline for look/motion: `01_Approved_Banner_340x280_V9C\GBA2026_V9C_340x280_Build_Notes.md`.

## 1. Layout (CSS px, 728×90) — James 2026-10-18
- **Masthead y 0–27, x 6–546** (ends ≥20 px before the rainbow): `CROWNED EAGLES GLOBAL` = ChatGPT 3D rainbow-gradient block capitals with polished-gold border (26 px tall) + `& CE GLOBAL NETWORK INTERNATIONAL PTE LTD` = ChatGPT 3D silver with gold border (22 px tall), centred as one row; 1 px gold rule at y 27.
- **Both logos LEFT, same size, same level** (728 only — the 340 keeps top-left/top-right): CEG crest 56×56 at (8,29); CE Global tile 56×56 at (76,29).
- **Stage x 150–500, y 29–87** (the big middle space for the sequence). Word zone bottom = 73 once the email is on. Centre x 325.
- **Email** `Write to: ceg@crownedeaglesglobal.org` (Barlow Condensed 600 11.5 px, white label + #FFF3C4 address) at y 75–87, centred in the stage, from the FULLY beat (3.5 s) onward.
- **Photo / rainbow / faces panel x ≥ 500 untouched**; dark overlay fades to 0 at x 510 (rainbow foot).

## 2. Elements (all in `06_Photos_and_AI_Assets\ai_assets\`, trimmed copies in `remotion/public/v10/` + `aspect.json`)
| Beat | File | Style |
|---|---|---|
| masthead | `v10_crowned_eagles_global_rainbow_gold.png` (ar 7.5) · `v10_ce_global_network_international_silver_gold.png` (ar 15.1) | 3D block caps, rainbow / silver faces, gold bevel, bronze extrusion |
| 1 | `v10_when_all_else_fails_wide_silver.png` (ar 6.04) | wide polished silver/chrome 3D |
| 2 | `v10_dr_shekinaih_wide_gold.png` (ar 7.69) + live CONTACT (silver, gold trim, 13 px, tracking-in) | wide polished gold 3D |
| 3 | `v10_fully_backed_by_wide_silver.png` (ar 7.11) | wide polished silver 3D |
| 4 | `v10_power_of_heaven_wide_silver_gold.png` split → `power_of.png` (silver) + `v10_heaven_extended_gold.png` (`heaven_x`, ar 4.88, extended letters) | POWER OF silver 58 % height · HEAVEN gold full height |
| 5 | `v9c_bang_3dgold.png` → `public/v6/bangG_25@2x.png` (3 words × 110 px, gap 8) | three.js metallic stamp, brighter lighting (`bright` prop) |
| 6 | `v10_heaven_throne_room_ministry_oneline_wide_gold.png` (ar 9.14) | one line, wide polished gold 3D |
Prompt family (all): "same heavy condensed 3D block-capital family as the approved DR. SHEKINAIH, ONE line, WIDE (about N:1), polished [gold/silver], dark extrusion, nearly straight-on slight low angle, transparent, no sparkles, no cracks, no halo, no extra text".

## 3. Timeline — 15 s loop, 12 fps (`remotion/src/Banner10.tsx`, `T10`) — James 09:47: 15 s, CONTACT +2 s
| t (s) | Beat | Motion (one moving region per beat) |
|---|---|---|
| 0.0 | WHEN ALL ELSE FAILS, (silver, 320×53) | slam 1.2→0.97→1 (0.33 s), amber flash 240×68 + shock ring 12→82 px, jitter ±4 px |
| 1.5 | CONTACT / DR. SHEKINAIH (308×40) | monumental landing (1.08→0.995→1, blur 0.6→0), sparkle comet 1.7–3.3 s (rx 168), glint 2.0–2.67 s; holds to 5.5 |
| 5.5 | FULLY BACKED BY (313×44) + email appears (hard cut) | slam |
| 7.0 | POWER OF (silver) slams · 7.33 HEAVEN (gold extended, 215×44) stamps 1.35→1 with jitter · glint 7.8–8.3 | two-step impact |
| 8.5 / 9.417 / 10.333 | BANG! → BANG! BANG! → BANG! BANG! BANG! (110×38 each) | **eruption** (ChatGPT R11): every word re-stamps at 2-frame spacing (tilt −0.9→0, pop 1.16), group jitter decays over 8 frames (amp 3.5/5/6), bronze underlight 340×7, seeded ember streaks 16/28/56 (#CF9635/#EFC566/#FFF3C4, vy −3.5…−7 px/f, g .55), 3 band fissures + lava glow on the triple hit; all inside the stage clip, nothing on the letters |
| 11.6 | HEAVEN THRONE ROOM MINISTRY (346×38) | landing, comet 11.8–13.4, glint 13.1–13.6, clean hold |
| 14.75–15 | fade out → loop | |

## 4. Pipeline
```
cd design && VARIANT=v10 node render10.mjs                 # base + 6 scene frames → out10_v10/ (lb10_base@2x.png → remotion/public/v10/lb_base@2x.png)
cd remotion && npx remotion render LB10 out/LB10 --sequence --image-format=png --frames=<list>      # 107 frames (motion segments only)
VER=V10 KEYS10=<indices> python3 design/export_v6.py        # 1x GIF (shared palette, dither frame 1 only)  · SCALE=2 → @2x GIF
npx remotion render LB10 out/LB10_4x ... --scale=2 → ffmpeg concat → 2912x360 MP4 (24 fps, crf 17)
```
Result draft 1 (12 s): 107 frames, 1× GIF 554 KB. Draft 2 (15 s, eruption): 125 frames, 1× GIF 708 KB, @2x GIF 1.77 MB, MP4 2912×360.

## 5. Open points
- Boss approval pending. GIF 1× is 708 KB (target ≤500 KB): trim ember/comet frames if the publisher's limit is tighter.
- Phone: a 728 banner scaled to a phone is small by nature — the @2x GIF / 2912×360 MP4 are the sharp versions; ask Jason Ooi which format the slot accepts.
