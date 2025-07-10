<template>
  <div>
    <!-- Header -->
    <HeaderLogin />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/agentbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="content">
      <div class="content-wrapper">
        <div class="account-sidebar" v-if="!isSidebarHidden">
          <div class="account-header">
            <i class="fas fa-user-circle"></i>
            <div class="account-id">帐户 CAT0216</div>
            <div class="account-balance">
              余额： 0
              <i class="fa-solid fa-arrows-rotate"></i>
            </div>
          </div>

          <div class="menu-options">
            <div class="action-buttons">
              <div
                class="deposit-button"
                :class="{ 'is-active': activeTab === 'deposit' }"
                @click="switchTab('deposit')"
              >
                <i class="fas fa-donate"></i>
                <span class="button-text">存款</span>
              </div>
              <div
                class="withdraw-button"
                :class="{ 'is-active': activeTab === 'withdraw' }"
                @click="switchTab('withdraw')"
              >
                <i class="fas fa-hand-holding-usd"></i>
                <span class="button-text">提款</span>
              </div>
            </div>
            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'security' }"
              @click="showSecurityTab"
            >
              <i class="fas fa-user-shield fa-fw"></i>
              <span class="button-list">安全设置</span>
            </div>

            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'vip' }"
              @click="switchTab('vip')"
            >
              <span class="img-membercenter-mask"></span>
              <span class="button-list">VIP 区</span>
            </div>

            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'announcement' }"
              @click="showAnnouncement"
            >
              <i class="fas fa-bullhorn"></i>
              <span class="button-list">最新公告</span>
            </div>
            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'mail' }"
              @click="switchTab('mail')"
            >
              <i class="fas fa-envelope"></i>
              <span class="button-list">内部邮件</span>
            </div>

            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'activity' }"
              @click="switchTab('activity')"
            >
              <i class="fas fa-trophy"></i>
              <span class="button-list">活动区域</span>
            </div>

            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'transaction' }"
              @click="switchTab('transaction')"
            >
              <i class="fas fa-clipboard-list fa-fw"></i>
              <span class="button-list">交易详情</span>
            </div>

            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'betting' }"
              @click="switchTab('betting')"
            >
              <i class="fas fa-history fa-fw"></i>
              <span class="button-list">投注历史</span>
            </div>

            <div
              class="menu-item"
              :class="{ 'is-active': activeTab === 'refund' }"
              @click="switchTab('refund')"
            >
              <i class="fa-solid fa-money-check-dollar"></i>
              <span class="button-list">退款</span>
            </div>

            <div
              class="menu-item"
              style="border-radius: 0 0 10px 10px"
              :class="{ 'is-active': activeTab === 'favorites' }"
              @click="switchTab('favorites')"
            >
              <i class="fas fa-heart fa-fw"></i>
              <span class="button-list">收藏夹</span>
            </div>
          </div>
        </div>

        <!-- Dynamic Content Area -->
        <div
          class="dynamic-content"
          :style="{
            width: isSidebarHidden ? 'calc(100% - 20px)' : '840px',
            marginLeft: isSidebarHidden ? '0' : '10px',
          }"
        >
          <component
            :is="currentComponent"
            v-if="activeTab !== 'announcement' && !securitySubPage"
            :is-sidebar-collapsed="isSidebarHidden"
            @toggle-sidebar="toggleSidebar"
            @navigate-to="handleSecurityNavigation"
          />

          <!-- Announcement component -->
          <AnnouncementPage
            v-if="activeTab === 'announcement'"
            :key="announcementKey"
            @close="returnFromAnnouncement"
          />

          <!-- Security sub-pages -->
          <component
            v-if="securitySubPage"
            :is="securitySubPageComponent"
            @go-back="returnToSecuritySettings"
          />
        </div>
      </div>
    </div>
    <teleport to="body">
      <RefundPage v-if="activeTab === 'refund'" @close="switchTab(lastActiveTab)" />
    </teleport>
    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import HeaderLogin from '@/views/HeaderLogin.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '@/views/FooterMain.vue'
import { onMounted, watch } from 'vue'

// Main components
import SavingPage from '@/views/components/SavingPage.vue'
import WithdrawPage from '@/views/components/WithdrawPage.vue'
import SecuritySettings from '@/views/components/SecuritySettings.vue'
import VipZone from '@/views/components/VipZone.vue'
import AnnouncementPage from '@/views/components/AnnouncementPage.vue'
import InternalMail from '@/views/components/InternalMail.vue'
import ActivityZone from '@/views/components/ActivityZone.vue'
import TransactionDetails from '@/views/components/TransactionDetails.vue'
import BettingHistory from '@/views/components/BettingHistory.vue'
import RefundPage from '@/views/components/RefundPage.vue'
import FavoritesPage from '@/views/components/FavoritesPage.vue'

