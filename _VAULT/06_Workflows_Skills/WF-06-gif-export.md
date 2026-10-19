---
type: workflow-step
id: WF-06-gif-export
status: approved
created: 2026-10-17
updated: 2026-10-19
inputs:
  - frames
outputs:
  - GIF/MP4/JPG
checks:
  - "[[QA Checklist]]"
tags:
  - gba2026
  - workflow
---
# Export
- V9C: export_v6.py VER=V9B (1×) and SCALE=2 (@2x); ffmpeg concat for 1360-wide MP4.
- **V11 (19 Oct): `design/export_v11.py`** — render EVERY frame (`--sequence`), the script drops frames identical to the previous one and adds their time to the previous delay; one libimagequant palette from 10 key frames; dither only frame 1; unchanged pixels keep their indices.
  `COMP=MR11A TAG=V11A_New_Slogan python3 export_v11.py` (+ `SCALE=2` for @2x). JPG = closing card (`JPG_AT=160`), `_frame1.jpg` = first frame.
- **GIF delays are centiseconds:** round the CUMULATIVE time to 10 ms; per-frame rounding turned a 14 s loop into 13.7 s.
- HD video: `npx remotion render MR11A …_1360x1120.mp4 --scale=2 --codec=h264 --crf=16 --pixel-format=yuv420p`; HD JPGs via `remotion still --scale=2`.
- Always ship: 1× GIF, @2x GIF, JPG, frame1 JPG, 1360×1120 MP4 + JPGs ([[DEC-hd-exports]]).

Next: [[WF-07-frame-check]] · Hub: [[Workflow Run Sheet]]
