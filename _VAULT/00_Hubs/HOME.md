---
type: moc
id: HOME
status: approved
created: 2026-10-17
updated: 2026-10-17
aliases: [Home, Dashboard]
tags: [gba2026, moc]
---
# GBA 2026 — Home
Golden Bull Award 2026 creative for CE GLOBAL NETWORK INTERNATIONAL PTE LTD. **Start every session with [[Session Protocol]].**

## Now
- Approved: [[DEL-340x280-V9C]] · in review: [[DEL-728x90-V9C]] (V10 draft 2, [[REV-2026-10-18-02]]) · next: 1000×500, 2000×800
- Latest handoff: [[SES-2026-10-18-claude]] (previous [[SES-2026-10-17-claude]])
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
