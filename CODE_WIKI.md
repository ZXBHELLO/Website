# Code Wiki — Zako 杂鱼文档

> 本文档为 `ZXBHELLO/Website` 仓库的结构化代码知识库，涵盖项目整体架构、模块职责、关键类与函数、依赖关系及运行方式等关键信息。
>
> - 仓库：https://github.com/ZXBHELLO/Website
> - 在线站点：https://www.zakozako.cc
> - 版本：v1.1.0

---

## 目录

- [1. 项目概述](#1-项目概述)
- [2. 项目整体架构](#2-项目整体架构)
- [3. 技术栈与依赖关系](#3-技术栈与依赖关系)
- [4. 目录结构](#4-目录结构)
- [5. 核心配置模块](#5-核心配置模块)
  - [5.1 config.ts — 主配置](#51-configts--主配置)
  - [5.2 plume.config.ts — 主题配置](#52-plumeconfigts--主题配置)
  - [5.3 navbar.ts — 导航栏配置](#53-navbarts--导航栏配置)
  - [5.4 collections.ts — 文档集合配置](#54-collectionsts--文档集合配置)
  - [5.5 client.ts — 客户端配置](#55-clientts--客户端配置)
  - [5.6 custom.css — 全局样式](#56-customcss--全局样式)
- [6. 自定义组件模块](#6-自定义组件模块)
  - [6.1 AppSetup.vue](#61-appsetupvue)
  - [6.2 ParticleBackground.vue](#62-particlebackgroundvue)
  - [6.3 PageLoading.vue](#63-pageloadingvue)
  - [6.4 ExternalLinkWarning.vue](#64-externallinkwarningvue)
  - [6.5 HideFooter.vue](#65-hidefootervue)
  - [6.6 AsideNav.vue](#66-asidenavvue)
  - [6.7 NavPage.vue](#67-navpagevue)
  - [6.8 HtmlPage.vue](#68-htmlpagevue)
- [7. 关键类与函数说明](#7-关键类与函数说明)
  - [7.1 ParticleEffect 类](#71-particleeffect-类)
  - [7.2 NavPage 过滤与滚动逻辑](#72-navpage-过滤与滚动逻辑)
  - [7.3 ExternalLinkWarning 拦截器](#73-externallinkwarning-拦截器)
- [8. 内容模块职责](#8-内容模块职责)
- [9. frontmatter 约定](#9-frontmatter-约定)
- [10. 构建与部署流程](#10-构建与部署流程)
- [11. 项目运行方式](#11-项目运行方式)
- [12. 开发约定与注意事项](#12-开发约定与注意事项)

---

## 1. 项目概述

**Zako 杂鱼文档** 是 ZXBHELLO 的个人综合性内容平台，集技术博客、文档站点、Minecraft 服务器指南与在线工具集合于一体。项目基于 **VuePress 2 + Plume 主题** 构建，是一个纯前端的静态站点生成（SSG）项目，无后端组件。

### 核心定位

| 维度 | 说明 |
|------|------|
| 内容类型 | 博客文章、知识库文档、在线工具、导航页 |
| 技术形态 | 静态站点生成（SSG），配置驱动 + 自定义组件扩展 |
| 部署方式 | GitHub Actions 自动构建 → GitHub Pages |
| 目标用户 | 站主本人（博客/日记）、MC 服务器玩家（指南）、开发者（在线工具） |

### 核心特性

- **现代化界面**：深色/浅色主题自动切换，响应式设计适配移动端
- **互动体验**：集成 Giscus 评论系统，支持 GitHub 在线编辑
- **丰富功能**：支持 PDF、Bilibili/YouTube 视频嵌入、KaTeX 数学公式、Chart.js/ECharts 图表
- **高效搜索**：本地搜索功能，快速定位内容
- **版本管理**：自动显示文档贡献者和更新时间
- **性能优化**：粒子背景、页面加载动画、预加载策略优化
- **自定义增强**：粒子背景、外部链接警告、页面加载动画、导航页等自研组件

---

## 2. 项目整体架构

项目采用 **VuePress 2 配置驱动 + 自定义 Vue 组件扩展** 的分层架构：

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Actions CI/CD                    │
│              (push main → 构建 → 部署 GitHub Pages)           │
└──────────────────────────┬──────────────────────────────────┘
                           │ 部署
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    静态站点 (GitHub Pages)                    │
│                  https://www.zakozako.cc                     │
└──────────────────────────▲──────────────────────────────────┘
                           │ 构建产物
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                     VuePress 2 构建管线                       │
│   (Vite Bundler + Plume 主题 + Markdown → HTML/JS/CSS)       │
└──────────────────────────▲──────────────────────────────────┘
                           │ 配置与内容
                           │
   ┌───────────────────────┼────────────────────────┐
   │                       │                        │
   ▼                       ▼                        ▼
┌─────────┐         ┌─────────────┐          ┌─────────────┐
│ 配置层   │         │  组件层      │          │  内容层      │
│         │         │             │          │             │
│config.ts│         │ 自定义 Vue   │          │ Markdown    │
│plume.   │◄────────│ 组件 (8个)   │◄─────────│ 文档 (40+)  │
│config.ts│         │             │          │             │
│navbar.ts│         │ NavPage     │          │ ZakoZakoCraft│
│collecti │         │ Particle    │          │ articles    │
│ons.ts   │         │ PageLoading │          │ app         │
│client.ts│         │ ...         │          │ nav         │
│custom.  │         │             │          │             │
│css      │         └─────────────┘          └─────────────┘
└─────────┘
```

### 架构分层说明

1. **配置层（`.vuepress/`）**：定义站点元信息、主题行为、导航结构、文档集合、客户端增强与全局样式。配置分两文件：`config.ts`（需重启生效）与 `plume.config.ts`（热更新），后者覆盖前者。

2. **组件层（`.vuepress/components/`）**：8 个自定义 Vue 3 单文件组件，通过 `client.ts` 注册，提供粒子背景、页面加载动画、外部链接警告、导航页、iframe 嵌入等增强能力。

3. **内容层（`docs/` 子目录）**：Markdown 文件按主题组织，通过 frontmatter 声明元信息，通过 `collections.ts` 聚合为博客（post 类型）或文档（doc 类型）集合。

4. **构建层**：VuePress 2 + Vite Bundler 将 Markdown + Vue 组件编译为纯静态 HTML/JS/CSS。

5. **部署层**：GitHub Actions 监听 `main` 分支的 `docs/`、`package.json`、`pnpm-lock.yaml` 变更，自动构建并部署到 `Pages` 分支。

---

## 3. 技术栈与依赖关系

### 运行时核心依赖

| 依赖 | 版本 | 作用 |
|------|------|------|
| `vuepress` | 2.0.0-rc.31 | 静态站点生成器核心 |
| `vuepress-theme-plume` | 1.0.0-rc.205 | Plume 主题（提供博客、文档、评论等全套能力） |
| `@vuepress/bundler-vite` | 2.0.0-rc.30 | Vite 打包器（替代默认 webpack） |
| `@vuepress/client` | ^2.0.0-rc.31 | VuePress 客户端运行时 |
| `vue` | ^3.5.41 | Vue 3 框架 |
| `typescript` | ^5.9.3 | TypeScript 支持 |

### 功能性依赖

| 依赖 | 版本 | 作用 |
|------|------|------|
| `chart.js` | ^4.5.1 | Chart.js 图表（通过 markdown 容器启用） |
| `echarts` | ^6.1.0 | ECharts 图表（通过 markdown 容器启用） |
| `flowchart.ts` | ^3.0.1 | Flowchart 流程图 |
| `swiper` | ^12.2.0 | 轮播组件（用于 ZakoZakoCraft 首页图片展示） |

### 开发依赖

| 依赖 | 作用 |
|------|------|
| `http-server` | 本地预览构建产物 |

### 外部资源（CDN）

- **Iconify**：`https://code.iconify.design/2/2.1.2/iconify.min.js` — 图标库
- **字体**：`WenYuan Rounded SC VF`（霞鹜文楷衍生）+ `Cascadia Code`（代码字体）

### 依赖关系图

```
VuePress 2 核心
  ├── @vuepress/bundler-vite (Vite 打包)
  ├── @vuepress/client (客户端运行时)
  └── vuepress-theme-plume (主题)
        ├── 内置插件: search, comments, markdown 扩展, copyright...
        └── 运行时组件: VPIcon, VPLink, Layout, Swiper, Card, LinkCard...

自定义组件 (client.ts 注册)
  ├── AppSetup → ParticleBackground (Canvas 粒子)
  ├── PageLoading (加载动画)
  ├── ExternalLinkWarning (链接拦截)
  ├── HideFooter (页脚控制)
  ├── AsideNav (侧边导航, 注入 Layout 插槽)
  ├── NavPage (导航页, 读取 nav/data.js)
  └── HtmlPage (iframe 嵌入)

Markdown 内容
  └── frontmatter 元信息 + Plume 容器语法 (::: tip, CardGrid, Swiper...)
```

### 环境要求

- **Node.js**: `^20.6.0 || >=22.0.0`
- **pnpm**: `>=10.0.0`（项目指定 `pnpm@10.15.1`）

---

## 4. 目录结构

```
Website/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions 部署工作流
├── docs/                              # 主文档目录（VuePress 根）
│   ├── .vuepress/                     # VuePress 核心配置
│   │   ├── components/                # 自定义 Vue 组件 (8个)
│   │   │   ├── AppSetup.vue           # 应用启动组件（注入粒子背景）
│   │   │   ├── AsideNav.vue           # 侧边导航（GitHub/Issue/赞助）
│   │   │   ├── ExternalLinkWarning.vue# 外部链接警告弹窗
│   │   │   ├── HideFooter.vue         # 按页面隐藏页脚
│   │   │   ├── HtmlPage.vue           # iframe 嵌入外部页面
│   │   │   ├── NavPage.vue            # 自定义导航页组件
│   │   │   ├── PageLoading.vue        # 全局页面加载动画
│   │   │   └── ParticleBackground.vue # Canvas 粒子背景
│   │   ├── public/                    # 静态资源
│   │   │   ├── assets/                # 图片、图标、HTML 工具
│   │   │   │   ├── ZakoZakoCraft/     # MC 服务器相关图片
│   │   │   │   ├── app/               # 在线工具 HTML 文件
│   │   │   │   ├── nav/               # 导航页图标
│   │   │   │   ├── sponsor/           # 赞赏码
│   │   │   │   ├── plume.svg
│   │   │   │   ├── profile.png        # 头像
│   │   │   │   └── site_icon_*.png    # 站点图标
│   │   │   └── CNAME                  # GitHub Pages 自定义域名
│   │   ├── client.ts                  # 客户端配置（组件注册、布局覆写）
│   │   ├── collections.ts             # 文档集合配置（博客 + MC文档）
│   │   ├── config.ts                  # 主配置（站点、bundler、主题入口）
│   │   ├── custom.css                 # 全局自定义样式
│   │   ├── navbar.ts                  # 导航栏配置
│   │   └── plume.config.ts            # 主题配置（热更新）
│   ├── ZakoZakoCraft/                 # Minecraft 服务器文档（doc 类型集合）
│   │   ├── index.md                   # 服务器首页
│   │   ├── 从此处开始/                 # 新手指南
│   │   ├── 休闲生存服/
│   │   ├── 实验创造服/
│   │   ├── 建筑创造服/
│   │   ├── 娱乐游戏服/
│   │   ├── 先行测试服/
│   │   └── 测试功能/
│   ├── app/                           # 在线工具集合
│   │   ├── AI-TOOLS/                  # AI 工具（聊天/绘画/语音）
│   │   ├── HTML_CSS_JS_Live_Preview_Editor.md
│   │   ├── Markdown_Live_Preview_Editor.md
│   │   ├── Offline_Image_Compression.md
│   │   ├── Openlist.md                # OpenList 云盘
│   │   └── rseditor.md                # 红石编辑器
│   ├── articles/                      # 博客文章（post 类型集合）
│   │   ├── 学习笔记-源码解读/
│   │   ├── 工具效率-资源推荐/
│   │   ├── 性能优化-体验提升/          # 自定义组件使用教程
│   │   ├── 游戏资源-插件模组/
│   │   ├── 踩坑实录-问题排查/
│   │   ├── 随笔分享-生活感悟/          # about-me, sponsor
│   │   └── 项目实战-方案设计/
│   ├── nav/                           # 导航页
│   │   ├── data.js                    # 导航数据配置（200+ 条目）
│   │   └── index.md                   # 导航页入口
│   ├── friends.md                     # 友情链接
│   ├── index.md                       # 网站首页
│   └── message-board.md               # 留言板
├── .gitattributes                     # Git 换行符与二进制处理
├── .gitignore                         # Git 忽略规则
├── package.json                       # 项目依赖与脚本
└── README.md                          # 项目说明
```

---

## 5. 核心配置模块

VuePress Plume 主题采用 **双配置文件** 机制：

- `config.ts`：使用 `defineUserConfig`，修改后需**重启服务**生效
- `plume.config.ts`：使用 `defineThemeConfig`，支持**热更新**，配置项会覆盖 `config.ts` 中的同名项

> ⚠️ 重要约定：不要在两个文件中重复配置相同项，`plume.config.ts` 的配置会覆盖 `config.ts`。

### 5.1 config.ts — 主配置

**职责**：定义站点基础信息、构建器、主题入口及不可热更新的配置。

**关键配置项**：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `base` | `'/'` | 站点部署根路径 |
| `lang` | `'zh-CN'` | 站点语言 |
| `title` | `'Zako'` | 站点标题 |
| `port` | `3000` | 开发服务器端口（避免与 8080 冲突） |
| `host` | `'0.0.0.0'` | 监听所有网络接口 |
| `shouldPrefetch` | `false` | 禁用预取（站点较大时提升性能） |
| `bundler` | `viteBundler({})` | 使用 Vite 打包 |
| `hostname` | `https://www.zakozako.cc` | 站点域名（SEO、sitemap） |
| `cache` | `'filesystem'` | 文件系统缓存，加速编译 |

**Markdown 扩展能力**（通过 `markdown` 配置启用）：

- `abbr`（缩写）、`annotation`（注解）、`plot`（隐秘文本）
- `pdf`、`bilibili`、`youtube`、`codepen`、`codeSandbox`（媒体嵌入）
- `icon`（Iconify 图标语法 `::icon-name::`）
- `table`（增强表格）、`demo`（代码演示容器）
- `math`（KaTeX 数学公式）
- `chartjs`、`echarts`（图表支持）

**评论系统**：使用 Giscus（基于 GitHub Discussions），配置了仓库 `ZXBHELLO/website` 及对应 `repoId`、`categoryId`。

### 5.2 plume.config.ts — 主题配置

**职责**：定义主题外观、社交链接、页脚、个人资料、过渡动画等可热更新配置。

**关键配置**：

- `logo`：站点图标 `/assets/site_icon_32x.png`
- `appearance`：`true`（启用深色模式切换）
- `social`：GitHub、Bilibili、YouTube 三个社交链接
- `navbarSocialInclude`：允许显示在导航栏的社交平台
- `copyright`：`true`（启用文章版权信息）
- `prevPage` / `nextPage` / `createTime`：翻页与创建时间显示
- `profile`：站主资料（头像、名称、描述、地区、组织）
- `footer`：自定义页脚 HTML（含站主寄语与版权声明）
- `transition`：页面跳转、文章列表、深色模式切换过渡动画（`circle-clip` 类型）

### 5.3 navbar.ts — 导航栏配置

**职责**：定义顶部导航栏结构，通过 `defineNavbarConfig` 声明式配置。

**导航结构**：

```
主页 (icon: line-md:home-md-twotone) → /
导航 (icon: line-md:compass-twotone) → /nav/
博客 (下拉)
  ├── 文章 → /article/
  ├── 标签 → /article/tags/
  ├── 分类 → /article/categories/
  └── 归档 → /article/archives/
应用 (下拉)
  ├── OpenList云盘
  ├── 离线图片压缩
  ├── 2D红石编辑器
  ├── 在线Markdown编辑器
  └── 在线HTML编辑器
更多 (下拉)
  ├── 关于站主
  ├── 友情链接
  └── 留言板
```

每个导航项支持 `text`、`icon`（Iconify 图标名）、`link` 字段，下拉菜单通过 `items` 数组定义。

### 5.4 collections.ts — 文档集合配置

**职责**：定义文档集合（Collection），将 Markdown 目录聚合为博客或知识库。这是 Plume 主题的核心内容组织机制。

**集合类型**：

| 类型 | 特征 | 用途 |
|------|------|------|
| `post` | 无侧边栏，有文章列表页 | 博客、专栏（内容碎片化） |
| `doc` | 有侧边导航栏 | 笔记、知识库（内容成体系） |

**已配置集合**：

1. **blog**（`type: 'post'`）
   - 目录：`articles`
   - 标题：`博客`
   - 链接前缀：`/article/`
   - 启用：标签页、归档页、分类页、文章列表页
   - 封面位置：右侧
   - 分页：每页 10 篇

2. **ZakoZakoCraft**（`type: 'doc'`）
   - 目录：`ZakoZakoCraft`
   - 标题：`ZakoZakoCraft Docs`
   - 链接前缀：`/ZakoZakoCraft/`
   - 侧边栏：手动配置（7 个分组，部分默认折叠）
   - 显示滚动条，默认展开

> ⚠️ 关键约束：`doc` 类型集合中，Markdown 文件的 `permalink` 必须以 `linkPrefix` 开头，否则无法生成侧边栏。

### 5.5 client.ts — 客户端配置

**职责**：通过 `defineClientConfig` 注册自定义组件、覆写布局、注入根组件。

**三部分配置**：

1. **`enhance`**：注册 7 个全局组件
   - `NavPage`、`HideFooter`、`ParticleBackground`、`AsideNav`
   - `PageLoading`、`ExternalLinkWarning`、`HtmlPage`

2. **`layouts`**：覆写默认 `Layout`
   - 在 `aside-outline-after` 插槽注入 `AsideNav` 组件（侧边栏大纲后显示 GitHub/Issue/赞助链接）

3. **`rootComponents`**：注入 4 个根组件（全站生效）
   - `AppSetup`（粒子背景）
   - `PageLoading`（加载动画）
   - `ExternalLinkWarning`（链接警告）
   - `HideFooter`（页脚控制）

### 5.6 custom.css — 全局样式

**职责**：定义全局字体、背景、卡片样式、进场动画系统。

**主要内容**：

- **字体**：引入 `WenYuan Rounded SC VF`（正文）与 `Cascadia Code`（代码），通过 `@import` 加载
- **全局变量**：`--vp-font-family-base`、`--vp-font-family-mono`、`--vp-sidebar-width`、动画变量
- **背景**：文档容器网格背景、侧边栏毛玻璃效果
- **卡片样式**：`.vp-card-wrapper`、`.vp-link-card` 的背景、边框、hover 上浮效果
- **进场动画系统**：
  - `fadeInUp` / `fadeInRight` 关键帧动画
  - 通过 `body.page-loaded` 类触发
  - 前 5 个主要元素依次延迟（0.05s 递增）
  - 列表项、卡片前 10 个交错动画
  - Hero 区域元素分层进场
- **无障碍**：`@media (prefers-reduced-motion: reduce)` 关闭所有动画

> 💡 优化提示（代码注释）：`@import` 字体建议迁移到 `config.ts` 的 `head` 配置中用 `<link>` 引入，性能更优。

---

## 6. 自定义组件模块

所有自定义组件位于 `docs/.vuepress/components/`，通过 `client.ts` 注册。

### 6.1 AppSetup.vue

**职责**：应用启动包装组件，作为根组件注入，内部渲染 `ParticleBackground`。

**实现**：极简，仅一个模板，渲染粒子背景组件。

```
AppSetup (rootComponent) → ParticleBackground
```

### 6.2 ParticleBackground.vue

**职责**：全站动态粒子背景效果，基于 Canvas 实现，支持鼠标交互、深色模式、移动端禁用。

**核心特性**：
- Canvas 全屏渲染（`position: fixed; z-index: -1`）
- 粒子密度基于屏幕面积计算，适配不同分辨率
- 鼠标移动时粒子连线增强
- 页面不可见时暂停动画（`visibilitychange`）
- 移动端（`max-width: 768px`）完全禁用
- 通过 frontmatter `disableParticle: true` 按页面禁用
- 深色模式自动切换粒子颜色（`MutationObserver` 监听 `data-theme`）
- DPR 适配，高清屏清晰渲染
- 连线计算使用平方比较（避免 `Math.sqrt`），提升性能

**详细类说明见** [7.1 ParticleEffect 类](#71-particleeffect-类)。

### 6.3 PageLoading.vue

**职责**：全局页面加载动画，在首屏资源加载完成前展示 Glitch 风格加载界面。

**加载策略**（三重保障）：
1. **最小展示时间**（`MIN_LOADING_TIME = 1000ms`）：防止闪烁
2. **资源就绪检测**：监听 `window.load` + 轮询检测首屏前 8 张图片
3. **最大超时兜底**（`MAX_LOADING_TIME = 8000ms`）：防止资源卡死导致永久加载

**关键行为**：
- 加载期间锁定页面滚动（`body.style.overflow = 'hidden'`）
- 加载完成后添加 `page-loaded` 类（触发 `custom.css` 进场动画）
- Glitch 故障风动画（双 `::before`/`::after` 伪元素 + `clip` 动画）
- 深色模式颜色适配

### 6.4 ExternalLinkWarning.vue

**职责**：拦截外部链接点击，弹出安全警告确认框，提供"取消/复制链接/继续前往"三个操作。

**拦截机制**：
- 在 `document` 上注册 `click` 事件（`capture: true` 捕获阶段）
- 判断点击目标是否为 `<a>` 标签且 `href` 为外部链接
- 排除修饰键（Ctrl/Cmd/Shift/Alt，允许新标签页直接打开）
- 拦截后 `preventDefault()`，弹出确认框

**功能**：
- URL 解析显示（协议/域名/路径分段着色）
- 复制链接（优先 `navigator.clipboard`，降级 `execCommand`）
- ESC 键关闭
- Teleport 到 `body`，避免 z-index 问题
- 模态框弹出动画（`cubic-bezier(0.34, 1.56, 0.64, 1)` 弹性效果）

### 6.5 HideFooter.vue

**职责**：根据页面 frontmatter 的 `disableFooter` 字段，动态隐藏/显示站点页脚。

**实现**：
- 监听 `usePageFrontmatter` 变化
- 查询 `footer.vp-footer` 元素，设置 `display: none` 或恢复
- 组件卸载时恢复页脚显示

### 6.6 AsideNav.vue

**职责**：侧边栏底部导航组件，注入到 Layout 的 `aside-outline-after` 插槽。

**内容**：三个链接
- GitHub Star（仓库主页）
- 遇到问题？（Issue 创建）
- 喝杯奶茶（赞助页）

**特性**：支持中英双语（`useRouteLocale`），使用 Plume 主题的 `VPIcon`、`VPLink` 组件。

### 6.7 NavPage.vue

**职责**：自定义导航页组件，渲染 `nav/data.js` 中的导航数据，支持搜索、分类跳转、图标展示。

**核心功能**：
- **搜索**：实时过滤标题和描述（200ms 防抖）
- **分类标签**：点击平滑滚动到对应分类
- **图标支持**：三种类型 `iconify` / `image` / `none`
- **Iconify 动态加载**：`MutationObserver` 监听 DOM 变化，触发 `Iconify.scan`
- **性能优化**：
  - `shallowRef` 包装导航数据（避免深响应式开销）
  - 滚动事件 `requestAnimationFrame` 节流
  - 卡片 `content-visibility: auto`（虚拟渲染）
  - 图片 `loading="lazy"` 懒加载 + 加载完成淡入
  - `contain: strict` 限制重绘范围

**详细逻辑见** [7.2 NavPage 过滤与滚动逻辑](#72-navpage-过滤与滚动逻辑)。

### 6.8 HtmlPage.vue

**职责**：通过 iframe 嵌入外部 HTML 页面，用于在线工具（OpenList、红石编辑器、AI 工具等）。

**特性**：
- 接收 `src` prop（必填）
- 加载期间显示 Glitch 风格加载动画（复用 PageLoading 样式）
- iframe `allow="clipboard-write; download"`（支持复制和下载）
- `loading="lazy"` 懒加载
- 加载完成后延迟 300ms 隐藏遮罩（确保内容渲染）

**使用方式**（在 Markdown 中）：

```markdown
---
title: 工具名称
pageLayout: page
permalink: /app/xxx/
disableFooter: true
---
<HtmlPage src="https://example.com/" />
```

---

## 7. 关键类与函数说明

### 7.1 ParticleEffect 类

**位置**：`docs/.vuepress/components/ParticleBackground.vue`

**职责**：封装粒子背景的完整动画逻辑，包括粒子生成、运动、连线、鼠标交互、主题适配、性能优化。

#### 类结构

```typescript
class ParticleEffect {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  particles: Particle[] = []
  mouse: { x: number | null, y: number | null }
  animationFrame: number | null
  isRunning: boolean
  isDark: boolean
  dpr: number  // 设备像素比

  // 事件处理引用（用于解绑）
  private resizeHandler, mouseMoveHandler, mouseOutHandler, visibilityHandler

  config: {
    areaDensity: 10000     // 每多少平方像素分配一个粒子
    maxParticles: 150      // 最大粒子数
    particleSpeed: 0.3     // 粒子速度
    lineMaxDistance: 110   // 连线最大距离
    mouseRadius: 160       // 鼠标影响半径
    maxConnections: 5      // 单粒子最大连线数
  }

  colors: string[]         // 粒子颜色数组
  lineRgbaColor: string    // 连线颜色
}
```

#### 关键方法

| 方法 | 说明 |
|------|------|
| `constructor(canvas, isDark)` | 初始化上下文、DPR、主题颜色，调用 `init()` |
| `updateThemeColors()` | 根据深色/浅色模式更新粒子与连线颜色 |
| `init()` | 执行 `handleResize()` + `bindEvents()` |
| `bindEvents()` / `unbindEvents()` | 绑定/解绑 resize、mousemove、mouseout、visibilitychange |
| `handleResize()` | 移动端停止动画；PC 端设置 Canvas 物理像素尺寸，生成粒子 |
| `createParticles()` | 基于面积计算粒子数（`面积 / (areaDensity * dpr)`），限制 30~150 |
| `startAnimation()` / `stopAnimation()` | 启动/停止 `requestAnimationFrame` 循环 |
| `animate()` | 核心渲染循环：清空画布 → 更新位置 → 边界反弹 → 绘制粒子 → 连线 → 鼠标交互 |
| `destroy()` | 停止动画 + 解绑事件 + 清空画布 + 释放引用（GC） |

#### 性能优化点

1. **DPR 适配**：所有坐标、半径、线宽乘以 `dpr`，高清屏清晰
2. **平方距离比较**：连线判断用 `dx*dx + dy*dy < dist*dist`，避免 `Math.sqrt`
3. **连接数限制**：`maxConnections` 提前终止内层循环
4. **页面可见性**：`document.hidden` 时暂停动画，节省电量
5. **防抖 resize**：200ms 防抖，避免频繁重算
6. **移动端禁用**：直接不初始化，节省资源

#### Vue 集成逻辑

- `watch(pageData)`：监听 frontmatter 变化，根据 `disableParticle` 决定是否初始化
- `observeThemeChange()`：`MutationObserver` 监听 `data-theme` 属性变化，更新颜色（不重建实例）
- `onMounted`：移动端直接跳过，PC 端 `nextTick` 后初始化
- `onUnmounted`：调用 `destroy()` 清理

### 7.2 NavPage 过滤与滚动逻辑

**位置**：`docs/.vuepress/components/NavPage.vue`

#### 数据流

```
nav/data.js (navData)
    │
    ▼
shallowRef(rawNavData)  ← shallowRef 避免深响应式
    │
    ▼
filteredData (computed) ← 依赖 debouncedQuery
    │
    ▼
v-for 渲染分组 + 卡片
```

#### 搜索过滤

```javascript
// 200ms 防抖
watch(searchInput, (val) => {
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = (val || '').trim().toLowerCase()
  }, 200)
})

// 计算属性过滤
const filteredData = computed(() => {
  const query = debouncedQuery.value
  if (!query) return navData.value
  return navData.value
    .map(group => {
      const items = group.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      )
      return items.length ? { ...group, items } : null
    })
    .filter(Boolean)
})
```

#### 分类滚动

```javascript
const scrollToCategory = (cat) => {
  activeCategory.value = cat
  setTimeout(() => {
    const el = document.getElementById(`cat-${cat}`)
    const headerHeight = document.querySelector('.m-nav-header')?.offsetHeight || 80
    const offsetPosition = el.offsetTop - headerHeight - 20
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }, 300)
}
```

#### Iconify 动态扫描

```javascript
const initIconifyObserver = () => {
  observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.addedNodes.length > 0) && window.Iconify) {
      window.Iconify.scan(containerRef.value)
    }
  })
  observer.observe(containerRef.value, { childList: true, subtree: false })
}
```

### 7.3 ExternalLinkWarning 拦截器

**位置**：`docs/.vuepress/components/ExternalLinkWarning.vue`

#### 外部链接判断

```typescript
const isExternalLink = (url: string): boolean => {
  if (!url) return false
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false
  try {
    const targetUrl = new URL(url)
    const currentDomain = window.location.hostname
    return targetUrl.hostname !== currentDomain  // 域名不同即为外部
  } catch (e) {
    return false
  }
}
```

#### 点击拦截（捕获阶段）

```typescript
const handleLinkClick = (event: MouseEvent) => {
  if (showWarning.value) return  // 弹窗已显示时不再拦截
  // 允许修饰键直接打开（Ctrl/Cmd+点击新标签页）
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  const target = event.target as HTMLElement
  const linkElement = target.closest('a')
  if (linkElement) {
    const href = linkElement.getAttribute('href')
    if (href && isExternalLink(href) && !event.defaultPrevented) {
      event.preventDefault()        // 阻止默认跳转
      showWarningDialog(href)       // 显示警告弹窗
    }
  }
}

// 注册：capture: true 在捕获阶段拦截
document.addEventListener('click', handleLinkClick, { capture: true })
```

#### URL 分段显示

```typescript
const urlParts = computed(() => {
  try {
    const url = new URL(externalUrl.value)
    return {
      protocol: url.protocol + '//',
      domain: url.hostname,
      path: /* 截断超长路径 */
    }
  } catch (e) {
    return { protocol: '', domain: externalUrl.value, path: '' }
  }
})
```

---

## 8. 内容模块职责

### ZakoZakoCraft（Minecraft 服务器文档）

**集合类型**：`doc`（带侧边栏的知识库）

**内容组织**：按服务器子服分类

| 目录 | 内容 |
|------|------|
| `从此处开始/` | 加入服务器流程、规则、常见问题、封神榜 |
| `休闲生存服/` | 领地、工会、经济、实用功能、特色配方、装饰 |
| `实验创造服/` | Carpet 地毯、Axiom 公理模组 |
| `建筑创造服/` | 地皮系统、Axiom、创世神 |
| `娱乐游戏服/` | 小游戏服介绍 |
| `先行测试服/` | 测试服介绍 |
| `测试功能/` | 虚拟局域网加入方法 |

**首页特色**：使用 `Swiper` 组件展示轮播图、`CardGrid`/`Card`/`LinkCard` 展示特色与子服列表。

### articles（博客文章）

**集合类型**：`post`（博客列表）

**分类目录**：

| 目录 | 内容 |
|------|------|
| `学习笔记-源码解读/` | 提问的智慧、圆锥曲线、三角函数、Markdown 笔记 |
| `工具效率-资源推荐/` | Motrix 下载工具 |
| `性能优化-体验提升/` | **自定义组件使用教程**（导航页、粒子背景、外部链接警告等） |
| `游戏资源-插件模组/` | Carpet 模组文档 |
| `踩坑实录-问题排查/` | Minecraft 服务器问题排查 |
| `随笔分享-生活感悟/` | 关于站主、赞助 |
| `项目实战-方案设计/` | 第一篇博客（示例） |

### app（在线工具）

**实现方式**：通过 `HtmlPage` 组件 iframe 嵌入外部 HTML 或在线服务。

| 工具 | 实现方式 |
|------|----------|
| OpenList 云盘 | iframe 嵌入 `https://openlist.zakozako.cc/` |
| 红石编辑器 | iframe 嵌入 `https://rseditor.zakozako.cc/` |
| AI 工具（聊天/绘画/语音） | iframe 嵌入本地 `/assets/app/AI-TOOLS/*.html` |
| HTML/CSS/JS 编辑器 | iframe 嵌入本地 HTML |
| Markdown 编辑器 | iframe 嵌入本地 HTML |
| 图片压缩 | iframe 嵌入本地 HTML |

**frontmatter 约定**：所有工具页设置 `pageLayout: page`、`disableFooter: true`。

### nav（导航页）

**实现方式**：`nav/index.md` 中使用 `<NavPage />` 组件，数据由 `nav/data.js` 提供。

**数据规模**：200+ 导航条目，按 11 个分类组织：
- 文档与教程、插件与模组、软件项目、配置文件
- 开发基础（Node/Deno/Bun/包管理器）
- 前端框架与库（React/Vue/Angular/全栈框架/微前端）
- 后端与全栈（Web 框架/企业级框架）
- 样式与 UI（CSS 工具/Vue UI/React UI）
- 状态管理与工具
- 构建与工具链（构建工具/SSG）
- 跨平台开发（小程序/桌面/移动）
- 资源与设计（图标/素材/设计工具）
- 开发工具与测试（测试框架/图表库/CDN）
- 社区与学习资源

---

## 9. frontmatter 约定

项目通过 Markdown frontmatter 控制页面行为。常用字段：

### 通用字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 页面标题 |
| `permalink` | string | 永久链接（必须与集合 `linkPrefix` 匹配） |
| `createTime` | string/date | 创建时间 |
| `lastUpdated` | boolean | 是否显示最后更新时间 |
| `tags` | string[] | 标签（仅 post 集合） |
| `author` | string | 作者 |

### 布局字段

| 字段 | 值 | 说明 |
|------|-----|------|
| `home` | `true` | 首页布局（Hero 区域） |
| `pageLayout` | `page` / `friends` / `home` | 页面布局类型 |
| `config` | array | 首页 Hero 配置（类型、效果、按钮） |

### 自定义组件控制字段

| 字段 | 类型 | 控制组件 | 说明 |
|------|------|----------|------|
| `disableParticle` | boolean | ParticleBackground | 禁用粒子背景 |
| `disableFooter` | boolean | HideFooter | 隐藏页脚 |
| `externalLinkIcon` | boolean | — | 显示外部链接图标 |
| `comments` | boolean | — | 是否启用评论 |
| `editLink` | boolean | — | 是否显示编辑链接 |
| `contentPosition` | string | — | 内容位置（`after`/`before`） |

### 示例

**博客文章**：
```markdown
---
title: 文章标题
author: ZXBHELLO
lastUpdated: true
permalink: /article/xxx/
tags:
  - VuePress
  - 前端开发
createTime: 2025/11/08
---
```

**工具页（iframe 嵌入）**：
```markdown
---
title: 工具名称
pageLayout: page
permalink: /app/xxx/
disableFooter: true
---
<HtmlPage src="https://example.com/" />
```

**首页（Hero 配置）**：
```markdown
---
home: true
config:
  - type: hero
    effect: tint-plate
    full: true
    hero:
      name: ZAKO
      text: 描述文本
      actions:
        - theme: brand
          text: 按钮文字
          link: /路径/
---
```

---

## 10. 构建与部署流程

### CI/CD 流程

**工作流文件**：`.github/workflows/deploy.yml`

**触发条件**：
- `push` 到 `main` 分支，且修改了 `docs/**`、`package.json`、`pnpm-lock.yaml`
- 手动触发（`workflow_dispatch`）

**并发控制**：`concurrency.group: pages`，`cancel-in-progress: true`（新构建取消旧构建）

**构建步骤**：

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | `actions/checkout@v4` | 检出代码，`fetch-depth: 0` 拉取完整历史（用于最后更新时间） |
| 2 | `pnpm/action-setup@v4` | 安装 pnpm |
| 3 | `actions/setup-node@v4` | 配置 Node.js 22 |
| 4 | `pnpm install` | 安装依赖（允许自动生成锁文件） |
| 5 | `pnpm run docs:build` | 构建 VuePress 站点 |
| 6 | `crazy-max/ghaction-github-pages@v4` | 部署到 `Pages` 分支 |

**部署配置**：
- 目标分支：`Pages`
- 构建产物目录：`docs/.vuepress/dist`
- 认证：`secrets.ACCESS_TOKEN`（GitHub Token）
- 自定义域名：通过 `docs/.vuepress/public/CNAME` 文件配置（`www.zakozako.cc`）

### 构建产物

```
docs/.vuepress/dist/    # 构建输出目录
├── index.html
├── assets/             # 编译后的 JS/CSS/图片
├── *.html              # 各页面 HTML
└── ...
```

---

## 11. 项目运行方式

### 环境准备

```bash
# 确认 Node.js 版本 (^20.6.0 || >=22.0.0)
node -v

# 安装 pnpm (>=10.0.0)
npm install -g pnpm
```

### 常用命令

| 命令 | 作用 |
|------|------|
| `pnpm install` | 安装项目依赖 |
| `pnpm docs:dev` | 启动开发服务器（端口 3000，热更新） |
| `pnpm docs:dev-clean` | 清理缓存并启动开发服务（解决缓存问题） |
| `pnpm docs:build` | 构建生产版本（`--clean-cache --clean-temp`） |
| `pnpm docs:preview` | 本地预览构建结果（`http-server`） |
| `pnpm vp-update` | 更新 VuePress 及插件 |

### 开发流程

1. **启动开发服务**：`pnpm docs:dev` → 访问 `http://localhost:3000`
2. **修改内容**：编辑 `docs/` 下的 Markdown 文件，浏览器自动刷新
3. **修改配置**：
   - `plume.config.ts` 修改后**热更新**生效
   - `config.ts` 修改后需**重启** `pnpm docs:dev`
4. **添加新文章**：在 `docs/articles/` 对应分类目录创建 `.md` 文件，添加 frontmatter
5. **添加导航项**：编辑 `docs/nav/data.js`
6. **构建验证**：`pnpm docs:build` 确认无错误
7. **提交部署**：推送到 `main` 分支，GitHub Actions 自动构建部署

### 本地预览构建产物

```bash
pnpm docs:build
pnpm docs:preview
# 访问 http://localhost:8080
```

---

## 12. 开发约定与注意事项

### 配置约定

1. **双配置文件**：`config.ts`（重启生效）与 `plume.config.ts`（热更新），避免重复配置同名项
2. **permalink 前缀**：`doc` 类型集合的 Markdown 文件，`permalink` 必须以 `linkPrefix` 开头，否则侧边栏不显示
3. **端口**：开发服务器固定 3000，避免与本地其他服务冲突

### 组件使用约定

1. **粒子背景**：默认全站启用，按页面禁用在 frontmatter 添加 `disableParticle: true`
2. **页脚隐藏**：工具页等全屏页面在 frontmatter 添加 `disableFooter: true`
3. **iframe 嵌入**：使用 `<HtmlPage src="url" />`，需设置 `pageLayout: page`
4. **导航页**：数据在 `nav/data.js` 配置，组件自动渲染

### 性能约定

1. **`shouldPrefetch: false`**：站点页面较多，禁用预取避免带宽浪费
2. **粒子背景移动端禁用**：`max-width: 768px` 不渲染
3. **图片懒加载**：导航页图片 `loading="lazy"`
4. **动画无障碍**：`prefers-reduced-motion: reduce` 时关闭动画
5. **缓存策略**：`cache: 'filesystem'` 文件系统缓存加速重复构建

### Git 约定

1. **换行符**：`.gitattributes` 强制 `* text eol=lf`，图片等二进制文件标记为 `binary`
2. **忽略规则**：`node_modules`、构建产物（`.cache`/`.temp`/`dist`）、环境变量、IDE 文件
3. **部署分支**：`main`（源码）→ `Pages`（构建产物）

### 内容约定

1. **Markdown 扩展语法**：支持 Plume 主题的容器语法（`::: tip`、`:::: window`）、组件语法（`<CardGrid>`、`<LinkCard>`、`<Swiper>`）
2. **图标语法**：`::icon-name::`（需 Iconify 支持，已在 `config.ts` head 引入脚本）
3. **媒体嵌入**：`@[pdf](url)`、`@[bilibili](bid)`、`@[youtube](video_id)` 等
4. **评论系统**：使用 Giscus，基于 GitHub Discussions，需仓库为 public 并启用 Discussions

---

> 本文档基于仓库当前状态生成，如项目结构或配置发生变更，请同步更新本文档。
