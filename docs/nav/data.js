export const navData = [
  {
    category: '文档教程',
    items: [
      {
        id: 'zakozakocraft',
        title: '杂鱼服文档',
        description: '高版本公益群组服务器',
        url: '/ZakoZakoCraft/',
        iconType: 'iconify',
        icon: 'material-symbols:article-outline',
        showIconBorder: true,
      },
      {
        id: 'mcmmo',
        title: 'MCMMO插件文档',
        description: '为Minecraft添加RPG元素的插件',
        url: '/mcmmo/',
        iconType: 'image',
        icon: '/assets/nav/mcmmo.png',
        showIconBorder: false,
      },
      {
        id: 'carpet',
        title: 'Carpet模组文档',
        description: 'Minecraft功能增强模组',
        url: '/Carpet/',
        iconType: 'image',
        icon: '/assets/nav/carpet.png',
        showIconBorder: false,
      },
      {
        id: 'nav-doc',
        title: '使用同款导航页',
        description: '为你的Vuepress站点添加导航',
        url: '/nav/guide/',
        iconType: 'iconify',
        icon: 'material-symbols:article-outline',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '插件模组',
    items: [
      {
        id: 'moblaunch',
        title: 'MobLaunch',
        description: 'MC实体投掷插件，支持Folia',
        url: 'https://github.com/ZXBHELLO/MobLaunch',
        iconType: 'iconify',
        icon: 'fluent:box-multiple-20-filled',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '软件项目',
    items: [
      {
        id: 'redstone-editor',
        title: 'MC 红石编辑器',
        description: '在线红石机械设计器',
        url: '/app/rseditor/',
        iconType: 'iconify',
        icon: 'fluent:calendar-edit-32-regular',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '配置文件',
    items: [
      {
        id: 'flight-charge-menu',
        title: '飞行充能菜单',
        description: '适用于Trmenu的配置文件',
        url: 'https://github.com/ZXBHELLO/Website',
        iconType: 'iconify',
        icon: 'line-md:document-code',
        showIconBorder: true,
      },
      {
        id: 'site-template',
        title: '站点生成器模板',
        description: '本文档的源代码',
        url: 'https://github.com/ZXBHELLO/Website',
        iconType: 'image',
        icon: '/plume.svg',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '导航示例',
    items: [
      {
        //不填ID好像也可以?
        title: 'iconfiy图标示例',
        description: '支持iconfiy图标',
        url: 'https://github.com/ZXBHELLO/Website',
        iconType: 'iconify',
        icon: 'line-md:compass-filled-loop',
        showIconBorder: true,
      },
      {
        //不填ID好像也可以?
        title: '没有描述的示例',
        // description: '没有描述',
        url: 'https://github.com/ZXBHELLO/Website',
        iconType: 'iconify',
        icon: 'line-md:emoji-smile-wink',
        showIconBorder: true,
      },
      {
        //不填ID好像也可以?
        title: '没有图标边框的示例',
        description: '这个示例图标不显示边框',
        url: 'https://github.com/ZXBHELLO/Website',
        iconType: 'iconify',
        icon: 'line-md:emoji-smile-wink',
        showIconBorder: false,  //←这里禁用了
      },
      {
        title: '没有图标的示例',
        description: '这个示例不显示图标',
        url: 'https://github.com/ZXBHELLO/Website',
        icon: 'none',  //不写这一行也行
      },
    ]
  },
  {
    category: 'Runtime',
    items: [
      {
        title: 'Node',
        url: 'https://nodejs.org/',
        iconType: 'iconify',
        icon: 'logos:nodejs-icon',
        showIconBorder: true,
      },
      {
        title: 'Deno',
        url: 'https://deno.land/',
        iconType: 'iconify',
        icon: 'logos:deno',
        showIconBorder: true,
      },
      {
        title: 'Bun',
        url: 'https://bun.sh/',
        iconType: 'iconify',
        icon: 'logos:bun',
        showIconBorder: true,
      },
    ]
  },
  {
    category: 'Registry',
    items: [
      {
        title: 'npm',
        url: 'https://www.npmjs.com/',
        iconType: 'iconify',
        icon: 'logos:npm',
        showIconBorder: true,
      },
      {
        title: 'yarn',
        url: 'https://yarnpkg.com/',
        iconType: 'iconify',
        icon: 'logos:yarn',
        showIconBorder: true,
      },
      {
        title: 'pnpm',
        url: 'https://pnpm.io/',
        iconType: 'iconify',
        icon: 'logos:pnpm',
        showIconBorder: true,
      },
      {
        title: 'jsr',
        url: 'https://jsr.io/',
        iconType: 'image',
        icon: 'https://jsr.io/logo-square.svg',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '库/框架',
    items: [
      {
        title: 'React',
        url: 'https://zh-hans.react.dev/',
        iconType: 'iconify',
        icon: 'logos:react',
        showIconBorder: true,
      },
      {
        title: 'Vue',
        url: 'https://cn.vuejs.org/',
        iconType: 'iconify',
        icon: 'logos:vue',
        showIconBorder: true,
      },
      {
        title: 'Angular',
        url: 'https://angular.dev/',
        iconType: 'iconify',
        icon: 'logos:angular-icon',
        showIconBorder: true,
      },
      {
        title: 'Preact',
        url: 'https://preactjs.com/',
        iconType: 'iconify',
        icon: 'logos:preact',
        showIconBorder: true,
      },
      {
        title: 'Svelte',
        url: 'https://svelte.dev/',
        iconType: 'iconify',
        icon: 'logos:svelte-icon',
        showIconBorder: true,
      },
      {
        title: 'Solid',
        url: 'https://www.solidjs.com/',
        iconType: 'iconify',
        icon: 'logos:solidjs-icon',
        showIconBorder: true,
      },
      {
        title: 'Astro',
        url: 'https://astro.build/',
        iconType: 'iconify',
        icon: 'logos:astro-icon',
        showIconBorder: true,
      },
      {
        title: 'Lit',
        url: 'https://lit.dev/',
        iconType: 'iconify',
        icon: 'logos:lit-icon',
        showIconBorder: true,
      },
      {
        title: 'Inferno',
        url: 'https://infernojs.org/',
        iconType: 'iconify',
        icon: 'logos:inferno',
        showIconBorder: true,
      },
      {
        title: 'Alpine',
        url: 'https://alpinejs.dev/',
        iconType: 'iconify',
        icon: 'logos:alpinejs-icon',
        showIconBorder: true,
      },
      {
        title: 'Qwik',
        url: 'https://qwik.dev/',
        iconType: 'iconify',
        icon: 'logos:qwik-icon',
        showIconBorder: true,
      },
      {
        title: 'Cycle.js',
        url: 'https://cycle.js.org/',
        iconType: 'iconify',
        icon: 'logos:cyclejs',
        showIconBorder: true,
      },
      {
        title: 'Marko',
        url: 'https://markojs.com/',
        iconType: 'iconify',
        icon: 'logos:marko',
        showIconBorder: true,
      },
      {
        title: 'Nuejs',
        url: 'https://nuejs.org/',
        iconType: 'image',
        icon: 'https://nuejs.org/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'Htmx',
        url: 'https://htmx.org/',
        iconType: 'iconify',
        icon: 'ph:code-bold',
        showIconBorder: true,
      },
      {
        title: 'Yew',
        url: 'https://yew.rs/',
        iconType: 'image',
        icon: 'https://yew.rs/img/logo.svg',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '框架',
    items: [
      {
        title: 'Nuxt.js',
        url: 'https://nuxtjs.org/',
        iconType: 'iconify',
        icon: 'logos:nuxt-icon',
        showIconBorder: true,
      },
      {
        title: 'Next.js',
        url: 'https://nextjs.org/',
        iconType: 'iconify',
        icon: 'logos:nextjs-icon',
        showIconBorder: true,
      },
      {
        title: 'SvelteKit',
        url: 'https://kit.svelte.dev/',
        iconType: 'iconify',
        icon: 'logos:svelte-icon',
        showIconBorder: true,
      },
      {
        title: 'SolidStart',
        url: 'https://start.solidjs.com/',
        iconType: 'iconify',
        icon: 'logos:solidjs-icon',
        showIconBorder: true,
      },
    ]
  },
  {
    category: 'Web框架',
    items: [
      {
        title: 'express',
        url: 'https://expressjs.com/',
        iconType: 'iconify',
        icon: 'logos:express',
        showIconBorder: true,
      },
      {
        title: 'koa',
        url: 'https://koajs.com/',
        iconType: 'iconify',
        icon: 'logos:koa',
        showIconBorder: true,
      },
      {
        title: 'fastify',
        url: 'https://fastify.dev/',
        iconType: 'iconify',
        icon: 'logos:fastify-icon',
        showIconBorder: true,
      },
      {
        title: 'Tiny Http',
        url: 'https://tinyhttp.v1rtl.site/',
        iconType: 'image',
        icon: 'https://tinyhttp.v1rtl.site/favicon.png',
        showIconBorder: true,
      },
      {
        title: 'h3',
        url: 'https://h3.unjs.io/',
        iconType: 'image',
        icon: 'https://h3.unjs.io/icon.svg',
        showIconBorder: true,
      },
      {
        title: 'Nitro',
        url: 'https://nitro.build/',
        iconType: 'image',
        icon: 'https://nitro.build/icon.svg',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '企业级框架',
    items: [
      {
        title: 'Nest.js',
        url: 'https://nestjs.com/',
        iconType: 'iconify',
        icon: 'logos:nestjs',
        showIconBorder: true,
      },
      {
        title: 'loopback',
        url: 'https://loopback.io/',
        iconType: 'iconify',
        icon: 'logos:loopback-icon',
        showIconBorder: true,
      },
      {
        title: 'Egg',
        url: 'https://eggjs.org/',
        iconType: 'image',
        icon: 'https://www.eggjs.org/logo.svg',
        showIconBorder: true,
      },
      {
        title: 'Midway',
        url: 'https://midwayjs.org/',
        iconType: 'image',
        icon: 'https://midwayjs.org/img/logo.svg',
        showIconBorder: true,
      },
      {
        title: 'Thinkjs',
        url: 'https://thinkjs.org/',
        iconType: 'image',
        icon: 'https://thinkjs.org/static/img/new/logo.png',
        showIconBorder: true,
      },
      {
        title: 'Adonis',
        url: 'https://adonisjs.com/',
        iconType: 'image',
        icon: 'https://adonisjs.com/icons/favicon-32x32.png',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '微前端',
    items: [
      {
        title: 'micro-frontends',
        url: 'https://swearer23.github.io/micro-frontends/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'single-spa',
        url: 'https://single-spa.js.org/',
        iconType: 'image',
        icon: 'https://single-spa.js.org/img/single-spa-mark-magenta.svg',
        showIconBorder: true,
      },
      {
        title: 'qiankun',
        url: 'https://qiankun.umijs.org/',
        iconType: 'image',
        icon: 'https://gw.alipayobjects.com/mdn/rms_655822/afts/img/A*4sIUQpcos_gAAAAAAAAAAAAAARQnAQ',
        showIconBorder: true,
      },
      {
        title: 'Garfish',
        url: 'https://www.garfishjs.org/',
        iconType: 'image',
        icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dhozeh7vhpebvog/open-garfish/icons/icon.png',
        showIconBorder: true,
      },
      {
        title: 'icestark',
        url: 'https://micro-frontends.ice.work/',
        iconType: 'image',
        icon: 'https://micro-frontends.ice.work/img/logo.png',
        showIconBorder: true,
      },
      {
        title: '无界',
        url: 'https://wujie-micro.github.io/doc/',
        iconType: 'image',
        icon: 'https://wujie-micro.github.io/doc/wujie.svg',
        showIconBorder: true,
      },
      {
        title: 'awesome micro frontends',
        url: 'https://github.com/rajasegar/awesome-micro-frontends',
        iconType: 'iconify',
        icon: 'logos:awesome',
        showIconBorder: true,
      },
    ]
  },
  {
    category: 'CSS',
    items: [
      {
        title: 'PostCSS',
        url: 'https://postcss.org/',
        iconType: 'iconify',
        icon: 'logos:postcss',
        showIconBorder: true,
      },
      {
        title: 'SASS',
        url: 'https://sass-lang.com/',
        iconType: 'iconify',
        icon: 'logos:sass',
        showIconBorder: true,
      },
      {
        title: 'Less',
        url: 'https://lesscss.org/',
        iconType: 'iconify',
        icon: 'logos:less',
        showIconBorder: true,
      },
      {
        title: 'Stylus',
        url: 'https://stylus-lang.com/',
        iconType: 'iconify',
        icon: 'logos:stylus',
        showIconBorder: true,
      },
      {
        title: 'PandaCSS',
        url: 'https://panda-css.com/',
        iconType: 'iconify',
        icon: 'logos:pandacss-icon',
        showIconBorder: true,
      },
      {
        title: 'TailwindCSS',
        url: 'https://tailwindcss.com/',
        iconType: 'iconify',
        icon: 'logos:tailwindcss-icon',
        showIconBorder: true,
      },
      {
        title: 'WindiCSS',
        url: 'https://windicss.org/',
        iconType: 'iconify',
        icon: 'logos:windi-css',
        showIconBorder: true,
      },
      {
        title: 'unocss',
        url: 'https://uno.antfu.me/',
        iconType: 'iconify',
        icon: 'logos:unocss',
        showIconBorder: true,
      },
      {
        title: 'Lightning CSS',
        url: 'https://lightningcss.dev/',
        iconType: 'image',
        icon: 'https://lightningcss.dev/favicon.3aabf677.svg',
        showIconBorder: true,
      },
    ]
  },
  {
    category: 'Vue UI库',
    items: [
      {
        title: 'Element Plus',
        url: 'https://element-plus.org/',
        iconType: 'iconify',
        icon: 'logos:element',
        showIconBorder: true,
      },
      {
        title: 'Naive UI',
        url: 'https://www.naiveui.com/',
        iconType: 'iconify',
        icon: 'logos:naiveui',
        showIconBorder: true,
      },
      {
        title: 'Vant UI',
        url: 'https://vant-ui.github.io/vant/',
        iconType: 'image',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        showIconBorder: true,
      },
      {
        title: 'vuetify',
        url: 'https://vuetifyjs.com/',
        iconType: 'iconify',
        icon: 'logos:vuetifyjs',
        showIconBorder: true,
      },
      {
        title: 'Radix Vue',
        url: 'https://www.radix-vue.com/',
        iconType: 'image',
        icon: 'https://www.radix-vue.com/logo.svg',
        showIconBorder: true,
      },
      {
        title: 'Shadcn Vue',
        url: 'https://www.shadcn-vue.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'Vue 工具',
    items: [
      {
        title: 'Vue Use',
        url: 'https://vueuse.org/',
        iconType: 'iconify',
        icon: 'logos:vueuse',
        showIconBorder: true,
      },
      {
        title: 'Pinia',
        url: 'https://pinia.vuejs.org/',
        iconType: 'iconify',
        icon: 'logos:pinia',
        showIconBorder: true,
      },
      {
        title: 'Vue Router',
        url: 'https://router.vuejs.org/',
        iconType: 'iconify',
        icon: 'logos:vue',
        showIconBorder: true,
      },
    ]
  },
  {
    category: 'React UI库',
    items: [
      {
        title: 'Ant Design',
        url: 'https://ant.design/',
        iconType: 'iconify',
        icon: 'logos:ant-design',
        showIconBorder: true,
      },
      {
        title: 'Material UI',
        url: 'https://mui.com/',
        iconType: 'iconify',
        icon: 'logos:material-ui',
        showIconBorder: true,
      },
      {
        title: 'Shadcn UI',
        url: 'https://ui.shadcn.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'Chakra UI',
        url: 'https://v2.chakra-ui.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'React 状态管理',
    items: [
      {
        title: 'Redux',
        url: 'https://redux.js.org/',
        iconType: 'iconify',
        icon: 'logos:redux',
        showIconBorder: true,
      },
      {
        title: 'Recoil',
        url: 'https://recoiljs.org/',
        iconType: 'iconify',
        icon: 'logos:recoil-icon',
        showIconBorder: true,
      },
      {
        title: 'MobX',
        url: 'https://mobx.js.org/',
        iconType: 'iconify',
        icon: 'logos:mobx',
        showIconBorder: true,
      },
      {
        title: 'Zustand',
        url: 'https://zustand-demo.pmnd.rs/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'React 工具',
    items: [
      {
        title: 'React Use',
        url: 'http://streamich.github.io/react-use',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'React Hooks Form',
        url: 'https://react-hook-form.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'a-hooks',
        url: 'https://ahooks.js.org/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'swr',
        url: 'https://swr.vercel.app/',
        iconType: 'iconify',
        icon: 'logos:swr',
        showIconBorder: true,
      },
      {
        title: 'umijs',
        url: 'https://umijs.org/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'formily',
        url: 'https://formilyjs.org/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'React Dnd',
        url: 'https://react-dnd.github.io/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'React CSS方案',
    items: [
      {
        title: 'styled-components',
        url: 'https://styled-components.com/',
        iconType: 'image',
        icon: 'https://styled-components.com/favicon.png',
        showIconBorder: true,
      },
      {
        title: 'emotion',
        url: 'https://emotion.sh/docs/introduction',
        iconType: 'image',
        icon: 'https://emotion.sh/logo-96x96.png',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '小程序',
    items: [
      {
        title: 'uni app',
        url: 'https://uniapp.dcloud.io/',
        iconType: 'image',
        icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png',
        showIconBorder: true,
      },
      {
        title: 'Taro',
        url: 'https://taro.zone/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: '图标',
    items: [
      {
        title: 'XIcons',
        url: 'https://www.xicons.org/',
        iconType: 'image',
        icon: 'https://www.xicons.org/favicon.svg',
        showIconBorder: true,
      },
      {
        title: 'Iconify',
        url: 'https://icon-sets.iconify.design/',
        iconType: 'image',
        icon: 'https://icon-sets.iconify.design/favicon.svg',
        showIconBorder: true,
      },
      {
        title: 'IconPark',
        url: 'https://iconpark.oceanengine.com/',
        iconType: 'image',
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        showIconBorder: true,
      },
      {
        title: 'Lucide Icon',
        url: 'https://lucide.dev/',
        iconType: 'image',
        icon: 'https://lucide.dev/logo.light.svg',
        showIconBorder: true,
      },
      {
        title: 'Simple Icons',
        url: 'https://simpleicons.org/',
        iconType: 'image',
        icon: 'https://simpleicons.org/logo-fc26614b48c3f1fd.svg',
        showIconBorder: true,
      },
      {
        title: 'Font Awesome',
        url: 'https://fontawesome.com/',
        iconType: 'image',
        icon: 'https://fontawesome.com/images/favicon/icon.svg',
        showIconBorder: true,
      },
      {
        title: 'Bootstrap Icons',
        url: 'https://icons.getbootstrap.com/',
        iconType: 'image',
        icon: 'https://icons.getbootstrap.com/assets/img/favicons/favicon-32x32.png',
        showIconBorder: true,
      },
      {
        title: 'Iconfont',
        url: 'https://www.iconfont.cn/',
        iconType: 'image',
        icon: 'https://www.iconfont.cn/favicon.ico',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '素材',
    items: [
      {
        title: 'Unsplash',
        url: 'https://unsplash.com/',
        iconType: 'image',
        icon: 'https://unsplash.com/favicon-32x32.png',
        showIconBorder: true,
      },
      {
        title: 'Many Pixels',
        url: 'https://www.manypixels.co/gallery',
        iconType: 'image',
        icon: 'https://cdn.prod.website-files.com/63a9cb71c629474d4ae334b9/64a5f701714b5fe13a08253f_favicons%201%20(2).png',
        showIconBorder: true,
      },
      {
        title: 'Undraw',
        url: 'https://undraw.co/illustrations',
        iconType: 'image',
        icon: 'https://undraw.co/favicon.ico',
        showIconBorder: true,
      },
      {
        title: '搜图导航',
        url: 'https://www.91sotu.com/',
        iconType: 'image',
        icon: 'https://www.91sotu.com/favicon.ico',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '桌面应用开发',
    items: [
      {
        title: 'Electron',
        url: 'https://electronjs.org/',
        description: '内置 node + chromium，打包后比较重',
        iconType: 'iconify',
        icon: 'logos:electron',
        showIconBorder: true,
      },
      {
        title: 'Tauri',
        url: 'https://tauri.app/',
        description: 'rust + 系统webview 2, 打包后很轻',
        iconType: 'iconify',
        icon: 'logos:tauri',
        showIconBorder: true,
      },
      {
        title: 'neutralino',
        url: 'https://neutralino.js.org/',
        description: '专注于轻量级 桌面应用',
        iconType: 'image',
        icon: 'https://neutralino.js.org/img/logo.png',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '跨平台开发',
    items: [
      {
        title: 'React Native',
        url: 'https://reactnative.dev/',
        iconType: 'iconify',
        icon: 'logos:react',
        showIconBorder: true,
      },
      {
        title: 'Flutter',
        url: 'https://flutter.dev/',
        iconType: 'iconify',
        icon: 'logos:flutter',
        showIconBorder: true,
      },
      {
        title: 'NativeScript',
        url: 'https://nativescript.org/',
        iconType: 'iconify',
        icon: 'logos:nativescript',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '构建工具',
    items: [
      {
        title: 'vite',
        url: 'https://vitejs.dev/',
        iconType: 'iconify',
        icon: 'logos:vitejs',
        showIconBorder: true,
      },
      {
        title: 'webpack',
        url: 'https://webpack.js.org/',
        iconType: 'iconify',
        icon: 'logos:webpack',
        showIconBorder: true,
      },
      {
        title: 'parcel',
        url: 'https://parceljs.org/',
        iconType: 'iconify',
        icon: 'logos:parcel-icon',
        showIconBorder: true,
      },
      {
        title: 'rollup',
        url: 'https://rollupjs.org/',
        iconType: 'iconify',
        icon: 'logos:rollup',
        showIconBorder: true,
      },
      {
        title: 'esbuild',
        url: 'https://esbuild.github.io/',
        iconType: 'iconify',
        icon: 'logos:esbuild',
        showIconBorder: true,
      },
      {
        title: 'tsup',
        url: 'https://tsup.egoist.dev/',
        iconType: 'iconify',
        icon: 'logos:typescript-icon',
        showIconBorder: true,
      },
      {
        title: 'unbuild',
        url: 'https://github.com/unjs/unbuild',
        iconType: 'iconify',
        icon: 'unjs:unbuild',
        showIconBorder: true,
      },
      {
        title: 'turbo',
        url: 'https://turbo.build/',
        iconType: 'iconify',
        icon: 'logos:turbopack-icon',
        showIconBorder: true,
      },
      {
        title: 'rolldown',
        url: 'https://rolldown.rs/',
        iconType: 'image',
        icon: 'https://rolldown.rs/lightning-down.svg',
        showIconBorder: true,
      },
      {
        title: 'rspack',
        url: 'https://www.rspack.dev/',
        iconType: 'image',
        icon: 'https://assets.rspack.dev/rspack/rspack-logo.svg',
        showIconBorder: true,
      },
      {
        title: 'swc',
        url: 'https://swc.rs/',
        iconType: 'iconify',
        icon: 'logos:swc',
        showIconBorder: true,
      },
      {
        title: 'farm',
        url: 'https://www.farmfe.org/',
        iconType: 'image',
        icon: 'https://www.farmfe.org/img/logo.png',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '站点生成工具',
    items: [
      {
        title: 'VitePress',
        url: 'https://vitepress.dev/',
        iconType: 'image',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        showIconBorder: true,
      },
      {
        title: 'VuePress',
        url: 'https://v2.vuepress.vuejs.org/',
        iconType: 'image',
        icon: 'https://v2.vuepress.vuejs.org/images/hero.png',
        showIconBorder: true,
      },
      {
        title: 'Docusaurus',
        url: 'https://docusaurus.io/',
        iconType: 'iconify',
        icon: 'logos:docusaurus',
        showIconBorder: true,
      },
      {
        title: 'Startlight',
        url: 'https://starlight.astro.build/',
        iconType: 'image',
        icon: 'https://starlight.astro.build/_astro/hero-star.CRrHICv4_Zc4Kge.webp',
        showIconBorder: true,
      },
      {
        title: 'Hexo',
        url: 'https://hexo.io/',
        iconType: 'iconify',
        icon: 'logos:hexo',
        showIconBorder: true,
      },
      {
        title: 'Slidev',
        url: 'https://sli.dev/',
        iconType: 'iconify',
        icon: 'logos:slidev',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '社区',
    items: [
      {
        title: 'dev.to',
        url: 'https://dev.to',
        description: '技术社区，拥有庞大的开发者用户基数，适合学习技术、分享交流、提升专业能力。',
        iconType: 'image',
        icon: 'https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png',
        showIconBorder: true,
      },
      {
        title: '思否',
        url: 'https://segmentfault.com',
        description: '中文技术问答社区',
        iconType: 'image',
        icon: 'https://static.segmentfault.com/main_site_next/9e69005a/_next/static/media/logo-b.1ef53c6e.svg',
        showIconBorder: true,
      },
      {
        title: '掘金',
        url: 'https://juejin.cn',
        description: '中文技术社区',
        iconType: 'image',
        icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg',
        showIconBorder: true,
      },
      {
        title: 'v2ex',
        url: 'https://www.v2ex.com',
        description: '中文技术社区，分享、探索',
        iconType: 'image',
        icon: 'https://www.v2ex.com/static/img/v2ex@2x.png',
        showIconBorder: true,
      },
      {
        title: 'LeetCode',
        url: 'https://leetcode.cn',
        description: '算法题库',
        iconType: 'image',
        icon: 'https://leetcode.cn/favicon.ico',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '周刊',
    items: [
      {
        title: 'Nodeweekly',
        url: 'https://nodeweekly.com/issues',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'JavaScript Weekly',
        url: 'https://javascriptweekly.com/issues',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'Frontender',
        url: 'https://frontender-ua.medium.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: '奇舞周刊',
        url: 'https://weekly.75.team/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: '博客',
    items: [
      {
        title: 'web.dev',
        url: 'https://web.dev',
        description: 'Chrome DevRel',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'Chrome Developer',
        url: 'https://developer.chrome.com',
        description: 'Chrome 团队博客',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'builder.io',
        url: 'https://builder.io',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'Git',
    items: [
      {
        title: 'Learn Git Branching',
        url: 'https://learngitbranching.js.org/?locale=zh_CN',
        description: '学习 git 分支',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: '工具',
    items: [
      {
        title: 'js 可视化执行',
        url: 'https://www.jsv9000.app',
        iconType: 'iconify',
        icon: 'logos:javascript',
        showIconBorder: true,
      },
      {
        title: 'js 性能对比',
        url: 'https://jsbench.me',
        iconType: 'iconify',
        icon: 'logos:javascript',
        showIconBorder: true,
      },
      {
        title: 'AST explorer',
        url: 'https://www.astexplorer.net',
        iconType: 'iconify',
        icon: 'logos:javascript',
        showIconBorder: true,
      },
    ]
  },
  {
    category: 'CSS工具',
    items: [
      {
        title: 'CSS 灵感',
        url: 'https://csscoco.com/inspiration/#/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'CSS Tricks',
        url: 'https://qishaoxuan.github.io/css_tricks/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'you need to know css',
        url: 'https://lhammer.cn/You-need-to-know-css/#/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: '设计工具',
    items: [
      {
        title: 'Web 安全色',
        url: 'https://www.bootcss.com/p/websafecolors/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: '渐变色',
        url: 'https://color.oulu.me/',
        iconType: 'image',
        icon: 'https://color.oulu.me/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'SVG background',
        url: 'https://www.svgbackgrounds.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'SVG 波浪背景生成',
        url: 'https://svgwave.in/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: '贝塞尔生成',
        url: 'https://easings.co/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'CSS 动画',
        url: 'https://animista.net/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'CSS Timing Function',
        url: 'https://easings.net/zh-cn',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'Color Hunt',
        url: 'https://colorhunt.co/',
        iconType: 'image',
        icon: 'https://colorhunt.co/img/colorhunt-favicon.svg?2',
        showIconBorder: true,
      },
      {
        title: 'Colordrop',
        url: 'https://colordrop.io/',
        iconType: 'image',
        icon: 'https://colordrop.io/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'Picular',
        url: 'https://picular.co/',
        iconType: 'image',
        icon: 'https://picular.co/favicon.ico',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '正则',
    items: [
      {
        title: '正则生成，图解',
        url: 'https://regex-vis.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: '正则测试',
        url: 'https://regex101.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'Shell',
    items: [
      {
        title: 'tldr',
        url: 'https://tldr.sh/',
        description: '在线帮助手册',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: '开源',
    items: [
      {
        title: 'bestofjs',
        url: 'https://bestofjs.org/',
        description: '前端开源项目最新热点趋势',
        iconType: 'image',
        icon: 'https://bestofjs.org/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'publint',
        url: 'https://publint.dev/',
        description: '检查 npm package 是否正确发布',
        iconType: 'image',
        icon: 'https://publint.dev/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'Ray',
        url: 'https://www.ray.so/',
        description: '代码 Demo 图片生成',
        iconType: 'image',
        icon: 'https://www.ray.so/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'Carbon',
        url: 'https://carbon.now.sh/',
        description: '代码 Demo 图片生成',
        iconType: 'image',
        icon: 'https://carbon.now.sh/favicon.ico',
        showIconBorder: true,
      },
      {
        title: '屏幕截图设备模型生成器',
        url: 'https://mockuphone.com/',
        description: '将屏幕截图适配到不同的设备模型中',
        iconType: 'image',
        icon: 'https://mockuphone.com/images/favicon.png',
        showIconBorder: true,
      },
      {
        title: '在线画板',
        url: 'https://excalidraw.com/',
        description: '在线画板',
        iconType: 'image',
        icon: 'https://excalidraw.com/favicon-32x32.png',
        showIconBorder: true,
      },
    ]
  },
  {
    category: '服务',
    items: [
      {
        title: 'Nginx 配置生成',
        url: 'https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'caniuse',
        url: 'https://caniuse.com/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'Test',
    items: [
      {
        title: 'storybook',
        url: 'https://storybook.js.org/',
        iconType: 'iconify',
        icon: 'logos:storybook-icon',
        showIconBorder: true,
      },
      {
        title: 'vitest',
        url: 'https://vitest.dev/',
        iconType: 'iconify',
        icon: 'logos:vitest',
        showIconBorder: true,
      },
      {
        title: 'cypress',
        url: 'https://cypress.io/',
        iconType: 'iconify',
        icon: 'logos:cypress-icon',
        showIconBorder: true,
      },
      {
        title: 'jest',
        url: 'https://jestjs.io/',
        iconType: 'iconify',
        icon: 'logos:jest',
        showIconBorder: true,
      },
      {
        title: 'mocha',
        url: 'https://mochajs.org/',
        iconType: 'iconify',
        icon: 'logos:mocha',
        showIconBorder: true,
      },
      {
        title: 'ava',
        url: 'https://avajs.dev/',
        iconType: 'iconify',
        icon: 'logos:ava',
        showIconBorder: true,
      },
      {
        title: 'karma',
        url: 'https://karma-runner.github.io/',
        iconType: 'iconify',
        icon: 'logos:karma',
        showIconBorder: true,
      },
      {
        title: 'nightwatch',
        url: 'https://nightwatchjs.org/',
        iconType: 'iconify',
        icon: 'logos:nightwatch',
        showIconBorder: true,
      },
      {
        title: 'sinon',
        url: 'https://sinonjs.org/',
        iconType: 'image',
        icon: 'https://sinonjs.org/assets/images/logo.png',
        showIconBorder: true,
      },
      {
        title: 'chai',
        url: 'https://www.chaijs.com/',
        iconType: 'iconify',
        icon: 'logos:chai',
        showIconBorder: true,
      },
      {
        title: 'tape',
        url: 'https://github.com/ljharb/tape',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'istanbul',
        url: 'https://istanbul.js.org/',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
      {
        title: 'uvu',
        url: 'https://github.com/lukeed/uvu',
        iconType: 'none',
        icon: '',
        showIconBorder: false,
      },
    ]
  },
  {
    category: 'Chart',
    items: [
      {
        title: 'Chart.js',
        url: 'https://www.chartjs.org/',
        iconType: 'image',
        icon: 'https://www.chartjs.org/img/chartjs-logo.svg',
        showIconBorder: true,
      },
      {
        title: 'ECharts',
        url: 'https://echarts.apache.org/',
        iconType: 'image',
        icon: 'https://echarts.apache.org/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'Mermaid',
        url: 'https://mermaid.js.org/',
        iconType: 'image',
        icon: 'https://mermaid.js.org/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'ApexCharts',
        url: 'https://apexcharts.com/',
        iconType: 'image',
        icon: 'https://apexcharts.com/wp-content/themes/apexcharts/img/apexcharts-logo-white-trimmed.svg',
        showIconBorder: true,
      },
      {
        title: 'visx',
        url: 'https://airbnb.io/visx',
        iconType: 'image',
        icon: 'https://airbnb.io/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'C3.js',
        url: 'http://c3js.org/',
        iconType: 'image',
        icon: 'https://c3js.org/img/favicon-74acff28.png',
        showIconBorder: true,
      },
      {
        title: 'D3',
        url: 'https://d3js.org/',
        iconType: 'image',
        icon: 'https://d3js.org/logo.svg',
        showIconBorder: true,
      },
      {
        title: 'G2',
        url: 'https://g2.antv.antgroup.com/',
        iconType: 'image',
        icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
        showIconBorder: true,
      },
      {
        title: 'G2Plot',
        url: 'https://g2plot.antv.antgroup.com/',
        iconType: 'image',
        icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
        showIconBorder: true,
      },
      {
        title: 'G6',
        url: 'https://g6.antv.antgroup.com/en',
        iconType: 'image',
        icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
        showIconBorder: true,
      },
      {
        title: 'F2',
        url: 'https://f2.antv.vision/zh',
        iconType: 'image',
        icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
        showIconBorder: true,
      },
      {
        title: 'X6',
        url: 'https://x6.antv.antgroup.com/en',
        iconType: 'image',
        icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
        showIconBorder: true,
      },
    ]
  },
  {
    category: 'CDN',
    items: [
      {
        title: 'jsdelivr',
        url: 'https://www.jsdelivr.com/',
        iconType: 'iconify',
        icon: 'logos:jsdelivr',
        showIconBorder: true,
      },
      {
        title: 'cdnjs',
        url: 'https://cdnjs.com/',
        iconType: 'image',
        icon: 'https://cdnjs.com/_/f7a2ebfb819c118086546e481876aef6.svg',
        showIconBorder: true,
      },
      {
        title: 'unpkg',
        url: 'https://unpkg.com/',
        iconType: 'image',
        icon: 'https://unpkg.com/favicon.ico',
        showIconBorder: true,
      },
      {
        title: 'Bootcdn',
        url: 'https://www.bootcdn.cn/',
        iconType: 'image',
        icon: 'https://www.bootcdn.cn/favicon.ico',
        showIconBorder: true,
      },
    ]
  }
]