<template>
  <div class="betting-transaction-panel">
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
            <div class="game-picker">
              <h6 class="section-label">游戏类型</h6>
              <el-dropdown trigger="click">
                <el-button type="primary">
                  {{ selectedGameType || '选择' }}
                  <!-- 显示选中项或默认"选择" -->
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

        <div class="divider">
  <button class="search" @click="handleSearch" :disabled="isLoading">
    <span v-if="!isLoading">搜索</span>
    <i v-else class="el-icon-loading"></i>
  </button>
</div>

        <table class="elegant-table">
    <div class="table-h-container">
      <div class="table-row">
        <div class="table-header" style="text-align: left; width: 25%;">游戏名称</div>
        <div class="table-header" style="text-align: left; width: 25%;">付款期</div>
        <div class="table-header" style="text-align: right; width: 25%;">有效投注</div>
        <div class="table-header" style="text-align: right; width: 25%;">减少</div>
      </div>
      
      <!-- 显示加载状态 -->
      <div v-if="isLoading" class="table-row">
        <div class="table-data" colspan="4" style="text-align: center;">
          <el-icon><Loading /></el-icon> 加载中...
        </div>
      </div>
      
      <!-- 显示实际数据 -->
      <template v-else>
        <div class="table-row" v-for="(bet, index) in bets" :key="index">
          <div class="table-data" style="text-align: left; width: 25%;">{{ bet.gameName }}</div>
          <div class="table-data" style="text-align: left; width: 25%;">{{ formatDate(bet.paymentDate) }}</div>
          <div class="table-data" style="text-align: right; width: 25%;">{{ bet.validBet }}</div>
          <div class="table-data" style="text-align: right; width: 25%;">{{ bet.reduction }}</div>
        </div>
        
        <!-- 总计行 -->
        <div class="table-row">
          <div class="table-data" style="text-align: left; width: 25%;">
            总计：{{ bets.length }} 订单
          </div>
          <div class="table-data" style="text-align: left; width: 25%;">-</div>
          <div class="table-data" style="text-align: right; width: 25%;">
            {{ totalValidBets }}
          </div>
          <div class="table-data" style="text-align: right; width: 25%;">
            {{ totalReduction }}
          </div>
        </div>
      </template>
    </div>
  </table>

        <div class="disclosure-text">
          <i v-if="isLoading" class="el-icon-loading"></i>
          {{ isLoading ? '读取数据...' : '所有信息都已披露' }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { ArrowDown, Loading } from '@element-plus/icons-vue'

// Sidebar 状态
const loading = ref(false)
const { isCollapsed, toggle } = inject('sidebar')
const toggleSidebar = () => toggle()

// 加载状态
const isLoading = ref(false)

// 日期区间
const bettingStartDate = ref(null)
const bettingEndDate = ref(null)
const paymentStartDate = ref(null)
const paymentEndDate = ref(null)

// 状态控制
const isBettingDateEnabled = ref(false)
const isPaymentDateEnabled = ref(false)
const searchUnpaidOnly = ref(false)

// 游戏类型
const gameTypeOptions = ref(['百家乐', '龙虎', '轮盘', '骰宝'])
const selectedGameType = ref('')

// 表格数据
const isEmpty = ref(false)
const bets = ref([])
const total = ref(0)

// 计算属性
const totalValidBets = computed(() => {
  return bets.value.reduce((sum, bet) => sum + (parseFloat(bet.validBet) || 0), 0)
})

const totalReduction = computed(() => {
  return bets.value.reduce((sum, bet) => sum + (parseFloat(bet.reduction) || 0), 0)
})

// 切换函数
const toggleBettingDateEnabled = () => {
  isBettingDateEnabled.value = !isBettingDateEnabled.value
  if (isBettingDateEnabled.value) {
    isPaymentDateEnabled.value = false
  } else {
    searchUnpaidOnly.value = false
  }
}

const togglePaymentDateEnabled = () => {
  isPaymentDateEnabled.value = !isPaymentDateEnabled.value
  if (isPaymentDateEnabled.value) {
    isBettingDateEnabled.value = false
    searchUnpaidOnly.value = false
  }
}

// 监听器
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

// 选择游戏类型
const selectGameType = (gameType) => {
  selectedGameType.value = gameType
}

// 搜索函数
const handleSearch = async () => {
  try {
    isLoading.value = true
    isEmpty.value = false
    
    // 构建搜索参数
    const params = {
      gameType: selectedGameType.value,
      startDate: isBettingDateEnabled.value ? bettingStartDate.value : null,
      endDate: isBettingDateEnabled.value ? bettingEndDate.value : null,
      paymentStart: isPaymentDateEnabled.value ? paymentStartDate.value : null,
      paymentEnd: isPaymentDateEnabled.value ? paymentEndDate.value : null,
      unpaidOnly: searchUnpaidOnly.value
    }
    
    // 调用API - 这里使用模拟数据，实际项目中替换为真实API调用
    const response = await mockApiCall(params)
    
    bets.value = response.data
    total.value = response.data.length
    
    // 如果没有数据
    if (response.data.length === 0) {
      isEmpty.value = true
    }
  } catch (error) {
    console.error('搜索失败:', error)
    isEmpty.value = true
  } finally {
    isLoading.value = false
  }
}

// 更新模拟API调用函数，接收参数
const mockApiCall = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 根据搜索参数过滤模拟数据
      const mockData = [
        {
          gameName: '百家乐',
          paymentDate: new Date(),
          validBet: '1000',
          reduction: '50'
        },
        {
          gameName: '轮盘',
          paymentDate: new Date(Date.now() - 86400000),
          validBet: '500',
          reduction: '25'
        }
      ].filter(item => {
        // 简单模拟过滤逻辑
        if (params.gameType && item.gameName !== params.gameType) return false
        // 这里可以添加更多过滤条件...
        return true
      })
      
      resolve({ data: mockData })
    }, 1000)
  })
}

