---
title: 导航页配置教程
date: 2024-01-01T00:00:00.000Z
tags:
  - VuePress
  - 导航页
  - 前端开发
permalink: /article/nav-guide/
createTime: 2025/11/08
---

# 导航页面使用指南

本文档将指导您如何在您的 VuePress 项目中添加和配置ZXBHELLO的自定义导航页面，包括组件安装、数据配置和样式自定义。

::: tip
你可以访问[ZXBHELLO的导航页](https://doc.zxbhello.top/nav/)，查看底部的示例。
:::

## 前置准备

### 1. 下载必要文件

由于这些组件是自定义开发的，官方原版中并不存在，您需要从本仓库下载以下文件：

```
.vuepress/
├── components/
│   └── NavPage.vue      # 导航页面组件
└── nav/
    ├── data.js          # 导航数据配置文件
    ├── index.md         # 导航页面入口文件
    └── guide.md         # 本指南文件
```

### 2. 文件放置位置

请确保将文件放置在正确的位置：

1. `NavPage.vue` 放置在 `.vuepress/components/` 目录下
2. `data.js` 放置在 `nav/` 目录下
3. `index.md` 放置在 `nav/` 目录下

### 3. 注册组件

在您的项目中，您可能已经有 `client.ts` 文件并包含了一些配置。在这种情况下，您需要在现有配置的基础上添加 NavPage 组件的导入和注册，而不是替换整个文件。

在您的 `client.ts` 文件中添加以下内容：

```typescript
import { defineClientConfig } from 'vuepress/client'
// 保留您现有的导入语句
import NavPage from './components/NavPage.vue' // 添加这一行来导入 NavPage 组件

export default defineClientConfig({
  enhance({ app }) {
    // 保留您现有的增强配置
    app.component('NavPage', NavPage) // 添加这一行来注册 NavPage 组件
  },
  // 保留您现有的其他配置
})
```

如果您的 `client.ts` 文件还不存在，您可以创建一个新文件并添加以上内容。

## 目录结构

导航页面由以下几个主要文件组成：

```
nav/
├── data.js          # 导航数据配置文件
├── index.md         # 导航页面入口文件
└── guide.md         # 本指南文件
```

## 添加新的导航项

### 1. 编辑 data.js 文件

在 `data.js` 文件中添加新的导航项。每个导航项的字段说明如下：

```javascript
{
  category: '分类名称',             // 必填，用于分组显示导航项
  items: [
    {
      id: '唯一标识符',              // 项目唯一ID
      title: '项目标题',             // 显示的标题
      description: '项目描述',       // 显示的描述信息
      url: '链接地址',               // 跳转链接
      iconType: 'iconify|image|none', // 图标类型 (留空默认为none)
      icon: '图标名称或路径',         // 图标内容
      showIconBorder: true          // 可选，是否显示图标边框，默认为true (仅当iconType不为none时生效)
    }
  ]
}
```

### 2. 字段说明

#### 配置字段

- `category`: 分类名称，用于将相关导航项分组显示
- `id`: 项目的唯一标识符，建议使用英文和数字组合
- `title`: 显示的标题文本
- `description`: 项目描述信息
- `url`: 点击后跳转的链接地址
- `iconType`: 图标类型，可选值为：
  - `iconify`: 使用 Iconify 图标库中的图标
  - `image`: 使用本地或远程图片作为图标
  - `none`: 不显示图标
- `icon`: 
  - 当 `iconType` 为 `iconify` 时，填写图标名称（如：`material-symbols:article-outline`）
  - 当 `iconType` 为 `image` 时，填写图片路径（如：`/assets/nav/mcmmo.png`）
  - 当 `iconType` 为 `none` 时，可填写 `'none'` 或留空

#### 可选字段

- `showIconBorder`: 控制图标边框显示
  - `true`: 显示边框（默认值）
  - `false`: 隐藏边框
  - 如果不设置该字段，默认为 `true`
  - 当 `iconType` 为 `none` 时，此字段无效

### 3. 示例配置

```javascript
{
  category: '文档教程',
  items: [
    {
      id: 'example-full',
      title: '完整示例',
      description: '这是一个完整配置示例',
      url: '/example/',
      iconType: 'iconify',
      icon: 'material-symbols:article-outline',
      showIconBorder: false
    },
    {
      id: 'example-no-icon',
      title: '无图标示例',
      description: '这是一个不显示图标的示例',
      url: '/example-no-icon/',
      iconType: 'none',
      icon: 'none'
    }
  ]
}
```

## 使用导航页面

在您的导航页面 Markdown 文件中（如 `index.md`）的特定位置，使用以下代码引入导航组件：

```markdown
<NavPage />
```

确保在 Markdown 文件的 frontmatter 中包含适当的布局配置：

```markdown
---
title: 前端导航(可以自行修改)
pageLayout: page
---
```

## 样式自定义

### 1. 调整边距

导航项的边距可以通过修改 `NavPage.vue` 组件中的 CSS 样式来调整：

```css
/* 导航项之间的间距 */
.m-nav-links {
  gap: 1rem;
}

/* 导航项内边距 */
.m-nav-link {
  padding: 1rem;
}

/* 图标与文字间距 */
.m-nav-link-icon {
  margin-right: 1rem;
  margin-left: 0.5rem;
}
```

### 2. 调整图标大小

可以通过修改以下样式来调整图标大小：

```css
.m-nav-link-icon {
  width: 40px;
  height: 40px;
}

.m-nav-link-icon .iconify {
  width: 24px;
  height: 24px;
}
```

当使用无图标模式时，导航项会自动调整布局，文字内容会占据原来图标的位置，保持整体布局的美观和一致性。

<!-- 转载/引用/使用需保留模板设计者信息 -->
<div style="text-align: center; margin-top: 2rem; padding: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <p style="color: var(--vp-c-text-2); font-size: 0.9rem;">
    本<a href="https://github.com/ZXBHELLO/Website" target="_blank" rel="noopener noreferrer">导航页模板</a>由 
    <a href="https://github.com/ZXBHELLO" target="_blank" rel="noopener noreferrer">ZXBHELLO</a> 
    制作，引用、使用、转载请保留设计者信息。
  </p>
</div>