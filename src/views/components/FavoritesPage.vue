<template>
  <div class="transaction-panel">
    <div class="panel-heading">
      <h3>收藏夹</h3>
    </div>
    <div class="panel-body">
      <h3 class="empty-message1" v-loading="loading">不保存任何数据</h3>
      <span class="empty-message2">快点注册您最喜欢的游戏吧!</span>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-color: #ddd;
  background: #222;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel-heading h3 {
  margin: 0;
  font-size: 21px;
  color: #fff;
}

.panel-body {
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
