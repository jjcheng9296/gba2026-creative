# GBA 2026 — 340×280 V11 "New Slogan" build notes (19 Oct 2026)

Slogan (James, 14:12): **WHEN ALL ELSE FAILS, TRY THE GOD OF THE UNIVERSE IN DR. SHEKINAIH! BANG! BANG! BANG!**
V9C (approved, 01_Approved_Banner_340x280_V9C) is untouched. V11A = same 3D gold/silver lettering; V11B = new font (ChatGPT pick: condensed sculpted semi-serif).

## Phrasing and rhythm (ChatGPT round 12 + Claude, James 14:43)
Problem → divine promise → her name → BANG → back to her name.

| Beat | Card | Time (s) | Motion | Colour |
|---|---|---|---|---|
| 1 | WHEN ALL ELSE FAILS, | 0–1.75 | slam 1.2→0.97→1, ring | silver |
| 2 | TRY THE GOD / OF THE UNIVERSE | 1.75–4.5 | one landing, slam 1.07 | TRY silver, rest gold |
| 3 | IN (16 px) + DR. SHEKINAIH! (204 px) | 4.5–8.5 | landing 1.08→1, glint 0.5–1.17 s, sparkle orbit behind the name | IN silver, name gold |
| 4 | BANG! → BANG! BANG! → BANG! BANG! BANG! | 8.5 / 9.0 / 9.5 | Bang3D stamps, sizes 12.5/14.5/17, b3 slam 1.03 | gold |
| 5 | Closing card: TRY THE GOD OF THE UNIVERSE / IN DR. SHEKINAIH! | 10.5–14.0 | still (fade-in from 0.4) | equal row height 22.8 px |

Email "Write to: ceg@crownedeaglesglobal.org" from 8.5 s to the end. Ministry finale glint 11.17–11.83 s. Static JPG = closing card (frame 160); frame1 JPG = WHEN beat.

## Layout (CSS px, 340×280)
Base frame = V9C `v9/mr_base_b@2x.png`. Slogan zone x 10–222, y 203–280 (clip). TRY card 198 wide, centre y 241.5. Hero top 208. Closing card rows at y 205 and 231.8. Names block from x 222 — no slam peak crosses it.

## Files
- Code: `remotion/src/Banner11.tsx` (MR11A / MR11B), `HeroTitle.tsx`, `Bang3D.tsx` (+ optional bangUrl/ar), `design/export_v11.py`, `design/silver_region.py`.
- Assets: `06_Photos_and_AI_Assets/ai_assets_v11_new_slogan/` → trimmed in `remotion/public/v11a/` (try, name, tryline, bang_12.5/14.5/17).
- Outputs (this folder): GIF 1× and @2x, JPG (closing card), frame1 JPG, 1360×1120 MP4 + JPGs.

## Commands
```
cd remotion && npx remotion render MR11A out/MR11A --sequence --image-format=png
cd ../design && COMP=MR11A TAG=V11A_New_Slogan python3 export_v11.py && COMP=MR11A TAG=V11A_New_Slogan SCALE=2 python3 export_v11.py
cd ../remotion && npx remotion render MR11A ../final/v11/GBA2026_Banner_340x280_V11A_New_Slogan_1360x1120.mp4 --scale=2 --codec=h264 --crf=16 --pixel-format=yuv420p
```

## Lessons
- Built-in browser downloads stay as `*.tmp` in Downloads; the .tmp already holds the full PNG → `C:\Users\chang\OneDrive\Documents\grab_tmp_download.ps1 -Name <file>` copies and checks it.
- GIF delays are centiseconds: round cumulative time, or a 14 s loop plays as 13.7 s.
- ChatGPT's two-line block lettering touches between lines: split at the first row of line 2 and open a gap.
- Draw flashes/orbits BEFORE the letters so light never covers text.


## Version 2 — "the sentence assembles" (15:13, `MR11A2` → `remotion/src/Banner11v2.tsx`)
ChatGPT round 13 concept A + James 15:05 (email after the name, keep the comet, no ministry orbit, block lettering).

| Beat | Time (s) | What happens |
|---|---|---|
| WHEN ALL ELSE FAILS, | 0–1.5 | slam 1.1 (188 px wide → peak stays in the zone) |
| TRY THE GOD / OF THE UNIVERSE | 1.5–3.5 | two-line card 198 px, 1.03 → 0.995 → 1, no shake |
| Assemble | 3.5–3.92 | line 1 shrinks into place (frames 0–2); line 2 shrinks + slides right below (0–3) then rises beside line 1 (3–5); one-line asset on the last frame |
| IN + DR. SHEKINAIH! | 3.92–7.5 | IN 22 px + name 183 × 30 px land under the one-line phrase (196 × 22.5); glint 4.42–5.09; comet behind 4.22–5.82 |
| BANG ×1/×2/×3 | 7.5 / 8.0 / 8.5 | email appears at 7.5; b3 shake ±2/±1 px for 4 frames |
| Closing card | 9.4–12 | clean cut; equal-height rows (22.8 px); ministry glint 9.45–10.0; **10–12 completely still, no fade** |

