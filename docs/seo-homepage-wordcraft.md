# 首页 WordCraft SEO 修改说明

页面：https://wordcraftapp.com/  
目标关键词：wordcraft  
日期：2026-10-15

## 体检问题与修改

| 报告项                               | 具体处理                                                                                                                     | 验收依据                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [✕] H1 未包含关键词                  | 将分散在删除线、插入线中的动画标题改为单条静态 H1，完整包含 WordCraft                                                        | 原始 HTML 及浏览器 DOM 都只有一个 H1，文本一致                         |
| [✕] 首页缺少实际编辑功能             | 将首屏截图改为可启动的真实编辑器；首屏按钮点击后在首页加载自托管 WordCraft，无需跳页；导航、在线说明及页尾入口指向首页编辑区 | 点击前不请求编辑器资源，点击后保留首页 URL 并启动编辑器                |
| 主题聚焦度 75%                       | Title 以 WordCraft 开头；首屏先解释软件与用途；产品介绍、在线说明及入门步骤给出可直接执行的操作                              | Title、Description、H1、首段、相关 H2 和正文围绕同一产品与任务         |
| [ℹ] 原始 HTML 检测未发现 H1          | 线上原始响应本已有一个 H1，此项属于报告检测偏差；简化标题结构，便于解析                                                      | 直接解析 HTTP 响应，无需执行 JavaScript 即可提取完整标题               |
| 关键词自然度                         | 不按密度榜增补重复句；将“ArtCraft WordCraft 是人们搜索的全称”改为产品与开发者关系说明，去除其他应用列表                      | 保留 WordCraft online、download、Microsoft Word 等有实际用途的相关表达 |
| 已通过的 Meta / 链接 / 图片 / 抓取项 | 保持自引用 canonical、英文 lang、hreflang、描述性链接、图片 alt 与尺寸、robots 和 sitemap                                    | 本地生产响应检查；实际部署后复测线上响应                               |
| 结构化数据                           | FAQ 可见答案与 FAQPage 共用消息源，随正文同步更新；保留 WebSite 声明                                                         | 两个 JSON-LD 块均可解析，无新增虚构评分或评价                          |

报告没有单独列出的 [⚠] 项。报告所称“没有任何交互元素”与线上实际 FAQ 按钮不一致，但 FAQ 不能替代编辑功能，因此仍接入真实编辑器。

## Meta 与 H1 定稿

**Title（49 字符）**

WordCraft: Free Online Editor, Downloads & Guides

**Meta Description（148 字符）**

Try WordCraft online on this page, or download it for Windows, Mac and Linux. Find beginner guides and compare this free editor with Microsoft Word.

**H1（48 字符）**

WordCraft: write online or download for desktop.

Title 与 Description 继续自动用于 Open Graph；英文与中文消息文件均已同步。当前站点仍只启用英文，没有为此次修改新增语言路由。

## H2 定稿

- What is WordCraft?
- How to use WordCraft online
- Create your first WordCraft document

## 正文替换定稿

### 首屏介绍

消息键：`wc.home.sub`

WordCraft is a free, open-source word processor from ArtCraft. Write in the editor below without an account, or download the desktop app for Windows, macOS or Linux. Find setup guides, beginner tutorials and a comparison with Microsoft Word.

### 编辑器操作提示

消息键：`wc.home.editor_hint`

Click to load the editor on this page. Best on a desktop or laptop. Open a local file or start a blank document, then use File → Save to keep a copy on your device.

### 产品介绍第 1 段

消息键：`wc.what.p1`

WordCraft is a free, open-source word processor for creating and editing documents. Its familiar ribbon brings text formatting, styles, tables and review tools into one workspace, with .docx support for exchanging files with Microsoft Word.

### 产品介绍第 2 段

消息键：`wc.what.p2`

Choose WordCraft for desktop if you want to write offline using native file dialogs. Our download guide lists Windows, macOS and Linux builds, installation steps, release notes and checksums. Desktop links go to the developers' GitHub releases.

### 产品介绍第 3 段

消息键：`wc.what.p3`

To try WordCraft before installing it, load the editor above and choose Blank document or open a local file. You can format text, add a table and save a copy to your device. The beginner tutorial explains each step; no site account is required.

### 产品介绍第 4 段

消息键：`wc.what.p4`

