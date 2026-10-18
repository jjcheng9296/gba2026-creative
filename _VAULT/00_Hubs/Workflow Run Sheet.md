---
type: moc
id: workflow-run-sheet
created: 2026-10-17
updated: 2026-10-17
tags: [gba2026, moc, workflow]
---
# Workflow Run Sheet
1. [[WF-01-storyboard]] — Claude writes beats, timings, layout zones from the boss's brief and the rules.
2. [[WF-02-chatgpt-critique]] — Send storyboard to ChatGPT GPT-6.1 (project "GBA 2026 – CE Global Creative Studio"); record answer in Critique.md.
3. [[WF-03-element-generation]] — ChatGPT generates transparent ~2048 px PNG letterings with the Design System prompt template; James approves download; files go to 06_Photos_and_AI_Assets/ai_assets.
4. [[WF-04-layout-base-frame]] — render10.mjs VARIANT=v9b renders the static band/logos/names; v6layers.mjs renders text layers; assets trimmed into remotion/public/v9.
5. [[WF-05-remotion-animation]] — Banner9.tsx (rev b), CtaTitle.tsx, SparkleOrbit.tsx, Bang3D.tsx; render the beat frames with --sequence.
6. [[WF-06-gif-export]] — export_v6.py VER=V9B (1×) and SCALE=2 (@2x); ffmpeg concat for 1360-wide MP4.
7. [[WF-07-frame-check]] — Contact sheet of key frames; check every rule; check phone size.
8. [[WF-08-boss-review]] — Send GIF + review sheet to James; log feedback as FB note; iterate.
9. [[WF-09-record-and-push]] — Update Context.md, SKILL.md, build notes, this vault; copy to 09_GitHub_Repo; push; deploy mock site.

Runs: [[RUN-2026-10-17-340x280-V9C]] · [[RUN-2026-10-18-728x90-V10]] · new run → [[TPL-Workflow-Run]]

## What the 728 run taught (2026-10-18) — apply next time
- Do WF-02 (ChatGPT plan) BEFORE the storyboard when a new size starts; attach the live V1 + the approved review sheet.
- Run WF-04 as a fast static-scene loop with James (one sheet per change, 100 % strips at the bottom) — layout gets approved in minutes; only then animate.
- WF-03 in parallel: ask for WIDE / extended letterings sized to the zone (never stretch); one image per ChatGPT message; download only after 批准; pick the image by its position in the latest assistant turn.
- WF-05: new size = new `BannerN.tsx` + `VARIANT=vN` scenes in render10.mjs; keep approved components untouched (add props such as `bright`, `stamps`).
- WF-06: frame list = motion segments only; KEYS = indices of the key frames; also render `--scale=2` for the HD MP4.
Skills: [[SKL-ce-global-award-creative]], [[SKL-chatgpt-image-generation]], [[SKL-remotion-threejs]], [[SKL-gif-export]], [[SKL-pc-ops]], [[SKL-content-writing]] (write-up / articles — playbook in [[03_Docs/GBA2026_Content_Writing_Playbook.md]])
Checks: [[QA Checklist]]
