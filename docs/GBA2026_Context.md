# GBA 2026 — 项目上下文（压缩版，2026-10-17 23:40 · v31）

> 新会话先读这一份。规则在 skill `ce-global-award-creative`（Documents\CE_Global_Award_Creative_Skill\SKILL.md）；链接在 GBA2026_Links_and_Context.md；详细版本史在本文末尾附录。

## 1. 基本事实
- 得奖主体：CE GLOBAL NETWORK INTERNATIONAL PTE LTD（2026-04 注册、2026-07 开始经营；历史数字属 CE Global Network LLP：营业额 [figure withheld] / [figure withheld] / [figure withheld]，利润 [figure withheld] / [figure withheld] / [figure withheld]，FY2023–25，未审计）。
- 两位：DR SHEKINAIH SIEW SIN YAP — Founder & Managing Director（金色、在上、更大）；DR J AARON K DAVID — Chief Advisory & Support Officer（银色、在下；Pte Ltd 不是 Co-Founder）。
- 组织方：Golden Bull Award（Jason Ooi，BMI）。颁奖礼 2026-11-12 Marina Bay Sands；资料截止 2026-12-31。颁奖前不对外宣布。
- 联络：货运 shipping@ceglobalnetworkinternational.com；部门 HEAVEN THRONE ROOM MINISTRY ceg@crownedeaglesglobal.org；两位网站 www.shekinaihsiewsinyap-jaaronkdavid.com。James 自己的签名邮箱 admin@ceglobalnetwork.com。

## 2. 交付物现状（全部完成，v24 = 17th Oct Version 1 最新）
| 文件（F:\Golden bull award preparation 2026\） | 状态 |
|---|---|
| GBA2026_Cover_2000x800.jpg | 标题 WHEN ALL / ELSE FAILS, / CONTACT SHEKINAIH（银 + SHEKINAIH 金；是否加 DR 待 James）；业务行两行；公司名两行同为 50px；彩虹顶点 14.9% |
| GBA2026_Advertisement_1000x500.jpg | PROMISE DELIVERED；公司名两行同为 28px；铭牌 When all else fails / CONTACT DR SHEKINAIH / Fully backed by the power of Heaven；顶点 12.4% |
| GBA2026_Banner_728x90.gif / .jpg | **六帧**：f0 品牌 → f1 公司名 18.5px + 邮箱｜电话 → f2 部门铭牌（DR + Fully backed）→ f3–f5 BANG! ×1/2/3 逐个弹出（2.5/2.5/0.9/0.35/0.35/2.6 s）；201 KB |
| GBA2026_Banner_340x280.gif / .jpg | 六帧同上；**Logo 移进底部色带**（不压彩虹）；公司名两行同 17px；288 KB |
| GBA2026_Winner_Profile_CE_Global_Network_International.docx | 文章 v7（1,299 字，信仰 + 生意，结尾 How to contact 三条）；正文两端对齐；内嵌 v22 创意 |
| 17th Oct 2026 - Version 1\ | 以上 7 个文件 + Context + Links 的当日快照（与主文件夹相同） |
| 17th Oct 2026 - Version 6\ | **v28 V6.2《三击破局》**（Remotion）：ChatGPT 真门素材（gate_state1–4 黑金 vault 门）+ ChatGPT 锻金裂纹 BANG! 字（bang_B）换入；铭牌始终在前；三击 = 裂缝 → 透光 → 开门；728×90 ≈164 KB / 340×280 ≈272 KB；审稿图 GBA2026_V6.2_V8_Review_Sheet.jpg（V6.2 + V8 并排）；不放电话/奖项/数字 |
| 17th Oct 2026 - Version 7\ | **v27 V7** 四尺寸（封面/广告/728/340）加 "DR SHEKINAIH SIEW SIN YAP · 7 COMPANIES" 名块（SEVEN=1，横幅第 2 帧）；V1 主文件未动 |
| 17th Oct 2026 - Version 8\ | **v28 V8《BANG! 砸三次》**：无门，铭牌居中常显，同一个锻金 BANG! 在底行原位砸三次（1.8× 落到 1×，每次放大 1/1.11/1.22，闪光 + 冲击环 + 铭牌震两帧）；≈162 / 220 KB；James 原话"还不如直接 BANG! 这样有力量的显示 3 次" |
| photos\ai_assets\ | ChatGPT 生成的 17 张素材（20:00 批准下载）：门 ×4（RGBA 1774×887）、BANG 三款 A 奢华衬线 / B 锻金裂纹（最有力，已用）/ C 漫画奢华、HEAVEN 字带 ×2（一行金 / 两行银金，未用）、烟花 ×4（黑底，供 v5g）、bang_set1 |
| GitHub https://github.com/jjcheng9296/gba2026-creative | **公开仓库**（v26 快照：docs/writeup/design 脚本+母版/final 全版本/site/photos；无财务数字）——Codex/另一台电脑接手入口；本机 _repo\gba_repo 是工作副本 |
| GBA2026_Mock_Site\ | 模拟 capital.asia / 得奖页；Vercel https://gba2026-mock-site.vercel.app/ （+ /winner.html，公开、noindex）；Artifact 备用 |
| 17th Oct 2026 - Version 5\ | **v25–26** 六套英文动画横幅：V5A 天光三击 / V5B 冠冕签名 / V5C 三环（ChatGPT Part B）；V5D 光柱+BANG 字；V5E 金色烟花+BANG（James 构想）；**V5F Gold Detonation 金色爆闪 9 帧（ChatGPT Part C 规格 + 烟花，当前最震撼）**；README 说明；中文版待做 |
| 缺 | 公司照片 10–30 张（宽 1000px）；矢量 Logo |

