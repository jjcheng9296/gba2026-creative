---
name: ce-global-award-creative
description: Use for ANY award artwork or write-up for CE Global / DR SHEKINAIH SIEW SIN YAP / DR J AARON K DAVID (Golden Bull, capital.asia banners, cover, ad, 728x90, 340x280, GIF, Word dossier, rainbow backgrounds, mock site, Vercel) — James's rules, QA gate, pipeline, mistakes log.
version: 2026-10-17 02:00 (v23)
---

# CE Global award creatives — house rules (James, 16–17 Oct 2026, v22)

Use for any award winner cover, advertisement, banner, GIF, social graphic or winner write-up for CE GLOBAL NETWORK INTERNATIONAL PTE LTD or its founders (Golden Bull, SBA, E50, BrandLaureate…). Reply to James in Chinese, plain words. Show the image, then one line on what changed. Overwrite the live file in place (no _V01); James wants NO old versions kept — delete superseded options when he says so; a dated snapshot subfolder ("17th Oct 2026 - Version 1") only when he asks. Do not produce or send anything James did not ask for. No external announcement before the award ceremony. Standard: "professional without mistakes" — one visible flaw (a clipped rainbow, a head touching text, a banded sky) is a rejected piece, however good the rest is.

## 00. Obsidian vault (memory layer, from 2026-10-18)
Vault root = `F:\Golden bull award preparation 2026`. Start: `00_HOME.md` → `_VAULT/00_Hubs/HOME.md` → latest `_VAULT/07_Sessions/SES-*` → `03_Docs/GBA2026_Context.md`. Fonts/colours/motion = `_VAULT/04_Design_System/TOK-*` (index: `Design System`); red lines = `RULE-*`. Every boss comment → `FB-` note; every change → `REV-` note; choices → `DEC-`; lessons → `Skill Improvement Log`; end with a `SES-` handoff (templates in `_VAULT/08_Templates`). Notes are named by ID so wikilinks resolve by filename; move/rename notes only inside Obsidian.

