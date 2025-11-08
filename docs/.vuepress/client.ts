import { defineClientConfig } from 'vuepress/client'
import NavPage from './components/NavPage.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('NavPage', NavPage)
  },
})