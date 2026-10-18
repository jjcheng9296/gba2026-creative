# GBA 2026 — 项目背景总览 (Context)

更新：2026-10-16 22:40

## 基本事实
- 公司：CE GLOBAL NETWORK INTERNATIONAL PTE LTD（UEN 202605111K），27 Trevose Crescent, Dunearn Estate, Singapore 298042
- 奖项：Golden Bull Award 2026 — Outstanding Bull；Digital 50 Awards；Inspirational Entrepreneur ×2（DR SHEKINAIH SIEW SIN YAP、DR J AARON K DAVID）
- 配套：Regional Prestige Package（发票 BMI11734，SGD 34,662 含 GST，已付款）
- 主办方联络：Jason Ooi，Senior Project Manager，jason@goldenbullaward.com
- 颁奖典礼：2026-11-12，Marina Bay Sands。典礼前不可对外公布。
- 截止：Winner Profile Write-Up + Company Advertisement —— 2026-12-31（比清单的"60 天"更早，以此为准）
- 主办方还在等：高清 logo（AI / PSD / PDF）

## 职位写法（2026-10-16 James 更正，以此为准）
- DR SHEKINAIH SIEW SIN YAP — Founder and Managing Director
- DR J AARON K DAVID — Chief Advisory and Support Officer（在 CE Global Network International Pte Ltd **不是** Co-Founder；他只是 CE Global Network LLP 的 Co-Founder）
- 两人是公司的核心管理层，并列、同等地位，所有作品上两人并排同大小
- 两人名字永远全大写
- 两人博士学位要写进文章，状态按内部规则写：conferred / approved for conferment / conditional, finalisation pending，不得拔高

## 交付清单（Prestige）与现状
| 项目 | 规格 | 文件 | 状态 |
|---|---|---|---|
| 公司资料 + 专题文章 | ≤2000 字 | GBA2026_Winner_Profile_CE_Global_Network_International.docx | 1,299 字（v7 信仰 + 生意版，结尾 How to contact + 网站，正文两端对齐）；表格加"沿革"一行；GIF 说明"另附、此处为静态首帧"；图片 = v20 创意 |
| 封面图 | 2000×800 jpg | GBA2026_Cover_2000x800.jpg | 完成（v20：图 5 满版、彩虹顶点 14.5%、拱在两人头顶之上） |
| 公司照片 | 10–30 张，宽 1000px | photos/ | 缺 |
| capital.asia 广告 | 1000×500 jpg | GBA2026_Advertisement_1000x500.jpg | 完成（v20：顶点 12.6%，DR DAVID 头顶不再挡彩虹带） |
| 横幅 | 728×90 | GBA2026_Banner_728x90.gif/.jpg | 完成（v20：顶点 18%，navy 补边无镜像接缝） |
| 方块广告 | 340×280 | GBA2026_Banner_340x280.gif/.jpg | 完成（v20：4:3 版图 B 满宽、顶点 12.1%） |
| 模拟网页 | capital.asia / 得奖页 | GBA2026_Mock_Site\ | 已发布 Vercel（公开、noindex）+ Artifact，见 GBA2026_Links_and_Context.md |

## v22（2026-10-17 00:45）— 340×280 天空 + GIF 画质
- James："JPG 的背景我喜欢（更均匀），GIF 不是，改进 GIF。"
- 340×280 天空：删除顶部 35% 压暗渐变（它把天空上段压成一条平板深色带、彩虹周围反而像发光穹顶），只留左上角 Logo 后的柔和暗角；补天空改用照片顶部 5% 的真实天空轻微拉伸 1.9×（之前是顶部 1% 拉伸 9× 的单色块）。三张并排比（原照裁切 / 新法 / 旧法）确认新法与原照一致。此法同时套到封面、广告。
- GIF：ffmpeg palettegen/paletteuse（bayer5）把彩虹内侧的深蓝渐变压成一条平板亮蓝带（天空 RMSE 5.1）；测试 6 种抖动 + 天空加权调色板都无明显改善；改用 **libimagequant**（pngquant 引擎，pip imagequant）每帧独立调色板、dithering 0.5 → 天空 RMSE 3.8，渐变平滑、与 JPG 一致。export10.py 的 gif() 已改；时长 2.5/2.5/3 s、loop 0；340×280 139 KB、728×90 94 KB。
- 已同步：主文件夹 + 17th Oct 2026 - Version 1\、Mock_Site、Vercel、Artifact（v6）、Documents 技能 scripts。

