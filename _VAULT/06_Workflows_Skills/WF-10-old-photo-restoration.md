---
type: workflow
id: WF-10-old-photo-restoration
status: approved
created: 2026-10-18
updated: 2026-10-18
approved_by: James Chen (2026-10-18 16:21 "good job, 定稿 — update skills and workflow")
skill: "[[SKL-old-photo-face-restoration]]"
tags: [gba2026, workflow, photo-restoration]
aliases: [old photo workflow, 老照片修复流程]
---
# WF-10 — Old photo restoration of the founders (step by step)

**Priorities, in order:** 1) 神态 natural expression · 2) 颜色 original colours · 3) 身体比例 original head-to-body proportion. Blurry-but-natural beats sharp-but-changed.

1. **Intake** — save the original (largest version available) to `12_Potala_Palace_Photos/<job>/original_from_website/` (or the job folder). Ask James for the phone/Telegram original if one exists.
2. **References** — attach the identity anchors first: `young_face_refs/ANCHOR_DR_J_AARON_K_DAVID_DR_SHEKINAIH_approved.png` (both), `ANCHOR_DR_SHEKINAIH_solo_24_closeup_approved.png` (her), plus the Arctic Circle selfie and same-period selfies (man LEFT, woman RIGHT).
3. **Prompt for ChatGPT 6 Pro** — James runs it himself in the project "GBA 2026 – CE Global Creative Studio". Give him prompt 1 (restore + upscale) and, if a face drifts, prompt 2 (reference-based face correction) from [[SKL-old-photo-face-restoration]]. The prompt always says: keep colours, keep head angle/size, do not beautify.
4. **James picks** — he marks ✓ / ✗. Remember ONLY the ✓ version; move the ✗ files to `_to_delete/` (he empties it).
5. **Put an approved close-up back into the full photo** — `refldm_work/compose_24_head.py` (face-restore venv): HEAD ONLY (face, hair, neck) from the close-up; body, jacket, collar, background from the original (Real-ESRGAN x4 → 4K, colours untouched); head scale from the original (eye distance + hair silhouette against the wall, override with `SCALE`); never let automatic alignment rescale the head.
6. **Proportion check** — open `refldm_work/check24_proportion.jpg` (original | result side by side): hair outline and face size must match the original before anything is sent.
7. **4K export** — Real-ESRGAN x4 (`restore.py upscale -s 4`) → 3840 px long side, JPG q95 4:4:4; file name `TIBET_<A|B>_<who>_<place>_APPROVED_4K.jpg` style, overwrite in place.
8. **Send** — final + one line on what changed; ask James to confirm 定稿.
9. **Archive** — after 定稿 copy the approved images + finals to `13_Old_Photo_Restoration/<date>_<job>_approved/`.
10. **Record** — FB note (verbatim verdicts), update [[SKL-old-photo-face-restoration]], File Map, then push the vault to GitHub (text only — photos stay on F:, the repo is public).

## Run log
- 2026-10-18 Tibet #23 (couple below the Potala) — ChatGPT two-step, approved 15:42, 4K 3840×2880.
- 2026-10-18 Tibet #24 (DR SHEKINAIH at the White Palace) — approved close-up + head-only composite at scale 0.44, **定稿 16:21**, 4K 2872×3840.
