<template>
  <div class="transaction-panel">
    <div class="panel-heading">
      <h3>交易历史</h3>
    </div>
    <div class="panel-body">
      <div class="panel-subheading">
        <div class="time-filters">
          <h2>时间</h2>
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="time-filter"
            :class="{ active: activeTab === tab.value }"
            @click="selectTab(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="action-dropdown flex items-center gap-[5px]">
          <h2>分类</h2>
          <el-dropdown trigger="click">
            <el-button type="primary">
              {{ selectedCategory || '选择'
              }}<el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in categoryOptions"
                  :key="item.value"
                  @click="selectCategory(item)"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="empty-message" v-loading="loading">无可用信息</div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

const activeTab = ref('today')
const loading = ref(false)
const selectedCategory = ref('')

const tabs = [
  { label: '今天', value: 'today' },
  { label: '昨天', value: 'yesterday' },
  { label: '7 天内', value: '7days' },
  { label: '30 天内', value: '30days' },
]

const categoryOptions = [
  { label: '存款公司', value: 'deposit' },
  { label: '在线支付', value: 'online_payment' },
  { label: '在线提款', value: 'online_withdrawal' },
  { label: '手动存款和取款', value: 'manual' },
  { label: '促销活动', value: 'promotion' },
  { label: '退款', value: 'refund' },
  { label: '返回佣金', value: 'commission' },
  { label: 'VIP 奖金', value: 'vip_bonus' },
]

function selectTab(value) {
  activeTab.value = value
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

function selectCategory(item) {
  selectedCategory.value = item.label
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<style scoped>
::v-deep(.el-button > span) {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

::v-deep(.el-button) {
  width: 144px;
  height: 34px;
  font-size: 14px;
  color: #555555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

::v-deep(.el-button:hover) {
  width: 144px;
  height: 34px;
  font-size: 14px;
  color: #555555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

::v-deep(.el-button:focus) {
  border-color: #66afe9;
  outline: 0;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

::v-deep(.el-dropdown__popper .el-dropdown-menu) {
  background-color: white;
  color: gray;
  font-size: 12px;
  min-width: 150px;
}

::v-deep(
  .el-dropdown-menu__item:not(.is-disabled):focus,
  .el-dropdown-menu__item:not(.is-disabled):hover
) {
  background-color: rgb(115 115 115);
  color: #ffffff;
}

.transaction-panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
}

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

.panel-subheading {
  height: 51px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #dedede;
}

.panel-subheading h2 {
  margin: 0;
  margin-right: 5px;
  font-size: 14px;
  color: black;
}

.time-filters {
  display: flex;
  gap: 2px;
  align-items: center;
}

.time-filter {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
}

.time-filter.active {
  color: #b73333;
  font-weight: bold;
}

.time-filter:hover {
  background-color: #dedede;
}

.action-dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  padding: 4px 8px;
  color: #555;
  cursor: pointer;
  font-size: 13px;
}

.dropdown-toggle:hover {
  color: #23527c;
}

.caret {
  margin-left: 4px;
  font-size: 10px;
}

.panel-body {
  padding: 15px;
}

.empty-message {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  width: 810px !important;
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
</style>