## 设计 v21（2026-10-17 00:20）— 背景"不自然"的根因 + 四项修正
- James（340×280 第三帧）："背景还是不太自然，彩虹也要做得更好。" 根因：我在照片上叠了 saturate 1.35 / contrast [REDACTED] 的滤镜 + 暖色光晕层，把他说"very good"的图 5 原照变成了"画出来"的霓虹拱和发光穹顶；340×280 用的 4:3 版图 B 本身拱比画面宽（两脚被画框切掉）、水面又加了金色重着色层。
- 修正：① 所有尺寸统一改为近中性调色 brightness 1.0 / contrast 1.03 / saturate 1.08（= 原照观感）；暖色光晕减半（封面 .26→.12、广告 .28→.12、glow .22→.10），340×280 的光晕与金色水面层删除。② 340×280 改用图 5：k 0.0986（让照片右缘 = 画框右缘，无补边）、cx 170、oy 22；人像 s0.19 fx126 fy54；顶点 [figure withheld]，整道拱两脚落在画框两侧（与封面一致）。图 B 不再用于任何尺寸（留作素材）。③ 封面与广告的业务行拆成两行 "SINGAPORE FREIGHT FORWARDING / & LOGISTICS"（封面 38px、广告 22px），文字不再压到金沙景物（James："logistics 换到第二行，不影响景物"）。④ 文章结尾改为明确的 How to contact them 三条：货运邮箱、部门邮箱、两位的网站 www.shekinaihsiewsinyap-jaaronkdavid.com（James 要求"结尾要写怎么联络 + 他们的网站"）；Word 与模拟得奖页正文全部两端对齐（James："all writing text must be justify"）。Word 1,299 字。
- 教训（写进 skill）：**不要给 AI 背景照再加饱和 / 对比**——客户认可的是原照；"自然"= 原照的色调 + 不加人工光晕；渲染后必须跑 export10.py 才会更新 1x 预览（render10 只出 @2x），之前有一次看了旧图。
- QA 全部 PASS；F: 六个文件 + Word 覆盖；Vercel 与 Artifact 更新（v4）。

