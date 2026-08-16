---
title: Zako Files HUB：基于 Hugging Face 的免费文件管理系统
lastUpdated: true
tags:
  - 工具效率
  - 网盘
  - HuggingFace
  - Cloudflare
createTime: 2026/08/17
permalink: /article/ZakoFilesHUB/
---

> **项目原址**：https://github.com/ZXBHELLO/ZakoFilesHUB
> **作者**：ZXBHELLO

## 一、项目介绍

**Zako Files HUB** 是一个基于 **Hugging Face Hub** 的免费文件管理系统。它采用**纯前端架构、零后端**设计，把 Hugging Face 账号当作"无限网盘"来用——部署即用，无需自建服务器、无需数据库。

### 核心特性

- **无限免费公开存储**：数据存放在 Hugging Face 仓库中，单文件上限 **5GB**
- **多种上传方式**：支持拖拽 / 点击 / 粘贴上传，可上传**任意文件类型**（图片、视频、文档、压缩包等）
- **文件管理**：文件夹管理、批量操作、在线预览、重命名、移动、删除
- **多格式分享链接**：一键生成 `URL / Markdown / HTML / BBCode` 四种分享格式，方便插入博客、论坛
- **国内镜像加速**：内置 `hf-mirror.com` 镜像支持，解决国内访问 Hugging Face 缓慢的问题
- **响应式设计**：适配桌面端与移动端

### 技术栈

| 类型 | 技术 |
|------|------|
| 前端框架 | Vue 3 |
| 构建工具 | Vite 5 |
| 开发语言 | TypeScript |
| 存储后端 | Hugging Face Hub |
| 托管平台 | Cloudflare Pages（含 Functions） |

## 二、工作原理（架构说明）

这是一个很有意思的设计：**Hugging Face Hub 负责"存"，Cloudflare Functions 负责"中转"，浏览器前端负责"管"**。

### 1. 数据存储

所有文件实际存放在 Hugging Face 的仓库（`models` 或 `datasets`）中。上传逻辑分两条路径：

- **大文件（LFS）**：计算 SHA-256 → 请求 Hugging Face 的 LFS Batch API 获取预签名上传地址 → 上传到 S3 → Commit 指针
- **小文件**：转为 base64 后直接通过 Commit 接口写入仓库

### 2. 代理中转（为什么需要 Cloudflare Functions）

浏览器的跨域（CORS）限制导致前端无法直接调用 Hugging Face 的 API 和文件 CDN。项目通过两个代理端点解决：

| 端点 | 作用 | 开发环境 | 生产环境 |
|------|------|----------|----------|
| `/hf-proxy` | 转发 Hugging Face API 请求 | Vite proxy → `hf-mirror.com` | Functions → `huggingface.co` |
| `/hf-cdn` | 转发文件下载 / S3 上传请求（带 `url` 参数） | Vite 中间件 | Functions → 目标 URL |

对应代码位于：

- `functions/hf-proxy/_middleware.ts` —— 生产环境 API 代理
- `functions/hf-cdn.ts` —— 生产环境 CDN 代理
- `src/api/hub.ts` —— 前端 API 层封装

> **重要**：正因为依赖 `functions/` 目录，本项目**必须部署到支持 Serverless Functions 的平台**（如 Cloudflare Pages）。若部署到纯静态托管（GitHub Pages、普通 Nginx），代理会失效，上传功能无法使用。

### 3. 用户认证

Hugging Face Token **由终端用户在前端自行填写**（并非部署时配置的环境变量）。Token 校验通过后，仅保存在浏览器 `localStorage` 中（勾选"记住我"时持久化），不会上传到任何服务器。

```typescript
// useAuth.ts 中的本地存储键
const TOKEN_KEY = 'hf_image_hub_token'
const REPO_KEY  = 'hf_image_hub_repo'
```

这意味着：**每个人用自己的 HF 账号，互不干扰**。部署者只需把站点跑起来即可，无需管理任何密钥。

## 三、部署前准备

### 1. 准备账号

- 一个 **GitHub** 账号（用于 Fork 和连接 Cloudflare）
- 一个 **Cloudflare** 账号（免费即可）
- 一个 **Hugging Face** 账号（可选，用于后续使用站点）

### 2. 获取 Hugging Face Token（使用站点时需要）

> 这一步不是部署必需的，但你之后要使用站点上传文件就需要它。建议提前准备好。

