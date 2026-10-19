---
type: token
id: TOK-motion-comet-writes-name
status: proposed
created: 2026-10-19
updated: 2026-10-19
unit: css px @ 12 fps
used_by: ["[[REV-2026-10-19-03]]"]
related: ["[[DEC-v11-v3-comet-writes-her-name]]", "[[TOK-motion-sparkle-comet]]", "[[RULE-light-never-covers-text]]"]
tags: [gba2026, token, motion]
---
# Motion: the comet writes her name in three strokes (V11 v3 signature)
- Comet head: 7 px radial glow + 6×4 px star + 5-dot tail, runs along the name baseline (y = row top + 0.9 × name height + 2) from left to right, clipped to x 10–222, drawn BEHIND the letters.
- Three strokes on a half-second pulse (same as BANG! BANG! BANG!): DR. | SHEK | INAIH! (splits at 289 / 704 of the 1200 px name.png) at frames 52 / 58 / 64; each group rises from the baseline over 0.5 s (`clip-path: inset(top% …)`), with a 1.6 px pale-gold edge (#FFF3C4, 0.7, masked to the letters) on the rising edge only.
- Dots: 420 points sampled on the bright letter faces (`name_points.json`), 1.2–2.1 px, three golds (#FFE9A8 #F2C75C #C99A3A), no blur; each flies from the comet to its point in 0.25 s and arrives just before the rising edge reaches it; dots sit behind the letters so each letter hides its dots.
- After the third stroke: no glint on the name; it rests until the BANGs. The 3D silver IN fades up with the first stroke.
Why it works: light becomes her name (THE GOD OF THE UNIVERSE → DR. SHEKINAIH!) and the three strokes rhyme with BANG ×3. Scores: ChatGPT 92 (text), Claude 90.
