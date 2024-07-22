import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import SignIn from '../pages/SignIn.vue'
import Cart from "../pages/Cart.vue"
import NotFound from "../pages/PageNotFound.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path:'/cart/:id',
      name:'cart',
      component:Cart
    },
    {
      path:'/register',
      name:'register',
      component:RegisterPage
    },
    {
      path:'/signIn',
      name:'SignIn',
      component:SignIn
    },
    {
      path:'/:pathMatch(.*)*',
      component:NotFound
    }
  ]
})

export default router
