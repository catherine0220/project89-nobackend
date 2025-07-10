<template>
  <component :is="headerComponent" />
</template>

<script setup>
import { computed, watch } from 'vue'
import { useAuth } from '@/utils/auth'
import HeaderMain from '@/views/HeaderMain.vue'
import HeaderLogin from '@/views/HeaderLogin.vue'

const auth = useAuth()

const headerComponent = computed(() => {
  console.log('isLoggedIn changed:', auth.isLoggedIn.value)
  return auth.isLoggedIn.value ? HeaderLogin : HeaderMain
})

// 添加 watch 调试
watch(
  () => auth.isLoggedIn.value,
  (newVal) => {
    console.log('isLoggedIn watcher:', newVal)
  },
)
</script>
