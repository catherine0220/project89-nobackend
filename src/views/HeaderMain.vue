<template>
  <!-- Top Login Bar -->
  <div class="topnav flex flex-col h-20">
    <div class="datecontainer w-[1200px] h-6 mx-auto relative">
      <div class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
        <span class="date">{{ vietnamDate }}</span>
        <span class="time">{{ vietnamTime }}</span>
        <img
          src="https://flagcdn.com/w40/vn.png"
          alt="VN"
          class="w-6 h-4 object-cover rounded-sm ml-2"
        />
      </div>
    </div>

    <div class="w-[1200px] mx-auto flex justify-between items-center">
      <router-link to="/" class="logo absolute top-[20px] h-10">
        <img src="@/assets/images/logo.png" alt="Logo" class="h-full cursor-pointer" />
      </router-link>
      <div class="flex justify-end flex-1">
        <div class="right-section flex items-center gap-1">
          <button class="login-button" @click="handleLoginClick">登入</button>
          <button class="register-button" @click="showRegisterModal = true">注册</button>
          <button class="try-button flex justify-center items-center gap-2" @click="showExp = true">
            <img src="@/assets/images/gameicon.png" alt="game icon" class="w-5 h-5" />
            注册体验
          </button>
        </div>
      </div>
    </div>
  </div>

  <LoginModal
    v-if="showLoginModal"
    @close="showLoginModal = false"
    @login-success="showLoginModal = false"
    @show-register="
      () => {
        showLoginModal = false
        showRegisterModal = true
      }
    "
  />
  <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
  <ExpModal v-if="showExp" @close="showExp = false" />

  <!-- Navigation -->
  <div class="main-header">
    <div class="w-[1200px] mx-auto p-3">
      <el-row :gutter="20" justify="center" class="h-auto">
        <el-col v-for="(item, index) in menuItems" :key="index" :span="2">
          <div
            class="nav-container relative"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave()"
          >
            <router-link
              :to="item.path || '#'"
              class="nav flex flex-col items-center justify-center gap-1 no-underline"
            >
              <div
                class="nav-icon"
                :class="{ active: activeIndex === index }"
                :style="{ backgroundImage: `url(${item.image_url || fallbackImageUrl})` }"
              ></div>

              <span>{{ item.label }}</span>
            </router-link>

            <!-- Dropdown Drawer -->
            <div
              v-if="activeIndex === index && item.children"
              class="dropdown-drawer"
              @mouseenter="activeIndex = index"
              @mouseleave="activeIndex = null"
            >
              <div class="dropdown-columns">
                <div
                  class="dropdown-column"
                  v-for="(group, groupIndex) in chunkChildren(item.children, 10)"
                  :key="groupIndex"
                >
                  <template v-for="(child, childIndex) in group" :key="childIndex">
                    <!-- 如果是爆炸罐的外链 -->
                    <a
                      v-if="child.url"
                      :href="child.url"
                      target="_blank"
                      class="dropdown-item no-underline flex items-center gap-2"
                    >
                      <div
                        class="w-5 h-2 bg-cover bg-center"
                        :style="{ backgroundImage: `url(${child.image_url})` }"
                      ></div>
                      {{ child.label }}
                    </a>

                    <!-- 否则用内部 router-link -->
                    <router-link
                      v-else
                      :to="child.path"
                      class="dropdown-item no-underline flex items-center gap-2"
                    >
                      <div
                        class="w-5 h-2 bg-cover bg-center"
                        :style="{ backgroundImage: `url(${child.image_url})` }"
                      ></div>
                      {{ child.label }}
                    </router-link>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import '@/assets/styles/main.css'
import RegisterModal from '@/views/components/RegisterModal.vue'
import LoginModal from '@/views/components/LoginModal.vue'
import ExpModal from '@/views/components/ExpModal.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import fallbackImage from '@/assets/images/placeholder.png'

const auth = useAuthStore()
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showExp = ref(false)

