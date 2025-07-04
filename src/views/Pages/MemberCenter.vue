<template>
  <div>
    <!-- Header -->
    <HeaderLogin />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/agentbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="content">
      <div class="content-wrapper">
        <div class="account-sidebar">
          <div class="account-header">
            <i class="fas fa-user-circle"></i>
            <div class="account-id">帐户 CAT0216</div>
            <div class="account-balance">
              余额： 0
              <i class="fa-solid fa-arrows-rotate"></i>
            </div>
          </div>

          <div class="menu-options">
            <div class="action-buttons">
              <div class="deposit-button">存款</div>
              <div class="withdraw-button">提款</div>
            </div>
            <div class="menu-item">安全设置</div>
            <div class="menu-item">VIP 区</div>
            <div class="menu-item">最新公告</div>
            <div class="menu-item">内部邮件</div>
            <div class="menu-item">活动区域</div>
            <div class="menu-item">交易详情</div>
            <div class="menu-item">投注历史</div>
            <div class="menu-item">退款</div>
            <div class="menu-item">收藏 夹</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import HeaderLogin from '@/views/HeaderLogin.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '@/views/FooterMain.vue'
</script>

<style scoped>
.action-buttons {
  display: flex;
  border-bottom: 1px solid #eee;
}

.deposit-button {
  border-right: 1px solid #eee;
}

.deposit-button,
.withdraw-button {
  flex: 1;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.account-sidebar {
  width: 300px;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.account-header {
  padding: 20px;
  background-color: #3b3b3b;
  border-bottom: 1px solid black;
}

.account-id {
  margin: 10px 0;
  font-weight: bold;
  font-size: 15px;
}

.account-balance {
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
}

.menu-options {
  padding: 10px 0;
  background-color: #333;
}

.menu-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover,
.deposit-button:hover,
.withdraw-button:hover {
  color: black;
  background: linear-gradient(to bottom, #fffa74, #d7aa32);
}

.fa-user-circle {
  font-size: 60px;
}

.content-wrapper {
  width: 1200px;
}

.content {
  position: relative;
  padding: 30px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fa-arrows-rotate {
  @apply text-yellow-300;
  padding: 5px 10px;
  padding-left: 0px;
}
</style>
