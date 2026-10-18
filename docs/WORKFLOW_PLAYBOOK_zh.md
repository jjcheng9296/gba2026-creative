---
name: ce-award-content-and-creative-playbook
description: 奖项投稿（Golden Bull / SBA / E50 / BrandLaureate 等）的文章写作 + 广告设计全流程：该装哪些技能、按什么顺序组合使用、每步的检查标准。适用于 CE Global / DR SHEKINAIH SIEW SIN YAP / DR J AARON K DAVID 的所有奖项与媒体素材。
version: 2026-10-17 00:50 (v22)
---

# CE Global 奖项内容 + 广告设计 技能组合手册

> 一句话：**先素材，再写作，再设计，再量测，再放进真实版面看，最后独立审核。** 技能只是放大器，原图和真实数字才是上限；客户认可的是原照的样子，不是加工后的。

---

## 0. 现行工作流（v22，2026-10-17）— 每次改动都走完
```
1 读 GBA2026_Context.md（压缩版）+ SKILL.md 规则 + James 最新一句话
2 改 render10.mjs（参数见 Context §3）→ node render10.mjs（只出 @2x）
3 python3 qa_check.py → 必须 PASS（彩虹顶点 ≥11%/封面 ≥12%，拱内缘高于头顶 ≥3%）
4 python3 export10.py --final（1x 预览 + JPG 72dpi + GIF libimagequant）→ 现在才看图
5 看：1:1 与 3× 局部（天空接缝、彩虹两脚、文字与人体距离、每一帧 GIF）
6 node build_docx.js（创意内嵌在 Word 里）
7 复制到 F: 主文件夹（原地覆盖）+ 当日 "DD Mon YYYY - Version N\" 快照（James 要求时）
8 Mock_Site assets → npx vercel@62.2.0 deploy --prod --yes（删 .env.local）→ Artifact 重发
9 发图 + 一行"改了什么"（中文）→ 更新 Context.md、SKILL.md（教训）、Documents 技能文件夹
```
**三个"看"的位置**：原尺寸、3× 局部、放进模拟网页（goldenbullaward 得奖页会裁掉封面顶部 ~3%；capital.asia 是白底、竞品亮蓝）。

---

## 1. 技能清单（按用途分组）

### A. 写作 / 内容营销
| 技能 | 用途 |
|---|---|
| `anthropic-skills:article-magazine` | 杂志专题写法：小标题写成论断、具体细节、校对正则、英式拼写 |
| `anthropic-skills:ce-global-correspondence-style` | 公司对外文书的固定格式与语气 |
| `marketing:content-creation` | 开头钩子、结构模板、CTA |
| `anti-ai-writing` | 去 AI 腔；"strict review" 模式做独立审稿 |
| `copywriting-kit:*` | copy-diagnose → copy-edit → copy-proof-check 逐句核证 |
| `online-writing:*` / `ad-creative:*` / `brand-voice:*` / `brand-studio:*` | 标题、打分、广告预检、品牌语气 |

### B. 设计 / 广告图
| 技能 | 用途 |
|---|---|
| `anthropic-skills:ce-global-award-creative` | James 的硬规则 + QA 门槛 + 发布流程（主规则，先读） |
| `frontend-design` / `design:design-critique` | 字体、层次、评审 |
| `image-generation` | 背景提示词（交给 ChatGPT GPT-6 Pro 生图） |
| `codesign:*` / `canva:*` / `apiai` | 备用：放大、抠图、变体（CoDesign 需 IMG.LY 登录） |

### C. 本机工具（James 电脑）
- **face-restore**（`C:\Users\chang\ai-tools\face-restore`，RTX 4050）：`venv\Scripts\python.exe restore.py upscale -i <file> -o <dir> -s 4` = Real-ESRGAN 4×（背景、Logo）。人脸只允许补清晰度（EDSR 2×），CodeFormer/GFPGAN 版本被否。
- **ChatGPT 项目 "GBA 2026 – CE Global Creative Studio"**（GPT-6 Pro，James 账号，Claude in Chrome 操作）：对话 "Generate Marina Bay Background" 生图（按各尺寸原生比例，一道完整拱、拱顶上方留天空、左三分之一留暗）；对话 "Critique Revised Award Dossier" 审稿。下载 → photos\ai_backgrounds\v2_full_arch\ 作为源素材。
- **Vercel CLI**（npx 缓存 62.2.0，已登录 jjcheng9296）、**GitHub CLI**（jjcheng9296）。

