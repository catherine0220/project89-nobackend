<template>
  <router-view></router-view>
</template>

<script setup>
import { useAuth } from '@/utils/auth'
useAuth()
</script>

<style>
body {
  background-color: black;
}
</style>
