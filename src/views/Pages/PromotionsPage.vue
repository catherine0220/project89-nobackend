<template>
  <div>
    <!-- Header -->
    <DynamicHeader />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/promotionsbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="img">
      <div class="image-gallery">
        <!-- 图片展示区域 -->
        <el-row :gutter="20">
          <el-col v-for="(image, index) in imageList" :key="index" :span="12" :offset="0">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="image.url" class="image-item" />
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import DynamicHeader from '@/views/DynamicHeader.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '@/views/FooterMain.vue'
import { ref } from 'vue'

const imageList = ref([
  { url: new URL('@/assets/images/promo1.png', import.meta.url).href },
  { url: new URL('@/assets/images/promo1.png', import.meta.url).href },
  { url: new URL('@/assets/images/promo1.png', import.meta.url).href },
  { url: new URL('@/assets/images/promo1.png', import.meta.url).href },
  { url: new URL('@/assets/images/promo1.png', import.meta.url).href },
])
</script>

<style scoped>
.img {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-gallery {
  padding: 20px;
  width: 1200px;
}

.image-item {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.el-col {
  margin-bottom: 20px;
}

/* 响应式设计 - 在小屏幕上显示1列 */
@media (max-width: 768px) {
  .el-col {
    width: 100% !important;
  }
}
</style>
