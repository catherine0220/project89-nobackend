<template>
  <div class="transaction-panel">
    <div class="panel-heading">
      <i
        :class="isCollapsed ? 'fas fa-arrow-circle-right' : 'fas fa-arrow-circle-left'"
        @click="toggleSidebar"
      ></i>
      <h3>投注历史</h3>
    </div>
    <div class="panel-body">
      <template v-if="isEmpty">
        <img src="@/assets/images/fav1.png" class="img" />
        <h3 class="empty-message1" v-loading="loading">不保存任何数据</h3>
        <span class="empty-message2">快点注册您最喜欢的游戏吧!</span>
      </template>

      <template v-else>
        <div class="betting-content flex">
          <!-- First Section (Betting Time) -->

          <div class="section">
            <div class="checkbox-group">
              <div class="custom-checkbox" @click="toggleBettingDateEnabled">
                <div class="checkbox-inner" :class="{ checked: isBettingDateEnabled }"></div>
              </div>
              <h4 class="section-title">下注时间</h4>
            </div>

            <div class="date-range-picker">
              <el-date-picker
                v-model="bettingStartDate"
                type="datetime"
                placeholder="开始日期时间"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                class="elegant-date-picker"
                :disabled="!isBettingDateEnabled"
                style="margin-right: 10px"
              />
              <span class="date-divide">-</span>
              <el-date-picker
                v-model="bettingEndDate"
                type="datetime"
                placeholder="结束日期时间"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                class="elegant-date-picker"
                :disabled="!isBettingDateEnabled"
              />
            </div>

            <el-checkbox
              v-model="searchUnpaidOnly"
              class="unpaid-checkbox-input"
              :disabled="!isBettingDateEnabled"
            >
              <span class="unpaid-checkbox-label">仅搜索未支付的投注</span>
            </el-checkbox>
          </div>

          <!-- Second Section (Payment Period) -->
          <div class="section">
            <div class="checkbox-group">
              <div class="custom-checkbox" @click="togglePaymentDateEnabled">
                <div class="checkbox-inner" :class="{ checked: isPaymentDateEnabled }"></div>
              </div>
              <h6 class="section-label">付款期</h6>
            </div>

            <div class="date-range-picker">
              <el-date-picker
                v-model="paymentStartDate"
                type="datetime"
                placeholder="开始日期时间"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                class="elegant-date-picker"
                :disabled="!isPaymentDateEnabled"
                style="margin-right: 10px"
              />
              <span class="date-divide">-</span>
              <el-date-picker
                v-model="paymentEndDate"
                type="datetime"
                placeholder="结束日期时间"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                class="elegant-date-picker"
                :disabled="!isPaymentDateEnabled"
              />
            </div>

            <!-- 游戏类型 dropdown 保持不动 -->
            <div class="game-picker flex items-center">
              <h6 class="section-label">游戏类型</h6>
              <el-dropdown trigger="click">
                <el-button type="primary">
                  {{ selectedGameType || '选择' }}
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(gameType, index) in gameTypeOptions"
                      :key="index"
                      @click="selectGameType(gameType)"
                    >
                      {{ gameType }}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="gameTypeOptions.length === 0" disabled>
                      没有最近的游戏资料
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <table class="elegant-table">
          <thead>
            <tr>
              <th class="table-header">游戏名称</th>
              <th class="table-header">付款期</th>
              <th class="table-header">有效投注</th>
              <th class="table-header">减少</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="bets.length === 0">
              <td colspan="4" class="table-data">暂无数据</td>
            </tr>
            <tr v-for="(bet, index) in bets" :key="index">
              <td class="table-data">{{ bet.gameName }}</td>
              <td class="table-data">{{ formatDate(bet.paymentDate) }}</td>
              <td class="table-data">{{ bet.validBet }}</td>
              <td class="table-data">{{ bet.reduction }}</td>
            </tr>
          </tbody>
        </table>

        <div class="divider"></div>

        <div class="summary-text">总计：单{{ total }}</div>

        <div class="disclosure-text">所有信息都已披露</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

// Sidebar 状态
const loading = ref(false)
const { isCollapsed, toggle } = inject('sidebar')
const toggleSidebar = () => toggle()

// 日期区间（默认不启用，不设值）
const bettingStartDate = ref(null)
const bettingEndDate = ref(null)
const paymentStartDate = ref(null)
const paymentEndDate = ref(null)

// 状态控制
const isBettingDateEnabled = ref(false)
const isPaymentDateEnabled = ref(false)
const searchUnpaidOnly = ref(false)

// 禁止同时启用两个
const toggleBettingDateEnabled = () => {
  isBettingDateEnabled.value = !isBettingDateEnabled.value
  if (isBettingDateEnabled.value) {
    isPaymentDateEnabled.value = false
  } else {
    searchUnpaidOnly.value = false // 关闭下注时间时自动取消 unpaid 勾选
  }
}

