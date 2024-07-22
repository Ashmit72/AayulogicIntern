import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../pages/HomePage.vue"
import ContactPage from "../pages/ContactPage.vue"
import AboutPage from "../pages/AboutPage.vue"
import SettingsPage from "../pages/SettingsPage.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path:'/about',
      name:'about',
      component:AboutPage
    },
    {
      path:'/settings',
      name:'settings',
      component:SettingsPage
    }
  ]
})

export default router
