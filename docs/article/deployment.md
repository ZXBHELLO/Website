---
title: 部署指南
createTime: 2025/10/05 05:54:51
permalink: /article/n5l5ldec/
---

# 部署指南

本文档将详细介绍如何安装、使用和部署基于 VuePress 和 Plume 主题的网站。

## 安装

在项目根目录下执行以下命令安装依赖：

```sh
pnpm i
```

::: tip 提示
确保你的系统已安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)。
:::

## 使用方法

以下是一些常用的开发命令：

```sh
# 启动开发服务器
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 本地预览生产版本
pnpm docs:preview

# 更新 VuePress 和主题
pnpm vp-update
```

::: warning 注意
在执行 `pnpm vp-update` 命令前，建议先备份项目以防出现兼容性问题。
:::

## 部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署：`.github/workflows/docs-deploy.yml`。

需要在 GitHub 仓库中进行以下设置：

::: tip 步骤一：配置 Actions 权限
在仓库设置中：
- 进入 `settings > Actions > General`
- 滚动到页面底部，在 `Workflow permissions` 下
- 勾选 `Read and write permissions`，并点击保存按钮
:::

::: tip 步骤二：配置 Pages 设置
在仓库设置中：
- 进入 `settings > Pages`
- 在 `Build and deployment` 中，`Source` 选择 `Deploy from a branch`
- `Branch` 选择 `gh-pages`，并点击保存按钮

::: warning 首次配置提示
首次创建可能没有 `gh-pages` 分支，你可以先完成上面的设置后，推送一次代码到主分支，等待 `GitHub Actions` 完成后再进行设置。
:::

::: tip 步骤三：修改基础路径
修改 `docs/.vuepress/config.ts` 中的 `base` 选项：
- 如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。
- 如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。
:::

::: info 进一步了解
如需自定义域名，请查看 [GitHub Pages 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)。
:::