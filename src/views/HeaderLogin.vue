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
          <div class="id-name">
            <div class="id-title">账户:</div>
            <div class="id-title2">ID Name</div>
            <i class="fa fa-solid fa-message"></i>
          </div>
          <div class="id-name">
            <div class="id-title">剩余:</div>
            <div class="id-title2">0</div>
            <i class="fa-solid fa-arrows-rotate text-yellow-300"></i>
          </div>
          <button class="id-name2">网上存款</button>
          <button class="id-name2">在线提现</button>
          <el-dropdown
            placement="bottom-end"
            popper-class="custom-dropdown"
            trigger="click"
            @visible-change="(val) => (dropdownVisible = val)"
          >
            <el-button class="custom-dropdown-btn">
              <el-icon class="gold-icon rotate-icon" :class="{ open: dropdownVisible }">
                <ArrowDownBold />
              </el-icon>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>投注历史</el-dropdown-item>
                <el-dropdown-item>交易详情</el-dropdown-item>
                <el-dropdown-item>更改您的提款密码</el-dropdown-item>
                <el-dropdown-item>会员中心</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>

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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'

const dropdownVisible = ref(false)

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
.custom-dropdown .el-popper__arrow {
  display: none !important;
}

.custom-dropdown {
  position: absolute;
  width: 180px !important;
  height: auto !important;
  z-index: 2 !important;
  font-size: 12px !important;
  border: 2px solid #ffd630 !important;
  border-radius: 6px !important;
  background-color: rgba(0, 0, 0, 0.85) !important;
  margin-top: 0 !important;
  /* Add these to ensure proper positioning without arrow */
  transform: none !important;
}

.custom-dropdown .el-dropdown-menu {
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
}

.custom-dropdown .el-dropdown-menu__item {
  position: relative;
  padding-left: 40px !important;
  font-size: 12px;
  color: white !important;
  background-color: transparent !important;
}

/* 黑点初始样式 */
.custom-dropdown .el-dropdown-menu__item::before {
  content: '•';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: white;
}

/* Hover 效果：整条 item 背景变色 + 字变黄 + 黑点变黄 */
.custom-dropdown .el-dropdown-menu__item:hover {
  color: #ffd630 !important;
}

/* 同时黑点也变黄 */
.custom-dropdown .el-dropdown-menu__item:hover::before {
  color: #ffd630;
}

.rotate-icon {
  transition: transform 0.3s ease;
}

.rotate-icon.open {
  transform: rotate(180deg);
}

.custom-dropdown-btn {
  width: 36px !important;
  height: 36px !important;
  border: none !important;
  border-radius: 5px;
  background-color: #484848 !important;
  padding: 0px;
  margin-left: 10px;
}

.gold-icon svg {
  color: #ffd630 !important;
  width: 30px;
  height: 30px;
}

.fa-solid,
.fas {
  color: rgb(117, 233, 119);
  padding: 5px 10px;
  padding-left: 0px;
}

.id-name,
.id-title,
.id-title2 {
  line-height: 26px;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
}

.id-name {
  margin-left: 10px;
  background: #484848;
  display: flex;
  align-items: center;
  justify-items: center;
}

.id-title,
.id-title2 {
  padding: 5px 10px;
}

.id-title {
  display: inline-block;
  border-radius: 5px 0 0 5px;
  background: #363636;
}

.id-title2 {
  color: #fff48e;
}

.id-name2 {
  display: flex;
  align-items: center;
  justify-items: center;
  line-height: 26px;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px 30px;
  margin-left: 10px;
  background: #484848;
  cursor: pointer;
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
  width: 590px;
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
