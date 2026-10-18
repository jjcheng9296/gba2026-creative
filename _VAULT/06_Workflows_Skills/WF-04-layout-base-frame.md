---
type: workflow-step
id: WF-04-layout-base-frame
status: approved
created: 2026-10-17
updated: 2026-10-17
inputs:
  - assets
outputs:
  - base PNG + layers
checks:
  - "[[QA Checklist]]"
tags:
  - gba2026
  - workflow
---
# Layout base frame
render10.mjs VARIANT=v9b renders the static band/logos/names; v6layers.mjs renders text layers; assets trimmed into remotion/public/v9.

Next: [[WF-05-remotion-animation]] · Hub: [[Workflow Run Sheet]]
