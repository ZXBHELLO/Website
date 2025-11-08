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
        url: '/MCMMO/',
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
        url: 'https://rseditor.zxbhello.top/',
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
  }

]