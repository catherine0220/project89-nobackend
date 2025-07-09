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

    <!-- Email Table -->
    <table class="email-table">
      <thead>
        <tr>
          <th class="text-bold">主题</th>
          <th class="text-bold">时间</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(mail, index) in mailList"
          :key="index"
          :class="{
            unread: !mail.read,
            selected: selectedIndices.includes(index),
          }"
          @click="handleRowClick(index, $event)"
        >
          <td @click.stop>
            <input
              type="checkbox"
              :checked="selectedIndices.includes(index)"
              @change="toggleSelection(index)"
            />
          </td>
          <td>
            <span class="mail-subject">{{ mail.subject }}</span>
            <span v-if="!mail.read" class="unread-badge">•</span>
          </td>
          <td>{{ formatTime(mail.time) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-center">
            <span v-if="mailList.length === 0">没有数据</span>
            <span v-else>全部已下载</span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Email data
const mailList = ref([
  {
    subject: '访问应用程序 1.1.1.1',
    time: '2025-07-07T03:12:21',
    read: false,
  },
  {
    subject: '神秘⾯奖金',
    time: '2025-07-03T04:02:36',
    read: true,
  },
])

// Selected email indices
const selectedIndices = ref([])

// Check if any emails are selected
const hasSelection = computed(() => selectedIndices.value.length > 0)

// Format time display
const formatTime = (timeString) => {
  const date = new Date(timeString)
  const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24))
  const weekday = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()]

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} (${weekday}) ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')} - ${daysAgo} ngày trước`
}

// Handle row click
const handleRowClick = (index, event) => {
  if (event.target.tagName !== 'INPUT') {
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
/* Original CSS preserved */
.mail-subject,
.text-center {
  color: black;
}

.email-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
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
  border-collapse: collapse;
}

.email-table th {
  font-size: 14px;
  color: black;
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid #ddd;
}

.email-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.email-table tr:hover {
  background-color: #e2e2e2;
}

.email-table tr.unread {
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

/* New styles for checkboxes and selection */
.email-table tr.selected {
  background-color: #fff8e1 !important; /* Yellow background for selected rows */
}

.email-table input[type='checkbox'] {
  cursor: pointer;
  margin: 0;
  width: 16px;
  height: 16px;
}

.email-table th:first-child,
.email-table td:first-child {
  width: 30px;
  padding-left: 12px;
  padding-right: 0;
}
</style>
