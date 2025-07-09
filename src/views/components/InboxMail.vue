<template>
  <div class="action-buttons">
    <button
      class="delete"
      :class="{ disabled: mailList.length === 0 }"
      @click="mailList.length > 0 && deleteMails()"
    >
      <i class="fa fa-trash"></i>
      删除
    </button>
  </div>

  <table class="table table-hover">
    <thead>
      <tr>
        <th>主要主题</th>
        <th>时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(mail, index) in mailList" :key="index">
        <td>{{ mail.subject }}</td>
        <td>{{ mail.time }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" class="text-center">
          <span v-show="allMailsLoaded && !mailListNull && mailList.length > 0"
            >所有内容已下载</span
          >
          <span v-show="allMailsLoaded && mailListNull">无数据</span>
          <span v-show="!allMailsLoaded && loading">加载中...</span>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { ref } from 'vue'

const mailList = ref([
  // { subject: '欢迎邮件', time: '2025-07-09 10:00' },
  // { subject: '账户通知', time: '2025-07-08 15:30' },
])

const deleteMails = () => {
  mailList.value = []
}

const allMailsLoaded = ref(true)
const mailListNull = ref(true)
const loading = ref(false)

// 模拟数据加载过程
setTimeout(() => {
  allMailsLoaded.value = true
  loading.value = false
  // mailListNull.value = true // 你可以取消这行注释来测试"无数据"状态
  // mailList.value = [] // 你可以取消这行注释来测试"无数据"状态
}, 1500)
</script>

<style scoped>
.text-center {
  font-size: 14px;
  color: black;
  padding: 8px;
  text-align: center;
  border-top: 1px solid #ddd;
  background-color: #ebebeb;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}

table {
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
}

th {
  font-size: 14px;
  color: black;
  padding: 8px;
  border-bottom: 2px solid #ddd;
  text-align: left;
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

.action-buttons .delete.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5f5;
  color: #999;
}
</style>
