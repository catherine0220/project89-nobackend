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
      <div class="logo absolute top-[20px] h-10">
        <img src="@/assets/images/logo.png" alt="Logo" class="h-full" />
      </div>
      <div class="flex justify-end flex-1">
        <div class="right-section flex items-center gap-1">
          <button class="login-button">登入</button>
          <button class="register-button" @click="showRegister = true">注册</button>
          <button class="try-button flex justify-center items-center gap-2">
            <img src="@/assets/images/gameicon.png" alt="game icon" class="w-5 h-5" />注册体验
          </button>
        </div>
      </div>
    </div>
  </div>

  <RegisterModal v-if="showRegister" @close="showRegister = false" />

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
            <div class="nav flex flex-col items-center justify-center gap-1">
              <img
                src="@/assets/images/placeholder.png"
                alt="Logo"
                class="w-[25px] h-[25px] rounded-full"
              />
              <span>{{ item.label }}</span>
            </div>

            <!-- Dropdown Drawer -->
            <div
              v-if="activeIndex === index && item.children"
              class="dropdown-drawer"
              @mouseenter="activeIndex = index"
              @mouseleave="activeIndex = null"
            >
              <div
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                class="dropdown-item"
              >
                {{ child }}
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showRegister = ref(false)

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
  },
  {
    label: '爆炸罐',
    children: ['经典模式', '快速模式', '团队模式'],
  },
  {
    label: '捕鱼',
    children: ['深海捕鱼', '黄金渔场', '多人竞技'],
  },
  {
    label: '赌场',
    children: ['百家乐', '轮盘', '二十一点', '德州扑克'],
  },
  {
    label: '3D 纸牌游戏',
    children: ['3D 扑克', '3D 麻将', '3D 老虎机'],
  },
  {
    label: '运动',
    children: ['足球', '篮球', '网球', '赛马'],
  },
  {
    label: '抽奖',
    children: ['每日抽奖', '幸运大转盘', 'VIP专属'],
  },
  {
    label: '鸡踢',
    children: ['GT赛车', 'GT竞猜', 'GT排行榜'],
  },
  {
    label: '晋升',
  },
  {
    label: '应用程序',
  },
  {
    label: '代理',
  },
  {
    label: '客服服务 24/7',
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
}

.dropdown-item {
  transition: all 0.2s ease;
  color: white;
  font-size: 12px;
  cursor: pointer;
  padding: 10px;
}

.dropdown-item:hover {
  color: #ffd630;
}
</style>