## 3. 现行设计参数（render10.mjs，v22）
- 唯一母版 aibg_arch5.jpg（6000×2399，ChatGPT "Rainbow Over Marina Bay at Night-5"，Real-ESRGAN 4×；拱外缘 y198 / 内缘 y232 / 圆心 4276,1936）。4:3 版图 B 已停用。
- 电话 `PHONE` 环境变量，默认 +65 8161 5672（James 手机，是否公开待确认）；横幅 f1/f2 联络行 = 邮箱｜电话 10.5px。
- `arch(k, cxCss, oy, extra, fill, M)`：封面 k1/3 cx1425 oy56，人像 s0.45 fx1181 fy196；广告 k1/6 cx712.67 oy30，s0.30 fx595 fy86；728×90 k0.062 右对齐 oy4，s0.09 fy28；340×280 k0.0986（照片右缘 = 画框右缘）cx170 oy22，s0.19 fx126 fy54。
- 调色：brightness 1.0 / contrast 1.03 / saturate 1.08（= 原照观感）；光晕减半；340×280 无顶部压暗、无水面重着色。oy>0 时顶部用照片自己顶部 5% 天空拉伸 ≈1.9× + blur 1.2 补齐。
- QA 门槛 qa_check.py：顶点 ≥ 11%（封面 ≥ 12%）、拱内缘高于每个头顶 ≥ 3%、顶点在画面内 → 不过不出图。
- 导出 export10.py：Lanczos + unsharp；JPG q95 4:4:4 72 dpi；GIF = libimagequant 每帧调色板、dithering 0.5、2.5/2.5/3 s、loop 0。**渲染只出 @2x，必须跑 export 才有 1x 预览。**
- 字体：所有金字 Bodoni Moda 900（.bd gold gsh2）；白标签同字体；邮箱 Manrope；铭牌 .plq。

## 4. James 的硬规则（一句话版，详见 skill）
文字不压身体/脸；不切头（至少半身）；人脸不改形；一道完整彩虹、在照片里、不自画不延伸、高于两人头顶、脚在画框内；背景整幅覆盖且高清；原照色调、不加饱和；金色只给公司名/标题/部门/铭牌/她的名字，DAVID 银色；两 Logo 一行、CEG 左 CE Global 右；创意不提奖项；PROMISE DELIVERED 无句号；业务行 "SINGAPORE FREIGHT FORWARDING / & LOGISTICS" 两行；底栏只两个邮箱 + 一个部门铭牌（不要黄色按钮、Get a quote、网址）；原地覆盖不留旧版；不做没要求的东西；回复用中文。

