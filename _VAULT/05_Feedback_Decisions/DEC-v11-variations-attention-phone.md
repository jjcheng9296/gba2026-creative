---
type: decision
id: DEC-v11-variations-attention-phone
status: chosen-VAR2
created: 2026-10-19
updated: 2026-10-19
related: ["[[FB-2026-10-19-04]]", "[[TOK-motion-blackout-rainbow-light]]", "[[TOK-motion-big-word-punch]]"]
tags: [gba2026, decision, motion, size/340x280]
---
# Two variations for short attention + phone (19 Oct 2026)
Both keep every rule: rainbow never redrawn / pulsed / covered, nothing crosses the founders, light never covers text, gold only on DR. SHEKINAIH · THE GOD OF THE UNIVERSE · HEAVEN THRONE ROOM MINISTRY, email only after the name beat, last ≥ 3 s still, HD + phone sets.
## VAR1 — Blackout → light from the rainbow (`BannerVar1.tsx`, `MR11VAR1` / `MR11VAR1HD`)
- Idea (Claude): the whole banner changes state, so it is felt before it is read. "When all else fails" = the city's lights fail; "the God of the Universe" = light returns out of the rainbow (God's promise), then her name is written.
- 0–0.67 s the photo plate flickers out (1, .15, .85, .1, .5, .05, .25, 0); 0.5 s WHEN ALL / ELSE FAILS, (two-line chrome) lands in the dark; 1.75 s TRY THE GOD / OF THE UNIVERSE; 1.85–2.85 s the light spreads from the rainbow apex (170, 50) over the city (radial mask, 60 px feather); 3.5 s on = Version 5 motion (comet writes her name, BANG 8.0/8.5/9.0, still 9.5–13).
- Dark base `mr_base_hl_dark@2x/@4x.png`: render10 `DIMBG=0.24` dims ONLY the photo plate (brightness .24, saturate .55); founders, logos, band, names untouched; the rainbow band (tracked per angle, `design/bow_track_340.json`, r ∈ [rc−8, rc+9]) is copied back from the lit base → rainbow core mean diff 0.14/255, i.e. never dimmed or pulsed.
## VAR2 — Big words, one punch at a time (`BannerVar2.tsx`, `MR11VAR2` / `MR11VAR2HD`)
- Idea (Claude, short-attention / phone): one idea per beat, each word as big as the zone allows (≤ 206 × 62 px) — WHEN · ALL ELSE · FAILS, · TRY · THE GOD · OF THE UNIVERSE · IN · DR. · SHEKINAIH! at 0 / .42 / .83 / 1.33 / 1.75 / 2.17 / 2.67 / 2.92 / 3.25 s; the whole message is read in 3.7 s even on a phone; 3.75 s the sentence locks together; BANG 7.0/7.5/8.0 + email; still 8.5–13.
- Silver words = CSS chrome (`design/whentest/when3d.mjs` → `kw_when/allelse/fails/try/in.png`); gold words = approved ChatGPT letterings cut at their word gaps (`kw_thegod` from try_l1 cols 461–1048, `kw_dr` / `kw_shekinaih` from name.png split at col 288, `kw_ofuniverse` = try_l2). Slam peak ≤ min(1.15, 66/h, 210/w); gold words get the ring + flash behind.
## Not chosen (logged)
ChatGPT R19: Broken Route (2 px route breaks / reconnects — strong meaning, too thin at 340), Last Door (doors shrink the name), Three Impressions (already our 3-beat rhythm). Claude: letters crack (too busy at 340), heaven gates trailer (a gate edge would cross the founders → breaks [[RULE-no-text-over-faces]]).
## Status
19:31 James: "不错很有创意，存档" — both variations liked and archived; the live choice (A / B / VAR1 / VAR2 / mix) is still open.
- 2026-10-20 16:44 James: "帮我做 那个 大字逐个砸，然后也做 728x90" → VAR2 chosen → [[DEC-v11-big-word-punch-chosen]], 728 → [[DEL-728x90-V11]].
