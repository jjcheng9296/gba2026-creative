---
type: skill
id: SKL-old-photo-face-restoration
status: approved
created: 2026-10-18
updated: 2026-10-18
version: 2026-10-18
approved_by: James Chen (2026-10-18 15:42 "这很好啊，这才是对的" on TARGET_A_face_restoration_v2)
applies_to: old / low-resolution photos of DR J AARON K DAVID and DR SHEKINAIH SIEW SIN YAP
tested_in:
  - "[[FB-2026-10-18-05]]"
tags:
  - gba2026
  - skill
  - photo-restoration
aliases: [old photo restoration, face restoration prompt, 老照片修复]
---
# Old photo restoration — DR J AARON K DAVID & DR SHEKINAIH SIEW SIN YAP

**Use this for every future old-photo restoration of the two founders.** James asked on 2026-10-18 to keep this prompt for future use.

## CLIENT PRIORITIES — in this order (James, 2026-10-18 16:06–16:07, "你要记住")
1. **神态 — the person's natural expression and demeanour is the most important.** It must look like them, relaxed and natural.
2. **颜色 — colours stay as in the original photo.** No colour grading, tint, saturation, HDR or "improved" skin tone.
3. **身体比例 — head-to-body proportion must stay exactly as in the original.** Never enlarge, shrink or re-scale a head or face; when a face is pasted back, its size is fixed by the original head, not by an alignment tool.
- A result that is a little **blurry but natural, true-colour and true-proportion beats a sharp face that changes any of these** ("这个模糊 但是是最好的").
- Rejected 16:06: the #24 composite where the approved close-up was placed with an ECC alignment that enlarged it by ~14% — "人和身体比例不协调" (archived in `99_Archive_Old_Versions/tibet_reference_restore_first_try_2026-10-18/`).

## What works (client-approved)
ChatGPT Pro (project "GBA 2026 – CE Global Creative Studio") in TWO steps:
1. **Step 1 – restore + upscale** with the identity reference sheet (prompt 1 below).
2. **Step 2 – reference-based face correction** on Step 1's output, adding one more clear selfie of both (prompt 2 below — **the APPROVED prompt**). ChatGPT edits only the face regions and verifies every other pixel is unchanged.
3. Upscale the approved output to 4K locally: Real-ESRGAN x4 → resize to 3840 px long side, JPG q95 4:4:4.

What did NOT work (do not repeat):
- Blind restorers (GFPGAN / CodeFormer / Real-ESRGAN alone): faces invented, rejected 2026-10-18 ("this is bad and poor").
- Step 1 alone: the man's face drifted — always run Step 2.
- Local ReF-LDM (reference diffusion): kept the original pose but James judged the couple photo "totally unalike" for DR SHEKINAIH; the solo photo was closer. Kept only as a fallback.

## Reference photos (same period of their lives)
- Man = DR J AARON K DAVID: on the LEFT in every reference. Woman = DR SHEKINAIH SIEW SIN YAP: on the RIGHT.
- Reference sheet: Vatican, Venice, London, Montserrat (from crownedeaglesglobal.org/handoverdeclaration).
- Extra clear selfies from James: London Tower Bridge, Greenwich, France (evening), Arctic Circle — `12_Potala_Palace_Photos/handover_tibet/young_face_refs/james_refs/`.
- Best single reference for both faces: the **Arctic Circle selfie**. After approval, the approved close-up (`TARGET_A_face_restoration_v2`) is itself the confirmed likeness of both.
- Eyes matter most to the client: eye shape, eyelids, how the eyes narrow when smiling, eyebrows, gaze (眼神).

## Prompt 1 — restore + upscale (attach: target photo(s) + reference sheet)
```text
PHOTO RESTORATION with identity reference — please read carefully.

Attached:
• Image 1 = TARGET A: an old low-resolution phone photo of a man and a woman standing below the Potala Palace, Lhasa (man on the left in a cap and grey scarf, woman on the right holding a white hat).
• Image 2 = TARGET B: an old low-resolution phone photo of the same woman standing alone in front of the White Palace (Deyang Shar courtyard) of the Potala Palace.
• Image 3 = IDENTITY REFERENCE sheet: four clear photos of the SAME two people from the same period of their lives (Vatican, Venice, London, Montserrat). The woman is DR SHEKINAIH SIEW SIN YAP; the man is DR J AARON K DAVID.

TASK: restore and upscale TARGET A and TARGET B into clean, sharp, high-resolution photographs (aim for at least 3000 px on the long side), one output image per target, same aspect ratio and same framing as each target.

STRICT RULES
1. The faces must be the REAL faces of these two people as shown in the reference sheet — match face shape, eye shape and eyelids, eyebrows, nose, lips, teeth/smile, cheekbones, jawline, skin tone, hairline and hairstyle, and keep the SAME AGE as in the references (younger than today). Do not invent a generic face, do not beautify, do not slim, do not whiten, do not change expression beyond what the target shows.
2. Keep everything else from the target exactly: pose, body proportions, clothing (black jacket, cap, scarf, white hat), hands, background architecture of the Potala Palace, sky, people in the background, camera angle and lighting. No added or removed objects.
3. Restore, don't repaint: remove blur, JPEG blocks and noise, recover natural detail and natural skin texture; colours true-to-life (slightly overcast high-altitude daylight).
4. Photorealistic photograph — no painting, no CGI look, no plastic skin, no text, no watermark.

Please produce TARGET A first. When it is done I will ask for TARGET B.
```
(Adapt the target descriptions — place, clothing, who is where — to each new photo.)

