---
type: moc
id: workflow-run-sheet
created: 2026-10-17
updated: 2026-10-19
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

Separate job — old photos of the founders: [[WF-10-old-photo-restoration]] (priorities 神态 > 颜色 > 身体比例; ChatGPT two-step prompt; head-only composite with the original head size; proportion check; 4K; archive in 13_Old_Photo_Restoration).

Runs: [[RUN-2026-10-17-340x280-V9C]] · [[RUN-2026-10-18-728x90-V10]] · new run → [[TPL-Workflow-Run]]

## What the 728 run taught (2026-10-18) — apply next time
- Do WF-02 (ChatGPT plan) BEFORE the storyboard when a new size starts; attach the live V1 + the approved review sheet.
- Run WF-04 as a fast static-scene loop with James (one sheet per change, 100 % strips at the bottom) — layout gets approved in minutes; only then animate.
- WF-03 in parallel: ask for WIDE / extended letterings sized to the zone (never stretch); one image per ChatGPT message; download only after 批准; pick the image by its position in the latest assistant turn.
- WF-05: new size = new `BannerN.tsx` + `VARIANT=vN` scenes in render10.mjs; keep approved components untouched (add props such as `bright`, `stamps`).
- WF-06: frame list = motion segments only; KEYS = indices of the key frames; also render `--scale=2` for the HD MP4.
## What the V11 new-slogan run taught (2026-10-19) — [[RUN-2026-10-19-340x280-V11]]
- Read the vault BEFORE acting (James asks for it every time): Session Protocol → latest SES → target DEL/REV → WF notes for the step.
- Phrasing/rhythm questions: write Claude's own judgment first, ask ChatGPT blind with 2–3 options, merge, show James both side by side ([[03_Docs/GBA2026_ChatGPT_Critique.md]] round 12).
- WF-04 static scenes sheet (5 beats + 1× strip) before animating — James answered in 10 minutes with exact size fixes.
- Downloads in the built-in browser: `*.tmp` → `grab_tmp_download.ps1` ([[WF-03-element-generation]]). Ask 批准 once per batch.
- Frame-check the GIF's transition frames (slam peaks, first landing frame, flashes) — three real flaws were only visible there ([[WF-07-frame-check]]).
- Archive on request into `<folder>/19th Oct 2026 - V11A Version 1/` (copy only) + local git commit; then start version 2.

Runs (add): [[RUN-2026-10-19-340x280-V11]] · Deliverable: [[DEL-340x280-V11]]

Skills: [[SKL-ce-global-award-creative]], [[SKL-chatgpt-image-generation]], [[SKL-remotion-threejs]], [[SKL-gif-export]], [[SKL-pc-ops]], [[SKL-content-writing]] (write-up / articles — playbook in [[03_Docs/GBA2026_Content_Writing_Playbook.md]])
Checks: [[QA Checklist]]
- 2026-10-19 lesson: "HD" = rendered from 4x layers, not upscaled; check sharpness (Laplacian) on faces/names before sending. Small silver type → 3D silver, check at 1x before showing.
- 2026-10-19 lesson: before building motion, ask "what does the WHOLE banner do in the first second, and does it read on a phone?" — then check the idea against the red lines (rainbow not pulsed/covered, nothing crosses the founders). See Design System "Attention & phone".
- 2026-10-20 lesson: adapting a motion to another size = keep the SAME clock (banners on one page punch together), refit every element to the new zone, and re-check impact effects — a ring sized for a 340 word peeps through the gaps of a wide 728 word. Run: [[RUN-2026-10-20-728x90-V11]].