## 设计 v20（2026-10-16 23:15）— 彩虹"顶住上边"修正 + QA 自动门槛
- James 红圈：封面彩虹顶点贴着上边缘；在 goldenbullaward 得奖页（黑色导航栏下、封面按 1521×590 底对齐裁切，顶部约 3% 被裁）看起来被切。**根因是我的操作**：图 5 的拱顶本来就只离照片上边 8.3%，我却把照片顶到画面顶端。
- 修法（不改彩虹、不重画）：`arch()` 的 oy>0 时，照片整体下移 oy，顶部空出的 oy 像素用**照片自己最上方 1% 的夜空**纵向拉伸 + 模糊（blur = max(2, oy/8)）补齐，再压顶部暗渐变 → 无接缝（1:1 检查过）。两位同步下移/微缩，使拱内缘始终高于头顶。
- 数值：封面 oy56、人像 s0.45 fx1181 fy196 → 顶点 122px = 15.2%（最终 jpg 量测 14.5%），DR DAVID 头顶上方 67px；广告 oy30、s0.30 fx595 fy86 → 12.6%，头顶上方 26px（之前 DR DAVID 的头挡住彩虹带，是错的）；728×90 oy+4（原 −6）、s0.09 fy28 → 18.1%；340×280 oy22、s0.19 fx126 fy54 → 12.1%（金色水面层 top 158）。
- **新 QA 门槛 `design/qa_check.py`**（render10.mjs 现在输出 out10/geometry.json）：① 彩虹外缘顶点 ≥ 画面高 11%（封面 ≥ 12%，因网页再裁 3%）；② 拱**内缘**在每个人头顶正上方 ≥ 3% 画面高；③ 顶点在画面内。任何一项不过 → exit 1，不导出。本版全部 PASS。
- 母版实测：aibg_arch5.jpg 拱外缘 y198 / 内缘 y232（带厚 34px，H2399，顶点 8.3%）；aibg_archB.jpg 外缘 105 / 内缘 133（带厚 28，H2250，顶点 4.7%）。
- 发布：F: 六个创意文件 + Word 原地覆盖；GBA2026_Mock_Site\ 用 James 电脑上已登录的 Vercel CLI（账号 jjcheng9296，`npx vercel@62.2.0 deploy --prod --yes`）发布到 https://gba2026-mock-site.vercel.app/（已 PATCH ssoProtection=null 公开；vercel.json 加 X-Robots-Tag noindex）；Artifact https://claude.ai/artifact/PwCe8iu8tBek7QRdcwegYk 同步到 v3。Vercel MCP 连接器是另一个账号（team support-2291s-projects，GitHub supportcrownedeaglesglobal），上传需 base64，不用。
- 仍待：ChatGPT 的 (a) capital.asia 版面评估（提示已发）、(b) 原生比例背景图（2.5:1 / 2:1 / 6:5 / 8:1，拱内留天空）；Chrome 扩展 22:55 断线，待重连后收。

## 设计 v18（2026-10-16 22:40）— 彩虹改为"照片自带"，不再自己画
- James："彩虹要在背景照片里，不要自己加；把 prompt 给 ChatGPT 6 Pro 改进后生图。" → 在 ChatGPT 项目 "Generate Marina Bay Background" 对话里上传原背景 + 两条 prompt（A 3:1 整道拱在右半边、左三分之一留黑；B 4:3 拱占上 60%），ChatGPT 改进 prompt 后生成 6 张（B 的 4:3 它做不出，只给了裁切版）。6 张存 photos\ai_backgrounds\v2_full_arch\；选用第 3 张 "Singapore Skyline Beneath a Rainbow-3"（整道拱、两脚都在画内、左脚落在金沙后方），Real-ESRGAN 4× → 母版 aibg_arch.jpg 6000×2399。
- 渲染器新 helper `arch(k, cxCss, oy)`：按比例 k 放母版，使照片彩虹的圆心落在 cxCss，左右各镜像一份补边。母版彩虹几何（master px）：cx 4159、cy 2132、R ≈1925、apex y ≈207、内缘 R ≈1867。各尺寸：封面 k0.29 cx1514，人像 0.45 倍 fx1270 fy110，标题 CH 上限 140 / 三行 78；广告 k0.16 cx725，人像 0.30 倍 fx576 fy62，HS 上限 72；728×90 k0.05 cx=fx+40 oy-8，人像 fy22；340×280 k0.094 cx180，人像 fy32。所有 `rainbow()` 调用删除；左侧暗渐变收窄到 50%/48% 让拱脚露出；天空顶部渐变减淡；arch() 滤镜 saturate 1.35。
- 旧母版 aibg_marina.jpg（照片彩虹只有半道）保留作备用，不再使用。

