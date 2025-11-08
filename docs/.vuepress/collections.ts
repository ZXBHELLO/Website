/**
 * @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。
 *
 * Collections 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 请注意，你应该先在这里配置好 Collections，然后再启动 vuepress，主题会在启动 vuepress 时，
 * 读取这里配置的 Collections，然后在与 Collection 相关的 Markdown 文件中，自动生成 permalink。
 *
 * collection 的  type 为 `post` 时，表示为 文档列表类型（即没有侧边导航栏，有文档列表页）
 * 可用于实现如 博客、专栏 等以文章列表聚合形式的文档集合 （内容相对碎片化的）
 *
 * collection 的 type 为 `doc` 时，表示为文档类型（即有侧边导航栏）
 * 可用于实现如 笔记、知识库、文档等以侧边导航栏形式的文档集合 （内容强关联、成体系的）
 * 如果发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
 * 是否是以对应的 Collection 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `collection.link`
 * 的前缀是否匹配来决定。
 */

/**
 * 在受支持的 IDE 中会智能提示配置项。
 *
 * - `defineCollections` 是用于定义 collection 集合的帮助函数
 * - `defineCollection` 是用于定义单个 collection 配置的帮助函数
 *
 * 通过 `defineCollection` 定义的 collection 配置，应该填入 `defineCollections` 中
 */
import { defineCollection, defineCollections } from 'vuepress-theme-plume'

const blog = defineCollection({
  // post 类型，这里用于实现 博客功能
  type: 'post',
  // 文档集合所在目录，相对于 `docs`
  dir: 'blog',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'Blog',
  // 文章列表页的链接，如果 `linkPrefix` 未定义，它也将作为 相关的文章的 permalink 的前缀
  link: '/blog/',
  // 启用标签页
  tags: true,
  // 启用归档页
  archives: true,
  // 启用分类页
  categories: true,
  //   linkPrefix: '/article/', // 相关文章的链接前缀
  //   postList: true, // 是否启用文章列表页
  //   postCover: 'right', // 文章封面位置
  //   pagination: 15, // 每页显示文章数量
})

const ZakoZakoCraft = defineCollection({
  // doc 类型，该类型带有侧边栏
  type: 'doc',
  // 文档集合所在目录，相对于 `docs`
  dir: 'ZakoZakoCraft',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `linkPrefix` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `linkPrefix` 开头
  linkPrefix: '/ZakoZakoCraft/',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'ZakoZakoCraft Docs',
  // 手动配置侧边栏结构
  sidebar: [
    '',
    {
      text: '从此处开始',
      link: '从此处开始/',
      prefix: '从此处开始/',
      items: [
        '加入服务器',
        '服务器规则',
        '常见问题',
        '名人堂',
        '封神榜'
      ]
    },
    {
      text: '休闲生存服',
      link: '休闲生存服/',
      prefix: '休闲生存服/',
      items: [
        '领地系统',
        '工会系统',
        '经济功能',
        '实用功能',
        '特色配方',
        '装饰功能'
      ],
      collapsed: true
    },
    {
      text: '实验创造服',
      link: '实验创造服/',
      prefix: '实验创造服/',
      items: [
        'Carpet地毯',
        'Axiom公理'
      ],
      collapsed: true
    },
    {
      text: '建筑创造服',
      link: '建筑创造服/',
      prefix: '建筑创造服/',
      items: [
        '地皮系统',
        'Axiom公理',
        '创世神'
      ],
      collapsed: true
    },
    {
      text: '娱乐游戏服',
      link: '娱乐游戏服/',
      prefix: '娱乐游戏服/',
      items: [
        ''
      ],
      collapsed: true
    },
    {
      text: '先行测试服',
      link: '先行测试服/',
      prefix: '先行测试服/',
      items: [
        ''
      ],
      collapsed: true
    },
    {
      text: '测试功能',
      link: '测试功能/',
      prefix: '测试功能/',
      items: [
        '通过虚拟局域网加入服务器',
      ],
      collapsed: true
    }
  ],
  // 根据文件结构自动生成侧边栏
  // sidebar: 'auto',
})

const MCMMO = defineCollection({
  // doc 类型，该类型带有侧边栏
  type: 'doc',
  // 文档集合所在目录，相对于 `docs`
  dir: 'MCMMO',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `linkPrefix` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `linkPrefix` 开头
  linkPrefix: '/mcmmo/',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'MCMMO插件文档',
  // 手动配置侧边栏结构
  sidebar: [
    '',
    {
      text: '玩家指南',
      prefix: '玩家指南/',
      items: [
        '基础介绍',
        '采集技能',
        '战斗技能',
        '生产技能',
        '玩家指令'
      ],
      collapsed:false
    },
    {
      text: '服主指南',
      prefix: '服主指南/',
      items: [
        '安装指南',
        '权限管理',
        '高级配置',
        '管理指令'
      ],
      collapsed:false
    }
  ],
  // 根据文件结构自动生成侧边栏
  // sidebar: 'auto',
})

const Carpet = defineCollection({
  // doc 类型，该类型带有侧边栏
  type: 'doc',
  // 文档集合所在目录，相对于 `docs`
  dir: 'Carpet',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `linkPrefix` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `linkPrefix` 开头
  linkPrefix: '/carpet/',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'Carpet模组文档',
  // 手动配置侧边栏结构
  sidebar: [
    '',
    {
      text: '原版Carpet',
      prefix: '原版Carpet/',
      items: [
        '基础介绍',
        '规则分类',
        '指令'
      ],
      collapsed:false
    },
    {
      text: '附属模组',
      prefix: '附属模组/',
      items: [
        'Carpet Extra',
        'Carpet TIS Addition',
        '其他常用附属'
      ],
      collapsed:false
    }
  ],
  // 根据文件结构自动生成侧边栏
  // sidebar: 'auto',
})

/**
 * 导出所有的 collections
 * (blog 为博客示例，如果不需要博客功能，请删除)
 * (demoDoc 为参考示例，如果不需要它，请删除)
 */


export default defineCollections([
  blog,
  ZakoZakoCraft,
  MCMMO,
  Carpet,
])