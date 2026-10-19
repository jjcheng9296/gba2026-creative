---
type: workflow-step
id: WF-07-frame-check
status: approved
created: 2026-10-17
updated: 2026-10-19
inputs:
  - exports
outputs:
  - review sheet
checks:
  - "[[QA Checklist]]"
tags:
  - gba2026
  - workflow
---
# Frame check at 100 %
Contact sheet of key frames; check every rule; check phone size.

## Check the transitions, not only the settled frames (V11, 19 Oct)
Decode the exported GIF (not the PNG renders) and sheet these moments: first frame of every beat, the slam peak (+1 frame), the glint, each BANG hit, the first and last frame of the closing card, the loop fade. Found this way on V11A:
- TRY card at slam 1.2 ran under the names block → slam 1.07 for wide cards; BANG×3 at 1.25 ran off the left edge and under the names → 1.03 and smaller sizes. Rule: **peak width = rest width × slam ≤ zone width**.
- Hero first frame was almost blank (opacity 0) → first landing frame ≥ 0.4.
- Sparkle comet and the BANG flash/ring were drawn ON the letters → draw them before (behind) the letters ([[RULE-light-never-covers-text]]).

Next: [[WF-08-boss-review]] · Hub: [[Workflow Run Sheet]]
