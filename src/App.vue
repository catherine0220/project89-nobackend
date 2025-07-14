<template>
  <router-view />
  <LoginModal v-if="modalStore.showLoginModal" @close="modalStore.closeLoginModal" />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modal'
import LoginModal from '@/views/components/LoginModal.vue'

const authStore = useAuthStore()
authStore.initialize()
const modalStore = useModalStore()
</script>

<style>
body {
  background-color: black;
}
</style>
