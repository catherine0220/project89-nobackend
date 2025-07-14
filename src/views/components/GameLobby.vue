how?:
<template>
  <div class="lobby-container">
    <div class="lobby-wrapper">
      <ul class="lobby-list">
        <li v-for="(game, index) in category19Games" :key="index" class="lobby-item">
          <div
            class="lobby-card"
            :class="{ active: activeLobbyName === game.name }"
            @click="navigateToGame(game.path, index, game.name)"
          >
            <!-- 加在这里！ -->
            <img
              class="lobby-image"
              :src="game.image_url"
              :alt="game.name"
              @error="(e) => (e.target.src = placeholderImage)"
            />
            <div class="lobby-title">{{ game.name }}</div>
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

      <div class="flex flex-col items-center justify-center" ref="wrapperRef">
        <!-- 游戏介绍 -->
        <div v-if="activeCategory === 1" class="flex flex-col items-center justify-center">
          <h1 class="headline">
            <span class="headline-title">游戏介绍</span>
            <a :href="firstPlayUrl" target="_blank" class="more-games-button">
              <el-icon><CaretRight /></el-icon> 更多游戏
            </a>
          </h1>

          <div class="game-carousel-container">
            <div class="carousel-wrapper" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
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
                        <div class="logo-container">
                          <img
                            :src="game.image_url"
                            :alt="game.name"
                            class="gamelogo"
                            @error="(e) => (e.target.src = placeholderImage)"
                          />
                          <div class="logo-overlay"></div>
                          <a class="play-button" :href="game.url">PLAY</a>
                        </div>
                        <div class="game-title-container">
                          <h3 class="game-title">{{ game.name }}</h3>
                          <i class="heart-icon fa-regular fa-heart"></i>
                        </div>
                        <span class="game-description">{{ game.description }}</span>
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
        </div>

        <!-- 热门游戏 -->
        <h1 class="headline" v-if="activeCategory === 1">
          <span class="headline-title">热门游戏</span>
          <a :href="firstPlayUrl" target="_blank" class="more-games-button">
            <el-icon><CaretRight /></el-icon> 更多游戏
          </a>
        </h1>

        <div class="game-grid-container">
          <div class="game-grid">
            <div v-for="(game, gameIndex) in visibleHotGames" :key="gameIndex" class="game-card2">
              <div class="game-header">
                <div class="logo-container">
                  <img
                    :src="game.image_url"
                    :alt="game.name"
                    class="gamelogo2"
                    @error="(e) => (e.target.src = placeholderImage)"
                  />
                  <div class="logo-overlay"></div>
                  <a class="play-button" :href="game.url">PLAY</a>
                </div>
                <div class="game-title-container">
                  <h3 class="game-title2">{{ game.name }}</h3>
                  <i class="heart-icon fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Custom pagination controls -->
          <div class="hot-games-pagination">
            <button
              class="pagination-btn first"
              @click="goToFirstPage"
              :disabled="currentHotPage === 1"
            >
              <i class="fa-solid fa-backward-step"></i>
            </button>
            <button
              class="pagination-btn prev"
              @click="prevHotPage"
              :disabled="currentHotPage === 1"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="page-indicator">{{ currentHotPage }}/{{ totalHotPages }}</div>
            <button
              class="pagination-btn next"
              @click="nextHotPage"
              :disabled="currentHotPage === totalHotPages"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
            <button
              class="pagination-btn last"
              @click="goToLastPage"
              :disabled="currentHotPage === totalHotPages"
            >
              <i class="fa-solid fa-forward-step"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import placeholderImage from '@/assets/images/placeholder.png'
import axios from 'axios'

const category19Games = ref([])
const category7Games = ref([])
const category8Games = ref([])

const activeLobbyName = ref('Pg电子')
const wrapperRef = ref(null)

const firstPlayUrl = computed(() => {
  return category7Games.value.length > 0 ? category7Games.value[0].url : '#'
})

// 🟡 后端 category ID 对应配置
const categories = ref([
  { id: 1, name: '最热游戏', backend: [8, 9] },
  { id: 2, name: '所有游戏', backend: [21] },
  { id: 3, name: '最新游戏', backend: [22] },
  { id: 4, name: '电子游戏', backend: [23] },
  { id: 5, name: '其他游戏', backend: [24] },
])

const activeCategory = ref(1)
const showGameIntro = ref(true)

const fetchCategory19Games = async () => {
  try {
    const res = await axios.get('http://192.168.0.122/silver/user/game_list.php', {
      params: { category: 19, status: 1 },
    })

    if (res.data.success) {
      const games = res.data.data
        .map((game) => ({
          name: game.game_name || game.name,
          image_url: game.image_url
            ? `http://192.168.0.122${game.image_url.startsWith('/') ? '' : '/'}${game.image_url}`
            : placeholderImage,
          path: game.path || '#',
        }))
        .reverse()

      category19Games.value = games
      const pg = games.find((g) => g.name.includes('Pg电子'))
      activeLobbyName.value = pg ? pg.name : games[0]?.name || 'Pg电子'
    }
  } catch (err) {
    console.error('加载 category 19 失败', err)
  }
}

