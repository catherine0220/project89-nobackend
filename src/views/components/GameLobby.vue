<template>
  <div class="lobby-container">
    <div class="lobby-wrapper">
      <ul class="lobby-list">
        <li v-for="(game, index) in electronicGames" :key="index" class="lobby-item">
          <div class="lobby-card">
            <img :src="gameImages[game] || placeholderImage" :alt="game" class="lobby-image" />
            <div class="lobby-title">{{ game }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="lobby-wrapper2">
      <div class="header flex justify-center">
        <div class="header-wrap">
          <img src="@/assets/images/lobbylogo.png" alt="lobbylogo" class="lobbylogo" />
          <div class="search">
            <input type="text" placeholder="搜索游戏" class="search-input" />
            <i class="fa-solid fa-search search-icon"></i>
          </div>
        </div>
      </div>

      <!-- nav -->
      <div class="game-categories">
        <ul class="category-list">
          <li
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            :class="{ active: activeCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <a href="#" class="category-link" @click.prevent>
              {{ category.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="flex flex-col items-center justify-center">
        <!-- 游戏介绍 -->
        <h1 class="headline">
          <span class="headline-title">游戏介绍</span>
          <router-link to="/more-games" class="more-games-button">
            <el-icon><CaretRight /></el-icon> 更多游戏
          </router-link>
        </h1>

        <div class="game-carousel-container">
          <div class="carousel-wrapper">
            <button class="carousel-arrow left" @click="prevSlide">
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div
              class="carousel-slides"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div v-for="(group, index) in gameGroups" :key="index" class="game-row">
                <div
                  v-for="(game, gameIndex) in group"
                  :key="gameIndex"
                  class="game-carousel-container"
                >
                  <div class="game-card">
                    <div class="game-header">
                      <img src="@/assets/images/gamelobby.gif" alt="gamelogo" class="gamelogo" />
                      <div class="game-title-container">
                        <h3 class="game-title">{{ game.name }}</h3>
                        <i class="heart-icon fa-regular fa-heart"></i>
                      </div>
                      <span class="game-code">{{ game.code }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="carousel-arrow right" @click="nextSlide">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div class="carousel-indicators">
            <button
              v-for="(group, index) in gameGroups"
              :key="index"
              class="indicator"
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>

        <!-- 热门游戏 -->
        <h1 class="headline">
          <span class="headline-title">热门游戏</span>
          <router-link to="/more-games" class="more-games-button">
            <el-icon><CaretRight /></el-icon> 更多游戏
          </router-link>
        </h1>

        <div class="game-grid-container">
          <div class="game-grid">
            <div v-for="(game, gameIndex) in hotGames" :key="gameIndex" class="game-card2">
              <div class="game-header">
                <img src="@/assets/images/gamelobby1.png" alt="gamelogo" class="gamelogo2" />
                <div class="game-title-container">
                  <h3 class="game-title2">{{ game.name }}</h3>
                  <i class="heart-icon fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import placeholderImage from '@/assets/images/placeholder.png'

// 静态导入所有游戏图片
import pcImage from '@/assets/images/placeholder.png'
import jiliImage from '@/assets/images/placeholder.png'
// 导入其他游戏图片...

const electronicGames = [
  'PC 电子',
  '吉利电子',
  'FG 电子',
  'PC 电子',
  '吉利电子',
  'FG 电子',
  // ...其他游戏名称
]

// 游戏图片映射
const gameImages = {
  'PC 电子': pcImage,
  吉利电子: jiliImage,
  // ...其他游戏图片映射
}

// nav
const categories = ref([
  { id: 1, name: '最热游戏' },
  { id: 2, name: '所有游戏' },
  { id: 3, name: '最新游戏' },
  { id: 4, name: '电子游戏' },
  { id: 5, name: '其他游戏' },
])

const activeCategory = ref(1)

// 方法
const selectCategory = (id) => {
  activeCategory.value = id
  // 可以在这里触发获取对应分类的游戏列表
  // emit('category-change', id)
}

// Game data
const games = ref([
  {
    name: 'Gigi Thieu Trò Chơi',
    code: 'MAYA 5',
    description: 'Thành phố vàng Maya 5',
    tags: ['CODE (GT)', 'YGR'],
  },
  {
    name: 'METT TONK',
    code: 'SELF-POWER',
    description: 'Tự Rút Mạt Chư ợc 3',
    tags: ['INFLUENCE', 'VA'],
  },
  {
    name: 'Natural Ace',
    code: 'Askine',
    description: 'AMA',
    tags: ['CODE (GT)'],
  },
  {
    name: 'Thành phố vàng Maya 4',
    code: 'YGR',
    description: 'Huyền thoại Inca',
    tags: ['LEGEND', 'OBITNESS', 'FC'],
  },
  {
    name: 'Gigi Thieu Trò Chơi',
    code: 'MAYA 5',
    description: 'Thành phố vàng Maya 5',
    tags: ['CODE (GT)', 'YGR'],
  },
  {
    name: 'METT TONK',
    code: 'SELF-POWER',
    description: 'Tự Rút Mạt Chư ợc 3',
    tags: ['INFLUENCE', 'VA'],
  },
  {
    name: 'Natural Ace',
    code: 'Askine',
    description: 'AMA',
    tags: ['CODE (GT)'],
  },
  {
    name: 'Thành phố vàng Maya 4',
    code: 'YGR',
    description: 'Huyền thoại Inca',
    tags: ['LEGEND', 'OBITNESS', 'FC'],
  },
  {
    name: 'Game 9',
    code: 'CODE9',
    description: 'Description 9',
    tags: ['TAG1', 'TAG2'],
  },
  {
    name: 'Game 10',
    code: 'CODE10',
    description: 'Description 10',
    tags: ['TAG1', 'TAG2'],
  },
])

// Hot games data (for the grid)
const hotGames = ref([
  {
    name: 'Hot Game 1',
    // code: 'HOT1',
    description: 'Popular game 1',
    tags: ['HOT', 'NEW'],
  },
  {
    name: 'Hot Game 2',
    // code: 'HOT2',
    description: 'Popular game 2',
    tags: ['HOT', 'TRENDING'],
  },
  {
    name: 'Hot Game 3',
    // code: 'HOT3',
    description: 'Popular game 3',
    tags: ['HOT', 'FEATURED'],
  },
  {
    name: 'Hot Game 4',
    // code: 'HOT4',
    description: 'Popular game 4',
    tags: ['HOT', 'NEW'],
  },
  {
    name: 'Hot Game 5',
    // code: 'HOT5',
    description: 'Popular game 5',
    tags: ['HOT', 'TRENDING'],
  },
  {
    name: 'Hot Game 6',
    // code: 'HOT6',
    description: 'Popular game 6',
    tags: ['HOT', 'FEATURED'],
  },
  {
    name: 'Hot Game 7',
    // code: 'HOT7',
    description: 'Popular game 7',
    tags: ['HOT', 'NEW'],
  },
  {
    name: 'Hot Game 8',
    // code: 'HOT8',
    description: 'Popular game 8',
    tags: ['HOT', 'TRENDING'],
  },
  {
    name: 'Hot Game 9',
    // code: 'HOT9',
    description: 'Popular game 9',
    tags: ['HOT', 'FEATURED'],
  },
  {
    name: 'Hot Game 10',
    // code: 'HOT10',
    description: 'Popular game 10',
    tags: ['HOT', 'NEW'],
  },
])

// Carousel logic for 游戏介绍
const gameGroups = ref([])
const currentIndex = ref(0)
let autoPlayInterval = null

// Initialize groups
const initGroups = () => {
  const groups = []
  for (let i = 0; i < games.value.length; i += 5) {
    groups.push(games.value.slice(i, i + 5))
  }
  gameGroups.value = groups
}

// Navigation methods
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % gameGroups.value.length
  resetAutoPlay()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + gameGroups.value.length) % gameGroups.value.length
  resetAutoPlay()
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoPlay()
}

// Auto-play control
const startAutoPlay = () => {
  stopAutoPlay()
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

// Lifecycle hooks
onMounted(() => {
  initGroups()
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* game */
.more-games-button {
  color: #000;
  font-size: 15px;
  line-height: 30px;
  text-decoration: none;
  padding: 0 15px;
}

.headline {
  width: 850px;
  height: 30px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.headline-title {
  display: inline-block;
  vertical-align: top;
  padding: 0 15px;
  color: #fff;
  font-size: 15px;
  line-height: 30px;
  background: #000;
  border-radius: 8px 8px 0 0;
}

/* Original carousel styles */
.game-carousel-container {
  height: 290px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  justify-items: center;
  width: 1000px;
}

.carousel-slides {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.game-row {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  width: 100% !important;
  gap: 5px;
}

.game-col {
  display: flex;
  position: relative;
  align-items: center;
  flex: 0 0 calc(20% - 10px);
}

/* New grid styles for 热门游戏 */
.game-grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 850px;
  margin-bottom: 20px;
}

.game-card,
.game-card2 {
  position: relative;
  margin: 5px;
  vertical-align: top;
  color: #000;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #000;
  border-radius: 10px;
}

.game-card {
  width: 160px !important;
}

.game-card2 {
  width: 150px !important;
}

.game-header {
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 10px 5px;
}

.game-title-container {
  display: flex;
  align-items: top;
  position: relative;
  padding: 10px 5px 10px;
  margin: auto;
  width: 145px;
  height: 55px;
}

.heart-icon {
  padding-top: 5px;
}

.game-title,
.game-title2 {
  display: flex;
  align-items: top;
  font-size: 16px;
  font-weight: normal;
  margin: 0px;
  margin-right: 5px;
  margin-bottom: 5px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-title {
  width: 135px;
}

.game-title2 {
  width: 110px;
}

.game-code {
  border: 0;
  color: #bfbfbf;
  margin: 0;
  padding: 0;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play-button {
  background: #ffd630;
  color: #000;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  margin-top: auto;
  align-self: center;
  transition: all 0.3s;
  width: 100%;
}

.play-button:hover {
  background: #ffea8a;
  transform: translateY(-2px);
}

/* 轮播箭头样式 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #ededed;
  color: #fff;
  font-size: 27px;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.7);
}

.carousel-arrow.left {
  left: 10px;
}

.carousel-arrow.right {
  right: 10px;
}

/* 轮播指示器样式 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #9e9e9e;
  border: none;
  margin: 0 5px;
  cursor: pointer;
  padding: 0;
}

.indicator.active {
  background: #000;
}

/* search */
.search-icon {
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.search {
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  background: #000;
  border-radius: 3px;
  padding: 5px;
  box-sizing: border-box;
}

.search-input {
  width: 150px;
  height: 100%;
  font-size: 14px;
  color: #fff;
  background: #fff;
  border: none;
  outline: none;
  padding: 0;
  padding-left: 10px;
  margin-right: 8px;
}

.header-wrap {
  width: 850px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lobby-container {
  position: relative;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lobby-wrapper,
.lobby-wrapper2 {
  position: relative;
  width: 1200px;
  min-height: 480px;
  padding: 30px;
  margin-bottom: 0;
}

.lobby-wrapper {
  background: #363636;
  border-radius: 10px 10px 0 0;
}

.lobby-wrapper2 {
  background: #fff;
  padding-top: 0px;
}

.lobby-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-items: end;
}

.lobby-card {
  width: 185px;
  height: 60px;
  margin: 5px 0;
  background: linear-gradient(to bottom, #fff 0, #ededed 100%);
  border: 3px solid transparent;
  border-radius: 6px;
  box-sizing: border-box;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.lobby-item {
  display: flex;
  align-items: center;
}

.lobby-card:hover {
  background: #ffd630;
}

.lobby-image {
  width: 60px;
  height: 40px;
  object-fit: contain;
}

.lobby-title {
  color: black;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  word-break: break-word;
}

/* nav */
.game-categories {
  margin-bottom: 15px;
  min-height: 50px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: inline-block;
  padding: 5px 15px;
  color: #fff;
  font-size: 15px;
  line-height: 30px;
}

.category-link {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  padding: 0 15px;
  display: flex;
  align-items: center;
  position: relative;
}

.category-link:hover {
  background: #ff1c4f;
  border-radius: 15px;
}

/* 当前选中项样式 */
.category-item.active .category-link {
  background: #ff1c4f;
  border-radius: 15px;
}

/* 游戏数量标签 */
.item-count {
  background: #ffd630;
  color: #000;
  font-size: 12px;
  border-radius: 10px;
  padding: 2px 6px;
  margin-left: 8px;
  font-weight: bold;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .category-list {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 10px;
  }

  .category-item {
    margin: 5px 10px;
  }
}
</style>
