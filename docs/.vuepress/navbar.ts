/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { isCallChain } from 'typescript'
import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '主页', icon: 'line-md:home-md-twotone', link: '/' },
  { text: '导航', icon: 'line-md:compass-twotone', link: '/nav/' },
  {
    text: '博客',
    icon: 'line-md:text-box-multiple-twotone',
    items: [
      { text: '文章', link: '/blog/' },
      { text: '标签', link: '/blog/tags/' },
      { text: '归档', link: '/blog/archives/' },
    ]
  },
  { 
    text: '更多',
    icon: 'line-md:plus-circle-twotone',
    items: [
      { text: '关于站主', link: '/about/', icon: 'material-symbols:emoji-people-rounded' },
      { text: '友情链接', link: '/friends/', icon: 'carbon:friendship' },
    ] },
])