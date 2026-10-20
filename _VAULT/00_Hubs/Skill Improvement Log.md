---
type: moc
id: skill-improvement-log
created: 2026-10-17
updated: 2026-10-19
tags: [gba2026, moc, skill]
---
# Skill Improvement Log
Failure → proposed change → test → approval → skill version / commit.

| Date | Failure | Change | Skill | Status |
|---|---|---|---|---|
| 2026-10-17 | White light washed text (FB-07/08) | Light only outside letters; landing + comet + glint | [[SKL-ce-global-award-creative]] | adopted |
| 2026-10-17 | Two moving regions tripled GIF size | One moving region per beat | [[SKL-gif-export]] | adopted |
| 2026-10-17 | Grey glints band in 256 colours | Glint narrow, gold, ≤0.45, ≤0.7 s | [[SKL-gif-export]] | adopted |
| 2026-10-17 | Slot GIF soft on phones | Ship @2x GIF + 1360 MP4 per size | [[SKL-gif-export]] | adopted |
| 2026-10-17 | ChatGPT composer sometimes not sent (doc panel open) | Click Send by ref; verify user turn appears | [[SKL-chatgpt-image-generation]] | adopted |
| 2026-10-17 | PowerShell `MV` alias clashed with a function | Never name helpers mv/cp/rm | [[SKL-pc-ops]] | adopted |
| 2026-10-18 | Stage words looked small — zone height limits width | Ask ChatGPT for WIDE/extended letterings (ar per zone); never scaleX | [[SKL-chatgpt-image-generation]] | adopted |
| 2026-10-18 | Masthead auto-fit shrank to 12 px (ran before fonts loaded) | Inline fit scripts run inside `document.fonts.ready.then()` | [[SKL-remotion-threejs]] | adopted |
| 2026-10-18 | Downloaded wrong ChatGPT images ("last 3 large imgs" = old assets) | Select by DOM position in the latest assistant turn (`getBoundingClientRect().top`) | [[SKL-chatgpt-image-generation]] | adopted |
| 2026-10-18 | `pkill -f "remotion render"` killed my own shell (exit 144) | Never pkill with a pattern that matches the calling command | [[SKL-pc-ops]] | adopted |
| 2026-10-18 | BANG impact too flat on the wide 728 stage | Per-word re-stamps at 2-frame spacing + eruption from beneath ([[DEC-bang-eruption]]) | [[SKL-remotion-threejs]] | proposed |
| 2026-10-18 | 1× GIF 708 KB > 500 KB target | Trim comet/ember frames or hold frames when a limit applies | [[SKL-gif-export]] | open |
| 2026-10-18 | Blind face restorers invented faces ("bad and poor"); ChatGPT step 1 drifted the man's face | ChatGPT two-step with identity anchors; step 2 = reference-based face correction | [[SKL-old-photo-face-restoration]] | adopted (#23 approved 15:42) |
| 2026-10-18 | Pasted close-up head came out ~14% too big (ECC rescaled it) — "人和身体比例不协调" | Head-only composite; head scale from the original; no automatic rescale; side-by-side proportion check | [[SKL-old-photo-face-restoration]] · [[WF-10-old-photo-restoration]] | adopted (#24 定稿 16:21) |
| 2026-10-19 | Built-in browser: anchor/Share downloads never finish (stay `*.tmp`); files cannot be uploaded to ChatGPT | `.tmp` already holds the full PNG → `grab_tmp_download.ps1` copies + checks signature/IEND; describe banners to ChatGPT in exact text (times, px, motion) | [[SKL-chatgpt-image-generation]] · [[WF-03-element-generation]] | adopted |
| 2026-10-19 | Built-in browser: `form_input` left the ChatGPT composer empty | Focus `#prompt-textarea`/`[contenteditable]` → `execCommand('insertText')` → click Send by coordinates; verify composer empty + stop button | [[SKL-chatgpt-image-generation]] | adopted |
| 2026-10-19 | 14 s GIF played 13.7 s (83 ms frames stored as 80 ms) | Round CUMULATIVE time to 10 ms (`export_v11.py`) | [[SKL-gif-export]] · [[WF-06-gif-export]] | adopted |
| 2026-10-19 | Wide TRY card and BANG×3 slam peaks ran under the names block; hero first frame blank; comet/flash drawn on letters | Peak width ≤ zone (slam 1.07 / 1.03); first landing frame ≥ 0.4; effects layered behind letters; check transition frames from the GIF | [[SKL-remotion-threejs]] · [[WF-07-frame-check]] | adopted |
| 2026-10-19 | Two-line ChatGPT block lettering: lines touch | Ask for a 12 % gap; else split at the first row of line 2 and open the gap | [[SKL-chatgpt-image-generation]] | adopted |
| 2026-10-19 | Phrasing decided by one voice | Write Claude's judgment first, ask ChatGPT blind with options, merge, show James both ([[03_Docs/GBA2026_ChatGPT_Critique.md]] round 12) | [[SKL-ce-global-award-creative]] | adopted |

## Backlog（待办，来自第一版仓库笔记）
- [ ] 技能正文有三份（Documents、10_Claude_Skill_Sync、09 repo docs），易不一致 → 以 10_Claude_Skill_Sync/SKILL.md 为准，其余只读 · [[SKL-ce-global-award-creative]]
- [ ] GIF 体积目标写进技能流水线（共用调色板、只动一个区域） · [[SKL-gif-export]]
- [ ] 中文版横幅用语（承诺必达 / 一诺千金 / 使命必达）待 James 定，定后写入技能
- [ ] 文章缺的事实（DAVID 有记录的决策、ASEAN 航线、2026 年 1–6 月经营主体）加入 Word 稿检查项 · [[DEL-winner-profile-docx-V1]]
- 2026-10-19 · v24 · rules: V11 gold rationing (gold only DR. SHEKINAIH / THE GOD OF THE UNIVERSE / HEAVEN THRONE ROOM MINISTRY); small silver type = 3D silver, never gold text-stroke ≤13 px; every deliverable in true HD from 4x layers; pipeline DSF=4 / SCALE=4 / HD composition; V11 Version 3 + 4 recorded; mistakes log (gold-stroke band, stretched "HD").
- 2026-10-19 19:10 · lesson (James 19:04): design for a short attention span and the phone — first-second whole-banner hook, one idea per beat, message readable in < 4 s, motion tied to meaning, signature 3-beat rhythm; "impression, not just the words". Two variations built ([[DEC-v11-variations-attention-phone]]). → skill v25.
- 2026-10-19 19:50 · v26 · read the vault at EVERY request (James 19:41); merged back rules missing from the live skill (00 vault layer, 00a 728×90, boss brand line, never publish figures, 3a banner research, 固定版位 + 动画顺序); GitHub = public → text/scripts only, redact figures + phone, push from a cloud clone.
- 2026-10-20 · v27 · VAR2 chosen → §11 one-card rule superseded for V11; new §11a 728×90 V11 recipe (masthead = boss headline, same clock as the 340, one-line closing card, BANG 20/22.5/25, outline ripple for wide words); pipeline `VARIANT=v11lb`, `SIZE=728 export_v11.py`, `LB11VAR2HD`; Vercel deploy needs `--scope jjcheng-s-projects`.