const fetchGamesByCategory = async (categoryId) => {
  try {
    const res = await axios.get('http://192.168.0.122/silver/user/game_list.php', {
      params: { category: categoryId, status: 1 },
    })

    if (res.data.success) {
      return res.data.data.map((game) => ({
        name: game.game_name || game.name,
        image_url: game.image_url
          ? `http://192.168.0.122${game.image_url.startsWith('/') ? '' : '/'}${game.image_url}`
          : placeholderImage,
        description: game.description || '暂无描述',
        path: game.path || '#',
        url: game.url
          ? `http://192.168.0.122${game.url.startsWith('/') ? '' : '/'}${game.url}`
          : '#',
      }))
    }
  } catch (err) {
    console.error(`加载 category ${categoryId} 失败`, err)
  }
  return []
}

const selectCategory = async (id) => {
  activeCategory.value = id
  showGameIntro.value = id === 1

  let loading = null
  if (wrapperRef.value) {
    loading = ElLoading.service({
      target: wrapperRef.value,
      text: '加载中...',
      background: 'rgba(255,255,255,0.8)',
    })
  }

  try {
    const selected = categories.value.find((cat) => cat.id === id)
    if (!selected) return

    if (id === 1) {
      const list7 = await fetchGamesByCategory(7)
      const list8 = await fetchGamesByCategory(8)
      category7Games.value = list7
      category8Games.value = list8
    } else {
      let results = []
      for (const realId of selected.backend) {
        const list = await fetchGamesByCategory(realId)
        results.push(...list)
      }
      category8Games.value = results
    }
  } catch (err) {
    console.error('分类加载失败', err)
  } finally {
    loading?.close()
  }
}

// ➤ 点击游戏进入
const navigateToGame = (path, index, name) => {
  activeLobbyName.value = name
  if (path && path !== '#') {
    window.location.href = path
  }
}

// 热门游戏分页
const currentHotPage = ref(1)
const gamesPerPage = 10
const totalHotPages = computed(() => Math.ceil(category8Games.value.length / gamesPerPage))
const visibleHotGames = computed(() => {
  const start = (currentHotPage.value - 1) * gamesPerPage
  return category8Games.value.slice(start, start + gamesPerPage)
})
const nextHotPage = () => currentHotPage.value++
const prevHotPage = () => currentHotPage.value--
const goToFirstPage = () => (currentHotPage.value = 1)
const goToLastPage = () => (currentHotPage.value = totalHotPages.value)

// 游戏介绍轮播图
const gameGroups = ref([])
const currentIndex = ref(0)
let autoPlayInterval = null

const initGroups = () => {
  const groups = []
  for (let i = 0; i < category7Games.value.length; i += 5) {
    groups.push(category7Games.value.slice(i, i + 5))
  }
  gameGroups.value = groups
}
watch(category7Games, initGroups)

const nextSlide = () => {
  if (gameGroups.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % gameGroups.value.length
    resetAutoPlay()
  }
}
const prevSlide = () => {
  if (gameGroups.value.length > 0) {
    currentIndex.value =
      (currentIndex.value - 1 + gameGroups.value.length) % gameGroups.value.length
    resetAutoPlay()
  }
}
const goToSlide = (index) => {
  if (index >= 0 && index < gameGroups.value.length) {
    currentIndex.value = index
    resetAutoPlay()
  }
}

const startAutoPlay = () => {
  stopAutoPlay()
  if (gameGroups.value.length > 1) {
    autoPlayInterval = setInterval(() => nextSlide(), 5000)
  }
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

onMounted(() => {
  fetchCategory19Games()
  selectCategory(1)
  startAutoPlay()
})
onUnmounted(() => stopAutoPlay())
</script>

<style scoped>
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

.game-card:hover,
.game-card2:hover {
  color: #fff;
  background-color: #ff1c4f;
}

/* Logo容器样式 */
.logo-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

/* Logo图片样式 */
.gamelogo,
.gamelogo2 {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 5px;
}

/* Logo遮罩层 */
.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  align-items: center;
}

/* Play按钮样式 */
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 30px;
  width: 100px;
  transform: translate(-50%, -50%);
  background-color: #ff1c4f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

/* 悬停效果 */
.game-card:hover .logo-overlay,
.game-card2:hover .logo-overlay {
  opacity: 1;
}

.game-card:hover .play-button,
.game-card2:hover .play-button {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
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

.game-description {
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

/* Hot games pagination styles */
.hot-games-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
}

.pagination-btn {
  width: 40px;
  height: 30px;
  background: #000;
  color: white;
  border: none;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #ff1c4f;
}

.page-indicator {
  width: 60px;
  height: 30px;
  background: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

/* Specific button styles */
.pagination-btn.first {
  border-radius: 5px 0 0 5px;
}

.pagination-btn.last {
  border-radius: 0 5px 5px 0;
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
  color: #000;
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
  min-height: 80px;
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
  justify-content: center;
  cursor: pointer;
}

.lobby-item {
  display: flex;
  align-items: center;
}

.lobby-card:hover,
.lobby-card.active {
  background: #ffd630;
}

.lobby-image {
  width: 60px;
  height: 40px;
  margin-right: 25px;
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