const togglePaymentDateEnabled = () => {
  isPaymentDateEnabled.value = !isPaymentDateEnabled.value
  if (isPaymentDateEnabled.value) {
    isBettingDateEnabled.value = false
    searchUnpaidOnly.value = false // 确保 unpaid checkbox 被关闭
  }
}

watch(isBettingDateEnabled, (val) => {
  if (!val) {
    bettingStartDate.value = null
    bettingEndDate.value = null
  }
})
watch(isPaymentDateEnabled, (val) => {
  if (!val) {
    paymentStartDate.value = null
    paymentEndDate.value = null
  }
})

// 游戏类型下拉菜单
const gameTypeOptions = ref([]) // 例如 ['百家乐', '龙虎', ...]
const selectedGameType = ref('')
const selectGameType = (gameType) => {
  selectedGameType.value = gameType
}

// 表格数据
const isEmpty = ref(false)
const bets = ref([])
const total = ref(0)

// 日期格式化
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '/')
}
</script>

<style scoped>
:deep(.el-dropdown .el-button) {
  height: 34px;
  width: 180px;
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #dcdfe6;
}

:deep(.el-dropdown-menu) {
  width: 180px !important;
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #dcdfe6;
}

:deep(.el-dropdown-menu__item) {
  color: #000000 !important;
  font-size: 14px;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: #f2f2f2 !important;
  color: #000000 !important;
}

.transaction-panel {
  border: 1px solid #fff;
  border-radius: 4px;
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
}

/* Flex layout */
.betting-content.flex {
  margin: 0;
  padding: 10px 5px;
  border: 1px solid #c0c0c0;
}

.section {
  flex: 1;
  min-width: 1;
  padding-right: 15px;
  padding-left: 15px;
}

/* Checkbox group styles */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

/* Custom checkbox styles */
.custom-checkbox {
  width: 8px;
  height: 8px;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.checkbox-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.2s;
}

.checkbox-inner.checked {
  background-color: #000;
}

/* Enhanced typography */
.section-title {
  font-size: 14px;
  margin: 0px;
  color: #333333;
}

.section-subtitle {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  margin: 12px 0 8px;
}

.section-label {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.content-text {
  font-size: 14px;
  color: #404040;
  line-height: 1.5;
  margin-top: 8px;
}

.divider {
  border-top: 1px solid #e8e8e8;
  margin: 18px 0;
}

.elegant-table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.table-header {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  color: #1a1a1a;
  border-bottom: 2px solid #e8e8e8;
  font-size: 14px;
}

.table-data {
  padding: 10px 12px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13.5px;
}

.summary-text {
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 16px 0;
}

.disclosure-text {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 20px;
}

/* Date range picker container */
.date-range-picker {
  margin-bottom: 12px;
  width: 332px;
  gap: 10px;
}

.date-divide {
  font: 14px;
  color: black;
  margin: 10px;
}

/* Enhanced date picker styling */
:deep(.elegant-date-picker) {
  width: 150px !important;
  margin: 0px;
}

:deep(.elegant-date-picker .el-input__inner) {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: #333;
}

:deep(.el-input) {
  margin: 0px !important;
}

:deep(.elegant-date-picker .el-input__prefix-inner) {
  display: none !important;
}

:deep(.elegant-date-picker .el-input__wrapper) {
  width: 150px !important;
  box-shadow: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  background-color: #fafafa;
  margin: 0px;
}

:deep(.elegant-date-picker .el-input__wrapper:hover) {
  border-color: #409eff;
  background-color: #fff;
}

:deep(.elegant-date-picker .el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  background-color: #fff;
}

/* Unpaid checkbox styles */
.unpaid-checkbox {
  margin-top: 12px;
}

:deep(.unpaid-checkbox-input .el-checkbox__inner) {
  border-color: gray;
  transition: none;
}

:deep(.unpaid-checkbox-input:not(.is-disabled) .el-checkbox__inner:hover) {
  border-color: #000;
}

:deep(.unpaid-checkbox-input .el-checkbox__input.is-checked .el-checkbox__inner) {
  border-color: #000 !important;
  background-color: #333 !important;
}

:deep(.unpaid-checkbox-input .el-checkbox__label) {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333333;
}

:deep(.unpaid-checkbox-input.is-disabled) {
  color: #999 !important;
  opacity: 0.5;
  cursor: not-allowed;
}

:deep(.unpaid-checkbox-input.is-disabled .el-checkbox__label) {
  color: #999 !important;
  cursor: not-allowed;
}

.unpaid-checkbox-label {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #333333;
}

/* Empty state styles */
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

.img {
  height: 83px;
  color: #bfbfbf;
}
</style>
