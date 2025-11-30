# ZakoWeb 网站

这是 ZXBHELLO 的个人网站和文档站点，使用 [VuePress](https://vuepress.vuejs.org/) 和 [Plume](https://github.com/pengzhanbo/vuepress-theme-plume) 构建生成。

## 功能特性

- 个人博客和文档站点
- 支持 GitHub 在线编辑
- 集成 Waline 评论系统
- 支持多种媒体资源嵌入（PDF、Bilibili 视频等）
- 自动显示文档贡献者和更新时间
- 响应式设计，支持移动端浏览
- 深色/浅色主题自动切换

## 项目地址

- [在线访问网站](https://www.zakozako.cc)
- [GitHub 仓库](https://github.com/ZXBHELLO/Website)

## 快速开始

```sh
# 安装依赖
pnpm install

# 启动开发服务
pnpm docs:dev

# 构建生产包
pnpm docs:build

# 本地预览构建结果
pnpm docs:preview
```

## 项目结构

```
.
├── docs/                   # 文档源文件
│   ├── .vuepress/          # VuePress 配置
│   │   ├── components/     # 自定义组件
│   │   ├── public/         # 静态资源
│   │   └── config.ts       # 主配置文件
│   └── ...                 # 各类文档内容
├── package.json            # 项目依赖和脚本
└── README.md               # 项目说明文件
```

## 开发指南

1. 所有文档内容位于 [docs/](./docs/) 目录下
2. 自定义组件位于 [docs/.vuepress/components/](./docs/.vuepress/components/) 目录下
3. 静态资源（如图片、PDF等）放在 [docs/.vuepress/public/](./docs/.vuepress/public/) 目录下
4. 配置文件位于 [docs/.vuepress/config.ts](./docs/.vuepress/config.ts)

## 贡献

如果你想要改进这个项目，欢迎提交 PR

## 许可证

转载/引用需保留模板设计者信息。
