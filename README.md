# GBA 2026 — CE Global Network International · award creative repo

Golden Bull Award 2026 "Prestige" dossier for **CE GLOBAL NETWORK INTERNATIONAL PTE LTD** (Singapore freight forwarding & logistics) and its two principals **DR SHEKINAIH SIEW SIN YAP** (Founder & Managing Director) and **DR J AARON K DAVID** (Chief Advisory & Support Officer). Built by James Chen with Claude (Oct 2026). This repo lets the work continue on another computer (Codex, Claude Code, or by hand).

Deadline for the organiser (Jason Ooi, BMI): **31 Dec 2026**. Ceremony: **12 Nov 2026, Marina Bay Sands**. **No external announcement before the ceremony.** Placement: capital.asia (white page, Chinese-reading business audience) and goldenbullaward.com winner page.

## Confidentiality (hard rule)
Never put CE Global's real revenue / profit / margin figures in any public material — banners, write-up, mock site, ChatGPT prompts, or this repo. Growth is described in words only. The figures live only in James's private Context file on his PC. All copies here are redacted.

## What is in here
| Path | What |
|---|---|
| `docs/GBA2026_Design_Philosophy_and_Workflow.md` | **The consolidated design philosophy + production workflow** (12 principles, palette/type, 3D-gold prompt template, motion grammar, 16 s timeline, QA, how to carry to other sizes). |
| `docs/GBA2026_V9C_340x280_Build_Notes.md` | Element-by-element build of the approved 340×280. |
| `docs/GBA2026_Context.md` | **Read first.** Compact project context (Chinese): facts, deliverable status, design parameters, James's hard rules, pipeline, pending items, lessons. v26, 2026-10-17. |
| `docs/SKILL.md`, `docs/WORKFLOW_PLAYBOOK_zh.md` | The working rules and the step-by-step playbook (what to read, the QA gate, the publish steps). |
| `docs/GBA2026_ChatGPT_Critique.md` | All GPT-6 Pro critiques and specs (placement test, three animation concepts, the "Gold Detonation" BANG! spec). |
| `docs/GBA2026_ChatGPT_GIF_Brief.md` | Self-contained brief to hand to any AI/video tool to generate the BANG! animation. |
| `docs/GBA2026_Links_and_Context.md`, `docs/GBA2026_Context_history_v8-v22.md` | Links (Vercel, Artifact, ChatGPT chats) and the version history. |
| `docs/SHEKINAIH_Magazine_Study.md` | Research notes on the published magazine features. |
| `writeup/article_v7.md` | The current write-up (≈1,300 words, faith + business, no figures, ends with **How to contact them**). Older drafts kept for reference (redacted). |
| `writeup/build_docx.js` | article.md → Word dossier (justified body, creatives embedded). Needs `npm i docx`. |
| `design/render10.mjs` | The whole layout: cover 2000×800, ad 1000×500, banners 728×90 and 340×280, all variants. Playwright renders @2x PNGs. |
| `design/export10.py` | Downsample (Lanczos + unsharp) → JPG q95 4:4:4 72 dpi; GIF via libimagequant per-frame palettes; frame timings per variant. |
| `design/qa_check.py` | QA gate: rainbow apex ≥ 11 % below the top (cover ≥ 12 %), arch inner edge ≥ 3 % above each head. **Do not ship if it fails.** |
| `design/*.jpg, *.png` | Masters used by render10: `aibg_arch5.jpg` (6000×2399 night Marina Bay with ONE complete photographic rainbow — the only background), `founders_red_hd.png`, `shekinaih_gold_hd.png`, `ceg_logo.png` (Crowned Eagles crest), `logo.jpg` (CE Global tile), `aibg_marina.jpg`. |
| `final/` | Live V1 deliverables (cover, ad, 728×90 + 340×280 JPG/GIF, Word dossier) and the variant sub-folders `v2…v5f`, `v6` (V6.2 Three Strikes, Remotion), `v7` (7 companies), `v8` (BANG! slammed ×3). |
| `remotion/` | Remotion project (12 fps) for V6/V8: `src/Banner.tsx` (compositions LB/MR = gate mode, LB8/MR8 = bang mode), `remotion.config.ts`. Layers come from `design/v6layers.mjs` + `assets/`. |
| `assets/` | ChatGPT-generated PNG plates: gate_state1..4 (RGBA), bang_A/B/C lettering (B forged gold is the one in use), heaven_A/B strips, fw_stage1..4 fireworks (black bg, for v5g). |
| `site/` | Mock capital.asia page (`index.html`) and winner page (`winner.html`) with web copies of the assets. Live at https://gba2026-mock-site.vercel.app/ and /winner.html (public, noindex). |
| `photos/`, `logo/` | Source photos and logos. |

