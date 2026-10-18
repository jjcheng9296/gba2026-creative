---
aliases: [ce-global-award-creative, 奖项创作技能, award skill]
tags: [skill, gba2026]
source: 10_Claude_Skill_Sync/SKILL.md
version: 2026-10-17 v23
---
# 技能：ce-global-award-creative（奖项创作）

技能正文（权威）：[[10_Claude_Skill_Sync/SKILL]]，另有副本 [[09_GitHub_Repo/gba_repo/docs/SKILL]]
改进记录：[[_VAULT/Skill_Improvement/Improvement_Log]] ｜ 待办：[[_VAULT/Skill_Improvement/Backlog]]

## 1. 适用范围
CE Global 与两位创始人的所有奖项作品：封面、广告、横幅、GIF、Word 稿、模拟网站。

## 2. 每次都要做（要点）
- 先读：[[03_Docs/GBA2026_Context]]、[[03_Docs/GBA2026_Links_and_Context]]、WORKFLOW_PLAYBOOK_zh（在 [[09_GitHub_Repo/gba_repo/docs]]）
- 覆盖原文件，不留旧版；只做 James 要求的东西
- 回复用中文，先给图，再一行说明

## 3. 硬规则（摘要，全文见技能正文）
- 文字不压人体与脸；不切头；人脸不变形
- 一道完整彩虹，在照片里，高于两人头顶
- 金色只给公司名、标题、部门、铭牌；DAVID 为银色
- 两个邮箱 + 一个部门铭牌；不用黄色按钮、Get a quote、奖项字样
- 不发布财务数字

## 4. 流水线
[[_VAULT/Workflow/WF_02_Design_and_QA|WF_02]] → [[_VAULT/Workflow/WF_03_Writeup_and_Review|WF_03]] → [[_VAULT/Workflow/WF_04_Publish_and_Snapshot|WF_04]]

## 5. 脚本位置
- render10.mjs、qa_check.py、export10.py、build_docx.js、refine.py：[[09_GitHub_Repo/gba_repo/design]]

## 9. 错误记录
（完整版在技能正文的「Mistakes log」一节。这里只列结论，方便在 Obsidian 里反向链接。）
1. 自画彩虹 → 双彩虹；只用照片自带彩虹
2. 镜像补边 → 接缝；用 navy 补边
3. 硬边光带 → 天空出现线；只用柔和光晕
4. 顶到画面顶端 → 被网页裁切；留白规则 + QA
5. 头在彩虹带内未发现；加 3% 内缘检查
6. 过度调色 → 背景不自然；原照色调
7. 顶部渐变 → 平板色带
8. ffmpeg 调色板 GIF → 天空断层；用 libimagequant
9. 看了旧 1x 预览；渲染后必须导出
10. 黄色按钮、award 徽章、多个 CTA → 全被否

## 相关
[[00_HOME]] ｜ [[03_Docs/GBA2026_Skills_Playbook]]
