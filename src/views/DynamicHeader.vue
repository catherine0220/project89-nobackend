<template>
  <component :is="headerComponent" />
</template>

<script setup>
import { computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import HeaderMain from '@/views/HeaderMain.vue'
import HeaderLogin from '@/views/HeaderLogin.vue'

const auth = useAuthStore()

const headerComponent = computed(() => {
  console.log('isLoggedIn changed:', auth.isLoggedIn)
  return auth.isLoggedIn ? HeaderLogin : HeaderMain
})

watch(
  () => auth.isLoggedIn,
  (newVal) => {
    console.log('isLoggedIn watcher:', newVal)
  },
)
</script>
