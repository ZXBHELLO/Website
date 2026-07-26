# Zako - 杂鱼文档

ZXBHELLO 的个人技术博客、文档站点与 Minecraft 服务器指南，基于 VuePress + Plume 主题构建的综合性内容平台。


## ✨ 核心特性

- 🎨 **现代化界面**: 深色/浅色主题自动切换，响应式设计完美适配移动端
- 💬 **互动体验**: 集成 Waline 评论系统，支持 GitHub 在线编辑
- 📊 **丰富功能**: 支持 PDF、Bilibili 视频等多种媒体嵌入
- 🔍 **高效搜索**: 本地搜索功能，快速定位内容
- 📈 **版本管理**: 自动显示文档贡献者和更新时间
- ⚡ **性能优化**: 预加载策略优化，提升访问速度

## 🚀 快速开始

### 环境要求
- Node.js: ^20.6.0 || >=22.0.0
- pnpm: >=10.0.0

### 运行项目

```sh
# 安装依赖
pnpm install

# 启动开发服务（端口 3000）
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 本地预览构建结果
pnpm docs:preview

# 清理缓存并启动开发服务
pnpm docs:dev-clean

# 更新 VuePress 及插件
pnpm vp-update
```

## 📁 项目结构

```
.
├── docs/                   # 主文档目录
│   ├── ZakoZakoCraft/      # Minecraft 服务器文档
│   ├── app/                # 在线工具集合
│   ├── articles/           # 技术文章与笔记
│   ├── nav/                # 导航配置
│   ├── .vuepress/          # VuePress 核心配置
│   │   ├── components/     # 自定义 Vue 组件
│   │   ├── public/         # 静态资源（图片、字体等）
│   │   ├── config.ts       # 主配置文件
│   │   └── dist/           # 构建输出目录
│   ├── index.md            # 网站首页
│   ├── friends.md          # 友情链接
│   └── message-board.md    # 留言板
├── package.json            # 项目依赖与脚本
└── README.md               # 项目说明
```

## 🔧 开发指南

### 文档编写
- 所有文档内容位于 `docs/` 目录下，按主题分类组织
- 使用 Markdown 编写，支持 VuePress 扩展语法
- 可直接通过 GitHub 在线编辑提交修改

### 自定义开发
- 自定义组件位于 `docs/.vuepress/components/`
- 静态资源请放置在 `docs/.vuepress/public/`
- 全局配置文件: `docs/.vuepress/config.ts`
- 主题配置参考: [Plume 主题文档](https://theme-plume.vuejs.press/)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目！

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 链接

- 🌐 **在线网站**: [https://www.zakozako.cc](https://www.zakozako.cc)
- 📦 **GitHub 仓库**: [https://github.com/ZXBHELLO/Website](https://github.com/ZXBHELLO/Website)
- 🎨 **主题来源**: [VuePress Theme Plume](https://github.com/pengzhanbo/vuepress-theme-plume)