# Write-up v13 build kit (20 Oct 2026)
- `article_v13.md` — the final text (1,803 words; ChatGPT GPT-6 Pro 95.4/100).
- `zh_block.html` — Chinese entry block (inner HTML of `<div class="zh">`).
- `seo.json` — title tag, meta description, keywords, canonical, OG image, JSON-LD (Article + Organization).
- Mock page: `python3 build_winner_html.py article_v13.md zh_block.html seo.json <current winner.html> <new winner.html>`.
- Word dossier: run from the session's `gba/` folder: `ARTICLE=writeup_v13/article_v13.md OUT=<file>.docx node writeup_v13/build_docx_v13.js` (needs the `docx` npm package and the V11 banner JPGs under `final/v11/`); PDF: `soffice --headless --convert-to pdf <file>.docx`.
- `chatgpt_r20_plan.md` … `chatgpt_r23_score.md` — ChatGPT rounds; `sources/` — Florence excerpt and client-supplied facts used by the fact-checkers.