## 4a. 固定版位 + 动画顺序（老板 2026-10-17 21:25，James 要求记录，不得再错）
- **Logo 位置**：CROWNED EAGLES GLOBAL（CEG 鹰徽）在**左**，CE GLOBAL NETWORK INTERNATIONAL PTE LTD（CE Global 方块标）在**右**；可占横幅**左上角 + 右上角**（天空区，彩虹两侧外缘，不压彩虹、不压人）。
- **动画顺序**：① "WHEN ALL ELSE FAILS," 像 BANG! BANG! BANG! 一样**砸进来**（戏剧性登场）→ ② 紧接着 "CONTACT DR. SHEKINAIH" **大面积高亮**、极有冲击力，看的人一定看到 → ③ "FULLY BACKED BY"、"POWER OF HEAVEN" 也各自带冲击力落下（看得清、记得住）→ ④ BANG! 递进：先 1 个 BANG!，再 2 个 BANG! BANG!，最后 3 个 BANG! BANG! BANG! 一起震动，最强冲击，然后定格。公司名、HEAVEN THRONE ROOM MINISTRY 固定不动。（老板 21:26 补充）
- 元素/字体由 ChatGPT 生成（James 指示），Claude 排版 + Remotion（+ three.js 3D BANG）动画 + 逐帧检查。
- **V9C 电影片头式定稿（James 22:31–22:57，参考 YouTube Short "Cinematic Gold Happy Birthday 3D"）**：所有重点字用 ChatGPT 生成的 **3D 挤出抛光金字（无裂纹、亮面 + 深色侧面）**：DR. SHEKINAIH、HEAVEN THRONE ROOM MINISTRY（单行，214 px 宽放在 y 8–27，离彩虹顶点 ≥15 px，**不碰彩虹**）、BANG!（三个全部亮金）、右栏 DR. SHEKINAIH SIEW SIN YAP（同款 3D 金，两行）。动效 = ChatGPT 第八轮配方：**"纪念碑式落地"**（108%→100%，0.5 s 内微糊→锐利，之后完全静止）+ **一条金色星尘彗尾绕字飞一圈**（1.6–2 s，白色十字星光头部，尾巴渐隐，轨道裁在自己区域内，不飞到别的字上）+ **一道 18° 窄金光扫过字面**（峰值不透明度 ≤0.45）。**禁止**白色涟漪、白光团、环绕光晕、抖动——字永远不被遮，光只在字外面。CONTACT（银小字）在上、DR. SHEKINAIH 在下并上移到完整可见；"Write to: ceg@crownedeaglesglobal.org" 从 7.0 s（FULLY BACKED BY）起才出现，2–7 s 整行留给 DR. SHEKINAIH。时间轴 16 s：0 WHEN ALL ELSE FAILS,（银）→ 2.0 CONTACT / DR. SHEKINAIH（停到 7.0）→ 7.0 FULLY BACKED BY（银）→ 8.5 POWER OF（银）/ HEAVEN（金）→ 10.5 BANG! → 11.5 BANG! BANG! → 12.5 BANG! ×3 一起震 → 13–15 部长星尘 + 金光 → 16 回环。
- **340×280 定稿规则（James 22:02–22:17，必须记住）**：DR SHEKINAIH SIEW SIN YAP 名字**永远比** DR J AARON K DAVID 大很多（12.5 px vs 8.4 px）；名字块在右栏**居中、等距**；右栏不再放 CONTACT DR. SHEKINAIH 铭牌（底行已有 CONTACT 银 + DR. SHEKINAIH 大金字），位置让给两位名字 + 头衔；两个 Logo 同尺寸同水平线（50×50，顶 6 px）；HEAVEN THRONE ROOM MINISTRY 用 PROMISE DELIVERED 同款 Bodoni 金字，照片顶部正中、彩虹上方，最后 3 秒抖动 + 扫光 + 呼吸；WHEN ALL ELSE FAILS, 银色、尽量大；FULLY BACKED BY 银；POWER OF 银小字 + HEAVEN 大金字；邮箱行 "Write to: ceg@crownedeaglesglobal.org" 离底边 ≥7 px；公司名银色渐变、离金线略低；文字不许挤，等距排。