## How to run the design pipeline
```bash
cd design
npm install                      # fonts (@fontsource/*) — Playwright must be available: npm i playwright && npx playwright install chromium
pip install pillow imagequant    # export + GIF quantiser
node render10.mjs                # V1 → out10/*@2x.png (only @2x — nothing to look at until export runs)
python3 qa_check.py              # must print QA PASS
python3 export10.py --final      # 1x PNG previews + JPG/GIF into final/
VARIANT=v5f node render10.mjs && VARIANT=v5f python3 export10.py --final   # any variant → final/v5f/
```
`render10.mjs` imports Playwright from `/opt/npm-tools/node_modules/playwright/index.js` (line 6) — change that import to `playwright` after `npm i playwright`. Variants: `VARIANT=` '' (V1) · `v2`/`v2zh` · `v3`/`v3zh` · `v4`/`v4zh` · `v5a` Light from Above · `v5b` Crowned Signature · `v5c` Three Rings · `v5d` Light + BANG · `v5e` Gold Fireworks + BANG · `v5f` Gold Detonation (9 frames) · `v5g` Real Firework (needs `design/fw_stage1..4.png`, black-background gold firework plates, screen-blended — not yet supplied). Add `zh` for the Chinese line.

Publish (from James's PC): copy finals to `F:\Golden bull award preparation 2026\` (+ dated `Version N` sub-folder when asked), copy web assets to `site/assets`, then in the mock-site folder `npx --yes vercel@62.2.0 deploy --prod --yes` (CLI logged in as jjcheng9296; project gba2026-mock-site).

## James's hard rules (one-line version — full list in docs/SKILL.md)
Text never over bodies or faces; never crop heads (half-body minimum); faces never reshaped; ONE complete rainbow that is in the photo (never redrawn, extended or pulsed), above both heads, feet inside the frame, apex ≥ 11 % from the top; background covers the whole frame, original photo grading (no extra saturation, no top darkening); gold only for company name / headline / ministry / plaque / her name, DAVID in silver; both logos on one line (CEG left, CE Global right); no award mention on creatives; "PROMISE DELIVERED" without a full stop; business line "SINGAPORE FREIGHT FORWARDING / & LOGISTICS" on two lines; footer = two emails + one ministry plaque only (no yellow buttons, no "Get a quote", no URL line); overwrite files in place, no `_V01` copies; never produce unrequested files; replies to James in Chinese; names in FULL CAPITALS.

Brand line (the boss, 2026-10-17): **"WHEN ALL ELSE FAILS, CONTACT DR SHEKINAIH — BECAUSE FULLY BACKED BY THE POWER OF HEAVEN! BANG! BANG! BANG!"** — HEAVEN THRONE ROOM MINISTRY is compulsory on every banner set. Contact: shipping@ceglobalnetworkinternational.com · ceg@crownedeaglesglobal.org · +65 8161 5672 · www.shekinaihsiewsinyap-jaaronkdavid.com.

## V9C 340×280 — approved (2026-10-17 23:23)
The approved capital.asia banner. Everything about it — elements, fonts, positions, timeline, commands — is in **`docs/GBA2026_V9C_340x280_Build_Notes.md`**. Source: `remotion/src/Banner9.tsx` (rev "b"), `CtaTitle.tsx`, `SparkleOrbit.tsx`, `Bang3D.tsx`; assets `assets/v9c_*.png` (ChatGPT 3D polished-gold letterings) prepared into `remotion/public/v9/`; base frame `design/render10.mjs` with `VARIANT=v9b`; export `VER=V9B python3 design/export_v6.py`. Output `final/v9/`.

## V6 / V8 pipeline (Remotion)
```bash
cd design && VARIANT=v6 node render10.mjs && node v6layers.mjs      # base frames + plaque/BANG layers → remotion/public/v6/
cd ../remotion && npm install
npx remotion render LB  out/LB  --sequence --frames=0,48,78,108-115,116-123,124-133,134 --image-format=png   # also MR, LB8, MR8
cd .. && python3 design/export_v6.py            # V6 → final/v6   (VER=V8 python3 design/export_v6.py → final/v8)
```
`remotion.config.ts` pins a Chromium path; change `setBrowserExecutable` to your own Chrome/Chromium. Gate plates in `remotion/public/v6/gate_{lb,mr}_{1..4}@2x.png` are `assets/gate_state*.png` resized to 248×124 (LB) / centre-cropped to 208×148 (MR); `bangB_<px>@2x.png` are `assets/bang_B_forged_gold.png` trimmed to its alpha box and scaled to 1.5×font-size height.

## Status (2026-10-17 20:15 SGT)
- **V6.2** (Version 6 folder): real ChatGPT gate + forged-gold BANG! ×3 — 728×90 ≈164 KB, 340×280 ≈272 KB. **V8** (Version 8): no gate, one BANG! slammed three times, escalating — ≈162 / 220 KB. **V7** (Version 7): all four sizes with DR SHEKINAIH SIEW SIN YAP · 7 COMPANIES. V1 untouched. Live previews: https://gba2026-mock-site.vercel.app/v6/banner_728x90_v6.gif, …/banner_340x280_v6.gif, …/banner_728x90_v8.gif, …/banner_340x280_v8.gif, …/review_sheet_v6.jpg.
- Lesson: a whole-frame jolt changes every pixel → GIF triples; jolt only the plaque.

## Status (2026-10-17 17:50 SGT)
- **V1 (live)**: 6-frame GIFs (brand → freight contact → ministry → BANG! ×1/2/3), cover + ad + Word dossier; on Vercel + Artifact. 
- **Version 5 folder**: six animation treatments, English only. ChatGPT ranked A > B > C; James asked for "震撼" (impact) → D/E/F. **V5F "Gold Detonation" is the current favourite** (approved direction): firework at the upper-left of the rainbow from frame 1, then three gold detonations in the sky with BANG! BANG! BANG! popping (flash 112 % → settle), 9 frames 4.0/2.5/2.5/0.15/0.55/0.15/0.55/0.20/3.4 s.
- Write-up v7: no figures, justified, ends with How to contact them. Word dossier built.

## Pending / next steps
1. Real firework plates for `v5g`: a black-background gold chrysanthemum firework (4 moments: ignition, half bloom, full bloom, fade) — from ChatGPT image gen (4 images generated, download pending), a CapCut/Seedance 2.0 clip (James generated one, file not yet received), or Veo/Kling via the CoDesign gateway. Save as `design/fw_stage1..4.png`, run `VARIANT=v5g`.
2. Chinese versions of the chosen V5 treatment: BANG! → 砰！砰！砰！ (Noto Serif SC Black); support line 困局当前，信仰引路; ChatGPT also suggests a service line 新加坡国际货运 and advises against 承诺必达 / 保证送达.
3. GIF weight: 6-frame ≈ 208 / 282 KB, 9-frame ≈ 343 / 453 KB. ChatGPT's target ≤ 150 KB needs a shared global palette + stored-changed-regions; only if capital.asia requires it.
4. Decisions for James: cover headline with "DR"? phone number public? which V5 treatment goes live; EIU doctorate wording (press release says four conferred vs dossier two); company photos (10–30, ≥1000 px) and vector logos still missing.
5. Native-ratio background plates (2.5:1, 2:1, 6:5, 8:1) were generated by ChatGPT ("Generate Marina Bay Background" chat) but not yet downloaded.

## Lessons already paid for (don't repeat)
Only the photo's own rainbow (self-drawn arcs look fake); never mirror-fill banner edges; no hard-edged spotlights; keep sky headroom above the arch (web pages crop the top); check the arch clears both heads; original photo grading only; no top gradient + 1 % stretched strip (banding) — use the photo's top 5 % sky; ffmpeg palette GIFs band the sky — use libimagequant; render only writes @2x, always export before looking; yellow pill buttons, award badges, URL lines, three CTAs were all rejected; gold BANG! text on a gold explosion disappears — put explosions in the sky and the words in the band; the 340×280 band is too tight for word + burst.
