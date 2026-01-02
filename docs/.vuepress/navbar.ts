/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */


// @ts-ignore
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
      { text: '文章', link: '/article/', icon: 'stash:article' },
      { text: '标签', link: '/article/tags/', icon: 'mingcute:tag-2-line' },
      { text: '分类', link: '/article/categories/', icon: 'line-md:folder-twotone' },
      { text: '归档', link: '/article/archives/', icon: 'line-md:calendar-twotone' },
    ]
  },
  {
    text: '应用',
    icon: 'line-md:grid-3-filled',
    items: [
      { text: 'OpenList云盘', link: '/app/Openlist/', icon: 'arcticons:baidu-netdisk' },
      { text: '离线图片压缩', link: '/app/Offline_Image_Compression/', icon: 'line-md:cloud-alt-download-loop' },
      { text: '2D红石编辑器', link: '/app/rseditor/', icon: 'fluent:calendar-edit-32-regular' },
      { text: '在线Markdown编辑器', link: '/app/Markdown_Live_Preview_Editor/', icon: 'la:markdown' },
      { text: '在线HTML编辑器', link: '/app/HTML_CSS_JS_Live_Preview_Editor/', icon: 'dashicons:html' },
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