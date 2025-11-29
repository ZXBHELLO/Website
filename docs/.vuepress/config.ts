/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改都会重启 vuepress 服务。
 * 部分配置项的更新没有必要重启 vuepress 服务，建议请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会被覆盖
 */


import { defineUserConfig } from 'vuepress'
// @ts-ignore
import { plumeTheme } from 'vuepress-theme-plume'
import { viteBundler } from '@vuepress/bundler-vite'
// 按需引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'ZakoWeb',
  description: '杂鱼文档/ZXBHELLO的博客与文章',

  head: [
    // 配置站点图标
    ['link', { rel: 'icon', type: 'image/png', href: '/image.png' }],
    // 添加 Iconify 支持
    ['script', { src: 'https://code.iconify.design/2/2.1.2/iconify.min.js', async: true }]
  ],

  // 开发服务器配置
  port: 3000, // 默认端口为 8080，此处更改为 3000 以避免与本地其他服务（如前端开发服务器）冲突，便于维护
  host: '0.0.0.0',

  bundler: viteBundler({
    viteOptions: {
      plugins: [
        AutoImport({
          // 自动导入 Element Plus 的 API（如 ElMessage、ElMessageBox）
          resolvers: [ElementPlusResolver()],
          // 生成类型声明文件（TS 项目必需，避免语法报错）
          dts: '.vuepress/auto-imports.d.ts',
          // 自动导入 Vue 核心 API（如 ref、watch，无需手动 import）
          imports: ['vue'],
        }),
        Components({
          // 自动导入 Element Plus 的组件（如 ElButton、ElTable）
          resolvers: [ElementPlusResolver({
            importStyle: 'css'
          })],
          // 生成组件声明文件
          dts: '.vuepress/components.d.ts',
          // 扫描自定义组件目录（Plume 自动注册该目录下的组件）
          dirs: ['.vuepress/components'],
          // 允许在 MD 文件中直接使用组件
          extensions: ['vue'],
        })
      ]
    }
  }),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    // @ts-ignore
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    hostname: 'https://www.zakozako.cc',


    /* 文档仓库配置，用于 editLink */
    docsRepo: 'https://github.com/ZXBHELLO/Website',
    docsDir: 'docs',
    docsBranch: 'main',

    /* 页内信息 */
    editLink: true,
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    contributors: {
      mode: 'block',
    },
    changelog: true,
    copyright: 'CC-BY-NC-SA-4.0',

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/basic/#cache
     */
    cache: 'filesystem',

    /**
     * 为 markdown 文件自动添加 frontmatter 配置
     * @see https://theme-plume.vuejs.press/config/basic/#autofrontmatter
     */
    // autoFrontmatter: {
    //   permalink: true,  // 是否生成永久链接
    //   createTime: true, // 是否生成创建时间
    //   title: true,      // 是否生成标题
    // },

    /* 本地搜索, 默认启用 */
    search: { provider: 'local' },

    /**
     * Algolia DocSearch
     * 启用此搜索需要将 本地搜索 search 设置为 false
     * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
     */
    // search: {
    //   provider: 'algolia',
    //   appId: '',
    //   apiKey: '',
    //   indexName: '',
    // },

    /**
     * Shiki 代码高亮
     * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
     */
    // codeHighlighter: {
    //   twoslash: true, // 启用 twoslash
    //   whitespace: true, // 启用 空格/Tab 高亮
    //   lineNumbers: true, // 启用行号
    // },

    /* 文章字数统计、阅读时间，设置为 false 则禁用 */
    // readingTime: true,

    /**
     * markdown
     * @see https://theme-plume.vuejs.press/config/markdown/
     */
    markdown: {
      abbr: true,         // 启用缩写语法  *[HTML]: Hyper Text Markup Language
      annotation: true,   // 启用注解语法  [+label]: content
      plot: true,         // 启用隐秘文本语法 !!xxxx!! （默认隐藏，点击后显示）
      pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
      codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
      icon: {
        provider: 'iconify'  // 启用内置图标语法  ::icon-name::
      },
      table: true,        // 启用表格增强容器语法 ::: table （支持表头分组等增强功能）
      demo: true,         // 启用 demo 容器  ::: demo （支持代码演示）
      math: {
        type: 'katex'     // 使用 KaTeX 渲染数学公式
      },
      chartjs: true,      // 启用 chart.js 图表支持
      echarts: true,      // 启用 ECharts 图表支持
      // artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      // audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      // replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
      // jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      // npmTo: true,        // 启用 npm-to 容器  ::: npm-to （显示 npm、yarn、pnpm 安装命令）
      // repl: {             // 启用 代码演示容器
      //   go: true,         // ::: go-repl （Go 语言在线运行环境）
      //   rust: true,       // ::: rust-repl （Rust 语言在线运行环境）
      //   kotlin: true,     // ::: kotlin-repl （Kotlin 语言在线运行环境）
      //   python: true,     // ::: python-repl （Python 语言在线运行环境）
      // },
      // mermaid: true,      // 启用 mermaid 流程图、时序图等图表支持
      // flowchart: true,    // 启用 flowchart 流程图支持
      // image: {
      //   figure: true,     // 启用 figure （图片标题支持）
      //   lazyload: true,   // 启用图片懒加载 （提升页面加载性能）
      //   mark: true,       // 启用图片标记 （支持在图片上添加标记点）
      //   size: true,       // 启用图片大小 （显示图片尺寸信息）
      // },
      // include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
      // imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
    },

    /**
     * 水印
     * @see https://theme-plume.vuejs.press/guide/features/watermark/
     */
    // watermark: true,

    /**
     * 评论 comments
     * @see https://theme-plume.vuejs.press/guide/features/comments/
     */
    comment: {
      provider: 'Waline', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      comment: true,
      // Waline 配置
      serverURL: 'https://waline.zakozako.cc',
      locales: {
        'zh-CN': {
          placeholder: '欢迎留言分享你的想法...'
        }
      },
      emoji: [
        '//unpkg.com/@waline/emojis@1.1.0/weibo',
        '//unpkg.com/@waline/emojis@1.1.0/alus',
        '//unpkg.com/@waline/emojis@1.1.0/bilibili',
        '//unpkg.com/@waline/emojis@1.1.0/qq',
        '//unpkg.com/@waline/emojis@1.1.0/tieba',
        '//unpkg.com/@waline/emojis@1.1.0/tw-emoji'
      ],
      meta: ['nick', 'mail', 'link'],
      requiredMeta: ['nick'],
      wordLimit: 0,
      pageSize: 10,
    },

    /**
     * 资源链接替换
     * @see https://theme-plume.vuejs.press/guide/features/replace-assets/
     */
    // replaceAssets: 'https://cdn.example.com',

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},

    /**
     * llms.txt 插件
     * @see https://theme-plume.vuejs.press/config/plugins/llmstxt/
     */
    llmstxt: true,
  }),
})