## 文章 v7（2026-10-16 22:20）— 合并 ChatGPT 第二版研究
- ChatGPT 扩查了 CIOLook / Aspire Navigators / Global Leaders Views 等，新事实（已逐一打开原文核实）：每天约一小时晨祷再做决定（Aspire）；"THE MISSION CAME FIRST. THE ENTERPRISE FOLLOWED." / "ENTERPRISE IS NOT THE DESTINATION. IT IS INFRASTRUCTURE." / "RESTORATION IS WHERE STRATEGY BECOMES LOVE IN ACTION."（CIOLook）；DR J AARON K DAVID 是合著者与经文/神学贡献者（CIOLook，未明确绑定 Behold My Messenger，文中写 "co-author and scriptural contributor to the teaching they publish together"）；资助青年一家并用积蓄帮办补习中心（CIOLook，无名字日期）；杜拜 2026-10-10 Global Icons & Leadership Excellence Awards：她 Global Icon Award for Spiritual Leadership & Divine Strategy，他 Global Icon Award for Leadership & Transformation（网站核实）。
- 没采用：研究报告式 hedging 句和链接；PROF. (HON.) DR 头衔（只来自付费新闻稿，与主办方登记 DR 不一致）；Yahoo 付费稿不作独立报道引用。
- **待 James 核对**：10 月新闻稿称 EIU 四个学位均已授予，与档案"两个已授予、两个待授予"不一致——以证书为准；文章未碰学位。
- 现行 article.md 1,287 词，平均每句 13.5 词；Word 已更新。

## 设计 v17（2026-10-16 22:25）— 彩虹定型（James 指定样板 = v9 广告那道拱）
- **彩虹 = 一道完整拱形，正罩两位头顶之上，两脚落在两人身侧，整道弧在画面内，边缘不露碎片**。几何：封面 cx1560 R420 apex y28；广告 cx745 R240 apex y18；728×90 cx=人像中心 R70 apex y4；340×280 cx215 R112 apex y14；secondary 关；照片原生彩虹用裁切 / 封面天空去色层 / 340×280 右上角暗角压掉。试过用色相检测抹掉母版彩虹（失败，会糊掉金沙），已放弃。
- 技能 + 脚本已存到 C:\Users\chang\Documents\CE_Global_Award_Creative_Skill\。

## 设计 v16（2026-10-16 22:10）— 彩虹高于头顶 + 清理旧版
- **彩虹必须完整一道且整条在两位头顶之上**，不压脸（James："word cannot cover human face"；"rainbow slightly higher than human head"）。做法：每张只画一道大半径弧（封面 R1250、广告 R900、728×90 R210、340×280 R300），弧顶在画面顶部、经过人像上方，两端出画或淡入标题暗区；封面天空区用 saturation 混合层把照片原生彩虹去色，避免第二道。728×90 人像缩到 0.098 倍让头顶低于弧。
- **DR SHEKINAIH SIEW SIN YAP 永远比 DR J AARON K DAVID 大一级**（广告 19.5 vs 14.5，封面 31 vs 22）。
- **旧版本已按 James 要求删除**：options\（A/B/C、R1/R2、PROMISE DELIVERED 封面备选）、重复的 -1.docx、GBA2026_Slogan_Options.md、photos\restored\（CodeFormer/GFPGAN）。文件夹现在只有最新成品 + 素材 + 参考 + 记录。封面标题现为 WHEN ALL ELSE FAILS, CONTACT SHEKINAIH（PROMISE DELIVERED 版可用 CHEAD 重出）。
- 成品都在 F:\Golden bull award preparation 2026 根目录（封面、广告、两个横幅 jpg+gif、Word）。

## 设计 v15（2026-10-16 22:00）— 当晚追加的硬规则
- **彩虹只能一道、完整弧形、横跨金沙"船顶"**（给人希望）：封面用照片原生整道弧（sky 2500,-300,0）；广告 / 728×90 / 340×280 各画一道完整弧（secondary 关），并把裁切调到照片彩虹出画，绝不两道；"延伸"不能生硬。
- **文字不碰人体**（标题缩小 / 人像右移留空隙）；**不裁头**（人像至少腰部以上）。
- **所有金色文字统一字体**：PROMISE DELIVERED 的 Bodoni Moda 900 金色渐变（.bd gold gsh2）：公司名、HEAVEN THRONE ROOM MINISTRY、DR SHEKINAIH、铭牌、SHEKINAIH；DR J AARON K DAVID 同字体银色；FREIGHT & LOGISTICS 同字体白色。广告名牌改两行 DR SHEKINAIH / SIEW SIN YAP。
- 技能卡已提议更新（ce-global-award-creative），待 James 保存。

