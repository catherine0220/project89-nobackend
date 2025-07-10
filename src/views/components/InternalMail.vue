<template>
  <div class="panel">
    <div class="panel-heading">
      <h3>内部邮箱</h3>
    </div>
    <div class="panel-body">
      <div class="tab-header">
        <ul class="nav-tabs">
          <li
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: tab.active }"
            @click.prevent="activateTab(tab.id)"
          >
            <a href="#">
              <i v-if="tab.id === 1" class="fa-solid fa-star mr-1"></i>
              {{ tab.name }}
              <span v-if="tab.count">({{ tab.count }})</span>
            </a>
          </li>
        </ul>
        <button class="sent-mail-btn" @click="showSendMailModal = true">
          <i class="far fa-comment"></i>
          发送邮件
        </button>
      </div>

      <div class="tab-content">
        <PromotionBox v-if="activeTab === 1" @update-count="handlePromotionCountUpdate" />
        <MailBox v-if="activeTab === 2" @update-count="handleMailboxCountUpdate" />
        <InboxMail v-if="activeTab === 3" @update-count="handleInboxCountUpdate" />
      </div>

      <!-- Send Mail Modal -->
      <div v-if="showSendMailModal" class="modal-overlay">
        <div class="modal-content">
          <SentMail @close="showSendMailModal = false" @send="handleSendMail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PromotionBox from './PromotionBox.vue'
import MailBox from './MailBox.vue'
import InboxMail from './InboxMail.vue'
import SentMail from './SentMail.vue'

const tabs = ref([
  { id: 1, name: '促销盒', active: true, count: 0 },
  { id: 2, name: '邮箱', active: false, count: 0 },
  { id: 3, name: '收件箱', active: false, count: 0 },
])

const activeTab = ref(1)
const showSendMailModal = ref(false)

const handlePromotionCountUpdate = (count) => {
  const tab = tabs.value.find(t => t.id === 1)
  if (tab) tab.count = count
}

const handleMailboxCountUpdate = (count) => {
  const tab = tabs.value.find(t => t.id === 2)
  if (tab) tab.count = count
}

const handleInboxCountUpdate = (count) => {
  const tab = tabs.value.find(t => t.id === 3)
  if (tab) tab.count = count
}

const activateTab = (tabId) => {
  activeTab.value = tabId
  tabs.value.forEach((tab) => {
    tab.active = tab.id === tabId
  })
}

const handleSendMail = (mailData) => {
  console.log('发送邮件:', mailData)
  showSendMailModal.value = false
}

onMounted(() => {
  activateTab(1)
})
</script>

<style scoped>
/* 原有CSS保持不变 */
.fa-star {
  color: #ffca00;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
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

.panel-body {
  padding: 15px;
  position: relative;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.nav-tabs {
  display: flex;
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.nav-tabs > li {
  margin-bottom: -1px;
  cursor: pointer;
}

.nav-tabs > li > a {
  margin-right: 2px;
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
  padding: 10px 15px;
  text-decoration: none;
  color: #337ab7;
  font-size: 14px;
  display: inline-block;
}

.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: #555;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
  cursor: default;
}

.sent-mail-btn {
  color: #fff;
  background-color: #337ab7;
  border-color: #204d74;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid transparent;
  text-align: center;
}

.sent-mail-btn:hover {
  background-color: #286090;
}

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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 10px;
}

.email-table {
  width: 100%;
  border-collapse: collapse;
}

.email-table th {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.email-table td {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>