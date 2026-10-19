---
type: rule
id: RULE-always-hd
status: approved
created: 2026-10-19
updated: 2026-10-19
sources: [James 2026-10-19 16:21 "请记住你出的都是高清版本"; 14:43 "记得做高清版本"]
tags: [gba2026, rule]
---
# Every deliverable comes in HD
James: "请记住你出的都是高清版本".
- Every banner / GIF / video / still Claude makes ships with its HD version: @2x GIF (680×560 for the 340×280), 1360×1120 MP4 (`--scale=2 --codec=h264 --crf=16 --pixel-format=yuv420p`), 1360×1120 JPG, plus @2x JPG.
- The 1× files are still made for the actual ad slot, but the HD set is never skipped and is what we show first.
- Review sheets and mocks: show the @2x frames, not only 1× thumbnails.
- True high-res means rendered from 4x layers, never a 2x frame stretched (16:25 "I WANT high resolution version"): render10 / v11layers `DSF=4`, Remotion `…HD` composition with `--scale=2`, `export_v11.py SCALE=4`. Set for every banner: 1× slot GIF/JPG · @2x GIF/JPG · 1360×1120 GIF + MP4 + JPG.
- Phone check (James 17:24 "我在手机看不清楚"): also send a phone set — faststart H.264 High MP4 at 1360×1120 and the key frames as 1360×1120 JPGs; compare options as one portrait video (A above B, labelled). The 340×280 slot GIF is tiny on a phone by nature.
