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
          <button class="login-button" @click="showLogin = true">登入</button>
          <button class="register-button" @click="showRegister = true">注册</button>
          <button class="try-button flex justify-center items-center gap-2" @click="showExp = true">
            <img src="@/assets/images/gameicon.png" alt="game icon" class="w-5 h-5" />
            注册体验
          </button>
        </div>
      </div>
    </div>
  </div>

  <LoginModal v-if="showLogin" @close="showLogin = false" />
  <RegisterModal v-if="showRegister" @close="showRegister = false" />
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
              <img
                src="@/assets/images/placeholder.png"
                :alt="item.label"
                class="w-[25px] h-[25px] rounded-full"
              />
              <span>{{ item.label }}</span>
            </router-link>

            <!-- Dropdown Drawer -->
            <div
              v-if="activeIndex === index && item.children"
              class="dropdown-drawer"
              @mouseenter="activeIndex = index"
              @mouseleave="activeIndex = null"
            >
              <router-link
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                :to="child.path"
                class="dropdown-item no-underline"
              >
                {{ child.label }}
              </router-link>
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

const showRegister = ref(false)
const showLogin = ref(false)

const vietnamTime = ref('')
const vietnamDate = ref('')
const activeIndex = ref(null)
let timer = null
let closeTimer = null

const handleMouseEnter = (index) => {
  clearTimeout(closeTimer) // 清除之前的关闭计时器
  activeIndex.value = index
}

const handleMouseLeave = () => {
  // 设置延迟关闭（例如 300ms）
  closeTimer = setTimeout(() => {
    activeIndex.value = null
  }, 300)
}

const menuItems = [
  {
    label: '主页',
    path: '/',
  },
  {
    label: '爆炸罐',
    path: '/explosivegame',
    children: [
      { label: '经典模式', path: '/bomb/classic' },
      { label: '快速模式', path: '/bomb/quick' },
      { label: '团队模式', path: '/bomb/team' },
    ],
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
  },
  {
    label: '应用程序',
    path: '/downloadapp',
  },
  {
    label: '代理',
    path: '/agents',
  },
  {
    label: '客服服务 24/7',
    path: '/support',
  },
]

// 获取越南时间
const updateVietnamTime = () => {
  const now = new Date()

  // 越南时区 (UTC+7)
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
  }

  // 时间格式: 14:30
  vietnamTime.value = now.toLocaleTimeString('vi-VN', {
    ...options,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  // 新日期格式: yy/mm/dd (T3)
  const weekdayShort = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][now.getDay()]
  const year = now.getFullYear().toString().slice(0)
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')

  vietnamDate.value = `${year}/${month}/${day} (${weekdayShort})`
}

onMounted(() => {
  updateVietnamTime()
  // 每秒更新一次
  timer = setInterval(updateVietnamTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style>
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

.main-header {
  height: 72px;
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
  width: 100%;
  background-color: rgba(30, 30, 30, 0.9);
  border-radius: 5px;
  z-index: 50;
  min-width: 100px;
  min-height: 150px;
  margin-top: 10px;
  border: 1px solid #ffd630;
  display: flex;
  flex-direction: column;
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
