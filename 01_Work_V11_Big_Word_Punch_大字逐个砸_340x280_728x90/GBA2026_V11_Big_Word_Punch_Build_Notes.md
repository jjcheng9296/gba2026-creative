# GBA 2026 · V11 「大字逐个砸 Big Word Punch」 — 340×280 + 728×90 build notes (2026-10-20)

James 2026-10-20 16:44: "帮我做 那个 大字逐个砸，然后也做 728x90" → the Big Word Punch (Variation 2, archived 19 Oct 19:31 "不错很有创意，存档") is the chosen V11 motion; the 340×280 set is the Variation 2 files unchanged; the 728×90 is new, built the same way.

## 1. Motion (both sizes, SAME timing → on one capital.asia page the two banners punch together)
| t (s) | Beat |
|---|---|
| 0.00 · 0.42 · 0.83 · 1.33 | WHEN · ALL ELSE · FAILS, · TRY (silver chrome words) |
| 1.75 · 2.17 | THE GOD · OF THE UNIVERSE (gold, flash + ripple behind) |
| 2.67 · 2.92 · 3.25 | IN (silver) · DR. · SHEKINAIH! (gold) |
| 3.75 | the sentence locks: TRY THE GOD OF THE UNIVERSE / IN DR. SHEKINAIH! (slam 1.04) |
| 7.0 / 7.5 / 8.0 | BANG! → BANG! BANG! → BANG! BANG! BANG! + email appears |
| 8.5–13.0 | closing card, still; one ministry glint 8.5–9.0 |
One word per beat, each as big as its zone allows; hard cuts; slam peak never leaves the zone; light only behind letters.

## 2. 728×90 layout (CSS px)
- Kept from DEC-728: both logos left (CEG crest 8,29 · CE tile 76,29, 56×56), masthead y 0–27 / x 6–546 (ends before the rainbow), stage x 150–500 / y 29–87, photo / rainbow / founders panel x ≥ 500 never touched.
- Masthead = the boss's headline (19 Oct 15:49), like the 340 V11: CROWNED EAGLES GLOBAL (`v11a/ceg3d.png`, 3D rainbow + gold border, 163×21.5) · HEAVEN THRONE ROOM MINISTRY (`v9/ministry3d1.png`, 3D gold, 179×15.8) · CE GLOBAL NETWORK INTERNATIONAL / GLOBAL FREIGHT FORWARDING! (3D silver, Anton 12 px, 0.045 em, band6 recipe — no gold stroke). Row width 533 / 540. Gold rule at y 27.
- Kinetic words ≤ 336 × 50 px, centred x 325 / y 58; peak = min(1.15, 56/h, 346/w).
- Hero: tryline 21 px over IN + DR. SHEKINAIH! 28.5 px (her name bigger), slam 1.04.
- Email: 3D silver `Write to: ceg@crownedeaglesglobal.org` (the 340's layer, 212×16) at y 71–87, from the first BANG.
- BANG sizes 20 / 22.5 / 25 (heights 30 / 33.8 / 37.5 px, widths 88 / 99 / 110), slam 1.06 / 1.06 / 1.03; textures `v11lb/bang_{s}@2x/@4x.png` from `assets/v9c_bang_3dgold.png` (ar 2.9298 like the approved 340 BANG).
- Closing card in ONE line (the 728 is wide): TRY THE GOD OF THE UNIVERSE · IN · DR. SHEKINAIH!, same letter height 21.7 px, IN = 0.62 label.
- Gold-word impact on the 728: soft flash + a ripple that starts at the word's own outline (×1.1 wide) and runs outward — a small centred ring only peeped through the word gaps of the wide 728 words (draft 1, t 1.75 s).

## 3. Files
- `remotion/src/Banner728Var2.tsx` → `LB11VAR2` (1456×180) and `LB11VAR2HD` (hi layers @4x, render `--scale=2` → 2912×360). Timing imported from `BannerVar2.tsx` (`TVAR2`).
- Base: `cd design && VARIANT=v11lb node render10.mjs` (+ `DSF=4`) → `out10_v11lb/lb11_base@2x/@4x.png` → `remotion/public/v11lb/lb_base@2x/@4x.png`. `LBF` env = freight line size (default 12).
- Export: `SIZE=728 COMP=LB11VAR2 TAG=V11_Big_Word_Punch SCALE=1|2 JPG_AT=155 python3 export_v11.py`; `SIZE=728 COMP=LB11VAR2HD … SCALE=4` → `_2912x360.gif`; MP4 `npx remotion render LB11VAR2HD … --scale=2 --codec=h264 --crf=16`.
- 728 results: 1× GIF 416 KB (V10 was 708 KB), @2x GIF 1.0 MB, 2912×360 GIF 3.0 MB, MP4 1.2 MB, JPG = closing card, 72 unique frames, 13.00 s.
- Phone: `手机高清_Phone_HD/` faststart MP4 (High, crf 14) + 6 key stills at 2912×360.
- Page preview: `GBA2026_V11_大字逐个砸_网页预览_728与340同步.mp4` (both banners on a placeholder news page, same clock).

## 4. Checks (all 156 frames)
- Logos, photo / rainbow / founders panel, bottom rule: 0 change in every frame (@2x and true 4x).
- Masthead: changes only in frames 103–107 = the planned ministry glint, inside the ministry letters (x 180–359, y 6–22).
- Words stay inside the stage zone at every slam peak; nothing crosses x 505.
- True 4x vs @2x upscaled (Laplacian): founders 497 vs 83, masthead 2237 vs 478, closing card 1487 vs 203.
- GIF decoded: sky inside the bow even (libimagequant), faces clean, masthead readable at 1×.
