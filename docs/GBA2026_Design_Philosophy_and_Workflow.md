# GBA 2026 — CE Global Banner Design Philosophy & Production Workflow
Consolidated 2026-10-17 23:35 by Claude + ChatGPT GPT-6.1 Pro (chat "Banner animation design"). Baseline = the **approved 340×280 V9C**; other sizes follow this document and still need the boss's approval. Technical detail per element lives in `Version 9\GBA2026_V9C_340x280_Build_Notes.md`.

## 1) Design philosophy (the rules that produced the approved look)
1. One hero per beat; supporting copy never competes with the name.
2. Light surrounds or reflects from letters; it never washes out their faces. No halos, white ripples, continuous shimmer or title shake — ever.
3. Her name (DR. SHEKINAIH SIEW SIN YAP) is always larger than his (DR. J AARON K DAVID).
4. The photo's rainbow is sacred: nothing drawn over it, no cropping changes, titles stay above its apex.
5. Faces and bodies stay unobstructed through every animation.
6. Corner logos fixed: CROWNED EAGLES GLOBAL crest top-left, CE GLOBAL NETWORK INTERNATIONAL PTE LTD tile top-right, same size, same level.
7. Luxury comes from polished material, strong silhouettes and controlled motion — not from more effects.
8. One CTA (CONTACT DR. SHEKINAIH); the email supports it, never competes with it.
9. GIF economics: one moving region per beat, then a clean hold.
10. Text is never cramped: even spacing, centred blocks, every word readable at 100 % on a phone.
11. Judge the exported banner at actual size, never only an enlarged preview.
12. Confidentiality: no phone number, no award wording, no financial figures on any creative.