const vietnamTime = ref('')
const vietnamDate = ref('')
const activeIndex = ref(null)
let timer = null
let closeTimer = null

const menuItems = ref([]) // 动态菜单
const fallbackImageUrl = new URL(fallbackImage, import.meta.url).href

// 默认菜单结构（带子菜单）
const defaultMenuItems = [
  {
    label: '主页',
    path: '/',
    children: null,
  },
  {
    label: '爆炸罐',
    path: '/explosivegame',
    children: [],
  },
  {
    label: '捕鱼',
    path: '/fishing',
    children: [
      { label: '深海捕鱼', path: '/fishing/deepsea' },
      { label: '黄金渔场', path: '/fishing/golden' },
      { label: '多人竞技', path: '/fishing/multiplayer' },
    ],
  },
  {
    label: '赌场',
    path: '/bet',
    children: [
      { label: '百家乐', path: '/casino/baccarat' },
      { label: '轮盘', path: '/casino/roulette' },
      { label: '二十一点', path: '/casino/blackjack' },
      { label: '德州扑克', path: '/casino/poker' },
    ],
  },
  {
    label: '3D 纸牌游戏',
    path: '/board',
    children: [
      { label: '3D 扑克', path: '/cards/poker' },
      { label: '3D 麻将', path: '/cards/mahjong' },
      { label: '3D 老虎机', path: '/cards/slot' },
    ],
  },
  {
    label: '运动',
    path: '/sports',
    children: [
      { label: '足球', path: '/sports/football' },
      { label: '篮球', path: '/sports/basketball' },
      { label: '网球', path: '/sports/tennis' },
      { label: '赛马', path: '/sports/horse' },
    ],
  },
  {
    label: '抽奖',
    path: '/lottery',
    children: [
      { label: '每日抽奖', path: '/lottery/daily' },
      { label: '幸运大转盘', path: '/lottery/wheel' },
      { label: 'VIP专属', path: '/lottery/vip' },
    ],
  },
  {
    label: '鸡踢',
    path: '/cockfighting',
    children: [
      { label: 'GT赛车', path: '/gt/race' },
      { label: 'GT竞猜', path: '/gt/bet' },
      { label: 'GT排行榜', path: '/gt/rank' },
    ],
  },
  {
    label: '晋升',
    path: '/promotions',
    children: null,
  },
  {
    label: '应用程序',
    path: '/downloadapp',
    children: null,
  },
  {
    label: '代理',
    path: '/agents',
    children: null,
  },
  {
    label: '客服服务 24/7',
    path: '/customer-service',
    children: null,
  },
]

// 获取后端菜单
const fetchMenuItems = async () => {
  try {
    // 获取主菜单(category 18)
    const mainResponse = await axios.get('http://192.168.0.122/silver/user/game_list.php', {
      params: { category: 18, status: 1 },
    })

    // 专门获取爆炸罐游戏(category 19)
    const explosiveResponse = await axios.get('http://192.168.0.122/silver/user/game_list.php', {
      params: { category: 19, status: 1 },
    })

    const backendData = mainResponse.data.success ? mainResponse.data.data : []
    const explosiveGames = explosiveResponse.data.success ? explosiveResponse.data.data : []

    const backendMap = new Map(backendData.map((item) => [item.game_name || item.name, item]))

    menuItems.value = defaultMenuItems.map((defaultItem) => {
      const backendItem = backendMap.get(defaultItem.label)

      // 特殊处理爆炸罐菜单
      if (defaultItem.label === '爆炸罐') {
        return {
          label: defaultItem.label,
          path: defaultItem.path,
          children: explosiveGames.map((game) => ({
            label: game.game_name || game.name,
            url: game.url
              ? `http://192.168.0.122${game.url.startsWith('/') ? '' : '/'}${game.url}`
              : '#',
            image_url: game.image_url
              ? `http://192.168.0.122${game.image_url.startsWith('/') ? '' : '/'}${game.image_url}`
              : fallbackImageUrl,
          })),
          image_url: backendItem?.image_url
            ? `http://192.168.0.122${backendItem.image_url.startsWith('/') ? '' : '/'}${backendItem.image_url}`
            : fallbackImageUrl,
        }
      }

      // 其他菜单项处理保持不变
      return {
        ...defaultItem,
        image_url: backendItem?.image_url
          ? `http://192.168.0.122${backendItem.image_url.startsWith('/') ? '' : '/'}${backendItem.image_url}`
          : fallbackImageUrl,
      }
    })
  } catch (error) {
    console.error('获取菜单失败:', error)
    menuItems.value = defaultMenuItems.map((item) => ({
      ...item,
      image_url: fallbackImageUrl,
    }))
  }
}