WordCraft is developed by ArtCraft. This site is an independent guide and hosts the browser build. The Microsoft Word comparison covers file compatibility, offline use and collaboration, so you can assess whether the editor suits your work. Keep copies of important files while testing the alpha release.

### 在线使用说明

消息键：`wc.onh.p`

Use the editor at the top of this page to create a document or open a copy of a local file. Try formatting a paragraph, applying a heading style and inserting a table. Save your work to your device before closing the page. Nothing needs to be installed, and no site account is required. The online guide covers browser requirements, fonts and saving files.

### 入门步骤 1

消息键：`wc.start.a_d`

Click “Try WordCraft here” at the top of this page to load the browser editor. For offline writing, choose a desktop build from the download guide.

### 入门步骤 2

消息键：`wc.start.b_d`

Choose Blank document from the File menu, or open a copy of an existing file. Type a paragraph, apply a heading style and try inserting a table.

### 入门步骤 3

消息键：`wc.start.c_d`

Use File → Save or Ctrl/Cmd + S to keep a copy on your device. Check the saved file and review the layout when exchanging documents with Microsoft Word.

### 页尾行动文案

消息键：`wc.final.sub`

Try WordCraft in the editor above, or download the desktop app for offline writing. Follow the beginner tutorial to create, format and save your first document.

### FAQ：本站功能

消息键：`wc.faq.site.a`

Try WordCraft directly in the editor on this homepage, download a desktop build, follow beginner tutorials, and compare it with Microsoft Word. You can use the editor and read the guides without creating a site account.

### FAQ：开发者与本站关系

消息键：`wc.faq.who.a`

WordCraft is developed by the ArtCraft team. This site is an independent guide that hosts the browser editor and provides download help, tutorials and comparisons. The developers' product page is getartcraft.com/apps/wordcraft.

### FAQ：ArtCraft WordCraft

消息键：`wc.faq.artcraft.a`

WordCraft is ArtCraft's free, open-source word processor. ArtCraft develops the app; this site independently hosts its browser build and provides download guides and tutorials.

### FAQ：在线版如何工作

消息键：`wc.faq.online.a`

Click “Try WordCraft here” to load the browser editor on this homepage, or open it in a separate tab. The editor runs in your browser, opens local documents and saves your work to your device. Save before closing the page; this site does not provide document cloud storage.

## 实现与验证

首页复用原有自托管编辑器，通过共享的 BrowserEditor 组件在点击后创建 iframe；/online 页面也使用该组件。首页保留服务端输出的文字、按钮和截图，编辑器中的画布文字不承担正文索引任务。图片仍带 alt 和宽高声明，首屏图保留高加载优先级。

- `pnpm build`：通过。
- `pnpm exec tsc --noEmit`：通过。
- 原始 HTML：单个完整 H1、自引用 canonical、对应 Title / Description / OG，以及可解析的 WebSite / FAQPage。
- 首页首屏按钮与截图上的加载按钮：均能原地启动编辑器，状态为 ready，URL 保持 `/`；点击前未请求 `/app/` 资源。
- 390 / 768 / 1440px：DOM 尺寸检查没有横向溢出；390px 下编辑器也可启动并获得焦点。
- robots.txt 与 sitemap.xml：本地均返回 200，sitemap 包含首页，robots 中的 Sitemap 声明正确。
- 本地 HTML 文本抽取约 1641 词，WordCraft 55 次、约 3.35%（含导航、页尾及 FAQ；与原报告工具的分词口径可能不同）。没有为凑密度增加重复段落。
- 浏览器截图接口持续超时，未完成截图视觉复核；上述响应式结论来自 DOM 尺寸检查。

本次为本地代码修改，尚未部署。部署后应重新抓取首页、复跑同一体检工具，并在 Search Console 检查 Google 抓取与呈现结果。工具评分、主题聚焦度以及实际排名需要上线后重新测量。

## 自然表达依据

Google 建议标题准确、简洁，避免重复关键词；也会参考可见主标题等信息生成搜索结果标题。参见 [Google 标题链接文档](https://developers.google.com/search/docs/appearance/title-link)。

Google 将为了操控排名而不自然地填充关键词列为关键词堆砌，因此此次以明确的产品说明和实际操作内容为主，不把报告中的 3%–5% 当作必须追求的排名标准。参见 [Google 关键词堆砌政策](https://developers.google.com/search/docs/essentials/spam-policies#keyword-stuffing)。
