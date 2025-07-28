<template>
  <div>
    <!-- Header -->
    <DynamicHeader />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/betbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="betpage-container">
      <div class="betpage-wrapper">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(game, index) in category9Games" :key="index" class="image-box">
            <div class="image-wrapper" @click="navigateToGame(game.url)">
              <p class="intro">{{ game.name }}</p>
              <img
                :src="game.image_url"
                :alt="game.name"
                class="betpage-img"
                @error="(e) => (e.target.src = placeholderImage)"
              />
              <el-button
                class="img-button"
                type="primary"
                size="small"
                @click.stop="navigateToGame(game.url)"
              >
                进入游戏
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DynamicHeader from '@/views/DynamicHeader.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '../FooterMain.vue'
import axios from 'axios'
import placeholderImage from '@/assets/images/placeholder.png'

const category9Games = ref([])

const fetchCategory9Games = async () => {
  try {
    const response = await axios.get('https://192.168.0.122/silver/user/game_list.php', {
      params: {
        category: 9,
        status: 1,
      },
    })

    if (response.data.success) {
      category9Games.value = response.data.data
        .map((game) => ({
          name: game.game_name || game.name,
          image_url: game.image_url
            ? `https://192.168.0.122${game.image_url.startsWith('/') ? '' : '/'}${game.image_url}`
            : placeholderImage,
          url: game.url || '#',
        }))
        .reverse()
    }
  } catch (error) {
    console.error('Error fetching category 9 games:', error)
    category9Games.value = []
  }
}

const navigateToGame = (url) => {
  if (url && url !== '#') {
    window.location.href = url
  }
}

onMounted(() => {
  fetchCategory9Games()
})
</script>

<style scoped>
.betpage-container {
  position: relative;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.betpage-wrapper {
  position: relative;
  width: 1200px;
}

.betpage.img {
  position: relative;
  width: 390px;
  height: 250px;
  margin: 10px 0;
  overflow: hidden;
  cursor: pointer;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  cursor: pointer;
}

.image-box {
  margin-bottom: 25px;
}

.betpage-img {
  width: 100%;
  border-radius: 10px;
  display: block;
}

.img-button {
  position: absolute;
  left: 23px;
  bottom: 38px;
  width: 104px;
  height: 32px;
  color: #ffd630;
  border-radius: 16px;
  border: solid 1px #ffd630;
  background-color: transparent;
  font-size: 14px;
}

.image-wrapper:hover .img-button {
  background-color: #ffd630;
  color: black;
  border: solid 1px #ffd630;
}

.image-wrapper:hover .img-button:hover {
  background-color: #ffd630;
  color: black;
  border: solid 1px #ffd630;
}

.intro {
  position: absolute;
  left: 27px;
  bottom: 88px;
  margin: 0;
  color: #fff;
  font-size: 18px;
  z-index: 1;
}
</style>