### D. 渲染 / 导出（容器 /home/claude/gba，脚本副本在 scripts\）
- render10.mjs：HTML/CSS + SVG，Playwright @2x；输出 out10/geometry.json 供 QA。
- qa_check.py：量测门槛（见 §0）。
- export10.py：Lanczos + UnsharpMask；JPG q95 4:4:4 + 72 dpi；**GIF = libimagequant（pip imagequant）每帧调色板、dithering 0.5**；ffmpeg 调色板会把夜空压成色带，已弃用。
- build_docx.js：article.md → Word（正文两端对齐、内嵌创意、GIF 说明"另附、此处为静态首帧"）。

---

## 2. 写作流程（Write-up ≤ 2000 词，现行 v7 ≈ 1,300 词）
1. **素材先行** — 向 James 要真实数字与案例；没有的不编。
2. **研究** — 已发表报道全文（SHEKINAIH_Magazine_Study.md）、shekinaihsiewsinyap-jaaronkdavid.com；ChatGPT 研究稿只取能 WebFetch 核实的事实；付费新闻稿不算编辑引用。
3. **方向（James）** — 信仰 + 生意、人性化、短句、六年级能读、强 CTA；SHEKINAIH 祷告、天上带来生意；DAVID 建立信仰与领导力；含 "WHEN ALL ELSE FAILS, TRY SHEKINAIH"；结尾 **How to contact them** 三条（货运邮箱、部门邮箱、两位网站）。
4. **核证 → 去 AI 腔 → 独立审稿 → build_docx → 原地覆盖**。
- 固定写法：首个财报期 "ends 31 December 2026"；LLP 写 "profit" 不写 "profit after tax"；历史数字旁写 CE Global Network LLP；博士状态只按证书写；原话全大写。

---

## 3. 设计流程（封面 2000×800、广告 1000×500、横幅 728×90、方块 340×280）
1. **素材** — 人像原图（Telegram "Save as file"）→ EDSR 2× → rembg → refine.py；背景 = ChatGPT 原生比例生图 → Real-ESRGAN 4× → 6000 px 母版；量出拱外缘/内缘/圆心写进 qa_check.py MASTERS。
2. **规则** — 先读 ce-global-award-creative，再 frontend-design。
3. **构图（v22 "Photo Arch"）** — 照片自带的一道完整彩虹跨过金沙、高于两人头顶、脚在画框内；人像半身、不切头；标题结束在拱左脚之前；业务行两行 "SINGAPORE FREIGHT FORWARDING / & LOGISTICS"；底栏 CONTACT US 两邮箱 + 居中铭牌 + 名牌叠放；两 Logo 一行。
4. **调色** — 原照观感（brightness 1.0 / contrast 1.03 / saturate 1.08），光晕极轻，不加顶部压暗、不重着色；补天空只用照片顶部 5% 真实天空。
5. **渲染 → QA → 导出 → 看 → 模拟网页 → 发布**（§0）。
6. **交付** — 原地覆盖；不发没要求的对比图；更新 Context。

---

## 4. 已知上限（技能解决不了，要素材）
- 两位的原图只有 1280 px 宽、闪光灯直打 → 100% 放大仍偏软。要专业拍摄或原图。
- 两个 Logo 是位图 → 横幅上的 CEG 徽章偏糊。要 AI / PDF 矢量档。
- GIF 只有 256 色：天空渐变永远不如 JPG，libimagequant 已是上限；更大改善只能靠更简单的天空。
- 340×280 用 2.5:1 母版时，拱两脚只能落在画框两侧（与封面一致）；要两脚内收需 ChatGPT 的 6:5 原生版本（待收）。
