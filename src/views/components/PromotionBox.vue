<template>
  <table class="table table-hover _37bNXha2rDTZyRUYuNmPiU">
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

// 假数据，实际项目中应从 API 获取
// const mailList = ref([
//   { subject: '欢迎邮件', time: '2025-07-09 10:00' },
//   { subject: '账户通知', time: '2025-07-08 15:30' },
// ])

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
</style>
