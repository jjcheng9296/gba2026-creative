# GBA 2026 · 340×280 V9C — build notes (approved 2026-10-17 23:23)

How the approved 340×280 "boss sequence" banner was made, so the same look can be rebuilt or carried to other sizes. Live file: `Version 9\GBA2026_Banner_340x280_V9_Boss_Sequence.gif` (+ `.jpg` = final hold, `_frame1.jpg`, review sheet). Preview: https://gba2026-mock-site.vercel.app/v6/banner_340x280_v9.gif

## 1. Look in one line
Cinematic gold movie-title: thick **3D extruded polished-gold block letters** (reference: YouTube Short "Cinematic Gold Happy Birthday 3D Animation", https://www.youtube.com/shorts/F4R8F1f_fIk), each title **lands with weight, one gold sparkle comet orbits it, one narrow gold glint crosses it, then it holds perfectly still**. No white halos, no ripples, no shaking, no cracked/forged texture. Light is always outside the letters; text is never covered.

## 2. Elements (all in `photos\ai_assets\` and repo `assets/`)
| Use | File | Made by | Prompt essentials |
|---|---|---|---|
| DR. SHEKINAIH (CTA) | `v9c_dr_shekinaih_3dgold.png` 2172×724 | ChatGPT GPT-6.1 image gen (project "GBA 2026 – CE Global Creative Studio", chat "Banner animation design") | "thick 3D-extruded POLISHED gold block letters, bevelled bright faces, dark extrusion sides, NO cracks, NO sparkles baked in, transparent background, straight-on with slight low angle, ~2048 px wide, no extra text" |
| HEAVEN THRONE ROOM MINISTRY (top) | `v9c_heaven_throne_room_ministry_3dgold_oneline.png` | same | same style, ONE line (two-line version `…_3dgold.png` kept, too tall for the sky strip) |
| BANG! ×3 | `v9c_bang_3dgold.png` | same | same style, word "BANG!" alone — reused for all three |
| DR. SHEKINAIH SIEW SIN YAP (right column) | `v9c_dr_shekinaih_siew_sin_yap_3dgold.png` | same | same style, TWO lines, same letter height both lines |
| DR. J AARON K DAVID (right column) | `v9c_dr_j_aaron_k_david_3dsilver.png` | same | same 3D style but polished SILVER/chrome, one line |
| WHEN ALL ELSE FAILS, | `v9b_when_all_else_fails_silver.png` | same (earlier round) | forged silver/platinum, cool chrome, hot white core, subtle cracks |
| FULLY BACKED BY | `v9_fully_backed_by.png` → silvered in code (`remotion/public/v9/fully_silver.png`, Pillow grayscale + cool tint) | same | forged gold family, then desaturated to silver |
| POWER OF / HEAVEN | rendered text layer `power_b` (design/v6layers.mjs): POWER OF = Barlow Condensed 600 13 px silver gradient, letter-spacing .4em; HEAVEN = Bodoni Moda 900 34 px gold gradient + glow | Claude | — |
| Write to: email | rendered layer `email_b` (v6layers.mjs): "Write to:" white, address #FFF3C4, Barlow Condensed 600 11 px, 212×16 | Claude | — |
| Company name | Bodoni Moda 900 11.5 px, **silver gradient** `.silver`, two lines, left x 10, top band+3 | Claude (render10.mjs, VARIANT=v9b) | — |
| Titles under names | Roboto/Sans 700 7.4 / 7 px #F4F1EA | Claude | — |
| Logos | CEG crest left 50×50 at (8,6); CE Global tile right 50×50 at (282,6) — same size, same level | Claude | — |

Asset prep (Python/Pillow): crop to alpha>40 bbox, `thumbnail((800–1200))`, save to `remotion/public/v9/<key>.png`, write aspect ratio into `remotion/public/v9/aspect.json`. BANG! sizes 13/15/17.5 px → `public/v6/bangG_<sz>@2x.png` (height = size×1.5×2).

## 3. Layout (CSS px, 340×280)
- Photo/rainbow/founders: y 0–174 (band starts at **stageY = 174**). Rainbow apex y 42; ministry title must stay above it.
- HEAVEN THRONE ROOM MINISTRY: 214×19 at top 8, centred x 170 (≥15 px above the rainbow).
- Band (x 0–340, y 174–280): company name top-left (x 10–224, y 177–204, silver); **left slam column** x 8–228, rows y 205–280; **right column** x 218–340: names block 122×98 flex `space-evenly`, top band+5 — DR. SHEKINAIH / SIEW SIN YAP 112 wide (3D gold), Founder & Managing Director, DR. J AARON K DAVID 106 wide (3D silver), Chief Advisory & Support Officer. **Her name always much bigger than his.**
- Write to line: 212×16 at (10, 261), only from 7.0 s.
- Nothing ever over faces/bodies; rainbow untouched; no phone / award words / figures; one CTA.

## 4. Timeline (16 s loop, 12 fps for motion, held frames elsewhere) — `remotion/src/Banner9.tsx` rev "b", `T9B`
| t (s) | Beat | Size / motion |
|---|---|---|
| 0.0 | WHEN ALL ELSE FAILS, (silver) slams | h 65, centred x 116, y 242; slam 1.2→0.97→1 (0.33 s), flash + shock ring, jitter ±4 px ×4 frames |
| 2.0 | CONTACT (silver, gold-trimmed, 9 px, tracking .3em) above **DR. SHEKINAIH** 208×70 3D gold (`CtaTitle.tsx`) | recipe "monumental landing": scale 1.08→0.995→1 over 0.5 s, blur 0.6→0, opacity 0→1 in 0.167 s, tracking 0.12→0.01 em; **sparkle comet** (`SparkleOrbit.tsx`) 0.2–1.8 s, ellipse rx 104 ry 26, 1.25 turns, clipped to x 8–228 / y 205–261; **glint** 0.5–1.17 s, 108°, 12 % wide, peak opacity 0.45, masked to the letters; hold to 7.0 |
| 7.0 | FULLY BACKED BY (silver) + Write to line appears | row cy 232, maxH 54 |
| 8.5 | POWER OF (silver) / HEAVEN (gold) | layer 212×56 |
| 10.5 / 11.5 / 12.5 | BANG! → BANG! BANG! → BANG! BANG! BANG! | `Bang3D.tsx` (@remotion/three): textured metallic planes (metalness .85, roughness .28, emissive #7a5410 ×1.0), tilt −0.6→0 rad stamp over 0.25 s, point light sweeps left→right; all words jitter together (same offset) |
| 13.0–15.0 | Ministry finale | sparkle comet around the title (rx 108, ry 16, 1.5 turns, clipped to x 60–280 / y 0–40) + one glint 13.17–13.83 s (peak 0.3) |
| 15.75–16 | fade out, loop | |

## 5. Pipeline (commands)
```
cd design
VARIANT=v9b node render10.mjs mr_f3            # base frame → out10_v9b/mr_f3@2x.png → copy to remotion/public/v9/mr_base_b@2x.png
ONLY=v9b node v6layers.mjs                     # power_b / email_b / ministry_big / cta_big layers → copy to remotion/public/v9/
cd ../remotion
npx remotion render MR9B out/MR9B --sequence --image-format=png \
  --frames=0-5,24-47,84-89,102-107,126-131,138-143,150-184,191
cd .. && VER=V9B python3 design/export_v6.py   # GIF: shared 256 palette from key frames, Floyd–Steinberg on frame 1 only,
                                               # unchanged pixels reuse previous indices, frame delay = gap to next rendered frame
```
remotion.config.ts pins Chromium (`setBrowserExecutable`) and `Config.setChromiumOpenGlRenderer("angle")` for three.js. Fonts for live text: `remotion/public/fonts/` (Bodoni Moda 900, Barlow Condensed 600) loaded with FontFace in `CtaTitle.tsx`.

## 6. GIF-size lessons
- Only animate one region per beat (title effects live in the finale when the row is static) — otherwise the stored box becomes the whole frame and size triples.
- Dither only frame 1; changed regions are text on a dark band — no dither is cleaner and ~2× smaller.
- White/grey light bands turn into pale stripes after palette reduction: keep glints narrow, gold, ≤0.45, ≤0.7 s.
- Result: 90 frames, 16.1 s, ≈360 KB.

## 7. ChatGPT rounds that shaped it (docs/GBA2026_ChatGPT_Critique.md rounds 7–9)
Storyboard + 5 forged elements → 7-point review (email full-width, names block) → 3 movie-title recipes (landing / glint / three.js pass) → 3D polished-gold assets in the reference style → 728×90 advice (8 s loop, CTA from frame 1, ministry + email in the 124×62 zone, hero word 36–40 px tall, cap height ≥20 px, glint 12–18 %).
