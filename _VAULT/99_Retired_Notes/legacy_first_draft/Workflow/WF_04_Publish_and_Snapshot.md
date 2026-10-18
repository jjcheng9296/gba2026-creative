---
aliases: [WF_04, 发布与快照]
tags: [workflow, gba2026, publish]
---
# WF_04 · 发布与快照

上一步：[[_VAULT/Workflow/WF_03_Writeup_and_Review|WF_03]] ｜ 返回：[[00_HOME]]

## 发布
- 模拟网站：[[08_Mock_Site_Vercel]]（https://gba2026-mock-site.vercel.app/ ，/winner.html）
- 部署在 James 电脑上用 Vercel CLI 完成；不要用 Vercel 连接器上传文件
- 部署后核对：线上文件大小与本地一致；James 若看到旧图，提示 Ctrl+F5
- Artifact 备份页按 Share 菜单设置

## 快照与整理
- 只有 James 要求时才做「当日 Version」快照（如 [[99_Archive_Old_Versions]]）
- 旧版不删除，移入 99_Archive_Old_Versions
- 每次改动后更新 [[03_Docs/GBA2026_Context]] 与技能文件

## 收尾检查
- [ ] 文件原地覆盖，没有 _V02 之类
- [ ] Context 已更新
- [ ] 发布链接已验证
- [ ] 记录写入 [[_VAULT/Templates/Session_Log|工作记录]]
