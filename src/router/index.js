import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Pages/HomePage.vue'
import SportsPage from '@/views/Pages/SportsPage.vue'
import PromotionsPage from '@/views/Pages/PromotionsPage.vue'

import AboutUs from '@/views/InfoPages/AboutUs.vue'
import AgentsPage from '@/views/InfoPages/AgentsPage.vue'
import DepositPage from '@/views/InfoPages/DepositPage.vue'
import WithdrawalPage from '@/views/InfoPages/WithdrawalPage.vue'
import ContactPage from '@/views/InfoPages/ContactPage.vue'
import DownloadApp from '@/views/InfoPages/DownloadApp.vue'
import LotteryPage from '@/views/Pages/LotteryPage.vue'
import ExplosiveGame from '@/views/Pages/ExplosiveGame.vue'
import BetPage from '@/views/Pages/BetPage.vue'
import CockFighting from '@/views/Pages/CockFighting.vue'
import FishingPage from '@/views/Pages/FishingPage.vue'
import BoardPage from '@/views/Pages/BoardPage.vue'

import CollabView from '@/views/components/CollabView.vue'
import CommissionView from '@/views/components/CommissionView.vue'
import RegistrationView from '@/views/components/RegistrationView.vue'
import ReportView from '@/views/components/ReportView.vue'

import LoginHome from '@/views/Pages/LoginHome.vue'
import MemberCenter from '@/views/Pages/MemberCenter.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: '首页' },
  },
  {
    path: '/home',
    name: 'LoginHome',
    component: LoginHome,
    meta: { requiresAuth: true },
  },
  {
    path: '/membercenter',
    name: 'MemberCenter',
    component: MemberCenter,
    meta: { title: '会员中心' },
  },
  {
    path: '/sports',
    name: 'Sports',
    component: SportsPage,
    meta: { title: '体育赛事' },
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: PromotionsPage,
    meta: { title: '优惠活动' },
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs,
    meta: { title: '关于我们' },
  },
  {
    path: '/agents',
    name: 'Agents',
    component: AgentsPage,
    meta: { title: '代理加盟' },
  },
  {
    path: '/deposit',
    name: 'Deposit',
    component: DepositPage,
    meta: { title: '存款帮助' },
  },
  {
    path: '/withdrawal',
    name: 'Withdrawal',
    component: WithdrawalPage,
    meta: { title: '取款帮助' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: { title: '联系我们' },
  },
  {
    path: '/downloadapp',
    name: 'downloadapp',
    component: DownloadApp,
    meta: { title: 'APP下载' },
  },
  {
    path: '/explosivegame',
    name: 'ExplosiveGame',
    component: ExplosiveGame,
    meta: { title: '爆炸罐' },
  },
  {
    path: '/bet',
    name: 'BetPage',
    component: BetPage,
    meta: { title: '赌场' },
  },
  {
    path: '/lottery',
    name: 'LotteryPage',
    component: LotteryPage,
    meta: { title: '抽奖' },
  },
  {
    path: '/cockfighting',
    name: 'CockFighting',
    component: CockFighting,
    meta: { title: '鸡踢' },
  },
  {
    path: '/fishing',
    name: 'FishingPage',
    component: FishingPage,
    meta: { title: '捕鱼' },
  },
  {
    path: '/board',
    name: 'BoardPage',
    component: BoardPage,
    meta: { title: '3D 纸牌游戏' },
  },
  {
    path: '/collabagent',
    name: 'collab',
    component: CollabView,
  },
  {
    path: '/commissionagent',
    name: 'commission',
    component: CommissionView,
  },
  {
    path: '/registrationagent',
    name: 'registration',
    component: RegistrationView,
  },
  {
    path: '/reportagent',
    name: 'report',
    component: ReportView,
  },
  // 404页面处理
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为控制
  scrollBehavior(to, from, savedPosition) {
    // 总是返回顶部
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 89 Bet` : '89 Bet'

  if (to.meta.requiresRefresh) {
    window.location.href = to.fullPath
    return
  }

  next()
})

router.afterEach((to, from) => {
  // 确保滚动到顶部
  window.scrollTo(0, 0)

  // 如果是从不同路由跳转过来，可以在这里重置页面状态
  if (to.path !== from.path) {
    // 这里可以添加任何需要重置的状态逻辑
    // 例如：关闭所有弹窗、重置表单等
  }
})

export default router
