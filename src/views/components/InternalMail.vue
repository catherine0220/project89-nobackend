<template>
  <div class="panel">
    <div class="panel-heading">
      <h3>内部邮箱</h3>
    </div>
    <div class="panel-body">
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

      <div class="tab-content">
        <PromotionBox v-if="activeTab === 1" />
        <MailBox v-if="activeTab === 2" />
        <InboxMail v-if="activeTab === 3" />
        <SentMail v-if="activeTab === 4" />
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
  { id: 4, name: '发送邮件', active: false, count: 0 },
])

const activeTab = ref(1)

const activateTab = (tabId) => {
  activeTab.value = tabId
  tabs.value.forEach((tab) => {
    tab.active = tab.id === tabId
  })
}

onMounted(() => {
  activateTab(1) // 默认加载促销盒
})
</script>

<style scoped>
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
}

.nav-tabs {
  border-bottom: 1px solid #ddd;
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