## 00a. 728×90 rules (James 2026-10-18, V10 in review) — differ from the 340
- Both logos LEFT side by side (CEG crest then CE tile, 56×56, same level). Masthead across the top (x 6–546, ends before the rainbow): CROWNED EAGLES GLOBAL = 3D rainbow-gradient letters with gold border; "& CE GLOBAL NETWORK INTERNATIONAL PTE LTD" = 3D silver with gold border (both ChatGPT PNGs, `v10_*`). Gold rule under it.
- Big middle stage x 150–500 / y 29–87: every phrase is a ChatGPT WIDE/extended 3D lettering that fills the stage width — never scale letters in CSS. Sequence and colours as the 340; POWER OF (silver, 60 %) + HEAVEN (gold, extended) horizontal; HEAVEN THRONE ROOM MINISTRY one line; BANG ×3 fill the stage. Email from the FULLY beat at y 75–87. Photo/rainbow x ≥ 500 untouched.
- 15 s loop; CONTACT DR. SHEKINAIH holds 4 s; BANG = 1 hit → 2 quick → 3 quick at 2-frame spacing with the "eruption from beneath" (underlight, ember streaks, band fissures, lava glow — amber, never white, never on letters). Ring/flash sized to the wide words. Deliver 1× GIF, @2x GIF, 2912×360 MP4 + JPG.
- Workflow that worked: ChatGPT plan first → static scene sheet loop with James (approve layout before animating) → wide letterings in parallel → Banner10.tsx → export → vault notes (REV/FB/DEC/RUN/SES). Files: `01_Work_728x90_V10\` (draft 1 kept in `Snapshot_V10a_12s_0941\`).

## 0. Before designing (never skip)
1. Read the organiser's checklist for sizes and deadlines; check organiser emails for the real deadline (it can be earlier than the checklist).
2. Read GBA2026_Context.md (compact: facts, current parameters, pending items, lessons), GBA2026_Links_and_Context.md (live links) and WORKFLOW_PLAYBOOK_zh.md in the award work folder (F:\Golden bull award preparation 2026\; copies in C:\Users\chang\Documents\CE_Global_Award_Creative_Skill\). The latest James instruction always wins over this file.
3. Study the organiser's past winners at native size. Golden Bull lesson: the best covers are ONE strong real photo + company name + ONE line.
4. Assets first: full-length high-res founder photos (as FILES), vector logos (AI/SVG/PDF), the upscaled AI background master. Ask James if missing.
5. Check how the asset is displayed on the website: Golden Bull cover ~1521x590 under a 142 px black nav, background-size cover, anchored 50% 100% (top ~3% cropped); capital.asia 728x90 top-right beside the 资本 logo, 340x280 down the right sidebar, WHITE page beside bright blue/white/green competitor ads; readers mostly Chinese, branding/logo impression matters most. Mock the creative inside the page before delivering (section 7).

## 1. Hard rules — every piece, every time
- **Text never touches a human body or face.** Headline ends with clear air before the portraits (shrink headline / move portraits). Nothing over heads. The business line is broken as "SINGAPORE FREIGHT FORWARDING / & LOGISTICS" so it never runs over the Marina Bay scenery.
- **Never crop a head.** Portraits at least waist-up ("normal photo"); head-only crops are rejected as awkward. Lower bodies end inside the bottom band or the frame, never chopped mid-scene.
- **Faces never distorted or AI-fied.** Only sharpness restoration (EDSR / Real-ESRGAN). CodeFormer/GFPGAN faces rejected. Never change human look or shape; never show a person larger than native pixels.
- **Exactly ONE rainbow per piece, a complete arch, IN THE PHOTOGRAPH, never drawn, never extended.** Both legs inside the frame (at worst landing on the frame edges, as in the master itself), the arch across the Marina Bay Sands "ship" (it gives people hope), and the whole arch ABOVE both heads. Rule of numbers: apex >= 11% of the frame height below the top edge (cover >= 12%, because the site crops the top), and the arch's INNER edge >= 3% of frame height above the highest head. `qa_check.py` enforces this — never export a FAIL.
- **Use the generated photo fully**: one master plate for every size, full-frame or edge-anchored, no mirrored side fills (seams, double bows). If the bow needs more headroom, push the photo DOWN and fill the gap with the photo's own top 5% of sky, mildly stretched (~1.9x) + blur 1.2 — never the top 1% smeared, never a flat colour.
- **Natural grade only**: the client approved the RAW AI plate; render it at brightness 1.0 / contrast 1.03 / saturate 1.08, warm glows at <= .12, NO top darkening gradient on small banners, NO colour-recolour layers on water. Boosted saturation turns the bow into neon and the sky into a glowing dome ("背景不自然"); a top gradient reads as a flat band.
- **Background covers the whole canvas**, top included, and must be sharp: AI backgrounds (~2172 px) are upscaled 4x with Real-ESRGAN (face-restore `upscale`); master 6000 px wide.
- **Gold is rationed**: only the company name, the headline (PROMISE DELIVERED / SHEKINAIH), HEAVEN THRONE ROOM MINISTRY, the ministry plaque and DR SHEKINAIH's name. Everything else white / soft white. DR J AARON K DAVID in shiny metallic silver.
- **One display face for every gold text** = the PROMISE DELIVERED treatment: Bodoni Moda 900 uppercase, champagne-gold gradient, drop shadow (`.bd gold gsh2`). White labels in the same face; emails/titles in Manrope. Headline >= 4.5x body size.
- **Names**: FULL CAPITALS, exact titles — DR SHEKINAIH SIEW SIN YAP, Founder & Managing Director; DR J AARON K DAVID, Chief Advisory & Support Officer (NOT Co-Founder of the Pte Ltd; co-founder only of CE Global Network LLP). Stacked: DR SHEKINAIH ABOVE, always one size larger and gold (impact); DR J AARON K DAVID below in silver. Left-aligned, on their own plaque area, never over bodies.
- **Logos**: both, slightly large, on one line: CEG crest LEFT, CE Global tile RIGHT. GIF frames show only the logo that belongs to the frame (CE Global = logistics, CEG crest = ministry).
- **No award mention on creatives** ("Golden Bull Award 2026 Winner" and award names are not important). Keep them only inside the Word dossier.
- **Brand line (the boss, 17 Oct 2026, for every banner)**: "WHEN ALL ELSE FAILS, CONTACT DR SHEKINAIH — BECAUSE FULLY BACKED BY THE POWER OF HEAVEN!" (her words add "BANG! BANG! BANG!" for impact). **HEAVEN THRONE ROOM MINISTRY is compulsory on every banner set** (James, 17 Oct 10:32): the hook frame = CEG crest + WHEN ALL ELSE FAILS, CONTACT DR SHEKINAIH (silver) + HEAVEN THRONE ROOM MINISTRY (gold, biggest) + Fully backed by the power of Heaven (white small); no logistics icons on that frame. Use DR before SHEKINAIH; the hook frame carries the full line (silver first line, gold CONTACT DR SHEKINAIH, white small "Fully backed by the power of Heaven"). V4 = V3 structure with this hook; Chinese: 万策皆尽时 · 请找 SHEKINAIH 博士 · 天上大能 · 全力护航.
- **Slogan**: PROMISE DELIVERED, NO full stop. Live cover headline: WHEN ALL / ELSE FAILS, / CONTACT SHEKINAIH — silver for WHEN ALL ELSE FAILS, CONTACT; gold only for SHEKINAIH. Ads add SEA · AIR · HAULAGE · WAREHOUSING · ECOMMERCE under the business line.

## 2. Contact bar and the one call to action (ad 1000x500)
- CONTACT US bar with TWO contacts, emails only (no website addresses): FREIGHT & LOGISTICS (white) shipping@ceglobalnetworkinternational.com | HEAVEN THRONE ROOM MINISTRY (gold) ceg@crownedeaglesglobal.org. Emails 18 px white bold.
- ONE CTA, belonging to the ministry: two-line statement plaque "WHEN ALL ELSE FAILS, / CONTACT SHEKINAIH" — dark glass fill, 1 px gold frame, four gold corner ticks, gold Bodoni action line, no arrow, no glow — centred in the middle column between the contact block and the names. Never a glossy yellow pill / web button. No "Get a quote" / "Ship with confidence".
- Cover: no CTA, no email.

## 3a. Animated-banner rules learned from top-brand practice (17 Oct 2026 research — lineardesign, inboundrem, B2W, BannerBoo, eye-tracking study)
- Viewers give a banner 1–2 s: **design the first frame as if it were the only frame** — logo + hook + a contact visible from frame 1; some placements show only the first/last frame.
- One message per frame, ≤4 words; **only one element moves** (the headline line); background, logo and portraits stay fixed. "When everything moves, nothing reads as important."
- Three beats: hook (the buyer's problem: WHEN ALL ELSE FAILS, CONTACT SHEKINAIH) → turn (PROMISE DELIVERED + sea/air/haulage/warehouse icons) → payoff (CONTACT US + envelope + email + logo). Last frame = logo + the one CTA, held longest, and it must cut back cleanly to frame 1 (seamless loop).
- Symbols over sentences: the business line becomes four gold line icons; the company name is carried by the logo (bigger), not by text, on banners.
- File ≤150 KB (network ceiling); GIF is 256 colours, so shorten the loop rather than remove detail; CTA never only on the last frame.
- Data: animated vs static CTR is roughly equal in recent split tests; animation buys dwell time and recall, not clicks — the content (hook, logo, face) decides. Chinese readers on capital.asia: a 4-character Chinese line (承诺必达) reads 3x faster than the English headline; keep SHEKINAIH's name in English on the plaque (it is the brand).
- Versions: V1 = original three-frame text GIF; V2 = fewer words + icons (+ Chinese); V3 = first-frame-complete, three-beat, one-moving-element (+ Chinese). Each saved in its own "17th Oct 2026 - Version N" subfolder; the master folder holds the live V1 files until James picks.

## 3. GIF banners (728x90, 340x280) — three frames, 2.5 / 2.5 / 3 s loop
1. PROMISE DELIVERED + business line + shipping@ (CE Global logo only).
2. CONTACT US FOR LOGISTICS SOLUTIONS + CE GLOBAL NETWORK INTERNATIONAL PTE LTD (gold) + shipping@ (CE Global logo only).
3. CONTACT US FOR HEAVEN THRONE ROOM MINISTRY (biggest gold text) + ceg@ + plaque (CEG crest only).
- Words big and readable; portraits waist-up, heads uncropped, rainbow above heads. Static JPG = frame 1.
- GIF encoding: **libimagequant per frame** (`pip install imagequant`; `quantize_pil_image(frame, dithering_level=0.5, max_colors=256)`), saved with Pillow (local palette per frame, duration [2500,2500,3000], loop 0, disposal 1). ffmpeg palettegen/paletteuse with any dither posterises the night sky inside the bow into a flat blue band — rejected. Never PIL's own quantize (blotchy faces). JPG q95 4:4:4 + 72 dpi tag.
- Banner backgrounds: `fill='navy'` (plain #06091A beside the photo), never mirrored copies; no hard-edged overlay divs (a spotlight-cone div with a straight top edge showed as a "line" in the 340x280).

## 4. Pipeline (scripts/ in the skill folder; live copy /home/claude/gba in the session)
- render10.mjs: HTML/CSS + inline SVG, Playwright Chromium @2x. Writes out10/geometry.json and ONLY the @2x PNGs. Cover headline switch: `CHEAD='PROMISE|DELIVERED' node render10.mjs cover`.
- qa_check.py: the gate (section 1 numbers) — run after every render; FAIL = fix the layout, never ship.
- export10.py: Lanczos + unsharp -> 1x PNG previews (look at these, never the stale ones), JPG, libimagequant GIF; `--final` writes the live files. Run it before looking at anything.
- build_docx.js: Word dossier from article.md (company table, justified body, embedded creatives) — rebuild whenever a creative changes.
- refine.py: cut-out refinement (alpha erode, edge decontamination, colour match, gold rim light).
- Backgrounds: ChatGPT project "GBA 2026 – CE Global Creative Studio" (GPT-6 Pro, James's account, via Claude in Chrome), chat "Generate Marina Bay Background". Prompt rules: photorealistic, 24mm, long exposure, cinematic grading, no people/text/logos/watermark, left third dark for the headline, ONE complete rainbow arch with both legs inside the frame and clear sky above the apex; ask it to improve the prompt, generate at each slot's NATIVE ratio (2.5:1, 2:1, 6:5, 8:1); download every variant (image share dialog -> Download -> PowerShell move) into photos\ai_backgrounds\v2_full_arch\ as source media; Real-ESRGAN 4x on James's PC (C:\Users\chang\ai-tools\face-restore, `upscale`); master 6000 px wide. Measure the master's bow (outer/inner apex rows, circle centre) into MASTERS of qa_check.py.
- Independent critique: upload docx + JPGs to that project; ask for a judge + creative-director review; log in GBA2026_ChatGPT_Critique.md; relay objections to James, but James's decision wins.

## 5. Write-up (Word dossier)
- Direction (James): faith + business, humanised, short sentences a 6th-grader can read, engaging, sharp, strong CTA; readers' faith in the two leaders grows and they make contact. SHEKINAIH prays to the GOD OF THE UNIVERSE and Heaven brings the business; DR J AARON K DAVID builds the faith and leadership (support). Include "WHEN ALL ELSE FAILS, TRY SHEKINAIH" and END with an explicit "How to contact them" block: shipping@ (freight), ceg@ (ministry) and the founders' website www.shekinaihsiewsinyap-jaaronkdavid.com. Body text justified (Word and mock page). ~1,000–1,300 words (limit 2,000). Style from SHEKINAIH_Magazine_Study.md: her verbatim published quotes in FULL CAPITALS, heads written as claims.
- Facts only from verified sources: James's figures (LLP FY2023–25 [figure withheld], unaudited; Pte Ltd incorporated Apr 2026, operating Jul 2026), her published features, shekinaihsiewsinyap-jaaronkdavid.com (MegaSuccess LA 2025, Italy 2026, Dubai Oct 2026, D&B page). Never invent numbers, customers, quotes; "first financial reporting period ends 31 Dec 2026"; "profit" not "profit after tax" for the LLP; keep "CE Global Network LLP" beside historical figures; no faith-based revenue predictions; a paid press release is not an editorial citation; doctorates only with verified status wording, checked against certificates.
- **Never publish real financial figures** (turnover, profit, margins, S$ amounts, growth percentages) in the write-up, mock pages or anything public — James, 17 Oct 2026. Describe growth in words ("grew every year", "stayed profitable", "doubled in a year"). Figures stay in the private Context file only. Tell ChatGPT the same at the top of every critique prompt: "do not quote, repeat or infer real revenue/profit numbers; treat all figures as confidential".
- Judges want evidence: chronology, growth story, one documented decision per leader, one measured digital workflow. Workflow: facts -> research -> draft -> copy-proof check -> anti-AI-writing review -> ChatGPT critique -> build_docx.js -> overwrite.

## 6. Checklist before showing James
qa_check.py PASS · export run, 1x previews fresh · faces sharp at 100% · one rainbow, full arch, in the photo, above heads, sky above the apex · sky even (no band, no dome, no seam at the strip) · background sharp and covering · text clear of bodies and scenery · heads uncropped · gold rationed · all gold in Bodoni · SHEKINAIH gold above and larger, DAVID silver · plaque centred · every GIF frame checked at 1x and 3x · 72 dpi · docx rebuilt · files overwritten in place (+ dated snapshot if asked) · Context.md updated · mock site + Vercel + Artifact republished.

## 7. Placement test and publishing
- Mock pages (GBA2026_Mock_Site\index.html = capital.asia layout with our GIFs in the real slots next to bright placeholder ads; winner.html = goldenbullaward winner page with the cover cropped the way the site does, article justified) — LOOK at the creatives there before showing James; that is where the clipped rainbow was caught.
- Publish: Vercel from James's PC, CLI already logged in (npx cache vercel@62.2.0, account jjcheng9296): in the folder `npx vercel@62.2.0 link --yes --project gba2026-mock-site` once, then `npx vercel@62.2.0 deploy --prod --yes`; protection off via `npx vercel@62.2.0 api /v9/projects/<name> --method PATCH --input <json with "ssoProtection": null>`; vercel.json sets X-Robots-Tag noindex; delete the .env.local the CLI leaves behind. Never type or move a token yourself. The Vercel MCP connector is a different account (team support-2291s-projects) and its upload path needs base64 — don't use it for files. The claude.ai Artifact is the backup (sharing is set from the page's Share menu).
- Live links: https://gba2026-mock-site.vercel.app/ and /winner.html; Artifact https://claude.ai/artifact/PwCe8iu8tBek7QRdcwegYk. After a redeploy verify the served file size equals the local file; tell James Ctrl+F5 if his browser caches.

## 8. Rainbow placement, final (v22)
Master: aibg_arch5.jpg (6000x2399, "Rainbow Over Marina Bay at Night-5", James's pick — bow outer apex y198, inner y232, centre cx4276 cy1936) for ALL sizes; the 4:3 plate B is retired (its bow is wider than a 340 frame and its sky looked painted). Placements with `arch(k, cxCss, oy, extra, fill, M)`: cover k1/3 cx1425 oy56, portraits s0.45 fx1181 fy196; ad k1/6 cx712.67 oy30, s0.30 fx595 fy86; 728x90 k0.062 right-anchored oy4, s0.09 fy28; 340x280 k0.0986 (plate's right edge = frame edge) cx170 oy22, s0.19 fx126 fy54. Any drawn-arc values are obsolete.

## 9. Mistakes log — read so they are not repeated
- Drew rainbows over photos -> double bows and "awkward extensions". Fix: photo-only bow.
- Mirrored side fills on banners -> visible seam / second bow. Fix: navy fill.
- Hard-edged spotlight div in 340x280 -> a straight "line" across the sky. Fix: removed; soft radial glows only.
- Pushed the plate to the top edge; apex 8% from the top and the site crops 3% -> "rainbow cut by the top". Fix: headroom rule + sky strip + qa_check.py.
- Ad: DR DAVID's head sat inside the bow band, unnoticed until measured. Fix: the 3% inner-edge clearance check.
- Over-graded the photo (saturate 1.35 + warm glow domes + gold water recolour) -> "背景不自然". Fix: near-neutral grade, no haze layers.
- Top darkening gradient + top-1% smeared sky strip on the 340x280 -> flat band at the top. Fix: no top gradient, 5% real-sky strip.
- ffmpeg palette GIF -> sky posterised into a band ("GIF not even"). Fix: libimagequant.
- Viewed stale 1x previews (render10 writes only @2x). Fix: export before looking.
- Yellow pill CTA, "Get a quote", award badges, website lines, three CTAs -> all rejected; keep two emails and one plaque.


## 固定版位 + 动画顺序（老板 2026-10-17 21:25）
- Logo：CROWNED EAGLES GLOBAL 在左、CE GLOBAL NETWORK INTERNATIONAL PTE LTD 在右，可占左上角 + 右上角（天空区）。CEG 在左 / CE Global 在右，任何尺寸都一样。
- 顺序："WHEN ALL ELSE FAILS," 像 BANG! 一样砸进来 → "CONTACT DR. SHEKINAIH" 大面积高亮、最有冲击力 → 其余固定。

- 340×280（22:17）：DR SHEKINAIH SIEW SIN YAP 名字永远比 DR J AARON K DAVID 大很多；名字块居中等距；右栏不放铭牌；FULLY BACKED BY 银、POWER OF 银 + HEAVEN 大金；两 Logo 同尺寸同水平线；邮箱 Write to: 离底边 ≥7 px；文字不许挤。

- V9C（22:57）：重点字一律 ChatGPT 3D 抛光金字（无裂纹）；动效只有"落地 + 星尘绕字 + 一道金光"，禁止白涟漪/白光团/光晕/抖动，字不被遮；部长标题单行不碰彩虹；邮箱 7 s 后出现；右栏全名同款 3D 金。

- 23:40：定稿规则与工作流见 `GBA2026_Design_Philosophy_and_Workflow.md`（12 条设计原则、调色/字体、3D 金字提示词模板、动效语法、16 s 时间轴、QA 清单、其他尺寸的搬法）；逐元素细节见 `Version 9\GBA2026_V9C_340x280_Build_Notes.md`。每个尺寸交付 1× GIF + @2x GIF + 1360 宽 MP4/JPG。
