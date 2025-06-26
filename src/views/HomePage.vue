<template>
  <div class="app">
    <!-- Top Navigation Bar -->
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
            <button class="register-button">注册</button>
            <button class="try-button">注册体验</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="main-header">
      <div class="w-[1200px] mx-auto p-3">
        <el-row :gutter="20" justify="center" class="h-auto">
          <el-col v-for="(item, index) in menuItems" :key="index" :span="2">
            <div class="nav flex flex-col items-center justify-center gap-1">
              <img
                src="@/assets/images/placeholder.png"
                alt="Logo"
                class="w-[25px] h-[25px] rounded-full"
              />
              <span>{{ item }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- Banner -->
    <div class="banner w-full">
      <el-carousel trigger="click" height="450px">
        <el-carousel-item v-for="(img, index) in bannerList" :key="index">
          <img :src="img" alt="Banner" class="w-full h-full object-cover" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- Announcement -->
    <div class="announcement-container w-full">
      <div class="announcement w-[1200px] mx-auto h-11">
        <div class="flex items-center h-full">
          <!-- 固定部分 -->
          <span class="a-text1 shrink-0 pr-2 h-full flex items-center"> 【喇叭】这是通告： </span>

          <!-- 滚动部分 -->
          <div class="scrolling-container overflow-hidden flex-1 h-full flex items-center">
            <div
              class="a-text2 whitespace-nowrap text-white h-full flex items-center hover:underline"
              :style="{
                animation: 'marquee-left 20s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
            >
              -------------------------你的动态通告内容-------------------------
              -------------------------你的动态通告内容-------------------------
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Types -->
    <div class="types-container flex justify-center h-[230px] pb-15 pt-10">
      <div class="w-[1200px] flex gap-5">
        <div v-for="(item, index) in typesItems" :key="index" class="mr-[0px] last:mr-0">
          <div
            class="w-[187px] h-[220px] bg-cover bg-center flex flex-col items-center justify-center pb-8 rounded-2xl"
            :style="{ backgroundImage: `url(${item.bg})` }"
          >
            <img
              :src="item.icon"
              alt="icon"
              class="w-full h-[210px] mx-auto transition-transform duration-400 cursor-pointer hover:-translate-y-2"
            />
            <span class="types text-white mb-[15px]">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Jackpot Section -->
    <div class="jackpot flex justify-center items-center">
      <div class="jackpot-bg h-[320px] w-[1200px]">
        <div class="relative z-10 h-full w-full flex">
          <!-- 左侧内容 -->
          <div class="w-[580px] h-full flex flex-col justify-center text-white">
            <p class="text-5xl font-bold mb-6">903,099.05</p>
          </div>

          <!-- 右侧轮播图 -->
          <div class="flex flex-col items-center justify-center w-[600px]">
            <div class="jackpot-section h-[200px] w-full relative">
              <el-carousel
                ref="jackpotCarousel"
                class="jackpot-carousel"
                :autoplay="false"
                trigger="click"
                height="180px"
                indicator-position="none"
                arrow="never"
                @change="handleJackpotChange"
              >
                <el-carousel-item v-for="(page, pageIndex) in 6" :key="pageIndex">
                  <div class="grid grid-cols-5 gap-4">
                    <div
                      v-for="(item, index) in getPageItems(pageIndex)"
                      :key="index"
                      class="flex flex-col items-center"
                    >
                      <div class="w-[100px] bg-gray-800 rounded-lg overflow-hidden mb-2">
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="w-[100px] h-[100px] object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div class="text-center w-full">
                        <div class="font-medium text-white truncate">{{ item.name }}</div>
                        <div class="text-sm text-gray-400">{{ item.id }}</div>
                      </div>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>

            <!-- 自定义箭头 + 指示器 -->
            <div class="custom-controls flex items-center justify-center gap-3">
              <el-icon @click="prevJackpotPage" class="custom-arrow"><ArrowLeftBold /></el-icon>

              <div class="flex gap-2">
                <button
                  v-for="(_, index) in 6"
                  :key="index"
                  @click="goToPage(index)"
                  class="custom-indicator"
                  :class="{ active: currentPage === index }"
                ></button>
              </div>

              <el-icon @click="nextJackpotPage" class="custom-arrow"><ArrowRightBold /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Slot Games Table -->
    <GameGrid />

    <!-- IOS -->
    <div class="ios-container">
      <div class="ios-wrapper">
        <span class="ios-title">应用</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/styles/main.css'
import '@/assets/styles/header.css'
import GameGrid from '@/views/GameGrid.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

// Jackpot
const jackpotCarousel = ref()
const currentPage = ref(0)

const jackpotList = Array.from({ length: 30 }, (_, i) => ({
  image: `https://picsum.photos/200/200?random=${i + 1}`,
  name: `玩家${String.fromCharCode(65 + i)}`,
  id: `ID${Math.floor(100000 + Math.random() * 900000)}`,
}))

const getPageItems = (pageIndex) => {
  const start = pageIndex * 5
  return jackpotList.slice(start, start + 5)
}

const goToPage = (index) => {
  currentPage.value = index
  jackpotCarousel.value?.setActiveItem(index)
}
const prevJackpotPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
    jackpotCarousel.value?.setActiveItem(currentPage.value)
  }
}
const nextJackpotPage = () => {
  if (currentPage.value < 5) {
    currentPage.value++
    jackpotCarousel.value?.setActiveItem(currentPage.value)
  }
}
const handleJackpotChange = (index) => {
  currentPage.value = index
}

