# ZXBHELLO 网站

这是 ZXBHELLO 的个人网站和导航站，使用 [VuePress](https://vuepress.vuejs.org/) 和 [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) 构建生成。

## 功能特性

- 个人博客和文档站点
- 支持 GitHub 在线编辑
- 集成 Giscus 评论系统
- 支持 PDF 预览和嵌入资源
- 自动显示文档贡献者
- 响应式设计，支持移动端浏览

## 个人开发自定义界面
- [导航页](https://doc.zxbhello.top/nav/guide/)

## 项目地址

- [在线访问网站](http://doc.zxbhello.top)
- [GitHub 仓库](https://github.com/ZXBHELLO/Website)

## 文档

- [VuePress 官方文档](https://vuepress.vuejs.org/)
- [VuePress Plume 主题文档](https://theme-plume.vuejs.press/)
- [部署指南](./docs/guide/deployment.md)


## 安装依赖

```sh
pnpm i
```

## 启动

```sh
# 启动开发服务
pnpm docs:dev
# 构建生产包
pnpm docs:build
# 本地预览生产服务
pnpm docs:preview
# 更新 vuepress 和主题
pnpm vp-update
```

## 部署到 GitHub Pages

主题已创建 github actions: `.github/workflows/docs-deploy.yml`，你还需要在 github 仓库中进行以下设置：

- [ ] `settings > Actions > General`，拉到页面底部，在 `Workflow permissions` 下，勾选 `Read and write permissions`，并点击保存按钮

- [ ] `settings > Pages`, 在 `Build and deployment` 中，`Source` 选择 `Deploy from a branch`, `Branch` 选择 `gh-pages`，并点击保存按钮
  (首次创建可能没有 `gh-pages`分支，你可以先完成上面的设置后，推送一次代码到主分支，等待 `github actions` 完成后再进行设置)

- [ ] 修改 `docs/.vuepress/config.ts` 中的 `base` 选项：
  - 如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。
  - 如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

如需要自定义域名，请查看 [Github Pages 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

## 文档

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)

