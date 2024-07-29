import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import registerPlugins from '../plugins'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)
registerPlugins(app)
app.use(ToastPlugin).use(pinia)
app.mount('#app')
