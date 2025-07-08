<template>
  <div class="payment-container">
    <div class="payment-tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="switchMainTab(index)"
        :class="{ active: activeMainTab === index }"
      >
        <div v-if="index === 0" class="tab-icon icon-saving" />
        <div v-else-if="index === 1 || index === 3" class="tab-icon icon-bank" />
        <img v-else :src="tab.icon" class="tab-icon" />

        {{ tab.name }}
      </button>
    </div>

    <div class="tab-content">
      <!-- Scan Bank Code Tab -->
      <div v-if="activeMainTab === 0" class="grid-details">
        <div
          v-for="(item, index) in qrDetails1"
          :key="index"
          class="detail-item"
          @click="switchDetailTab(0, index)"
          :class="{ active: activeDetailTab[0] === index }"
        >
          <div class="detail-title">{{ item.title }}</div>
          <div class="detail-limit">{{ item.limit }}</div>
        </div>
      </div>

      <!-- Bank Transfer Tab -->
      <div v-if="activeMainTab === 1" class="grid-details">
        <div
          v-for="(item, index) in qrDetails2"
          :key="index"
          class="detail-item"
          @click="switchDetailTab(1, index)"
          :class="{ active: activeDetailTab[1] === index }"
        >
          <div class="detail-title">{{ item.title }}</div>
          <div class="detail-limit">{{ item.limit }}</div>
        </div>
      </div>
      <hr />
      <div class="payment">
        <div class="suggested-amounts">
          <h3>建议付款金额：</h3>
          <div class="amount-buttons">
            <button
              v-for="(amount, index) in suggestedAmounts"
              :key="index"
              @click="selectAmount(amount)"
              :class="{ active: deposit === amount }"
            >
              {{ formatNumber(amount) }}
            </button>
          </div>
        </div>

        <div class="deposit-input">
          <h3>押金：</h3>
          <el-input-number
            v-model="deposit"
            :min="0"
            :max="999999999"
            controls-position="right"
            :step="100"
            @change="validateDeposit"
            class="mb-[5px]"
          />
        </div>

        <div class="calculation-results">
          <div class="result-item">
            <span>= {{ formatNumber(0) }} 越南盾</span>
          </div>
          <div class="result-item-title">
            <span>手术费用：{{ formatNumber(0) }}</span>
          </div>
          <div class="result-item">
            <span>= {{ formatNumber(0) }} 越南盾</span>
          </div>
          <div class="result-item-title">
            <span>实际接收量：{{ formatNumber(0) }}</span>
          </div>
          <div class="result-item">
            <span>= {{ formatNumber(0) }} 越南盾</span>
          </div>
        </div>

        <button class="pay-button">立即付款</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import iconSaving from '@/assets/images/savingpage1.svg'
import iconBank from '@/assets/images/savingpage2.svg'
import iconOnline from '@/assets/images/savingpage1.svg'
import iconVTPay from '@/assets/images/savingpage1.svg'
import iconUSDT from '@/assets/images/savingpage1.svg'
import iconMomo from '@/assets/images/savingpage1.svg'
import iconCard from '@/assets/images/savingpage1.svg'

const activeMainTab = ref(0)
const activeDetailTab = ref({ 0: null, 1: null })
const deposit = ref('')
const suggestedAmounts = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000]

const switchMainTab = (index) => {
  activeMainTab.value = index
  activeDetailTab.value[index] =
    activeDetailTab.value[index] === null ? 0 : activeDetailTab.value[index]
}

const switchDetailTab = (mainTabIndex, detailIndex) => {
  activeDetailTab.value[mainTabIndex] = detailIndex
}

const selectAmount = (amount) => {
  deposit.value = amount
}