1. 登录 [huggingface.co](https://huggingface.co)
2. 点击右上角头像 → **Settings** → 左侧 **Access Tokens**
3. 点击 **Create new token**
4. Token 类型选择 **Write**（或 Fine-grained，勾选目标仓库的写权限），命名随意
5. 点击生成并**复制保存**（Token 只显示一次）

> 提示：如果你只有 Read 权限 Token，将无法上传/删除文件（接口会返回 403 错误）。

### 3. 环境要求（本地开发时）

- Node.js：**18 及以上**（Vite 5 要求）
- npm 或 pnpm

## 四、部署教程（Cloudflare Pages，推荐）

Cloudflare Pages 对 `functions/` 目录原生支持，是最省心的部署方式。

### 第 1 步：Fork 仓库

1. 打开 https://github.com/ZXBHELLO/ZakoFilesHUB
2. 点击右上角 **Fork**，把仓库 Fork 到自己的 GitHub 账号下

### 第 2 步：创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧选择 **Workers & Pages** → 点击 **Create** → 选择 **Pages** 标签页
3. 点击 **Connect to Git**
4. 授权 Cloudflare 访问你的 GitHub，选择刚 Fork 的 `ZakoFilesHUB` 仓库
5. 点击 **Begin setup**

### 第 3 步：配置构建设置

在构建配置页填写：

| 配置项 | 值 |
|--------|-----|
| **Project name** | 自定义，如 `zako-files-hub` |
| **Production branch** | `main` |
| **Framework preset** | `Vite`（或手动配置） |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | 留空（默认） |

> 项目 `package.json` 中 `build` 脚本即 `vite build`，输出目录为 `dist`，`vite.config.ts` 中 `base: './'` 已配置好相对路径。

### 第 4 步：环境变量

**本项目的 HF Token 不需要配置为环境变量**（Token 由终端用户在前端输入）。因此环境变量这一栏可以**留空**。

> 若你日后想改造成"服务端统一持有 Token"的模式，才需要在此添加变量并在代码中引用 `context.env`，但当前版本无需此操作。

### 第 5 步：部署并验证

1. 点击 **Save and Deploy**
2. 等待构建完成，Cloudflare 会分配一个 `*.pages.dev` 域名

**验证代理是否正常**（关键一步）：

- 打开 `https://你的域名/hf-proxy/api/whoami-v2`，应返回 `401` 或一个 JSON 错误（说明代理已转发到 Hugging Face，属正常）
- 若返回 404 或 Cloudflare 错误页，说明 Functions 未被正确识别，请检查 `functions/` 目录是否在仓库根目录

### 第 6 步（可选）：绑定自定义域名

在 Pages 项目的 **Custom domains** 中绑定你自己的域名即可。

## 五、其他部署方式

### 方式 A：本地开发

```bash
git clone https://github.com/ZXBHELLO/ZakoFilesHUB.git
cd ZakoFilesHUB
npm install        # 安装依赖
npm run dev        # 启动开发服务器（Vite 会启动 /hf-proxy 与 /hf-cdn 本地代理）
```

### 方式 B：本地构建 + 预览

```bash
npm run build      # 构建到 dist/
npm run preview    # 本地预览构建产物
```

### 方式 C：使用 Wrangler CLI 手动部署

项目内置了 `deploy` 脚本（需要先安装并登录 Wrangler）：

```bash
npm run deploy          # 构建并发布到 Cloudflare Pages
npm run deploy:dry      # 仅演练（dry-run），不上传
```

> 注意：脚本中 `--project-name=hf-image-hub` 是作者的项目名，请改成你自己的 Pages 项目名，或直接改用 Dashboard 的 Git 集成部署。

### 关于其他托管平台

- **Vercel / Netlify**：可将 `functions/` 目录改写为对应平台的 Serverless Functions 格式（`api/` 目录），再把前端指向新的代理端点。改动量不大，但需自行适配。
- **纯静态托管（GitHub Pages 等）**：**不推荐**，代理失效会导致上传/下载不可用。

## 六、使用说明（部署完成后）

1. 打开你的站点
2. 填入你的 **Hugging Face Token**（Write 权限）
3. 填写或确认**仓库名**（留空则自动创建为 `你的用户名/image-bed`），选择仓库类型 `dataset` 或 `model`
4. 按需勾选「使用镜像加速」（国内用户建议开启）
5. 点击登录，验证通过后即可上传、管理、分享文件

## 七、常见问题

| 问题 | 原因与解决 |
|------|-----------|
| 登录提示 `Token 无效或已过期` | Token 填写错误或已被删除，重新生成一个 |
| 上传提示 `Token 没有 Write 权限` | 你的 Token 是 Read 类型，需改为 **Write** 权限 |
| 提示 `仓库不存在` | 检查仓库名拼写、类型（model/dataset）是否选对 |
| 国内访问慢 | 登录时开启「镜像加速」，走 `hf-mirror.com` |
| 部署后接口 404 | `functions/` 目录未被识别，确认部署在 Cloudflare Pages 且目录在根路径 |

## 八、许可证与原作者声明

本项目采用**非商用许可**：

> 非商用可自由使用、修改、分发，**需保留原作者信息**。商用需联系作者获取授权。

因此请你在二次分发或展示时，**保留原仓库地址与作者署名**：

- 项目原址：https://github.com/ZXBHELLO/ZakoFilesHUB
- 作者：ZXBHELLO

## 相关资源

- [Zako Files HUB 仓库](https://github.com/ZXBHELLO/ZakoFilesHUB)
- [Hugging Face](https://huggingface.co)
- [Cloudflare Pages](https://pages.cloudflare.com)