## 文章 v6（2026-10-16 21:50）— 方向改为"信仰 + 生意"
- James 指示：文章要人性化、像六年级都能读、短句、有力、强行动号召；重点 FAITH BUSINESS——SHEKINAIH 向 GOD OF THE UNIVERSE 祷告、天堂带来生意；DR J AARON K DAVID 建立信仰与领导力（辅助）；读者读完对两位领导的信心增加并来联络；加 "WHEN ALL ELSE FAILS, TRY SHEKINAIH"；先写 1000 词。（之前"商业奖项特稿不放宗教内容"的规则作废，以 James 为准。）
- 事实来源（新增、已核）：shekinaihsiewsinyap-jaaronkdavid.com —— MegaSuccess LA 2025-11（JT Foxx 台上访谈，称他们 "a blessing to this world"；Dean Welch："they prayed over me, blessed me, and guided me"）；D&B 颁奖页（"WITHOUT HIM, RECEIVING THIS AWARD WOULD BE IMPOSSIBLE"；她每年求问上帝公司营收并把潜在客户分享给团队）；意大利 Lamborghini 博物馆 2026-08（"We are here to serve you and humanity"；"When every human solution has failed, contact the God of the universe"；"When all else fails … contact us"）。网站上无 DR 头衔；[revenue wording withheld] 等信仰性营收预言不写。
- 现行文章 article.md（1,130 词）：标题 Promise Delivered；段落：The business that heaven sent → Two leaders. One mission. → What a promise looks like in a container → A small team, powered by AI, guided by people → Why faith is good business → When all else fails, try SHEKINAIH（两个邮箱 CTA）。ChatGPT 同题版本（约 1,000 词，语气更平）已参考并合并其好句（"Start with the problem" / "Technology supports the service; it does not replace the person you need to speak to" / 意大利一段）。旧商业版备份 article_v5_business_backup.md。
- 封面：标题缩小 + 人像右移，SHEKINAIH 的 H 不碰人体（James："文字不能碰人体，不专业"）；WHEN ALL ELSE FAILS, CONTACT 亮银、SHEKINAIH 金。
- 340×280：背景铺满到顶、金沙酒店移到左侧、彩虹横跨酒店（James："彩虹要跨过金沙船顶，给人希望"）；人像右侧腰部以上。728×90 文字放大，HEAVEN THRONE ROOM MINISTRY 最大。

## 现行设计（v13，2026-10-16 21:35）
- **封面标题两个版本**：正式文件 GBA2026_Cover_2000x800.jpg = "WHEN ALL / ELSE FAILS, / CONTACT SHEKINAIH"（三行，自动缩字）；options\GBA2026_Cover_2000x800_PROMISE_DELIVERED.jpg = "PROMISE DELIVERED"（James 要求去掉句号）。渲染器用环境变量 CHEAD 切换（`CHEAD='PROMISE|DELIVERED' node render10.mjs cover`）。哪一个作正式封面，James 还没拍板。
- **PROMISE DELIVERED 全部去掉句号**（广告、728×90 第一帧、340×280 第一帧）。
- **GIF 人像**：James："不能只剩一个头，很别扭，要正常照片有身体" → 728×90 人像缩到 0.118 倍、腰部以上；340×280 人像 0.255 倍、腰部以上，Logo 移到左上角不压头，舞台线下移到 y=196。

