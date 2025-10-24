/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  {
    text: '项目',
    items: [
      { text: 'Minecraft服务器', link: '/ZakoZakoCraft/' },
      { text: 'MobLaunch', link: 'https://github.com/ZXBHELLO/MobLaunch' },
      { text: 'MC红石编辑器', link: 'https://github.com/ZXBHELLO/MinecraftRedStoneEditor-2D' }
    ],
  },
  { text: '友情链接', link: '/friends/' },
])
