import { defineClientConfig } from 'vuepress/client'
import NavPage from './components/NavPage.vue'
import HideFooter from './components/HideFooter.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import AppSetup from './components/AppSetup.vue'
import AsideNav from './components/AsideNav.vue'


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

  rootComponents: [AppSetup],
})
