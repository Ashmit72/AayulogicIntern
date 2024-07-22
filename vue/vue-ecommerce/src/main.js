import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { boldDirective } from './directives'
import './assets/main.css'

const app = createApp(App)


app.directive('bold', boldDirective)

app.use(router)
app.mount('#app')
