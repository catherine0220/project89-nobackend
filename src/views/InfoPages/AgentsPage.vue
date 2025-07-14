<template>
  <div>
    <!-- Header -->
    <DynamicHeader />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/agentbanner.jpg" alt="banner" class="banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="content">
      <div class="content-wrapper">
        <h1 class="title">代理</h1>

        <!-- 切换按钮 -->
        <div class="tab-buttons">
          <el-button
            v-for="tab in tabs"
            :key="tab.id"
            :type="activeTab === tab.id ? 'primary' : 'default'"
            @click="activeTab = tab.id"
            class="tab-button"
          >
            {{ tab.label }}
          </el-button>
        </div>

        <!-- 动态内容区域 -->
        <div class="tab-content">
          <CommissionView v-if="activeTab === 'commission'" />
          <CollabView v-if="activeTab === 'collab'" />
          <RegistrationView v-if="activeTab === 'registration'" />
          <ReportView v-if="activeTab === 'report'" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DynamicHeader from '@/views/DynamicHeader.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '@/views/FooterMain.vue'
import CommissionView from '../components/CommissionView.vue'
import RegistrationView from '../components/RegistrationView.vue'
import CollabView from '../components/CollabView.vue'
import ReportView from '../components/ReportView.vue'

const tabs = [
  { id: 'commission', label: '代理佣金' },
  { id: 'collab', label: '合作协议' },
  { id: 'report', label: '登录' },
  { id: 'registration', label: '账户注册' },
]

const activeTab = ref('commission')
</script>

<style scoped>
.title {
  color: #fff;
  margin: 25px 0;
  padding-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
  text-align: left;
}

.content-wrapper {
  width: 1200px;
}

.content {
  position: relative;
  padding: 0 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-buttons {
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
}

/* 所有 tab-button 的默认样式 */
::v-deep(.el-button.tab-button) {
  min-width: 130px;
  height: 40px;
  padding: 0 5px;
  font-size: 15px;
  line-height: 40px;
  border-radius: 50px;
  color: #ffd630;
  border: 1px solid #ffd630;
  background-color: transparent;
  transition: all 0.3s;
}

/* 悬停效果 */
::v-deep(.el-button.tab-button:hover) {
  background-color: #ffd630;
  color: black;
}

/* 激活状态：type="primary" */
::v-deep(.el-button--primary.tab-button) {
  background-color: #ffd630;
  color: black;
  border: 1px solid #ffd630;
}

/* 内容区域 */
.tab-content {
  width: 100%;
  min-height: 400px;
  border-radius: 8px;
}
</style>
