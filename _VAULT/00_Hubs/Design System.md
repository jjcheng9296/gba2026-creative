---
type: moc
id: design-system
status: approved
created: 2026-10-17
updated: 2026-10-19
aliases: [fonts, colours, tokens]
tags: [gba2026, moc, design-system]
---
# Design System
Baseline: [[DEL-340x280-V9C]]. Philosophy: [[03_Docs/GBA2026_Design_Philosophy_and_Workflow.md]].

## Colours
| Token | | Value | Use |
|---|---|---|---|
| [[TOK-color-gold-hi]] | color | `#FFF9E6` | Gold highlight (top of gold gradients) |
| [[TOK-color-gold-mid]] | color | `#EFC566` | Gold mid-tone |
| [[TOK-color-gold-shadow]] | color | `#CF9635` | Gold shadow |
| [[TOK-color-gold-pale]] | color | `#FFF3C4` | Pale gold for the email address and glint core |
| [[TOK-color-silver-hi]] | color | `#FFFFFF` | Silver highlight |
| [[TOK-color-silver-mid]] | color | `#C9CFD8` | Silver mid |
| [[TOK-color-silver-lo]] | color | `#98A1AE` | Silver shadow |
| [[TOK-color-band]] | color | `#040817` | Dark band / background behind text |
| [[TOK-color-title-white]] | color | `#F4F1EA` | Job titles (Founder & Managing Director, Chief Advisory & Support Officer) |
| [[TOK-color-trim-gold]] | color | `#E9BC5C / #B98A2E` | 0.6 px gold trim around the silver CONTACT |

## Fonts
| [[TOK-font-bodoni-moda-900]] | font | `Bodoni Moda 900` | Typeset gold titles, company name. File: remotion/public/fonts/bodoni-moda-latin-900-normal.woff2 |
| [[TOK-font-barlow-condensed-600]] | font | `Barlow Condensed 600` | Labels, CONTACT, POWER OF, email line. File: remotion/public/fonts/barlow-condensed-latin-600-normal.woff2 |
| [[TOK-font-roboto-700]] | font | `Roboto / Sans 700` | Job titles, 7–7.4 px at 340×280 |
| [[TOK-lettering-3d-polished]] | lettering | `ChatGPT 3D polished gold/silver block capitals` | Hero words are generated PNGs, not typeset — see Design System prompt template |

Silver vs gold → [[RULE-silver-gold-hierarchy]]. Bodoni = typeset titles; the hero words are **generated 3D PNGs**, reuse them.

## 3D lettering prompt template (ChatGPT image gen)
> Transparent PNG, approximately 2048 px wide. Exact text: "[TEXT]"; layout: [ONE LINE / EXACT LINE BREAKS]. Luxury polished 3D [GOLD / SILVER] heavy condensed block capitals; bright mirror-polished faces, precise bevel, chunky dark extrusion visible slightly underneath. Nearly straight-on, slight low angle. Pristine smooth metal; no cracks, forged texture, halos, background, sparkles, extra text or watermark. Clear counters, safe margins, readable silhouette. For two-line names, identical cap height on both lines. Capital D has a flat left stem and right-hand bowl.

Masters: [[AST-v9c-dr-shekinaih-3dgold]] · [[AST-v9c-dr-shekinaih-siew-sin-yap-3dgold]] · [[AST-v9c-dr-j-aaron-k-david-3dsilver]] · [[AST-v9c-heaven-throne-room-ministry-3dgold-oneline]] · [[AST-v9c-heaven-throne-room-ministry-3dgold]] · [[AST-v9c-bang-3dgold]] · [[AST-v9b-when-all-else-fails-silver]] · [[AST-v9-fully-backed-by]]

## Motion
| [[TOK-motion-landing]] | motion | `scale 1.08→0.995→1 / 0.5 s; blur 0.6→0; opacity 0→1 / 0.167 s; cubic-bezier(.16,1,.3,1)` | Monumental landing for titles |
| [[TOK-motion-sparkle-comet]] | motion | `1.25 turns / 1.6 s, ellipse fitted to word, white 4-point head, clipped to zone` | Gold sparkle comet (SparkleOrbit.tsx) |
| [[TOK-motion-glint]] | motion | `18° band, 10–12 % width, gold #FFF8DC, peak ≤0.45, ≤0.7 s, alpha-masked` | One narrow glint |
| [[TOK-motion-bang-stamp]] | motion | `three.js plane tilt −0.6→0 rad / 0.25 s, metalness .85, roughness .28, point-light sweep; words share one jitter` | BANG! stamp (Bang3D.tsx) |
| [[TOK-motion-slam]] | motion | `1.2→0.97→1 / 0.33 s, flash + ring, jitter ±4 px over 4 frames` | Slam for row phrases |
| [[TOK-motion-bang-eruption]] | motion | `1·2·3 hits at 2-frame spacing; underlight + ember streaks + band fissures + lava glow from beneath` | BANG! eruption (V10 728, pending approval) |
| [[TOK-motion-blackout-rainbow-light]] | motion | `plate flicker-out → dark city, rainbow + founders + text unchanged → light spreads from the rainbow apex` | VAR1 hook: the banner changes state (felt before read) |
| [[TOK-motion-big-word-punch]] | motion | `one word per ~0.42 s beat, each as big as the zone allows, slam ≤ zone, hard cut` | VAR2: whole message in < 4 s, readable on a phone |
| [[TOK-gif-export]] | export | `12 fps motion, shared 256-colour palette, dither frame 1 only, store changed regions` | design/export_v6.py |

