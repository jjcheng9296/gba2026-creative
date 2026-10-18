---
type: moc
id: skill-improvement-log
created: 2026-10-17
updated: 2026-10-17
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

## Backlog（待办，来自第一版仓库笔记）
- [ ] 技能正文有三份（Documents、10_Claude_Skill_Sync、09 repo docs），易不一致 → 以 10_Claude_Skill_Sync/SKILL.md 为准，其余只读 · [[SKL-ce-global-award-creative]]
- [ ] GIF 体积目标写进技能流水线（共用调色板、只动一个区域） · [[SKL-gif-export]]
- [ ] 中文版横幅用语（承诺必达 / 一诺千金 / 使命必达）待 James 定，定后写入技能
- [ ] 文章缺的事实（DAVID 有记录的决策、ASEAN 航线、2026 年 1–6 月经营主体）加入 Word 稿检查项 · [[DEL-winner-profile-docx-V1]]
