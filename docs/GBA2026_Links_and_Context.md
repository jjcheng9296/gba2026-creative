# GBA 2026 — 链接与上下文（2026-10-16 23:15）

## 我们的预览 / 发布
| 用途 | 链接 | 备注 |
|---|---|---|
| 模拟 capital.asia 版面（728×90 + 340×280 GIF 在真实位置） | https://gba2026-mock-site.vercel.app/ | 公开、无需登录；X-Robots-Tag noindex，搜索引擎不收录；可切换 GIF / 静态 JPG |
| 模拟 goldenbullaward.com 得奖页（封面 + Logo + 文章 v7 + 广告） | https://gba2026-mock-site.vercel.app/winner.html | 封面按真实网页方式裁切（1521×590、底对齐） |
| 同一内容的 Claude Artifact | https://claude.ai/artifact/PwCe8iu8tBek7QRdcwegYk | 已设 "Anyone with the link"；备用 |
| Vercel 项目 | gba2026-mock-site（账号 jjcheng9296 · JJCHENG's projects，hobby） | 源文件夹 `F:\Golden bull award preparation 2026\GBA2026_Mock_Site\`；重新发布：在该文件夹 `npx vercel@62.2.0 deploy --prod --yes` |

## 要模仿 / 对照的真实页面（Jason Ooi 2026-10-16 Telegram 提供）
| 页面 | 链接 | 观察 |
|---|---|---|
| capital.asia 首页 | https://capital.asia/ | 白底中文财经站；728×90 在页眉右侧（资本 Logo 旁）；340×280 沿右栏排列；竞品横幅多为亮蓝 / 白 / 绿企业横幅（Athrotech、BWS、Polytainer——Polytainer 还带 "Super Golden Bull Award 2026 Winner" 徽章）；读者以中文为主，重品牌 / Logo 印象（James 的判断） |
| 得奖页范例 1 — Saint-Gobain Malaysia（Super Golden Bull MY 2025） | https://goldenbullaward.com/winners/my-hall-of-fame/malaysia-2025/super-golden-bull-my-2025/saint-gobain-malaysia-sdn-bhd/ | 黑色导航 142px → 封面满版 → Logo → 奖项徽章 → 资料表 → 约 1000 字文章 → 广告 → 相册 |
| 得奖页范例 2 — Galaxy Nexus AI（Super Golden Bull SG 2025） | https://goldenbullaward.com/winners/sg-hall-of-fame/singapore-2025/super-golden-bull-sg-2025/galaxy-nexus-ai-pte-ltd/ | 同上结构 |
| 得奖页范例 3 — Terberg Tractors Malaysia（Super Golden Bull MY 2025） | https://goldenbullaward.com/winners/my-hall-of-fame/malaysia-2025/super-golden-bull-my-2025/terberg-tractors-malaysia-sdn-bhd/ | 同上结构 |
| Golden Bull 主站 | https://goldenbullaward.com/ | 颁奖礼 2026-11-12 Marina Bay Sands；资料截止 2026-12-31（Jason Ooi） |

## ChatGPT（GPT-6 Pro，James 的账号，项目 "GBA 2026 – CE Global Creative Studio"）
| 对话 | 用途 |
|---|---|
| Critique Revised Award Dossier | 文章 / 创意审稿（第 1–2 轮 + 底栏 / CTA / 版面评估）；记录见 GBA2026_ChatGPT_Critique.md |
| Generate Marina Bay Background | 背景生图（v2_full_arch 六张 + 图 5 + 4:3 版 B；已请求原生比例 2.5:1 / 2:1 / 6:5 / 8:1、拱内留天空的版本） |
| Review Writeup Creatives | 早期创意审稿 |

## 本机工具
- Real-ESRGAN 4×：`C:\Users\chang\ai-tools\face-restore\venv\Scripts\python.exe restore.py upscale -i <file> -o <dir> -s 4`
- Vercel CLI（npx 缓存 62.2.0，已登录 jjcheng9296）；GitHub CLI 已登录 jjcheng9296
- 技能文件夹：`C:\Users\chang\Documents\CE_Global_Award_Creative_Skill\`
