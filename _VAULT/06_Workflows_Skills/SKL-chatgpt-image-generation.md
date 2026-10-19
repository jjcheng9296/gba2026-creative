---
type: skill
id: SKL-chatgpt-image-generation
status: approved
created: 2026-10-17
updated: 2026-10-17
file: ""
version: 2026-10-17
tested_in:
  - "[[RUN-2026-10-17-340x280-V9C]]"
improvements:
  - "[[Skill Improvement Log]]"
tags:
  - gba2026
  - skill
---
# ChatGPT image generation via Claude in Chrome
Open project chat, send prompt, wait, download blob via JS (needs 批准), move with move_assets*.ps1.

2026-10-19 additions (built-in browser, chat "Banner animation design", model list has no "Pro" — strongest = GPT-6 Astra at Extra High): fill the composer with `el.focus(); document.execCommand('selectAll'); document.execCommand('insertText', false, text)` and click Send by coordinates (the viewport width changes, so re-screenshot first); confirm the composer is empty and the Stop button shows. Downloads: Share → Download leaves a `*.tmp` in Downloads holding the full PNG → `grab_tmp_download.ps1 -Name …`. No file upload from this browser — describe the banner in exact text. Images in the page are `blob:` URLs; list them with `[...document.querySelectorAll('main img')].filter(i=>i.naturalWidth>500)`.

2026-10-18 additions: size the aspect to the zone and ask for WIDE/extended letters (see [[WF-03-element-generation]]); one image per message; identify the new image by DOM position in the latest turn, not "last N images"; when ChatGPT offers two images it says which to use ("use the second image"); the Send button moves when a doc panel is open — find it by ref each time; `document.querySelector('#prompt-textarea')` can be null → use `[contenteditable="true"]`.