const validateDeposit = (event) => {
  let value = event.target.value
  // Remove all non-digit characters
  value = value.replace(/\D/g, '')
  deposit.value = value === '' ? '' : parseInt(value)
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const tabs = [
  { name: '扫描银行代码', icon: iconSaving },
  { name: '银行转账', icon: iconBank },
  { name: '在线支付', icon: iconOnline },
  { name: 'Zalo Pay', icon: iconBank },
  { name: 'VTPay', icon: iconVTPay },
  { name: 'USDT（泰达币）', icon: iconUSDT },
  { name: '陌陌支付', icon: iconMomo },
  { name: '刮刮卡', icon: iconCard },
]

const qrDetails1 = [
  {
    title: 'QR 6 - 不要扫描旧的 QR 码 - 输入正确的数量并传输内容 ✓',
    limit: '最低存款限额 50 ~ 100,000',
  },
  {
    title: 'QR 4 - 不要扫描旧的 QR 码 - 输入正确的金额并传输内容 ✓',
    limit: '最低存款限额 50 ~ 300,000',
  },
  {
    title: 'QR 8 - 不要扫描旧的二维码 ⭕ 输入正确的数量并传输内容 ✓',
    limit: '最低存款限额 50~100,000',
  },
  {
    title: 'QR 28 - 不要扫描旧的二维码 ⭕ 输入正确的数量并传输内容 ✓',
    limit: '最低存款限额 50~300,000',
  },
]

const qrDetails2 = [
  {
    title: 'QR 21 - 不要扫描旧的二维码 - 输入正确的数量并传输内容 ✓',
    limit: '最低存款限额 50~100,000',
  },
  {
    title: 'QR 2 - 不要扫描旧的 QR 码 ⭕ 输入正确的金额并传输内容 ✓',
    limit: '最低存款限额 50~300,000',
  },
  {
    title: 'QR 13 - 不要扫描旧的二维码 ⭕ 输入正确的金额并传输内容 ✓',
    limit: '最低存款限额 50~300,000',
  },
  {
    title: 'QR 7 - 不要扫描旧的 QR 码 - 输入正确的金额并传输内容 ✓',
    limit: '最低存款限额 50~300,000',
  },
]
</script>

<style scoped>
.pay-button {
  width: 360px;
  height: 40px;
  font-size: 18px;
  color: black;
  background: linear-gradient(to bottom, #fffa74, #d7aa32);
  border-radius: 5px;
  border: none;
  margin: 30px 0;
  cursor: pointer;
}

.pay-button:hover {
  background: linear-gradient(to bottom, #fffb8a, #fdcc45);
  cursor: pointer;
}

.result-item {
  color: #fff;
  font-size: 14px;
  margin: 0 0 10px;
}

.result-item-title {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

.amount-buttons {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.amount-buttons button {
  width: 92px;
  height: 40px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  background: #3b3b3b;
  border-radius: 5px;
  border: none;
  white-space: nowrap;
  cursor: pointer;
}

.amount-buttons button:focus {
  color: #000;
  background: linear-gradient(to bottom, #fffa74, #d7aa32);
}

h3 {
  margin: 0 0 5px;
  font-size: 16px;
  color: #fff;
}

.tab-content {
  padding: 15px 30px;
  background: #222;
  border-radius: 10px;
  margin-bottom: 20px;
}

.tab-icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.icon-saving {
  background-color: #f9bb1f;
  -webkit-mask: url('@/assets/images/savingpage1.svg') no-repeat center;
  mask: url('@/assets/images/savingpage1.svg') no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
  background-size: cover;
}

.icon-bank {
  background-color: #55eb75;
  -webkit-mask: url('@/assets/images/savingpage2.svg') no-repeat center;
  mask: url('@/assets/images/savingpage2.svg') no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
  background-size: cover;
}

.payment-container {
  max-width: 800px;
  margin: 0 auto;
}

.payment-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.payment-tabs button {
  display: inline-flex;
  align-items: center;
  justify-content: start;
  padding: 0 15px;
  width: calc(100% / 3 - 8px);
  height: 72px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  background: #222;
  border-radius: 10px;
  border: 3px solid #222;
  box-sizing: border-box;
  cursor: pointer;
}

.payment-tabs button:hover {
  border-color: #fffa74;
}

.payment-tabs button.active {
  border-color: #fffa74;
}

.grid-details {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

hr {
  height: 1px;
  background-color: gray;
  border: none;
  margin-top: 20px;
  margin-bottom: 40px;
}

.detail-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% / 2 - 7.5px);
  min-height: 100px;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.25);
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
}

.detail-item:hover {
  border-color: #fffa74;
  background: rgba(0, 0, 0, 0.4);
}

.detail-item.active {
  border-color: #fffa74;
  background: rgba(0, 0, 0, 0.5);
}

.detail-title {
  margin: 0;
  margin-bottom: 8px;
  font-size: 18px;
  color: #fff;
  font-weight: 500;
}

.detail-limit {
  font-size: 15px;
  color: #fff;
}
</style>
