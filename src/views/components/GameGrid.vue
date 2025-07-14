<template>
  <div class="slot-game flex-col">
    <span class="slot-game-title">爆炸罐子游戏</span>

    <div class="slot-table" :style="bgStyle">
      <!-- Indicator -->
      <ul class="indicator">
        <template v-for="(tab, index) in tabList" :key="index">
          <!-- 每个 tab -->
          <li
            @click="activeTab = index"
            class="group relative flex flex-col items-center justify-center w-[100px] h-[90px] cursor-pointer transition"
          >
            <!-- 背景图 -->
            <div
              class="w-[60px] h-[40px] bg-no-repeat bg-cover mb-[10px]"
              :style="{
                backgroundImage: `url(${tab.icon_url})`,
                backgroundPosition: activeTab === index ? '0 -40px' : '0 0',
                backgroundSize: '60px 80px',
              }"
            ></div>

            <!-- 名称 -->
            <span
              class="text-[14px] font-semibold transition"
              :class="activeTab === index ? 'text-white' : 'text-[#333]'"
            >
              {{ tab.name }}
            </span>

            <!-- 黄色横线 -->
            <div
              v-if="activeTab === index"
              class="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#ffd630]"
            ></div>
          </li>

          <!-- 在每两个分组之间插入 slotindicator 图 -->
          <img
            v-if="index < tabList.length - 1"
            src="@/assets/images/gamegrid/slotindicator.png"
            alt=""
            class="slot-separator"
          />
        </template>
      </ul>

      <!-- 游戏网格 -->
      <div class="slot-grid">
        <div
          v-for="(game, index) in filteredGames"
          :key="index"
          @click="goToLogin"
          class="game-card"
          @mouseover="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <!-- 游戏图片 -->
          <div class="game-image-container">
            <img :src="game.image_url" alt="game icon" class="game-image" />
          </div>

          <!-- 游戏名称条 -->
          <div class="game-name">
            {{ game.game_name || game.name }}
          </div>

          <!-- Hover 遮罩层 + 按钮 -->
          <div v-if="hoveredIndex === index" class="game-overlay">
            <a class="play-button" :href="game.url" target="_blank">今天开玩</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <LoginModal
    v-if="showLoginModal"
    @close="showLoginModal = false"
    @show-register="
      () => {
        showLoginModal = false
        showRegisterModal = true
      }
    "
  />
  <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import RegisterModal from '@/views/components/RegisterModal.vue'
import bgImg from '@/assets/images/gamegrid/slotgamebg.jpg'
import axios from 'axios'
import fallbackImage from '@/assets/images/placeholder.png'
import LoginModal from '@/views/components/LoginModal.vue'

const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const hoveredIndex = ref(null)
const backendGames = ref([])
const tabList = ref([])
const fallbackImageUrl = new URL(fallbackImage, import.meta.url).href

const activeTab = ref(0)
const gamesPerGroup = 14

const bgStyle = {
  backgroundImage: `url(${bgImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '1900px',
  color: 'white',
}

// Fetch all data from backend
const fetchData = async () => {
  try {
    // 1. First fetch tab data from category 10
    const tabResponse = await axios.get('http://192.168.0.122/silver/user/game_list.php', {
      params: {
        category: 10,
        status: 1,
      },
    })

    if (tabResponse.data.success) {
      const rawTabs = tabResponse.data.data

      rawTabs.sort((a, b) => a.id - b.id) // 如果后端数据有 ID，可以用这个方式排序

      tabList.value = rawTabs.map((tab) => ({
        name: tab.game_name || tab.name || '未知标签',
        icon_url: tab.image_url
          ? `http://192.168.0.122${tab.image_url.startsWith('/') ? '' : '/'}${tab.image_url}`
          : fallbackImageUrl,
      }))
    }

    // 2. Then fetch games for each tab (categories 11+)
    const gameCategories = Array.from({ length: tabList.value.length }, (_, i) => 11 + i)
    const gameRequests = gameCategories.map((category) =>
      axios.get('http://192.168.0.122/silver/user/game_list.php', {
        params: {
          category,
          status: 1,
        },
      }),
    )

    const gameResponses = await Promise.all(gameRequests)

    // Process game responses
    backendGames.value = gameResponses.map((response) => {
      if (response.data.success) {
        return response.data.data.map((game) => ({
          ...game,
          image_url: game.image_url
            ? `http://192.168.0.122${game.image_url.startsWith('/') ? '' : '/'}${game.image_url}`
            : fallbackImageUrl,
          game_name: game.game_name || game.name || '未知游戏',
          // url: (function (a) {
          //   console.log(a)
          // })([game.url, game.game_name]),
          url: `http://192.168.0.122${game.url.startsWith('/') ? '' : '/'}${game.url}`,
        }))
      }
      return []
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    tabList.value = []
    backendGames.value = []
  }
}

const filteredGames = computed(() => {
  if (!backendGames.value[activeTab.value]) return []
  return backendGames.value[activeTab.value].slice(0, gamesPerGroup)
})

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.indicator {
  display: flex;
  justify-content: center;
  max-width: 1200px;
  padding: 0;
  margin: 0 auto 25px;
  list-style: none;
  border-bottom: 2px solid #363636;
  gap: 18px;
}

.indicator-item::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 2px;
  background-color: #ffd630;
}

.slot-separator {
  width: 10px;
  height: 2px;
  margin: 0 8px;
  align-self: center;
  position: relative;
  top: -10px;
}

.slot-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 10px;
  row-gap: 20px;
}

.game-card {
  position: relative;
  width: 160px;
  height: 192px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #1e1e1e;
  transition: all 0.3s ease;
}

.game-image-container {
  width: 135px;
  height: 135px;
  margin: 12px auto;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 32px;
  background: #363636;
  color: #fff;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.game-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid gold;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 104px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #000;
  border-radius: 16px;
  background-color: #ffd630;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.slot-game {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding-bottom: 20px;
  height: 688px;
}

.slot-game-title {
  margin-bottom: 55px;
  font-size: 30px;
  font-weight: bold;
  color: #ffd630;
}

.slot-game-title::before {
  content: '';
  display: inline-block;
  width: 52px;
  height: 36px;
  margin-right: 10px;
  background-image: url('@/assets/images/slotgame.png');
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: middle;
}

.slot-game-title::after {
  content: '';
  display: inline-block;
  width: 52px;
  height: 36px;
  margin-left: 10px;
  background-image: url('@/assets/images/slotgame1.png');
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: middle;
}
</style>
