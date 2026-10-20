---
type: moc
id: HOME
status: approved
created: 2026-10-17
updated: 2026-10-20
aliases: [Home, Dashboard]
tags: [gba2026, moc]
---
# GBA 2026 — Home
Golden Bull Award 2026 creative for CE GLOBAL NETWORK INTERNATIONAL PTE LTD. **Start every session with [[Session Protocol]].**

## Now
- Approved: [[DEL-340x280-V9C]] · in review: [[DEL-728x90-V9C]] (V10 draft 2, [[REV-2026-10-18-02]]) · next: 1000×500, 2000×800
- **New slogan (19 Oct):** "WHEN ALL ELSE FAILS, TRY THE GOD OF THE UNIVERSE IN DR. SHEKINAIH! BANG! BANG! BANG!" → [[DEL-340x280-V11]] — V11A Versions 1–5 + 5B archived (v4 approved 16:21: boss headline + 3D silver; v5 = WHEN centred, James's pick A; 5B = two-line chrome WHEN), Variations VAR1 熄灯天光 / VAR2 大字逐个砸 liked + archived 19:31 ([[DEC-v11-variations-attention-phone]]). **20 Oct: James chose VAR2 大字逐个砸** → [[DEC-v11-big-word-punch-chosen]]; 728×90 built the same way → [[DEL-728x90-V11]] (in review). Mock site: https://gba2026-mock-site.vercel.app/ Rules added today: [[RULE-always-hd]] (true 4x HD + phone set), Design System "Attention & phone".
- Latest handoff: [[SES-2026-10-20-claude]] (previous [[SES-2026-10-19-claude]])
- Open question: slot format → [[PER-jason-ooi]]
- Old photos of the founders: use [[SKL-old-photo-face-restoration]] (client-approved ChatGPT two-step prompt, 2026-10-18)

## Hubs
[[Design System]] · [[Rules & Red Lines]] · [[Revision Log]] · [[Feedback Inbox]] · [[Workflow Run Sheet]] · [[Skill Improvement Log]] · [[QA Checklist]] · [[File Map]]

## Source documents (not duplicated here)
- [[03_Docs/GBA2026_Context.md|Project context]] — facts, rules, status (read first)
- [[03_Docs/GBA2026_Design_Philosophy_and_Workflow.md|Design philosophy & workflow]]
- [[01_Approved_Banner_340x280_V9C/GBA2026_V9C_340x280_Build_Notes.md|340×280 V9C build notes]]
- [[03_Docs/GBA2026_ChatGPT_Critique.md|ChatGPT critique rounds 1–9]]
- [[README_FOLDER.md|Folder map]]

## Approved deliverables (needs Dataview)
```dataview
TABLE size, version, current_revision, approval FROM "_VAULT/01_Deliverables" WHERE status = "approved" SORT size ASC
```

## Open feedback
```dataview
TABLE reviewer, deliverable, round FROM "_VAULT/05_Feedback_Decisions" WHERE type = "feedback" AND status = "proposed"
```

## Latest revisions
```dataview
TABLE deliverable, status, parent_revision FROM "_VAULT/02_Revisions" SORT file.name DESC LIMIT 10
```
