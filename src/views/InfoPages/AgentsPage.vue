<template>
  <div>
    <!-- Header -->
    <HeaderMain />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/agentbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="content">
      <div class="content-wrapper">
        <h1 class="title">代理</h1>
      </div>
    </div>
    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import HeaderMain from '@/views/HeaderMain.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '@/views/FooterMain.vue'
</script>

<style>
.title {
  color: #fff;
  margin: 0 0 25px;
  padding-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
  text-align: left;
}

.content-wrapper {
  width: 1200px;
}

.content {
  position: relative;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
