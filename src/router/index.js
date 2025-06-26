import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SportsPage from '@/views/SportsPage.vue'
import CasinoPage from '@/views/CasinoPage.vue'
import PromotionsPage from '@/views/PromotionsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/sports',
    name: 'Sports',
    component: SportsPage,
  },
  {
    path: '/casino',
    name: 'Casino',
    component: CasinoPage,
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: PromotionsPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