- **v31 定稿与交付（23:23–23:40）**：340×280 V9C 老板通过。交付五档：`GBA2026_Banner_340x280_V9_Boss_Sequence.gif`（槽位 340×280，≈363 KB）、`@2x.gif`（680×560 Retina，≈900 KB）、`_1360x1120.mp4`（1080p 级，24 fps，1.3 MB）、`_1360x1120.jpg`、`_frame1.jpg`；全部由 Remotion 以 2×/4× 像素直接渲染，人物来自原高清照片，无 AI 放大、无变形。文件夹已整理：根目录只留 V1 主文件 + 文档；`Version 9\` = 定稿；旧 Version 2–8 与早期 V9 728×90 移入 `_archive_old_versions\`（规则：不删工作文件）。设计哲学 + 工作流已与 ChatGPT 整合成 `GBA2026_Design_Philosophy_and_Workflow.md`；元素/字体/位置/时间轴细节在 `Version 9\GBA2026_V9C_340x280_Build_Notes.md`；文件夹地图 `README_FOLDER.md`。待：728×90（ChatGPT 建议 8 s 循环、CTA 第一帧出现）、1000×500、封面，用同一套系统。

- **文件夹新结构（23:45）**：01_Approved_Banner_340x280_V9C（定稿）· 02_Live_Deliverables_V1（封面/广告/728/340 V1/Word + V1 快照）· 03_Docs（全部 md）· 04_Organiser_Brief · 05_Logos · 06_Photos_and_AI_Assets（原 photos）· 07_Reference_Past_Winners · 08_Mock_Site_Vercel（原 GBA2026_Mock_Site）· 09_GitHub_Repo（原 _repo）· 10_Claude_Skill_Sync（原 _skill_sync）· 99_Archive_Old_Versions。地图见根目录 README_FOLDER.md。文中旧路径（Version 9、photos\ai_assets、GBA2026_Mock_Site、_repo）按此对照。

## 5. 流程（每次改动必跑）
**V6 Remotion 线**：`VARIANT=v6 node render10.mjs`（底图 4 帧，无铭牌/BANG/电话）→ `node v6layers.mjs`（透明图层：铭牌、BANG 字、门 4 态）→ 复制到 remotion/public/v6 → `npx remotion render LB|MR out/LB --sequence --frames=0,48,78,108-115,116-123,124-133,134 --image-format=png`（remotion.config.ts 指向本机 headless_shell）→ `python3 export_v6.py`（共用调色板 + 只存变化区 → final/v6）→ 审稿图 → Mock_Site\v6 → Vercel。Remotion skills 在 .agents/skills/remotion-*（`npx skills add remotion-dev/skills`）。
render10.mjs → qa_check.py（PASS）→ export10.py --final → build_docx.js → 复制 F: 主文件夹（+ 当日 Version 子文件夹，若 James 要）→ Mock_Site assets → `npx vercel@62.2.0 deploy --prod --yes`（在 GBA2026_Mock_Site，删 .env.local）→ Artifact 重发 → 发图给 James + 一行说明 → 更新本文件与 skill。

## 6. 待办 / 待 James
- **v28 待 James**：V6.2（门 + 三个 BANG）vs V8（一个 BANG 砸三次）选哪个；两版已上 Vercel /v6/banner_*_v6.gif、/v6/banner_*_v8.gif + review_sheet_v6.jpg。ChatGPT 6 Pro 评审需 James 直接把审稿图/GIF 拖进 ChatGPT（它的浏览器读不到 Vercel 链接）。HEAVEN 字带是否用在品牌帧；v5g 真烟花版是否还要。YouTube Short（Claude 做滚动式产品动画）的问题待答。
- **品牌句（老板 2026-10-17 02:47）**："WHEN ALL ELSE FAILS, CONTACT DR SHEKINAIH BECAUSE FULLY BACKED BY THE POWER OF HEAVEN! BANG! BANG! BANG!" — **v24 已改进 V1 主文件**（f0 品牌句 + DR；f2 HEAVEN THRONE ROOM MINISTRY 必有；f3–f5 BANG 动画）。V2/V3/V4 子文件夹为备选。待 James 定：封面标题是否加 DR；电话号码是否公开；中文四字（承诺必达 / 万策皆尽时 / 天国宝座事工）；哪个版本上线。
- ChatGPT GPT-6 Pro 已收（Critique.md 第三、四轮，10-17 11:06）：① capital.asia 评估——黑金保留；弱点是读者记住 PROMISE DELIVERED 没记住 CE Global（认出广告主 5–5.5/10）；建议加独立 CE GLOBAL 字标、中文行"新加坡国际货运"（反对 承诺必达/保证送达）、Logo+公司名每帧固定、品牌帧第一最长；封面上方天空提到 #0D1C33、彩虹顶点离可见边 ≥70px。② 品牌句动画三版：1 Light from Above 天光三击（推荐，困局当前，信仰引路）、2 Crowned Signature 冠冕签名（以信仰为本，与您同行）、3 Three Resonant Rings 三环共鸣（凝聚信念，共寻出路）；节奏 4/2.5/2.5/0.7/0.7/3.6s；不写 BANG 字、不脉冲彩虹。保密指令已发给 ChatGPT 并接受。James 12:06 定：三个都做、先英文 → **v25 已做（Version 5 子文件夹）**。12:17–12:45 加做 V5D/V5E/V5F（见 v26）。待 James：选哪一版上线；中文版（BANG → 砰！砰！砰！，支持行 困局当前，信仰引路）；GIF 体积（六帧 ≈208/282 KB，V5F 九帧 ≈343/453 KB；ChatGPT 目标 ≤150 KB 需共用调色板 + 只存变化区）。
- **财务数字保密（James 2026-10-17 02:00）**：文章、得奖页、Vercel、Artifact 已全部去掉 S$ / 百分比 / 年度数字（改为文字描述）；本文件 §1 的数字只供内部核对，不得出现在任何公开稿。ChatGPT 项目里早前上传过含数字的 docx（无法撤回）——下次开 ChatGPT 时先发一句：不得引用、复述或推算真实营收/利润数字，一律视为机密。Chrome 02:00 仍断线，待办。
- ChatGPT 两个未收的回答（Chrome 扩展 22:55 断线）：capital.asia 版面评估；原生比例背景图（2.5:1 / 2:1 / 6:5 / 8:1，拱内留天空）。
- 是否在横幅/广告加 4 字中文（承诺必达 / 一诺千金 / 使命必达）— James 定。
- 文章缺的事实：DAVID 一个有记录的决策；有日期的 AI 工作流案例；ASEAN 航线；营收/利润口径；2026 年 1–6 月经营主体；EIU 博士学位状态（新闻稿写四个已授予 vs 档案两个）。
- 公司照片 10–30 张；矢量 Logo；ceg@ 邮箱是否有人看。

## 7. 教训（防止重犯）
1. 自画彩虹 → 双彩虹/延伸生硬。只用照片里的彩虹。
2. 横幅镜像补边 → 接缝/第二道彩虹。用 navy 补边。
3. 硬边聚光 div → 天空出现一条"线"。只用柔和径向光。
4. 照片顶到画面顶端 → 彩虹被网页裁切。留白规则 + QA。
5. 广告里 DAVID 的头在彩虹带内没发现 → 加 3% 内缘检查。
6. 给照片加饱和 + 光晕穹顶 + 水面重着色 → "背景不自然"。原照色调。
7. 顶部压暗渐变 + 顶部 1% 单色拉伸补天空 → 平板色带。无顶部渐变、用顶部 5% 真实天空。
8. ffmpeg 调色板 GIF → 天空断层。libimagequant。
9. 看了旧的 1x 预览 → 渲染后必须 export。
10. 黄色药丸按钮、Get a quote、奖项徽章、网址行、三个 CTA → 全被否。

---
## 附录：版本史（压缩）
- v8（10-16）PROMISE DELIVERED 口号、夜景 + 彩虹拱构图、CEG 左 / CE Global 右。
- v9–10 ChatGPT 生图背景；底栏改 CONTACT US 两邮箱；ChatGPT 第二轮评分 6.3–6.8（全文见 GBA2026_ChatGPT_Critique.md）。
- v11–13 James 逐条规则：只两个邮箱、一个部门铭牌（否决黄按钮）、名牌叠放、金色减量、Logo 放大一行。
- v14–15 GIF 三帧定稿；不提奖项；不切头；标题改 WHEN ALL ELSE FAILS, CONTACT SHEKINAIH；PROMISE DELIVERED 去句号；文章改信仰 + 生意方向（v6）。
- v16–18 彩虹从自画 → 照片自带（ChatGPT v2_full_arch 六张 + 图 5 + 4:3 图 B）；Real-ESRGAN 4× 母版；文章 v7（ChatGPT 研究 + WebFetch 核实）。
- v19 图 5 满版；模拟网站 + Artifact；Vercel 发布（James 电脑 CLI）。
- v20 彩虹留白修正（照片下移 + 补天空）、QA 门槛、技能文件夹同步。
- v21 原照色调、340×280 改图 5、LOGISTICS 换行、文章结尾 How to contact + 网站、正文两端对齐。
- v22 340×280 去顶部渐变 + 5% 天空补边；GIF 改 libimagequant；17th Oct Version 1 快照。
- v23 V2（图标 + ≤4 词 + 中文版）、V3（首帧完整、三拍、一条动线）、V4（老板品牌句 + 部门 + 电话 + Logo 进色带）子文件夹；文章去掉所有财务数字。
- v27 V6《三击破局》= ChatGPT 19:10 建议的分工：Claude 定分镜 → ChatGPT 生成四张连续门素材 → Claude 排版 → Remotion 动画 → 逐帧检查。GIF 瘦身法：libimagequant 对关键帧拼图取 256 色共用调色板，各帧 Pillow 量化，未变像素沿用上一帧索引（变化区 MaxFilter 膨胀 2px），Pillow optimize 只存变化框 → 975 KB → 146 KB。教训：门滑开要裁在门区内（overflow hidden），否则压到左边文字列。v30：V9C 素材 photos\ai_assets\v9c_*.png（dr_shekinaih / ministry 单行+双行 / bang / 全名两行，3D 抛光金）；Remotion：src/Banner9.tsx（rev b）、CtaTitle.tsx（落地 + 扫光）、SparkleOrbit.tsx（星尘彗尾）、Bang3D.tsx（three.js 金属 BANG）；export VER=V9B（按帧间隔算时长，只第一帧抖色）。教训：白色光团/涟漪会把字洗白（James 两次否决）；GIF 里灰白光带会变成浅色条纹——光要窄、要金、要短；一拍里同时动两处（标题 + 底行）会让存储框变成整幅 → 体积翻三倍，所以标题动效只放在底行静止的结尾。v28：素材已下载换入（V6.2）；V8 新增 mode="bang" 组合（Root.tsx LB8/MR8，export_v6.py VER=V8）。教训：整幅画面抖动会让每个像素都变 → GIF 翻三倍（456/598 KB），抖动只给铭牌 → 155/214 KB；BANG 字图含光晕，字高取 1.5×字号、行内居中 y=74/261，字才不会压出底边。
- v26 V5D/E/F：James 12:17 "需要震撼" + 12:26 "彩虹左上方一开始就有金色烟花，然后 BANG! BANG! BANG!"；ChatGPT Part C（Critique.md 第五轮）给出 GOLD DETONATION 规格（切面闪核 + 放射金芒 + 薄冲击环 + 火花；BANG! 18/20/23px，最新 112%→100%，旧 88%/72%、78%/48%，旋转 −4/+2/−2°，描边 #4B3214；色阶 #FFF1BF/#F1D27B/#D9AB4C/#A36E26/#4A3012；9 帧 4/2.5/2.5/.15/.55/.15/.55/.2/3.4s；中文 砰！砰！砰！）。实作教训：金字叠在金色爆闪上会消失 → 爆闪放天空（彩虹左上方外侧，几何按拱算），BANG 字放色带行；340 色带太挤，字后不放爆闪。render10.mjs `detonate()` / `bangword()` / `firework()` / `V5F_BEATS`；export10 9 帧时长表。
- v25 Version 5 = ChatGPT 三版动画（render10.mjs `VARIANT=v5a|v5b|v5c[zh]`，lb5/mr5，六帧 4/2.5/2.5/0.7/0.7/3.6s；固定：Logo、公司名两行、部门、WHEN ALL ELSE FAILS,、铭牌 CONTACT DR SHEKINAIH；只换一行信息；三拍 = 光柱 / 金边 / 光环，不写 BANG）；qa_check 变量感知；340 的 f1/f2 只放邮箱（电话在首帧 = 静态版）。
- v24 V1 主文件吸收 V4：品牌句 + DR、部门帧、BANG×3 弹出帧、电话、公司名两行同大小、340×280 Logo 进色带；Vercel/Artifact v9 同步。
