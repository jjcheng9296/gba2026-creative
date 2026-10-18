---
type: workflow-step
id: WF-06-gif-export
status: approved
created: 2026-10-17
updated: 2026-10-17
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
export_v6.py VER=V9B (1×) and SCALE=2 (@2x); ffmpeg concat for 1360-wide MP4.

Next: [[WF-07-frame-check]] · Hub: [[Workflow Run Sheet]]
