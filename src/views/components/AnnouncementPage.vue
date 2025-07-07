<template>
  <div class="modal-overlay" v-show="isVisible" @click.self="closeModal">
    <div class="modal-box">
      <div class="modal-title">最新通告</div>
      <div class="modal-content">目前没有最新通告。</div>
      <div class="modal-footer">
        <button class="modal-button" @click="closeModal">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 1. 定义 emits
const emit = defineEmits(['close'])

// 2. 控制弹窗显示
const isVisible = ref(true)

function closeModal() {
  isVisible.value = false
  emit('close') // 通知父组件关闭
}

// 3. 挂载时显示弹窗（其实可省略）
onMounted(() => {
  isVisible.value = true
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.25s ease;
  display: flex;
  flex-direction: column;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc; /* 下划线 */
  margin-bottom: 16px;
  color: black;
}

.modal-content {
  text-align: left; /* 左对齐 */
  font-size: 15px;
  color: #333;
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end; /* 右下角 */
  margin-top: 20px;
}

.modal-button {
  background-color: #409eff;
  border: none;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-button:hover {
  background-color: #337ecc;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