## 2) Visual system
- **Palette**: gold #FFF9E6 / #EFC566 / #CF9635 (highlight / mid / shadow); silver #FFFFFF / #C9CFD8 / #98A1AE; band #040817; job titles #F4F1EA.
- **Type**: Bodoni Moda 900 for typeset gold titles and the company name; Barlow Condensed 600 for labels, CONTACT and the email; Roboto/Sans 700 for job titles. The approved hero words are **generated 3D polished-gold PNGs** (chunky condensed block capitals) — reuse those PNGs for consistency rather than re-typesetting.
- **Silver**: WHEN ALL ELSE FAILS, · FULLY BACKED BY · POWER OF · CONTACT (silver with a gold trim) · DR. J AARON K DAVID · company name · "Write to:" label.
- **Gold**: DR. SHEKINAIH / SIEW SIN YAP · HEAVEN · BANG! · HEAVEN THRONE ROOM MINISTRY · email address (pale gold #FFF3C4).
- **3D lettering prompt template (ChatGPT image gen)**: *Transparent PNG, approximately 2048 px wide. Exact text: "[TEXT]"; layout: [ONE LINE / EXACT LINE BREAKS]. Luxury polished 3D [GOLD / SILVER] heavy condensed block capitals; bright mirror-polished faces, precise bevel, chunky dark extrusion visible slightly underneath. Nearly straight-on, slight low angle. Pristine smooth metal; no cracks, forged texture, halos, background, sparkles, extra text or watermark. Clear counters, safe margins, readable silhouette. For two-line names, identical cap height on both lines. Capital D has a flat left stem and right-hand bowl.* Then verify spelling, alpha and real dimensions; trim transparent padding (alpha > 40 bbox) without clipping the extrusion; never stretch.

## 3) Motion grammar (Remotion, 12 fps, timings snapped to frames)
- **Landing**: 0–0.25 s scale 1.08→0.995, 0.25–0.5 s →1; blur 0.6→0 px; opacity 0→1 in 0.167 s; easing cubic-bezier(.16,1,.3,1) then ease-out. Tracking-in only on live text (CONTACT), never on flattened PNGs.
- **Sparkle comet**: one gold comet, 1.25 turns over ~1.6 s (19 frames), white 4-point star head, fading tail, clipped to the word's own zone; trail stays outside the letters.
- **Glint**: 18° from vertical, 10 % of word width, gold, alpha-masked to the letters, ≤0.45 opacity, ≤0.7 s, once.
- **BANG!**: three.js textured metallic planes (metalness .85, roughness .28) — stamp from −0.6 rad tilt to flat in 0.25 s with a gold point-light sweep; two/three words move under one parent transform so they shake together.
- Sequence = landing → comet → glint → unchanged hold. Nothing else moves during a hold.

## 4) Timeline template (16 s loop)
| Time | Beat |
|---|---|
| 0–2 | WHEN ALL ELSE FAILS, (silver) slams in |
| 2–7 | CONTACT (silver) over DR. SHEKINAIH (3D gold): landing, comet, glint, hold |
| 7–8.5 | FULLY BACKED BY (silver); **"Write to: ceg@crownedeaglesglobal.org" appears only from 7 s** and stays |
| 8.5–10.5 | POWER OF (silver) / HEAVEN (gold) |
| 10.5 / 11.5 / 12.5 | BANG! → BANG! BANG! → BANG! BANG! BANG!, shaking together |
| 13–15 | HEAVEN THRONE ROOM MINISTRY (static above the rainbow from frame 1): comet, then glint |
| 15–16 | clean final hold, loop |

## 5) Production workflow
Claude storyboard → ChatGPT critique → ChatGPT element generation (transparent PNG ~2048 px, downloaded to `photos\ai_assets\`) → Claude layout (`design/render10.mjs` base frame, `design/v6layers.mjs` text layers) → Remotion + three.js animation (`remotion/src/Banner9.tsx`, `CtaTitle.tsx`, `SparkleOrbit.tsx`, `Bang3D.tsx`) → `design/export_v6.py` GIF with one shared 256-colour palette (dither frame 1 only, store changed regions) → frame check at 100 % (contact sheet) → boss review → approved rules into `GBA2026_Context.md` / `SKILL.md` / build notes → `_repo\gba_repo` → GitHub. Deliver each approved size as: 1× GIF (slot), @2x GIF (Retina), 1360-wide MP4 + JPG (phone/desktop), frame-1 JPG, review sheet.

## 6) QA before sending
- CEG crest top-left, CE tile top-right, in the sky beside the rainbow, same size.
- Nothing over faces/bodies; rainbow untouched; ministry title above the arch.
- Email readable, absent before 7 s; exactly one CTA.
- Her name larger than his; spelling, silver/gold hierarchy and line breaks correct; blocks centred and evenly spaced.
- No phone number, award wording or financial figures.
- Exact output size; loop clean; shared palette; no halos/ripples; BANG words shake as a group.
- Checked at 100 % on desktop and phone; byte size within the publisher's limit.

## 7) Carrying it to the other sizes (proposed, needs approval)
- **728×90 leaderboard** (top of page, scrolled past fast): 8-second loop, CTA visible from frame 1, supporting beats at 0 / 3 / 4 s, BANG escalation 5 / 5.5 / 6 s, hold to 8. Keep crest x 10–86, text x 110–322, ministry (3D, two lines) in the zone x 326–444, photo from x 450 with faces x 569–700 protected. Her name is the hero: 20–28 px cap height, own column. Slam row y 63–89; email in the zone or shown 7–8 s only; drop the job titles if space is short.
- **1000×500 ad / 2000×800 cover**: keep the 16-second hierarchy; recompose rather than enlarge; use the extra room for breathing space, readable names and email; keep corner logos, protected photo regions and ministry-above-rainbow.

## 8) Lessons paid for (don't repeat)
White light over text washes it out (rejected twice) · grey/white light bands band in a 256-colour GIF · moving two regions in one beat triples the file · forged/cracked letters read as cheap next to polished 3D gold · the 340 band is only ~106 px high: her name max ≈ 208 px wide with CONTACT above · deliver @2x/MP4 for phone sharpness, the slot GIF alone always looks soft on a phone.