### 之前（v12，2026-10-16 21:25）
- **背景高清化**：James 说"其他版本背景模糊"→ 原因是 AI 背景原图只有 2172×724，封面要用到 2700px 宽（放大 1.24×）。用本机 face-restore `upscale` 做了 Real-ESRGAN 4×（photos\ai_backgrounds\upscaled\Rainbow Over Marina Bay Lights_x4.png，8688×2896），母版 aibg_marina.jpg 改为 6000×2000（旧 3000 版留作 aibg_marina_3000.jpg）。
- **双彩虹**：照片自带一道 + 自绘一道在封面 / 方块上错位成两道 → 封面与 340×280 删掉自绘彩虹，只留照片的；广告与 728×90 保留自绘（叠在照片彩虹上）。
- **不提奖项**：James："NO NEED TO MENTION GOLDEN BULL AWARD WINNER, NOT IMPORTANT" → 封面、广告、横幅上的 "Golden Bull Award 2026 Winner" 和 "Outstanding Bull | Digital 50 | Inspirational Entrepreneur" 全部删除（Word 封面页的奖项名称保留，那是提交文件）。
- **GIF 三帧（James 指定）**：① PROMISE DELIVERED + 业务行（只放 CE Global 标）→ ② "CONTACT US FOR LOGISTICS SOLUTIONS" + 公司名 + shipping@（只放 CE Global 标）→ ③ "CONTACT US FOR HEAVEN THRONE ROOM MINISTRY" + ceg@ + 铭牌（只放 CEG 徽章）。静态 jpg = 第一帧。340×280 不再有名牌帧。

### 之前（v11，2026-10-16 21:15）— James 当晚逐条定下的规则
- **底栏 = CONTACT US**：只放两个邮箱（网址全部去掉，"字太多"）。FREIGHT & LOGISTICS 白色；HEAVEN THRONE ROOM MINISTRY 金色；邮箱 18px 白色粗体。
- **只有一个 CTA，属于部门**："WHEN ALL ELSE FAILS, / CONTACT SHEKINAIH"（老板的标语；ChatGPT 反对——会被读成"货运不行了再找她"——James 知情并接受）。做成**铭牌 plaque**：黑玻璃底、1px 金框、四角金角线、上行 Barlow Cond 小字、下行 Cinzel 金色大写；无箭头；放在底栏**中间栏正中、上下居中**（James 红框指示）。不要圆角亮金药丸按钮（James："very poor design"）。"Get a quote / Ship with confidence" 全部不要（"意义不大"）。
- **名牌**：DR SHEKINAIH SIEW SIN YAP 在上（金色、更大 21px）、DR J AARON K DAVID 在下（**亮银色** metallic silver 18px）；字体和左边标签一致（Barlow Condensed 700），左对齐；职称柔白小字。
- **金色减量**：上半部只有公司名和 PROMISE DELIVERED 是金色，其余（奖项行、服务行、CONTACT US）白色，让金色"独立存在"。
- **Logo**：两个 Logo 放大（广告 70px / 78×64，封面 112 / 126×103，横幅 66 / 72×59）并在一条线上。
- 同一套规则已套到封面（无 CTA 无邮箱，只改名牌 / 金色 / Logo）、728×90（右侧铭牌替代按钮；第三帧 CONTACT US 两邮箱）、340×280（第二帧名牌叠放；第三帧两邮箱 + 铭牌）。
- 渲染器 render10.mjs / export10.py（JPG 72 dpi）。
- ChatGPT 对按钮的规格（参考，部分未采用）：244×48、3px 圆角、缎金填充 #D2B574→#C2A061、边 #9D7B42、Inter 11/18 深色字、无箭头、放在部门行右侧 X452 Y440；三个备选上行："WHEN ALL ELSE FAILS, REACH OUT." / "WHEN ALL ELSE FAILS," + "Write to SHEKINAIH" / "WHEN ALL ELSE FAILS, LET'S TALK."。

