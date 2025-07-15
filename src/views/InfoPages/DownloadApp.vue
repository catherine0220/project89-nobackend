<template>
  <div class="promo">
    <!-- Header -->
    <div class="promo-header">
      <div class="promo-wrapper">
        <router-link to="/" class="logo-container">
          <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
        </router-link>
      </div>
    </div>

    <!-- Content -->
    <div class="promo-content">
      <div class="promo-wrapper flex justify-between">
        <div class="text-block w-[50%]">
          <h1 class="title">立即下载 89BET 应用程序</h1>
          <p>
            立即为您的手机下载 89bet
            应用程序以获得更好、更安全的游戏体验，该应用程序支持所有产品：体育、电子竞技、赌场、游戏和彩票。
          </p>
          <div class="qr-container flex flex-col lg:flex-row items-center">
            <div class="qr1 flex flex-col justify-center items-center mr-[20px]">
              <img src="@/assets/images/iosqr1.png" alt="QR" class="qr" />
              <button class="btn btn-outline-light mb-4 me-lg-3">
                <i class="fab fa-android"></i>Andriod
              </button>
            </div>
            <div class="qr1 flex flex-col justify-center items-center mr-[20px]">
              <img src="@/assets/images/iosqr2.png" alt="QR" class="qr" />
              <button class="btn btn-outline-light mb-4 me-lg-3">
                <i class="fab fa-apple"></i>IOS
              </button>
            </div>
          </div>
        </div>
        <div class="image-block w-[40%]">
          <img :src="iosphone" width="70%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import iosphone from '@/assets/images/iosphone.png'
</script>

<style scoped>
.fa-brands,
.fab {
  font-size: 15px;
  margin-right: 10px;
}

.qr {
  width: 150px;
  height: 150px;
  margin-bottom: 16px;
}

.btn {
  width: 190px;
  height: 37px;
  font-size: 15px;
  color: #ffd630;
  border: 1px solid #ffd630;
  border-radius: 19px;
  background-color: transparent;
  cursor: pointer;
}

.p {
  margin-top: 0;
  margin-bottom: 16px;
}

.title {
  color: #ffd630;
  padding-top: 10px;
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 10px;
}
.promo {
  min-height: 100vh;
  color: #fff;
  background-color: #363636;
}

.promo-header {
  height: 90px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
  position: relative;
}

.promo-content {
  height: auto;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.promo-wrapper {
  width: 1320px;
}

.logo {
  width: 140px;
  cursor: pointer;
}
</style>
