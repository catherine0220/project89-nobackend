<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
    <h1 class="text-2xl font-bold mb-4 text-red-500">项目还在研发中</h1>
    <p class="text-gray-700 mb-6">未开发客服服务，请返回。</p>
    <button
      @click="goBack"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
    >
      返回
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* 可根据需要加入额外样式 */
</style>