### 之前（v10，2026-10-16 20:40）
- **广告底栏（老板 2026-10-16 要求）**："CONTACT US" → 左 FREIGHT & LOGISTICS（shipping@ceglobalnetworkinternational.com / ceglobalnetworkinternational.com）| 中 HEAVEN THRONE ROOM MINISTRY（ceg@crownedeaglesglobal.org / crownedeaglesglobal.org，来源：新闻稿写 "CEG Heaven Throne Room Ministry"，网站 www.crownedeaglesglobal.org）| 右 两位名牌不变。黄色 "Get a quote" 按钮已去掉（底栏主题是联络，按钮只属货运一边且不是真链接）；联络字号放大到 12.6–13px。James 待确认：部门联络是否用这个邮箱/网址、要不要 www.、要不要保留文字版 "Get a quote →"。横幅与方块暂未加部门联络（空间小，待 James 决定）。
- 渲染器 render10.mjs / export10.py（= v9 + 新底栏；JPG 全部带 72 dpi 标签）。舞台抬高到 y=386，人像上移 12px。
- ChatGPT 第二轮（2026-10-16 20:30）：文章 6.3、封面 6.8、广告 6.5、方块 5.9、横幅 6.5；结论"大幅进步、未到可提交"。全文见 GBA2026_ChatGPT_Critique.md。
- 文章 v5 已按第二轮改（不需新事实的部分）：财年 → "first financial reporting period ends on 31 December 2026"；"profit after tax" → "profit"（LLP 不在实体层面缴税，口径待会计师确认）；"ocean-freight turnover" → "turnover"（待 James 确认是否只有海运）；利润率写三年 [figure withheld] / [figure withheld] / [figure withheld]；历史数字旁一律写 CE Global Network LLP；"restructured into" → "incorporated to carry forward"；删六步决策序列、删重复的顾问服务句和集团分离句；绝对化词软化（never / every / continuously）；环保只写做法；D&B 奖受奖主体写 CE Global Network International；结尾归属改正。保留（James 决定）：两位全部学位 + 状态、名牌、两个 Logo、开头提问。
- **仍缺的事实**（ChatGPT 两轮都在要）：DR J AARON K DAVID 一个有记录的决策 + 结果；一个有日期的 AI 工作流案例（上线日期、票数、前后用时、把关人）；结尾承诺的具体 ASEAN 航线与日期；2026 年 1–6 月业务由谁经营；营收口径；利润口径；"ten years of humanitarian service" 的机构 / 期间。

### 之前（v9，2026-10-16 19:20）
- 人像：继续用 founders_red_hd.png（EDSR 2× + rembg + 调色）。James 2026-10-16 比较后选它：**更自然**。CodeFormer 修复版（photos\restored\codeformer）看起来像 AI、五官发蜡，**不用**。规则：人脸不可变形、不可"AI 化"；修复只能补清晰度，不能重画。
- 本机工具：face-restore 技能（C:\Users\chang\ai-tools\face-restore，RTX 4050）：模式 upscale / codeformer / gfpgan；用法见 C:\Users\chang\.claude\skills\face-restore\SKILL.md。可用于背景、Logo 的 4× 放大；人脸慎用。
- 财务数据（James 2026-10-16 提供，LLP 未审计）：营业额 S$[REDACTED] (FY2023) → [REDACTED] (FY2024) → [REDACTED] (FY2025)；税后利润 [REDACTED] → [REDACTED] → [REDACTED]；Pte Ltd 2026 年 4 月注册、7 月开始经营，未有完整财年。待写入文章（替换 "[scale withheld]"）。
- v9：背景改用 GPT-6 Pro 生成的 "Rainbow Over Marina Bay Lights"（photos\ai_backgrounds\），自带彩虹；自绘彩虹降到 60% 透明度做加强；渲染器 render9.mjs / export9.py
- ChatGPT 项目 "GBA 2026 – CE Global Creative Studio"（GPT-6 Pro）：生图对话 + 审稿对话；审稿记录见 GBA2026_ChatGPT_Critique.md（文章 4.8/10，封面 6.2，广告 5.9，方块 5.1）

