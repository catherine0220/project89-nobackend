<template>
  <div>
    <!-- Header -->
    <HeaderMain />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/betbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="betpage-container">
      <div class="betpage-wrapper">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(img, index) in 1" :key="index" class="image-box">
            <div class="image-wrapper">
              <p class="intro">SE 赌</p>
              <img src="@/assets/images/bet1.png" class="betpage-img" />
              <el-button class="img-button" type="primary" size="small">进入游戏</el-button>
            </div>
          </el-col>

          <el-col :span="8" v-for="(img, index) in 1" :key="index" class="image-box">
            <div class="image-wrapper">
              <p class="intro">SE 赌</p>
              <img src="@/assets/images/bet1.png" class="betpage-img" />
              <el-button class="img-button" type="primary" size="small">进入游戏</el-button>
            </div>
          </el-col>

          <el-col :span="8" v-for="(img, index) in 1" :key="index" class="image-box">
            <div class="image-wrapper">
              <p class="intro">SE 赌</p>
              <img src="@/assets/images/bet1.png" class="betpage-img" />
              <el-button class="img-button" type="primary" size="small">进入游戏</el-button>
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
import HeaderMain from '@/views/HeaderMain.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '../FooterMain.vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()

// function goToGame(index) {
//   // 根据 index 跳转不同页面
//   const paths = ['/casino/baccarat', '/casino/roulette', '/casino/blackjack']
//   router.push(paths[index])
// }
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

/* 鼠标移入时按钮样式 */
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
