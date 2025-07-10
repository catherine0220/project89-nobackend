<template>
  <div>
    <!-- Header -->
    <DynamicHeader />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/boardbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />

    <!-- Announcement -->
    <GameLobby />

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import DynamicHeader from '@/views/DynamicHeader.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '@/views/FooterMain.vue'
import GameLobby from '../components/GameLobby.vue'
</script>
