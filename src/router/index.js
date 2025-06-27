import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Pages/HomePage.vue'
import SportsPage from '@/views/Pages/SportsPage.vue'
import PromotionsPage from '@/views/Pages/PromotionsPage.vue'
import LoginPage from '@/views/Pages/LoginPage.vue'

// Footer需要的路由组件
import AboutPage from '@/views/InfoPages/AboutPage.vue'
import AgentsPage from '@/views/InfoPages/AgentsPage.vue'
import DepositPage from '@/views/InfoPages/DepositPage.vue'
import WithdrawalPage from '@/views/InfoPages/WithdrawalPage.vue'
import ContactPage from '@/views/InfoPages/ContactPage.vue'
import AppPage from '@/views/InfoPages/AppPage.vue'
import CasinoGame from '@/views/InfoPages/CasinoGame.vue'
import ExplosiveGame from '@/views/InfoPages/ExplosiveGame.vue'

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
    path: '/promotions',
    name: 'Promotions',
    component: PromotionsPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },

  // Footer需要的路由
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/agents',
    name: 'Agents',
    component: AgentsPage,
  },
  {
    path: '/deposit',
    name: 'Deposit',
    component: DepositPage,
  },
  {
    path: '/withdrawal',
    name: 'Withdrawal',
    component: WithdrawalPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
  {
    path: '/app',
    name: 'App',
    component: AppPage,
  },
  {
    path: '/casinogame',
    name: 'CasinoGame',
    component: CasinoGame,
  },
  {
    path: '/explosivegame',
    name: 'ExplosiveGame',
    component: ExplosiveGame,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
