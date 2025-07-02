<template>
  <div class="app">
    <HeaderMain />
    <!-- Banner -->
    <div class="banner w-full">
      <el-carousel trigger="click" height="450px">
        <el-carousel-item v-for="(img, index) in bannerList" :key="index">
          <img :src="img" alt="Banner" class="w-full h-full object-cover" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- Announcement -->
    <ABar />

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
          <!-- 左侧内容 模拟数据（假的）-->
          <div class="w-[580px] h-full flex flex-col justify-center text-white">
            <p class="text-5xl ml-32 mb-0">{{ formattedNumber }}</p>
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
      <div class="mx-auto w-[1200px] flex">
        <div class="ios-wrapper flex flex-col mr-auto h-[410px] w-[750px]">
          <span class="ios-title1">应用下载</span>
          <span class="ios-title2"
            >立即为您的手机下载 89bet
            应用程序以获得更好、更安全的游戏体验，该应用程序支持所有产品：体育、电子竞技、赌场、游戏和彩票。</span
          >
          <div class="iosqr flex items-center">
            <!-- QR1 -->
            <img src="@/assets/images/iosqr1.png" alt="下载二维码" class="qr-img" />

            <div class="qr-info">
              <div class="qr-title">
                <img src="@/assets/images/ios1.png" alt="ios icon" class="w-[31px] h-[38px]" />
                Android
              </div>
              <a href="#" class="qr-btn mr-[50px]"> 立即下载</a>
            </div>
            <!-- QR2 -->
            <img src="@/assets/images/iosqr2.png" alt="下载二维码" class="qr-img" />

            <div class="qr-info">
              <div class="qr-title">
                <img src="@/assets/images/ios2.png" alt="ios icon" class="w-[31px] h-[38px]" />
                IOS
              </div>
              <a href="#" class="qr-btn">立即下载</a>
            </div>
          </div>
        </div>
        <img
          src="@/assets/images/iosphone.png"
          alt="iosphone"
          class="iosphone w-[343px] h-[410px] bg-contain bg-center"
        />
      </div>
    </div>

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import '@/assets/styles/main.css'
import '@/assets/styles/web.css'
import HeaderMain from '@/views/HeaderMain.vue'
import ABar from '@/views/ABar.vue'
import GameGrid from '@/views/components/GameGrid.vue'
import FooterMain from '../FooterMain.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
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

// 模拟会跑的数据 Jackpot
const number = ref(300000.05)
let timer = null

// 格式化数字加逗号（903099.05 -> 903,099.05）
const formattedNumber = computed(() => {
  return number.value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})

// 模拟数字增长
onMounted(() => {
  timer = setInterval(() => {
    const increment = Math.random() * 10 // 0~10之间随机增长
    number.value += increment
  }, 1500) // 每2秒增长一次
})

onUnmounted(() => {
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
</style>
