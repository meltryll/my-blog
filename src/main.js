
import './style.css'
// 引入Font Awesome图标库
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App.vue'
import { createApp } from 'vue'
import { router } from './router'

// 创建Vue应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
