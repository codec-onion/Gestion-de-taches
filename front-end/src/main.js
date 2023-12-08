import './interfaces/assets/main.css'

import { createApp } from 'vue'
import App from './interfaces/App.vue'
import router from './interfaces/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
