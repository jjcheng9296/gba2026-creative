---
aliases: [WF_02, 设计与QA]
tags: [workflow, gba2026, design]
---
# WF_02 · 设计、渲染与 QA

上一步：[[_VAULT/Workflow/WF_01_Brief_and_Assets|WF_01]] ｜ 下一步：[[_VAULT/Workflow/WF_03_Writeup_and_Review|WF_03]]

## 设计原则（先读）
- 12 条设计原则、调色、字体、动效语法：[[03_Docs/GBA2026_Design_Philosophy_and_Workflow]]
- 定稿 340×280 的逐元素细节：[[01_Approved_Banner_340x280_V9C/README]]、[[01_Approved_Banner_340x280_V9C/GBA2026_V9C_340x280_Build_Notes]]

## 流程（每次必跑）
1. 渲染（render10.mjs，只出 @2x）
2. qa_check.py：不过 = 修版面，绝不出图
3. export10.py --final：生成 1× 预览、JPG、GIF（libimagequant）
4. 先看 1× 预览（看旧图无效）
5. 每个 GIF 帧按 1× 与 3× 检查
6. 发给 James：一张图 + 一行说明改了什么

## 常见失误（见 [[_VAULT/Skills/SK_ce-global-award-creative#9. 错误记录|技能文件的错误记录]]）
- 自画彩虹、镜像补边、硬边光带、顶部渐变、ffmpeg 调色板 GIF、看了旧预览

## 关联
- 脚本与母版：[[09_GitHub_Repo/gba_repo/design]]
- 版本史：[[03_Docs/GBA2026_Context]] 的附录