Line boxes for the morph: `public/v11a/assemble.json` (two-line card boxes; split of the one-line asset at 512/522 of 1200 px). Line images: `try_l1.png`, `try_l2.png`.
Export: `COMP=MR11A2 TAG=V11A_v2_Sentence_Assembles JPG_AT=130 python3 export_v11.py` (+ `SCALE=2`); MP4 `npx remotion render MR11A2 … --scale=2 --codec=h264 --crf=16`.
Result: GIF 1× 459 KB, @2x 1.14 MB, 1360×1120 MP4 12.0 s.


## Version 3 — "the comet writes her name" (15:50, `MR11A3` → `remotion/src/Banner11v3.tsx`)
James 15:30 "我给你权限 继续改 做第三版" + "Motion graphics 方面可以有突破吗". ChatGPT R14 fixes + Claude fixes + the breakthrough (R15 merged).

| Beat | Time (s) | What happens |
|---|---|---|
| WHEN ALL ELSE FAILS, | 0–1.5 | slam 1.1 |
| TRY THE GOD / OF THE UNIVERSE | 1.5–3.5 | two-line card, 1.03, no shake |
| Assemble | 3.5–4.17 | 8 frames → one line 206 × 24 px |
| Comet | 4.17–5.5 | head runs along the name baseline, behind the letters |
| Three strokes | 4.42 DR. · 4.75 SHEK · 5.08 INAIH! | per group: gold dots fly to their places, letters rise from the baseline over 0.42 s (1.6 px pale-gold edge on the rising edge only); 3D silver IN with stroke 1 |
| Glint | 5.9–6.6 | one narrow glint on the name; rest until 8.0 |
| BANG ×1/×2/×3 | 8.0 / 8.5 / 9.0 | email from 8.0; slogan zone clipped to y 203–259 |
| Closing card | 9.5–13 | 3D IN; equal row height 22.8 px; ministry glint 9.5–10.0; 10–13 still |

Group splits of name.png (1200 px): 289 | 704. Dot targets: `public/v11a/name_points.json` (420 bright face points).
Export: `COMP=MR11A3 TAG=V11A_v3_Comet_Writes_Her_Name JPG_AT=140 python3 export_v11.py` (+ `SCALE=2`); MP4 `--scale=2 --codec=h264 --crf=16`.
Result: GIF 1× 327 KB, @2x 972 KB, 1360×1120 MP4 13.0 s; review sheet `GBA2026_V11A_v3_review_sheet.png`.

## Version 4 — boss headline + 3D silver (16:21 James "可以", `MR11A4` → `remotion/src/Banner11v4.tsx`)
- = v3 motion unchanged + headline: top CROWNED EAGLES GLOBAL (ChatGPT 3D rainbow, gold border) 167×22 at y2 over HEAVEN THRONE ROOM MINISTRY 3D gold 186×16.4 (bottom y42, rainbow apex ≈45).
- Band: CE GLOBAL NETWORK INTERNATIONAL / GLOBAL FREIGHT FORWARDING! in **3D silver** (Anton 13.9 px, 0.045 em, chrome face, dark bevel, steel extrusion) — base `public/v11a/mr_base_hl@2x.png` = `VARIANT=v9b V11H=band6 node render10.mjs mr_f3`. The gold-stroke version (A4) was rejected 16:11 "反而看不清楚".
- Email `public/v11a/email_v11@2x.png` 3D silver at (10,262) (`node v11layers.mjs`; `EMAIL_STYLE=gold` = old).
- Slogan column + ring + comet clip moved down DY = 4 px; zone clip 207–261 once the email shows.
- Check: band / names / email strip / top unchanged in all 156 frames except the planned ministry glint 9.5–10.0 s.
Export: `COMP=MR11A4 TAG=V11A_v4_Headline_3D_Silver JPG_AT=140 python3 export_v11.py` (+ `SCALE=2`); MP4 `npx remotion render MR11A4 … --scale=2 --codec=h264 --crf=16 --pixel-format=yuv420p`.
Result: GIF 1× 308 KB, @2x 779 KB, 1360×1120 MP4 13.0 s (1.0 MB); review sheet `GBA2026_V11A_v4_review_sheet.png` (HD frames). Snapshot `19th Oct 2026 - V11A Version 4/`.
- **True high-res (16:29, James 16:25 "I WANT high resolution version")**: the first 1360×1120 MP4 was the 680 base stretched (5× less sharp, Laplacian 235 vs 1248). Now `MR11A4HD` (`hi` prop) uses 4x layers: `mr_base_hl@4x.png` (`VARIANT=v9b V11H=band6 DSF=4 node render10.mjs mr_f3`), `email_v11@4x.png` (`DSF=4 node v11layers.mjs`), `bang_*@4x.png` (from assets/v9c_bang_3dgold.png). Frames `npx remotion render MR11A4HD out/MR11A4HD --sequence --scale=2`; `COMP=MR11A4HD … SCALE=4 python3 export_v11.py` → `_1360x1120.gif` (2.7 MB) + `_1360x1120.jpg`; MP4 `npx remotion render MR11A4HD … --scale=2 --codec=h264 --crf=16 --pixel-format=yuv420p` (13.0 s, 1.2 MB). Faces stay below native (1085 px source shown 825 px). Before/after: `GBA2026_V11A_v4_HD_before_after.png`.