// Security sub-components
import ChangePassword from '@/views/components/ChangePassword.vue'
import ChangeMoneyPassword from '@/views/components/ChangeMoneyPassword.vue'
import NameSettings from '@/views/components/NameSettings.vue'

const activeTab = ref('deposit')
const lastActiveTab = ref('deposit')
const announcementKey = ref(0)
const securitySubPage = ref(null)
const isSidebarHidden = ref(false)

const tabSidebarStates = ref({
  deposit: false,
  withdraw: false,
  security: false,
  vip: false,
  mail: false,
  activity: false,
  transaction: false,
  betting: false,
  refund: false,
  favorites: false,
})

// Provide the sidebar state to child components
provide('sidebar', {
  isCollapsed: isSidebarHidden,
  toggle: toggleSidebar,
})

const componentsMap = {
  deposit: SavingPage,
  withdraw: WithdrawPage,
  security: SecuritySettings,
  vip: VipZone,
  announcement: AnnouncementPage,
  mail: InternalMail,
  activity: ActivityZone,
  transaction: TransactionDetails,
  betting: BettingHistory,
  refund: RefundPage,
  favorites: FavoritesPage,
}

const route = useRoute()

onMounted(() => {
  const hash = route.hash.replace('#', '')
  if (hash) {
    switchTab(hash)
  }
})

watch(
  () => route.hash,
  (newHash) => {
    const tab = newHash.replace('#', '')
    if (tab) {
      switchTab(tab)
    }
  },
)

const securitySubPagesMap = {
  'change-password': ChangePassword,
  'change-money-password': ChangeMoneyPassword,
  'name-settings': NameSettings,
}

const currentComponent = computed(() => componentsMap[activeTab.value] || SavingPage)
const securitySubPageComponent = computed(() => securitySubPagesMap[securitySubPage.value])

function toggleSidebar() {
  isSidebarHidden.value = !isSidebarHidden.value
  tabSidebarStates.value[activeTab.value] = isSidebarHidden.value
}

function switchTab(tab) {
  if (activeTab.value) {
    tabSidebarStates.value[activeTab.value] = isSidebarHidden.value
  }

  securitySubPage.value = null
  activeTab.value = tab
  isSidebarHidden.value = tabSidebarStates.value[tab]

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showSecurityTab() {
  securitySubPage.value = null
  activeTab.value = 'security'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showAnnouncement() {
  lastActiveTab.value = activeTab.value
  activeTab.value = 'announcement'
  announcementKey.value++
}

function returnFromAnnouncement() {
  activeTab.value = lastActiveTab.value
}

function handleSecurityNavigation(page) {
  if (activeTab.value === 'security') {
    securitySubPage.value = page
  }
}

function returnToSecuritySettings() {
  securitySubPage.value = null
}
</script>

<style scoped>
/* Existing styles remain unchanged */
.img-membercenter-mask {
  display: inline-block;
  width: 22px;
  height: 20px;
  -webkit-mask-image: url('@/assets/images/membercenter1.svg');
  mask-image: url('@/assets/images/membercenter1.svg');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  background: #fff;
}

.menu-item:hover .img-membercenter-mask,
.menu-item.is-active .img-membercenter-mask {
  background: black;
}

.button-list {
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
}

.fa-donate,
.fa-hand-holding-usd {
  margin-bottom: 10px;
  font-size: 30px;
}

.button-text {
  font-size: 18px;
  font-weight: 500;
  color: inherit;
}

.action-buttons {
  display: flex;
  border-bottom: 2px solid black;
}

.deposit-button {
  border-right: 2px solid black;
}

.deposit-button,
.withdraw-button {
  flex: 1;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
}

.deposit-button:hover,
.withdraw-button:hover {
  color: black !important;
}

.account-sidebar {
  width: 300px !important;
  color: #fff;
  text-align: center;
  background-color: black;
}

.account-header {
  height: 218px;
  background-color: #3b3b3b;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px 10px 0 0;
}

.fa-user-circle {
  font-size: 60px;
}

.account-id {
  margin: 10px 0;
  font-weight: bold;
  font-size: 15px;
}

.account-balance {
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
}

.menu-options {
  background-color: #222;
  border-radius: 0 0 10px 10px;
}

.menu-item {
  padding: 15px 44px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: left;
}

.menu-item:hover,
.deposit-button:hover,
.withdraw-button:hover,
.menu-item.is-active,
.deposit-button.is-active,
.withdraw-button.is-active {
  color: black;
  background: linear-gradient(to bottom, #fffa74, #d7aa32);
}

.fa-user-circle {
  font-size: 60px;
}

.content-wrapper {
  width: 1200px;
  display: flex;
  gap: 20px;
}

.content {
  position: relative;
  padding: 30px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fa-arrows-rotate {
  @apply text-yellow-300;
  padding: 5px 10px;
  padding-left: 0px;
}

.dynamic-content {
  flex: 1;
  margin-left: 10px;
  background-color: black;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  width: 840px;
}
</style>