// 登录逻辑
const handleLoginClick = () => {
  if (!auth.isLoggedIn.value) {
    showLoginModal.value = true
  }
}

// hover 切换导航
const handleMouseEnter = (index) => {
  clearTimeout(closeTimer)
  activeIndex.value = index
}

const handleMouseLeave = () => {
  closeTimer = setTimeout(() => {
    activeIndex.value = null
  }, 300)
}

// 越南时间
const updateVietnamTime = () => {
  const now = new Date()
  const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }

  vietnamTime.value = now.toLocaleTimeString('vi-VN', {
    ...options,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const weekdayShort = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][now.getDay()]
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  vietnamDate.value = `${year}/${month}/${day} (${weekdayShort})`
}

// 初始化
onMounted(() => {
  updateVietnamTime()
  timer = setInterval(updateVietnamTime, 1000)
  fetchMenuItems()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

function chunkChildren(array, size) {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
</script>

<style>
.main-header {
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
}

.nav-icon {
  height: 30px !important;
  width: 30px !important;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top;
  border-radius: 9999px;
}

.nav-icon.active {
  background-position: bottom;
}

.login-button,
.register-button,
.try-button {
  font-size: 15px;
  font-weight: bold;
  min-width: 140px;
  padding: 8px 20px;
  border-radius: 20px;
  justify-content: center;
  cursor: pointer;
}
.login-button {
  background-color: black;
  color: #ffd630;
  border: 2px solid #ffd630;
}

.login-button:hover,
.try-button {
  background-color: #484848;
}

.register-button {
  background-color: #ffd630;
  color: black;
  border: 2px solid #ffd630;
}

.register-button:hover {
  background-color: #fff87d;
  border: 2px solid #fff87d;
}

.try-button {
  color: #ffd630;
  border: 2px solid #484848;
}

.try-button:hover {
  background-color: #626262;
  border: 2px solid #626262;
}

/* 时间显示样式 */
.time-display {
  order: 1;
  margin-right: auto;
  margin-left: 2rem;
}

.time-box {
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  min-width: 180px;
  justify-content: center;
}

.time {
  font-size: 15px;
  letter-spacing: 0.5px;
  color: #fef3c7;
}

.date {
  color: #d1d5db;
}

.separator {
  font-weight: bold;
}

.right-section {
  order: 2;
  gap: 12px;
}

.time-display {
  right: 0;
}

.datecontainer {
  margin: 3px;
}
.date,
.time {
  color: white;
  font-size: 14px;
  margin-left: 5px;
}

.nav {
  color: white;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  width: 100px;
}

.nav-container:hover .nav,
.nav-container[data-active='true'] .nav {
  color: #ffd630;
}

/* Dropdown styles */
.nav-container {
  height: 100%;
}

.dropdown-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(30, 30, 30, 0.9);
  border-radius: 5px;
  z-index: 50;
  min-height: 100px;
  margin-top: 10px;
  border: 1px solid #ffd630;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: max-content;
}

.dropdown-columns {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.dropdown-column {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.dropdown-item {
  color: white;
  font-size: 12px;
  cursor: pointer;
  padding: 10px;
}

.dropdown-item:hover {
  color: #ffd630;
}
</style>
