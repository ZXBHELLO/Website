# 部署指南

## 安装

```sh
pnpm i
```

## 使用方法

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

## 部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署：`.github/workflows/docs-deploy.yml`。

需要在 GitHub 仓库中进行以下设置：

- [ ] `settings > Actions > General`，滚动到页面底部，在 `Workflow permissions` 下，勾选 `Read and write permissions`，并点击保存按钮

- [ ] `settings > Pages`, 在 `Build and deployment` 中，`Source` 选择 `Deploy from a branch`, `Branch` 选择 `gh-pages`，并点击保存按钮
  (首次创建可能没有 `gh-pages` 分支，你可以先完成上面的设置后，推送一次代码到主分支，等待 `GitHub Actions` 完成后再进行设置)

- [ ] 修改 `docs/.vuepress/config.ts` 中的 `base` 选项：
  - 如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。
  - 如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

如需自定义域名，请查看 [GitHub Pages 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)