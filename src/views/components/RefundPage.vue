<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="refund-modal" :style="{ backgroundImage: `url(${refundImg})` }">
      <div class="modal-header">
        <h1 class="modal-title">立即退款</h1>
        <span class="close-btn" @click="closeModal">×</span>
      </div>

      <div class="modal-body">
        <div v-if="loading" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <span>装载</span>
        </div>

        <div v-else class="refund-content">
          <p class="time-range">{{ currentDateTime }} ~ <span>现在</span></p>

          <table class="refund-table">
            <thead>
              <tr>
                <th class="col-4">游戏名称</th>
                <th class="col-4">符合条件的投注总分</th>
                <th class="col-4">退款</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(game, index) in gameDetails" :key="index" class="game-item">
                <td class="col-4">{{ game.name }}</td>
                <td class="col-4">{{ game.betAmount }}</td>
                <td class="col-4">{{ game.refundAmount }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="detail-footer">
                <td colspan="2" class="text-right">总数</td>
                <td class="col-4">{{ totalRefund }}</td>
              </tr>
            </tfoot>
          </table>

          <div class="action-buttons">
            <button
              class="refresh-btn"
              @click="refreshData"
              :style="{ backgroundImage: `url(${refreshImg})` }"
            >
              刷新
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import refundImg from '@/assets/images/refundpage.png'
import refreshImg from '@/assets/images/refundpage2.png'

const loading = ref(true)
const gameDetails = ref([])
const totalRefund = ref(0)

// Current date time computation
const currentDateTime = computed(() => {
  const now = new Date()
  return now
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
})

// Mock data
const mockGameData = [
  { name: '游戏1', betAmount: '100', refundAmount: '10' },
  { name: '游戏2', betAmount: '200', refundAmount: '50' },
  { name: '游戏3', betAmount: '300', refundAmount: '30' },
]

const emit = defineEmits(['close'])

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)

  setTimeout(() => {
    gameDetails.value = mockGameData
    totalRefund.value = gameDetails.value.reduce(
      (sum, game) => sum + parseInt(game.refundAmount),
      0,
    )
    loading.value = false
  }, 1000)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const refreshData = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800)
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
thead {
  height: 40px;
  color: #3f3f3f;
  background-color: #ffdd54;
}

tr {
  border: 1px solid white;
}

.refund-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  color: black; /* 保持与模态框一致的文字颜色 */
}

.refund-table th {
  color: black;
  font-weight: normal;
}

.refund-table td,
.refund-table th {
  color: black;
  padding: 8px 4px;
  text-align: center;
}

.refund-table tfoot td {
  color: #f63232;
  padding: 10px 12px;
  background-color: white;
}

.text-right {
  text-align: right !important;
  padding-right: 50px !important ;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.refund-modal {
  width: 580px;
  height: 420px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  width: 570px;
  height: 35px;
}

.modal-title {
  font-size: 48px;
  font-weight: bold;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: #332c1d;
  -webkit-text-fill-color: #fad654;
  text-align: center;
  width: 100%;
  margin: 0px;
  margin-bottom: 50px;
}

.close-btn {
  color: transparent;
  font-size: 30px;
  cursor: pointer;
  margin-bottom: 50px;
}

.modal-body {
  min-width: 450px;
  min-height: 300px;
  max-height: 300px;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: black;
}

.loading-spinner i {
  font-size: 30px;
  color: black;
  margin-bottom: 10px;
}

.time-range {
  color: black;
  font-size: 16px;
  margin: 0px;
}

.col-4 {
  flex: 1;
}

.col-8 {
  flex: 2;
}

.action-buttons {
  text-align: right;
  margin-top: 20px;
}

.refresh-btn {
  color: black;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  background-position: center top;
}

.refresh-btn:hover {
  background-position: center bottom;
}

@media (max-width: 768px) {
  .refund-modal {
    width: 95%;
    padding: 15px;
  }
}
</style>