V10 wide letterings (728): [[AST-v10-crowned-eagles-global-rainbow-gold]] · [[AST-v10-wide-letterings]] — rainbow-gradient + gold-border and silver + gold-border masthead styles; wide/extended stage words.

## Attention & phone (James 19 Oct 19:04 — "give people impression, not just show the words")
- Showing the words is the basic level. In the FIRST second something must happen to the whole banner (a state change, a huge word), not only to a line of text.
- One idea per beat; the full message must be readable in under ~4 s, at phone size (check the 1360 MP4 on a phone and the 340 at 100 %).
- Make it felt before it is read: tie the motion to the meaning (failure → darkness, God → light from the rainbow, her name → the strongest hit).
- Keep one signature rhythm (3 beats: name strokes = BANG! BANG! BANG!) so it is remembered; end on a still closing card (≥ 3 s).
- Every motion idea is checked against the red lines first (rainbow not pulsed/covered, nothing crosses the founders).

## Layout 728×90 V10 (CSS px) — [[DEC-728-layout-logos-left-masthead]]
Masthead x 6–546 y 0–27 (rainbow CEG 26 px + silver company 22 px, gold rule y 27) · logos 56×56 at (8,29) and (76,29) · stage x 150–500, y 29–87 (73 with email) · email y 75–87 · photo x ≥ 500 untouched.

## Layout 340×280 (CSS px)
Photo y 0–174 · logos 50×50 at (8,6) and (282,6) · ministry 214×19 at y 8 · band from y 174 · company name x 10, top 177 (silver 11.5 px) · slam column x 8–228, rows y 205–280 · names block x 218–340, 122×98, space-evenly · Write-to 212×16 at (10,261).

## Timeline
0 WHEN ALL ELSE FAILS, → 2.0 CONTACT / DR. SHEKINAIH (to 7.0) → 7.0 FULLY BACKED BY + email → 8.5 POWER OF / HEAVEN → 10.5 / 11.5 / 12.5 BANG ×1/2/3 → 13–15 ministry comet + glint → 16 loop.

## V11 new-slogan style (19 Oct 2026) — keep it (James 15:50 "你都设计风格也保留")
- Slogan: WHEN ALL ELSE FAILS, (silver) → TRY (silver) THE GOD OF THE UNIVERSE (gold) → 3D silver IN + 3D gold DR. SHEKINAIH! → BANG! ×3 (gold) → closing card with equal-height rows.
- Lettering: same 3D polished block family as V9C ([[AST-v11-try-the-god-2line]], [[AST-v11-try-the-god-oneline]], [[AST-v11-dr-shekinaih-excl]], [[AST-v11-in-3dsilver]]).
- Motion signatures: [[TOK-motion-sentence-assemble]] (v2) · [[TOK-motion-comet-writes-name]] (v3); half-second pulse shared by the three strokes and the three BANGs; still ending (last 3 s), no loop fade; email strip y 261–277 protected.
- **Gold rationing (James 16:01):** gold ONLY on DR. SHEKINAIH, THE GOD OF THE UNIVERSE, HEAVEN THRONE ROOM MINISTRY. Everything else silver.
- **Small silver type = 3D SILVER (James 16:13 "除非你做成立体的银色"):** chrome face (`#FFF→#C6CDD6→#8F99A6 horizon→#FFF`), 0.45 px dark bevel `#5A626D`, steel extrusion down-right in 0.42/0.66 px steps (`#59616C #434A53 #30363E`), soft black drop. Never a gold `text-stroke` on ≤13 px caps — it filled the counters ("反而看不清楚"). Code: `silver3dLine()` in render10.mjs (`V11H=band6`), `silver3d()` in v11layers.mjs. Band = Anton 13.9 px, tracking 0.045 em.
- Versions kept: v1 / v2 / v3 snapshot folders + `source_code/` in `01_Work_340x280_V11_New_Slogan/` ([[DEL-340x280-V11]]).

## People & brands
[[PER-dr-shekinaih-siew-sin-yap]] · [[PER-dr-j-aaron-k-david]] · [[BRD-ce-global-network-international]] · [[BRD-crowned-eagles-global]] · [[BRD-heaven-throne-room-ministry]] · [[BRD-golden-bull-award-2026]]

## Layout 728×90 V11 Big Word Punch (CSS px) — [[DEC-v11-big-word-punch-chosen]]
- Masthead y 0–27, x 6–546: CROWNED EAGLES GLOBAL (`ceg3d`, 163×21.5) · HEAVEN THRONE ROOM MINISTRY (`ministry3d1`, 179×15.8) · CE GLOBAL NETWORK INTERNATIONAL / GLOBAL FREIGHT FORWARDING! (3D silver Anton 12 px, 0.045 em); gold rule y 27.
- Logos left (8,29)/(76,29) 56×56; stage x 150–500 / y 29–87 (70 once the email is on); email 3D silver 212×16 at y 71; photo panel x ≥ 500 untouched.
- Words ≤ 336×50; hero rows 21 / 28.5; BANG 20/22.5/25 (×1.5 px tall); closing one line 21.7 px; same `TVAR2` clock as the 340.
