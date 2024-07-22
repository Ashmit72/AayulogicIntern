import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import registerPlugins from '../plugins'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)



registerPlugins(app)
app.use(ToastPlugin)
app.mount('#app')
