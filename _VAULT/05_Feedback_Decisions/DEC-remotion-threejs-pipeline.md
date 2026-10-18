---
type: decision
id: DEC-remotion-threejs-pipeline
status: approved
created: 2026-10-17
updated: 2026-10-17
scope: all sizes
rationale: Frame-exact control, reproducible, scriptable.
supersedes: []
sources:
  - "[[FB-2026-10-17-01]]"
related:
  - "[[DEL-340x280-V9C]]"
aliases:
  - Remotion + three.js pipeline
tags:
  - gba2026
  - decision
---
# Remotion + three.js pipeline
## Choice
Base frame in render10.mjs, layers in v6layers.mjs, animation in Remotion (Banner9 rev b), BANG! in three.js, GIF via export_v6.py.
## Why
Frame-exact control, reproducible, scriptable.
## Evidence
[[FB-2026-10-17-01]]
