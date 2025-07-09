<template>
  <div class="transaction-panel">
    <div class="panel-heading">
      <i
        :class="isCollapsed ? 'fas fa-arrow-circle-right' : 'fas fa-arrow-circle-left'"
        @click="toggleSidebar"
      ></i>
      <h3>收藏夹</h3>
    </div>
    <div class="panel-body">
      <img src="@/assets/images/fav1.png" class="img" />
      <h3 class="empty-message1" v-loading="loading">不保存任何数据</h3>
      <span class="empty-message2">快点注册您最喜欢的游戏吧!</span>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'

const loading = ref(false)
const { isCollapsed, toggle } = inject('sidebar')

const toggleSidebar = () => {
  toggle()
}
</script>

<style scoped>
.transaction-panel {
  border: 1px solid #fff;
  border-radius: 4px;
}
.img {
  height: 83px;
  color: #bfbfbf;
}

.panel-heading {
  position: relative;
  padding: 10px 15px;
  background: #222;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px 5px 0 0;
}

.panel-heading i {
  position: absolute;
  left: 15px;
  cursor: pointer;
  color: white;
  font-size: 20px;
}

.panel-heading h3 {
  margin: 0;
  font-size: 21px;
  color: #fff;
}

.panel-body {
  min-height: 400px;
  padding: 15px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-message1 {
  font-size: 24px;
  font-weight: 500;
  color: #bfbfbf;
  margin-top: 20px;
  margin-bottom: 10px;
}

.empty-message2 {
  color: #bfbfbf;
  font-size: 14px;
  text-align: center;
}
</style>
