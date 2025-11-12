import { defineClientConfig } from 'vuepress/client'
import NavPage from './components/NavPage.vue'
import HideFooter from './components/HideFooter.vue'
import SitesCollectPage from './components/SitesCollectPage.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 注册自定义导航页面组件
    app.component('NavPage', NavPage)
    // 注册隐藏页脚组件，用于在特定页面隐藏VuePress默认页脚
    app.component('HideFooter', HideFooter)
    // 注册站点收集页面组件
    app.component('SitesCollectPage', SitesCollectPage)
  },
})