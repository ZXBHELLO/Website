import { defineClientConfig } from 'vuepress/client'
import NavPage from './components/NavPage.vue'
import HideFooter from './components/HideFooter.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import AppSetup from './components/AppSetup.vue'
import AsideNav from './components/AsideNav.vue'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'

import './custom.css'


export default defineClientConfig({
  enhance({ app }) {
    // 注册自定义导航页面组件
    app.component('NavPage', NavPage)
    // 注册隐藏页脚组件，用于在特定页面隐藏VuePress默认页脚
    app.component('HideFooter', HideFooter)
    // 注册粒子背景组件
    app.component('ParticleBackground', ParticleBackground)
    // 注册侧边导航组件
    app.component('AsideNav', AsideNav)
  },

  setup() {
    // 应用级设置
  },

  layouts: {
    // 在侧边栏大纲后面插入AsideNav组件
    Layout: h(Layout, null, {
      'aside-outline-after': () => h(AsideNav),
      // 在文章标题后添加 PageContextMenu 组件
      'doc-title-after': () => h(PageContextMenu),
    }),
  },

  rootComponents: [AppSetup],
})