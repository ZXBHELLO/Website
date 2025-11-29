import { defineClientConfig } from '@vuepress/client'
import NavPage from './components/NavPage.vue'
import HideFooter from './components/HideFooter.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import AppSetup from './components/AppSetup.vue'
import AsideNav from './components/AsideNav.vue'
// 新增的页面加载组件
import PageLoading from './components/PageLoading.vue'
// 新增的外部链接警告组件
import ExternalLinkWarning from './components/ExternalLinkWarning.vue'
// @ts-ignore
import { h } from 'vue'
// @ts-ignore
import { Layout } from 'vuepress-theme-plume/client'
// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './custom.css'


export default defineClientConfig({
  enhance({ app }: { app: any }) {
    // 注册自定义导航页面组件
    app.component('NavPage', NavPage)
    // 注册隐藏页脚组件，用于在特定页面隐藏VuePress默认页脚
    app.component('HideFooter', HideFooter)
    // 注册粒子背景组件
    app.component('ParticleBackground', ParticleBackground)
    // 注册侧边导航组件
    app.component('AsideNav', AsideNav)
    // 注册页面加载组件
    app.component('PageLoading', PageLoading)
    // 注册外部链接警告组件
    app.component('ExternalLinkWarning', ExternalLinkWarning)
    // 注册 Element Plus
    app.use(ElementPlus)
  },

  setup() {
    // 应用级设置
  },

  layouts: {
    // 在侧边栏大纲后面插入AsideNav组件
    Layout: () => {
      return h(Layout, null, {
        'aside-outline-after': () => h(AsideNav),
      })
    },
  },

  rootComponents: [AppSetup, PageLoading, ExternalLinkWarning],
})