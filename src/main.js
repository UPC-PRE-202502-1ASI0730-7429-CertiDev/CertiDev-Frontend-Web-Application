import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import './assets/main.css' // <--- Este es el CSS de Tailwind

const app = createApp(App)
app.use(router)
app.mount('#app')
