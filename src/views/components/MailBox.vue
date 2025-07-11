<template>
  <div class="email-container">
    <!-- Action Buttons -->
    <div class="action-buttons">
      <button
        @click="deleteSelected"
        :disabled="!hasSelection"
        :class="{ disabled: !hasSelection }"
      >
        <i class="fa fa-trash"></i>
        删除
      </button>
      <button @click="markAsRead" :disabled="!hasSelection" :class="{ disabled: !hasSelection }">
        标记为已读
      </button>
      <button @click="markAsUnread" :disabled="!hasSelection" :class="{ disabled: !hasSelection }">
        标记为未读
      </button>
    </div>

    <!-- Email List -->
    <div class="email-table">
      <!-- Header -->
      <div class="email-header">
        <div class="email-header-cell" style="width: 30px">
          <input type="checkbox" :checked="allSelected" @change="toggleSelectAll" />
        </div>
        <div class="email-header-cell no-hover">主题</div>
        <div class="email-header-cell no-hover">时间</div>
      </div>

      <!-- Body -->
      <div class="email-body">
        <div
          v-for="(mail, index) in mailList"
          :key="index"
          class="email-row"
          :class="{
            unread: !mail.read,
            selected: selectedIndices.includes(index),
          }"
          @click="handleRowClick(index, $event)"
        >
          <div class="email-cell" @click.stop>
            <input
              type="checkbox"
              :checked="selectedIndices.includes(index)"
              @change="toggleSelection(index)"
            />
          </div>
          <div class="email-cell">
            <a @click.stop="showMessage(mail)" class="mail-subject">{{ mail.subject }}</a>
            <span v-if="!mail.read" class="unread-badge">•</span>
          </div>
          <div class="email-cell">{{ formatTime(mail.time) }}</div>
        </div>
      </div>
    </div>

    <!-- Message Popout Modal -->
    <div v-show="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ currentMessage.subject }}</h3>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body" ref="modalBodyRef">
          <p>{{ currentMessage.content || 'No content available' }}</p>
        </div>
        <div class="modal-footer">
          <span class="modal-time">{{ formatTime(currentMessage.time) }}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <div class="email-footer-cell">
        <span v-show="allMailsLoaded && !mailListNull && mailList.length > 0">所有内容已下载</span>
        <span v-show="allMailsLoaded && mailListNull">无数据</span>
        <span v-show="!allMailsLoaded && loading">加载中...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Email data
const mailList = ref([
  // {
  //   subject: '访问应用程序 1.1.1.1',
  //   time: '2025-07-07T03:12:21',
  //   read: false,
  //   content: '这是关于访问应用程序1.1.1.1的详细信息。请按照说明操作以确保安全。',
  // },
  // {
  //   subject: '神秘⾯奖金',
  //   time: '2025-07-03T04:02:36',
  //   read: true,
  //   content: '恭喜您获得了神秘奖金！请点击下方链接领取您的奖励。如有疑问，请联系客服。',
  // },
])

const allMailsLoaded = ref(false)
const mailListNull = ref(false)
const loading = ref(true)

// 模拟数据加载过程
setTimeout(() => {
  allMailsLoaded.value = true
  loading.value = false
  mailListNull.value = mailList.value.length === 0
}, 1500)

// Modal state
const showModal = ref(false)
const currentMessage = ref({})
const modalBodyRef = ref(null)

// Selected email indices
const selectedIndices = ref([])

// Check if any emails are selected
const hasSelection = computed(() => selectedIndices.value.length > 0)

// Check if all emails are selected
const allSelected = computed(() => {
  return mailList.value.length > 0 && selectedIndices.value.length === mailList.value.length
})

// Format time display
const formatTime = (timeString) => {
  const date = new Date(timeString)
  const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24))
  const weekday = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()]

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} (${weekday}) ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')} - ${daysAgo} 天前`
}

// Show message in modal
const showMessage = (mail) => {
  currentMessage.value = mail
  showModal.value = true
  mail.read = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
}

// Handle row click
const handleRowClick = (index, event) => {
  if (event.target.tagName !== 'INPUT' && !event.target.classList.contains('no-hover')) {
    toggleSelection(index)
  }
}

// Toggle selection
const toggleSelection = (index) => {
  const idx = selectedIndices.value.indexOf(index)
  if (idx === -1) {
    selectedIndices.value.push(index)
  } else {
    selectedIndices.value.splice(idx, 1)
  }
}

// Toggle select all
const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedIndices.value = []
  } else {
    selectedIndices.value = mailList.value.map((_, index) => index)
  }
}

// Delete selected emails
const deleteSelected = () => {
  mailList.value = mailList.value.filter((_, index) => !selectedIndices.value.includes(index))
  selectedIndices.value = []
}

// Mark as read
const markAsRead = () => {
  selectedIndices.value.forEach((index) => {
    mailList.value[index].read = true
  })
  selectedIndices.value = []
}

// Mark as unread
const markAsUnread = () => {
  selectedIndices.value.forEach((index) => {
    mailList.value[index].read = false
  })
  selectedIndices.value = []
}
</script>

<style scoped>
.email-footer-cell {
  height: 20px;
  font-size: 14px;
  color: black;
  padding: 8px;
  text-align: center;
  border-top: 1px solid #ddd;
  background-color: #ebebeb;
  margin-bottom: 20px;
}

.modal-body {
  padding: 24px;
  flex-grow: 1;
  overflow-y: auto;
  line-height: 1.5;
  max-height: 100px;
}

.mail-subject,
.text-center {
  color: black;
  font: inherit;
  margin: 0;
}

.action-buttons button {
  font-size: 14px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 6px 12px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.action-buttons button:not(.disabled):hover {
  background-color: #f0f0f0;
  border-color: #999;
  color: #333;
}

.action-buttons button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5f5;
  color: #999;
}

.email-table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  display: table;
}

.email-header {
  display: table-row;
}

.email-header-cell {
  display: table-cell;
  font-size: 14px;
  font-weight: bold;
  color: black;
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid #ddd;
}

.email-body {
  display: table-row-group;
}

.email-row {
  display: table-row;
}

.email-cell {
  display: table-cell;
  font-size: 14px;
  color: black;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.email-row:hover {
  background-color: #e2e2e2;
}

.email-row.unread {
  font-weight: bold;
}

.unread-badge {
  color: #1a73e8;
  margin-left: 5px;
}

.text-center {
  text-align: center;
  color: #666;
  padding: 10px;
}

.email-row.selected {
  background-color: #fff8e1 !important;
}

.email-table input[type='checkbox'] {
  cursor: pointer;
  margin: 0;
  width: 16px;
  height: 16px;
}

.email-header-cell:first-child,
.email-cell:first-child {
  width: 30px;
  padding-left: 12px;
  padding-right: 0;
}

.no-hover {
  cursor: pointer !important;
  pointer-events: none;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
}

.modal-body {
  padding: 24px;
  flex-grow: 1;
  overflow-y: auto;
  line-height: 1.5;
}

.modal-footer {
  padding: 12px 24px;
  border-top: 1px solid #eee;
  text-align: right;
  font-size: 14px;
  color: #666;
}

.mail-subject {
  color: #1a73e8;
  text-decoration: none;
}

.mail-subject:hover {
  text-decoration: underline;
}
</style>