## Prompt 2 — APPROVED reference-based face restoration (attach: one extra clear selfie of both)
```text
Correction for TARGET A (the couple below the Potala Palace). The client says the faces were changed — the man's face no longer looks like DR J AARON K DAVID, and the face must not be altered. Please redo TARGET A as a REFERENCE-BASED FACE RESTORATION:

• Use your previous Target A output as the base and keep EVERYTHING except the two faces pixel-for-pixel: background, Potala Palace, clothing, cap, scarf, hands, white hat, pose, body size, colours, framing.
• Rebuild ONLY the two faces (and the visible hair around them) so they match the reference photos exactly:
 – Man = DR J AARON K DAVID: use the new attached Arctic Circle selfie (man on the left, blue jacket) plus the reference sheet (man on the left in every photo). Match his real face: fuller, rounder face shape, broad cheeks, his eye shape and double eyelids, eyebrows, wide nose, mouth and gentle smile, skin tone; same age as in the references. The cap stays on.
 – Woman = DR SHEKINAIH SIEW SIN YAP: woman on the right in every reference photo (and in the Arctic Circle selfie). Match her face shape, eyes, eyebrows, nose, smile and hairstyle; same age as in the references.
• Keep the head angle, head size and the direction each person is looking as in the target. Do not beautify, slim, whiten or change expression.
• Photorealistic, natural skin texture, same resolution as before (or higher).
```
For a solo photo of DR SHEKINAIH, use the same prompt with only the woman's bullet, and add: "THE EYES ARE THE MOST IMPORTANT: eye shape, double eyelids, how much the eyes narrow when she smiles, distance between the eyes, eyebrows and her gaze — exactly as in the references."

## QA before sending to James
- Compare each face side by side with the Arctic Circle selfie and the reference sheet (eyes first).
- Ask ChatGPT to confirm pixels outside the face regions are unchanged.
- Never send blind-restorer faces. Names in FULL CAPITALS in file names and notes.

## IDENTITY ANCHORS (client-approved — always attach these first)
- Both faces: `12_Potala_Palace_Photos/handover_tibet/young_face_refs/ANCHOR_DR_J_AARON_K_DAVID_DR_SHEKINAIH_approved.png` — James 15:50: "use this one as the anchor, man and female face most natural and resemblance most like".
- DR SHEKINAIH solo: `young_face_refs/ANCHOR_DR_SHEKINAIH_solo_24_closeup_approved.png` — James 15:56 "这个很好", 15:57 "用这个作为这个老照片的恢复高清".
- Colour rule (15:52): keep the original colours — no colour grading, tint, saturation or HDR; natural expression (神态自然).

## Putting an approved close-up back into the full photo
`refldm_work/compose_24.py`: background = Real-ESRGAN x4 of the original → 4K (colours untouched); only the person (face parsing: face, hair, neck, jacket) is taken from the approved close-up; placement by face landmarks, refined by ECC alignment of her silhouette; soft feather. No colour edits.

## Files (Tibet job, 2026-10-18)
- #23 approved: `handover_tibet/TIBET_A_both_potala_APPROVED_4K.jpg` (ChatGPT `chatgpt_restored_A_v2_reference_faces.png`, Real-ESRGAN x4 → 3840×2880)
- #24 — **the ONLY version to remember** (ticked by James 16:10; "这个模糊 但是是最好的"): `handover_tibet/TIBET_B_shekinaih_white_palace_JAMES_PICK_preview.png` (his 718×960 preview; full-size source file still to be collected). All other #24 versions are rejected.
- Composite script note: if `compose_24.py` is used again, keep the landmark scale and allow only translation from ECC (no scale change).
- Originals: `12_Potala_Palace_Photos/handover_tibet/original_from_website/`
