# V11 new-slogan 340x280 — source snapshot (19 Oct 2026)

Copied from the Remotion project (/home/claude/gba/remotion in the Claude session) so nothing is lost when the session ends.
Put `remotion/src/*` into the Remotion project's `src/`, `remotion/public/v11a/` into `public/v11a/`, and `design/*` into the design folder.
Shared files the compositions also need (already in the project / V9C archive): `public/v9/mr_base_b@2x.png`, `v9/when_silver.png`, `v9/ring.png`, `v9/email_b@2x.png`, `v9/ministry3d1.png`, `fonts/` (Barlow Condensed 600, Bodoni Moda 900).

| Composition | File | Version |
|---|---|---|
| MR11A | Banner11.tsx (set "a") | V11A version 1 — 14 s, closing card |
| MR11A2 | Banner11v2.tsx | version 2 — the sentence assembles, 12 s |
| MR11A3 | Banner11v3.tsx | version 3 — the comet writes her name in three strokes, 13 s |

Render + export (example v3):
```
npx remotion render MR11A3 out/MR11A3 --sequence --image-format=png
COMP=MR11A3 TAG=V11A_v3_Comet_Writes_Her_Name JPG_AT=140 python3 design/export_v11.py      # + SCALE=2 for @2x
npx remotion render MR11A3 GBA2026_Banner_340x280_V11A_v3_Comet_Writes_Her_Name_1360x1120.mp4 --scale=2 --codec=h264 --crf=16 --pixel-format=yuv420p
```
Design style notes: vault TOK-motion-sentence-assemble, TOK-motion-comet-writes-name; build notes GBA2026_V11_340x280_Build_Notes.md.
