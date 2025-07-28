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
          <el-col
            v-for="(promo, index) in category3Promotions"
            :key="index"
            :span="12"
            :offset="0"
            @click="navigateToPromo(promo.url)"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img
                :src="promo.image_url"
                class="image-item"
                @error="(e) => (e.target.src = placeholderImage)"
              />
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
import { ref, onMounted } from 'vue'
import DynamicHeader from '@/views/DynamicHeader.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '@/views/FooterMain.vue'
import axios from 'axios'
import placeholderImage from '@/assets/images/placeholder.png'

const category3Promotions = ref([])

// Fetch category 3 promotions
const fetchCategory3Promotions = async () => {
  try {
    const response = await axios.get('https://192.168.0.122/silver/user/game_list.php', {
      params: {
        category: 3,
        status: 1,
      },
    })

    if (response.data.success) {
      category3Promotions.value = response.data.data
        .map((promo) => ({
          image_url: promo.image_url
            ? `https://192.168.0.122${promo.image_url.startsWith('/') ? '' : '/'}${promo.image_url}`
            : placeholderImage,
          url: promo.url || '#',
        }))
        .reverse()
    }
  } catch (error) {
    console.error('Error fetching category 3 promotions:', error)
    category3Promotions.value = []
  }
}

const navigateToPromo = (url) => {
  if (url && url !== '#') {
    window.location.href = url
  }
}

onMounted(() => {
  fetchCategory3Promotions()
})
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
  cursor: pointer;
}

@media (max-width: 768px) {
  .el-col {
    width: 100% !important;
  }
}
</style>
