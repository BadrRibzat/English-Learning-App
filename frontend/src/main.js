import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './i18n'

axios.defaults.baseURL = 'http://localhost:3000/api'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