const bannerList = [
  new URL('@/assets/images/banner1.jpg', import.meta.url).href,
  new URL('@/assets/images/banner2.jpg', import.meta.url).href,
  new URL('@/assets/images/banner3.jpg', import.meta.url).href,
  new URL('@/assets/images/banner4.jpg', import.meta.url).href,
  new URL('@/assets/images/banner5.jpg', import.meta.url).href,
]

const isHovered = ref(false)
const vietnamTime = ref('')
const vietnamDate = ref('')
let timer = null
const menuItems = [
  '主页',
  '爆炸罐',
  '捕鱼',
  '赌场',
  '3D 纸牌游戏',
  '运动',
  '抽奖',
  '鸡踢',
  '晋升',
  '应用程序',
  '代理',
  '客服服务 24/7',
]

const typesItems = [
  {
    name: '爆炸罐',
    bg: new URL('@/assets/images/types1.png', import.meta.url).href,
    icon: new URL('@/assets/images/types11.png', import.meta.url).href,
  },
  {
    name: '捕鱼',
    bg: new URL('@/assets/images/types2.png', import.meta.url).href,
    icon: new URL('@/assets/images/types22.png', import.meta.url).href,
  },
  {
    name: '赌场',
    bg: new URL('@/assets/images/types3.png', import.meta.url).href,
    icon: new URL('@/assets/images/types33.png', import.meta.url).href,
  },
  {
    name: '3D 纸牌游戏',
    bg: new URL('@/assets/images/types4.png', import.meta.url).href,
    icon: new URL('@/assets/images/types44.png', import.meta.url).href,
  },
  {
    name: '运动',
    bg: new URL('@/assets/images/types5.png', import.meta.url).href,
    icon: new URL('@/assets/images/types55.png', import.meta.url).href,
  },
  {
    name: '抽奖',
    bg: new URL('@/assets/images/types6.png', import.meta.url).href,
    icon: new URL('@/assets/images/types66.png', import.meta.url).href,
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
.el-table-v2__cell {
  cursor: pointer;
  transition: 0.2s;
}
.el-table-v2__cell:hover {
  background-color: #ffd63033;
}

.el-carousel__indicator--horizontal .el-carousel__button {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: transparent !important;
  border: 1px solid #ffd630 !important;
  opacity: 100%;
  margin-bottom: 8px;
}

.el-carousel__indicator.is-active .el-carousel__button {
  background-color: #ffd630 !important;
  border: none !important;
  opacity: 1 !important;
  transform: scale(1.1);
}

/* Jackpot */
.custom-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 30px;
}

.custom-arrow {
  all: unset;
  background-color: transparent;
  color: #ffd630 !important;
  font-size: 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 0 5px;
  transition: transform 0.2s;
}
.custom-arrow:hover {
  transform: scale(1.2);
}

.custom-indicator {
  all: unset;
  width: 5px !important;
  height: 5px !important;
  border-radius: 50%;
  border: 2px solid #ffd630;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s;
}
.custom-indicator.active {
  background-color: #ffd630;
}

@keyframes marquee-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
