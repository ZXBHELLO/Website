/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { isCallChain } from 'typescript'
import { defineNavbarConfig } from 'vuepress-theme-plume'

/**
 * 定义网站的导航栏配置
 * 
 * @returns 导航栏配置对象，包含网站的主要导航项
 */
export default defineNavbarConfig([
  { text: '主页', icon: 'line-md:home-md-twotone', link: '/' },
  { text: '导航', icon: 'line-md:compass-twotone', link: '/nav/' },
  {
    text: '博客',
    icon: 'line-md:text-box-multiple-twotone',
    items: [
      { text: '文章', link: '/article/' },
      { text: '标签', link: '/article/tags/' },
      { text: '分类', link: '/article/categories/' },
      { text: '归档', link: '/article/archives/' },
    ]
  },
  {
    text: '更多',
    icon: 'line-md:plus-circle-twotone',
    items: [
      { text: '关于站主', link: '/article/about-me/', icon: 'material-symbols:emoji-people-rounded' },
      { text: '友情链接', link: '/friends/', icon: 'carbon:friendship' },
      { text: '留言板', link: '/comment/', icon: 'line-md:chat' },
    ]
  },
])