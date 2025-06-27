<template>
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
</template>

<script setup>
import { ref } from 'vue'
import '@/assets/styles/main.css'

const isHovered = ref(false)
</script>

<style>
.main-header,
.announcement-container {
  background-color: #363636;
}

.announcement-container {
  height: 47px;
}

.a-text1 {
  font-size: 13px;
  color: #fff87d;
}

.a-text2 {
  font-size: 12px;
  min-width: 100%;
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
