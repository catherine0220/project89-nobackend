import './assets/styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-table-v2.css' // ✅ 加这句确保样式有

import { ElTableV2 } from 'element-plus' // ✅ 只保留 ElTableV2

import 'virtual:uno.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.component('ElTableV2', ElTableV2) // ✅ 只注册 table-v2，不注册 auto-resizer

app.mount('#app')
