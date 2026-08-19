---
url: /article/friend-link-guide/index.md
---
# FriendLink(友情链接) 申请指南

欢迎申请添加友情链接！以下是详细的申请方式和规范说明。

## 申请方式

### 方式一：提交 Pull Request（推荐）

1. **Fork 本仓库**
   访问 [GitHub 仓库](https://github.com/ZXBHELLO/Website)，点击右上角 "Fork" 按钮

2. **编辑 friends.md 文件**
   在你的 Fork 仓库中，找到 `docs/friends.md` 文件，点击编辑按钮

3. **添加友链信息**
   在 `list` 数组中按照以下格式添加你的信息：

```yaml
  -
    name: 你的昵称
    link: 你的网站地址
    avatar: 你的头像地址
    desc: 一句话描述
    socials:
      -
        icon: github
        link: https://github.com/你的用户名
      -
        icon: bilibili
        link: https://space.bilibili.com/你的ID
      # 可以添加更多社交平台(尽量保持在 5 个以下)
```

**支持的社交图标：**
`github`, `bilibili`, `twitter`, `youtube`, `steam`, `qq`, `wechat`, `email` 等

4. **提交修改**
   填写提交信息，然后点击 "Propose changes" 按钮

5. **创建 Pull Request**
   回到原仓库，点击 "Compare & pull request" 按钮，填写相关信息后提交

***

### 方式二：通过 Issue 申请

1. **打开 Issue 页面**
   访问仓库的 [Issues](https://github.com/ZXBHELLO/Website/issues) 页面

2. **新建 Issue**
   点击 "New issue" 按钮，选择 "友链申请" 模板

3. **填写信息**
   按照模板要求填写以下信息：
   * 网站名称
   * 网站地址
   * 头像地址
   * 网站描述
   * 社交平台链接（可选）

4. **提交 Issue**
   确认信息无误后，点击 "Submit new issue" 按钮

***

## 友链规范

::: tip 注意事项

* 网站内容需积极健康，符合法律法规
* 博客类、技术类、设计类网站优先
* 请确保网站可以正常访问
* 一旦添加，若网站长期无法访问或内容变更，友链可能被移除
  :::

## 示例

::: details 查看完整格式示例

```yaml
list:
  -
    name: pengzhanbo
    link: https://pengzhanbo.cn/
    avatar: https://pengzhanbo.cn/images/blogger-fav.png
    desc: 即使慢，驰而不息，纵会落后，纵会失败，但必须能够到达他所向的目标。
    socials:
      -
        icon: github
        link: https://github.com/pengzhanbo
      -
        icon: twitter
        link: https://twitter.com/pengzhanbo
```

:::

如果有任何问题，欢迎通过 [邮箱](mailto:zxbhello@gmail.com) 联系我~