## Version 5 — WHEN ALL ELSE FAILS centred (16:43, James chose A; `MR11A5` / `MR11A5HD` → `Banner11v5.tsx`)
- v4 + the WHEN beat fixed: it sat 4.5 px low (v4 moved the column down 4 px but WHEN kept 242 + DY while the free space ends at 278). Now the ink is centred at y 243.5 (free space 209–278), 192 px wide (slam 1.1 → 211 px ≤ zone).
- Option B (two-line heavy 3D chrome "WHEN ALL / ELSE FAILS,", `public/v11a/when2_chrome.png` from `design/whentest/when3d.mjs`) is kept as prop `whenV="b"` — ChatGPT R18 and Claude chose it; if used, slam peak 1.05.
Export: `COMP=MR11A5 TAG=V11A_v5_WHEN_Centred JPG_AT=140 python3 export_v11.py` (+ `SCALE=2`; `COMP=MR11A5HD … SCALE=4`); MP4 `npx remotion render MR11A5HD … --scale=2 --codec=h264 --crf=16 --pixel-format=yuv420p`.
Result: GIF 1× 310 KB, @2x 908 KB, 1360×1120 GIF 2.9 MB + MP4 13.0 s. Snapshot `19th Oct 2026 - V11A Version 5/`.

## Version 5B — WHEN as a two-line 3D chrome block (17:30, for comparison; `MR11A5B` / `MR11A5BHD`)
- Same as Version 5 except the WHEN beat: `when2_chrome.png` (Anton heavy chrome, 2 px steel extrusion), 62 px tall, centred (y 212.5–273.3), slam peak 1.05 (ChatGPT R18) → peak y 211–274.8, inside 209–278. All frames after 1.5 s identical to Version 5.
Export: `COMP=MR11A5B TAG=V11A_v5B_WHEN_Two_Line_Chrome JPG_AT=140 python3 export_v11.py` (+ `SCALE=2`; `COMP=MR11A5BHD … SCALE=4`). Result: GIF 1× 353 KB, @2x 917 KB, 1360 GIF 2.4 MB, MP4 13.0 s.
## Phone HD set (17:25–17:30, James "我在手机看不清楚")
- `手机高清_Phone_HD/`: for A (v5) and B (v5B) — MP4 1360×1120 H.264 High, `-movflags +faststart`, crf 14; 5 key stills 1360×1120 (frames 12 / 30 / 84 / 110 / 150 of the HD render); A-over-B portrait comparison video 1360×2420 (labels on top of each) and the WHEN comparison still.

## Variations for short attention + phone (19:20, James 19:04) — `Variations/`
- VAR1 熄灯天光 Blackout → light from the rainbow (`BannerVar1.tsx`, `MR11VAR1` / `MR11VAR1HD`): dark base = `VARIANT=v9b V11H=band6 DSF=2|4 DIMBG=0.24 node render10.mjs mr_f3` (plate only: brightness .24, saturate .55) + the rainbow band copied back from the lit base (`design/bow_track_340.json`, per-angle cubic fit, r ∈ [rc−8, rc+9], 1.5 px feather) → `public/v11a/mr_base_hl_dark@2x/@4x.png`. Flicker-out 0–0.67 s, WHEN (two-line chrome) 0.5 s, TRY 1.75 s, light spreads from (170, 50) 1.85–2.85 s, then v5.
- VAR2 大字逐个砸 Big word punch (`BannerVar2.tsx`, `MR11VAR2` / `MR11VAR2HD`): `kw_*.png` (silver: `LINES=… OUT=… node design/whentest/when3d.mjs`; gold: cut from try_l1 / name.png at their word gaps, try_l2), beats 0/.42/.83/1.33/1.75/2.17/2.67/2.92/3.25 s, lock-in 3.75 s, BANG 7.0/7.5/8.0 + email, still 8.5–13.
Export: `COMP=MR11VAR1 TAG=V11_VAR1_Blackout_Rainbow_Light JPG_AT=140 python3 export_v11.py` (+ `SCALE=2`; `COMP=MR11VAR1HD … SCALE=4`); same for VAR2 (`V11_VAR2_Big_Word_Punch`). Results: VAR1 GIF 1× 463 KB / @2x 2.4 MB / 1360 3.6 MB; VAR2 368 KB / 1.05 MB / 2.8 MB; MP4s 13.0 s.