// 日期格式化函数
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(/\//g, '/')
}

// 初始化加载数据
handleSearch()
</script>

<style>
.betting-transaction-panel .el-dropdown-menu {
  min-width: 180px !important;
  width: 180px !important;
}

.betting-transaction-panel .el-dropdown-menu__item {
  color: #000000 !important;
  font-size: 14px;
  padding: 0 16px;
  width: 100% !important;
  box-sizing: border-box;
}
</style>

<style scoped>
.el-icon-loading {
  animation: rotating 2s linear infinite;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.search {
  width: 70px;
  height: 27px;
  padding: 0;
  line-height: 27px;
  background: url('@/assets/images/searchbet.png') no-repeat center top;
  background-position: center top;
  border: none;
}

.search:hover {
  background-position: center bottom;
}

.game-picker {
  display: flex;
  align-items: center;
}

::v-deep(.el-dropdown .el-button) {
  height: 34px;
  width: 180px;
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
}

::v-deep(.el-button:focus) {
  border-color: #66afe9;
  outline: 0;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

::v-deep(.el-dropdown .el-button span) {
  flex: 1;
  text-align: center;
}

::v-deep(.el-icon--right) {
  margin-left: auto;
}

::v-deep(.el-dropdown-menu__item:hover) {
  background-color: #f2f2f2 !important;
  color: #000000 !important;
}

.betting-transaction-panel {
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
  min-height: 350px;
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
  margin-right: 20px;
}

.content-text {
  font-size: 14px;
  color: #404040;
  line-height: 1.5;
  margin-top: 8px;
}

.divider {
  margin: 18px 0;
  display: flex;
  align-items: center;
  justify-content: end;
}

.elegant-table {
  width: 100%;
  border-collapse: collapse;
}

.table-h-container {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
}

.table-header,
.table-data {
  flex: 1;
  padding: 10px 12px;
  text-align: left;
}

.table-header {
  font-weight: bold;
  color: #333;
  font-size: 14px;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
}

.table-data {
  color: #333;
  font-weight: bold;
  font-size: 14px;
  border-bottom: 2px solid #ddd;
}

.disclosure-text {
  text-align: center;
  font-size: 14px;
  color: #333;
  margin: 20px 0px;
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
::v-deep(.elegant-date-picker) {
  width: 150px !important;
  margin: 0px;
}

::v-deep(.elegant-date-picker .el-input__inner) {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: #333;
}

::v-deep(.el-input) {
  margin: 0px !important;
}

::v-deep(.elegant-date-picker .el-input__prefix-inner) {
  display: none !important;
}

::v-deep(.elegant-date-picker .el-input__wrapper) {
  width: 150px !important;
  box-shadow: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  background-color: #fafafa;
  margin: 0px;
}

::v-deep(.elegant-date-picker .el-input__wrapper:hover) {
  border-color: #409eff;
  background-color: #fff;
}

::v-deep(.elegant-date-picker .el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  background-color: #fff;
}

/* Unpaid checkbox styles */
.unpaid-checkbox {
  margin-top: 12px;
}

::v-deep(.unpaid-checkbox-input .el-checkbox__inner) {
  border-color: gray;
  transition: none;
}

::v-deep(.unpaid-checkbox-input:not(.is-disabled) .el-checkbox__inner:hover) {
  border-color: #000;
}

::v-deep(.unpaid-checkbox-input .el-checkbox__input.is-checked .el-checkbox__inner) {
  border-color: #000 !important;
  background-color: #333 !important;
}

::v-deep(.unpaid-checkbox-input .el-checkbox__label) {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333333;
}

::v-deep(.unpaid-checkbox-input.is-disabled) {
  color: #999 !important;
  opacity: 0.5;
  cursor: not-allowed;
}

::v-deep(.unpaid-checkbox-input.is-disabled .el-checkbox__label) {
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