### 之前（v8）
- 口号：**PROMISE DELIVERED.**（James 定：一语双关，承诺兑现 + 货物送达；文章标题同名 "Promise Delivered"）
- 构图：夜景滨海湾（电影感调色 mbs_cine.jpg）+ 清晰光谱彩虹拱（彩虹 = 承诺）+ 两位创办人站在黑玻璃金边舞台后 + 头顶聚光、金色轮廓光、金色光斑
- 品牌锁定：CEG 徽章在左 → 金色 Cinzel 公司名 → CE Global logo 在右（象牙色金框底板）
- 封面无 CTA 无邮箱；广告与横幅有 "Get a quote →"、shipping@ceglobalnetworkinternational.com、ceglobalnetworkinternational.com
- 渲染：/home/claude/gba/design/render8.mjs（Playwright @2x）→ export8.py（Lanczos 缩放 + 锐化；JPG q95 4:4:4；GIF 用 ffmpeg 逐帧调色板 + bayer 抖动，帧时长 2.5/2.5/3 秒循环）
- 人像素材：founders_red_hd.png（EDSR 2× 放大 + 重新抠图 + 调色 + 轮廓光）；金色礼服图 shekinaih_gold_hd.png 下摆有涂抹瑕疵，暂不用
- 已否决的备选标题：YOUR CARGO. OUR WORD. / GOLD STANDARD. DELIVERED. / ONE DESK. EVERY OCEAN. / SHIP WITH CERTAINTY. / TRUST, SHIPPED. / NO SURPRISES. JUST ARRIVALS. / ARRIVES AS PLANNED. INVOICED AS QUOTED. / CROWNED TO DELIVER.

## 设计规则（James 定的）
- 文字要有冲击力，一眼看懂做什么生意：口号下必须有 "SINGAPORE FREIGHT FORWARDING & LOGISTICS"
- 文字不可压到得奖人的头 / 脸
- 不可把人物下半身生硬切掉 —— 要么全身入镜，要么用舞台 / 拱门 / 画框做成刻意的构图
- 公司名做金色立体字；两个 logo 都放，**CEG 在左、CE Global 在右**
- 广告邮箱：shipping@ceglobalnetworkinternational.com
- 背景要有"冠军颁奖"的气势，专业、国际、高级
- 高清：所有尺寸必须清晰；GIF 不可出现色块 / 噪点
- 不做没要求的东西（不发对比图、不生成多余文件）；生成文件原地覆盖，不加 _V01
- 往届参考：goldenbullaward.com Hall of Fame；封面在网页上满版显示约 1521×590，底部对齐，顶部略裁

## 文章（v3，2026-10-16）
- 风格照 SHEKINAIH_Magazine_Study.md（已读全部 12 篇报道全文并更新笔记）：开头提问 → 四个承诺 → 公司 → 疫情中起步、靠口碑成长 → 两位领导（并列，MegaSuccess 2025、Global Icon Award、博士学位）→ 她的养成与决策纪律 → 架构 → 一站式 → 小团队 + AI → 数字化 → 增长策略 → 目标 → 合作伙伴 → 可持续 / 国际 → 为何值得获奖 → 结尾引言
- 她的原话全大写，只用已公开发表的商业引语；不放宗教 / 预言内容
- 新增且已核实的事实：疫情开始时起步、不靠广告靠口碑；两人 2025 年洛杉矶 MegaSuccess 舞台同获表彰；合著五卷丛书；"TRUST IS A FORM OF CAPITAL…"；"VISION MUST TRAVEL THROUGH SYSTEMS"；五个治理提问
- 待 James 核对：疫情起步的说法放在开头是否妥当

## 待办
1. James 从 Telegram PHOTOS 群存两张全身原图到 photos/（"Save as file"）：DR J AARON K DAVID 红毯全身、DR SHEKINAIH 红裙全身 → 换入后人像更清晰
2. 收集 10–30 张公司照片（宽 1000px）
3. 发高清 logo（AI / PSD / PDF）给 Jason；现有 logo 为位图
4. 可选：IMG.LY 登录后用 CoDesign 做 4× 放大
