<template>
  <div class="promotion-container">
    <!-- 活动主要内容 -->
    <div class="promotion-content">
      <div class="promotion-description">
        <h3>活动内容：</h3>
        <p>
          成为 89bet 的会员，从 89bet 赚取利润 -
          亚洲最安全、最值得信赖的博彩网站。从现在开始，所有会员都可以参加我们的联盟计划。
          在社交媒体上分享推荐链接，邀请您的朋友加入亚洲最值得信赖的博彩网站 89bet。
          无论您输赢，只要您的会员存款和下注，您将获得 0.3% 的利润！
        </p>
      </div>

      <!-- 佣金表格 -->
      <div class="commission-table">
        <el-table
          :data="tableData"
          class="table-title"
          :row-style="{ height: '55px' }"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column
            v-for="(column, index) in tableColumns"
            :key="index"
            :prop="column.prop"
            :label="column.label"
          >
            <template #default="{ row }">
              <span
                v-if="!isLinkText(row[column.prop])"
                :class="row[column.prop].includes('%') ? 'text-white' : 'text-blue-500 font-medium'"
              >
                {{ row[column.prop] }}
              </span>
              <router-link
                v-else
                :to="getLinkForText(row[column.prop])"
                class="router-link font-medium"
              >
                {{ row[column.prop] }}
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 单行表格 -->
      <div class="single-line-tables">
        <div v-for="item in singleLineItems" :key="item.id" class="single-line-table">
          <router-link v-if="item.isLink" :to="item.link" class="single-line-cell router-link">
            {{ item.content }}
          </router-link>
          <div v-else :class="['single-line-cell', item.className]">
            {{ item.content }}
          </div>
        </div>
      </div>

      <!-- 条款 -->
      <div class="promotion-description">
        <h3>详细条款：</h3>
        <ul>
          <li v-for="(term, index) in terms" :key="index">{{ term }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 表格列
const tableColumns = ref([
  { prop: 'game', label: '爆裂罐子，射鱼，纸牌游戏' },
  { prop: 'casino', label: '真人娱乐场/体育博彩' },
])

// 表格数据
const tableData = ref([
  { game: '0.3%', casino: '0.2%' },
  { game: '注册销售', casino: '销售登录' },
])

// 可变链接文字
const linkTexts = ['注册销售', '销售登录']

// 判断是否是链接文字
const isLinkText = (text) => linkTexts.includes(text)

// 映射链接路径
const getLinkForText = (text) => {
  const linkMap = {
    注册销售: '/register-sales',
    销售登录: '/sales-login',
  }
  return linkMap[text] || '#'
}

// 条款内容
const terms = ref([
  '必须注册并开设账户才能成为 89bet 的合作伙伴',
  '注册成功后，可以登录 Agent 后台查看推荐会员图和后台的独家推荐链接。',
  '推荐链接必须放置在您的社交媒体平台上。点击该链接的观众将被引导至 89bet 网站，并可以在那里注册一个帐户。',
  '您的在线会员会通过账号获取 0.3% 的最高佣金。',
  '代理佣金有每天支付，我们会每天将佣金发送到代理的后台，会员可以登录代理的专用帐户提取资金。在家佣金可以立即提取，无需下注。',
  '89bet 的条款和条件适用 - 亚洲最安全、最可靠的娱乐博彩网站。',
])

// 单行提示
const singleLineItems = ref([
  {
    id: 1,
    content: '联系营销专家查找并开设账户',
    className: 'text-white',
    isLink: true,
    link: '/contact-marketing',
  },
  {
    id: 2,
    content:
      '支付代理佣金的时间是下午 13：00 - 第二天 11：00（越南时间）。请联系市场专员注册领取佣金，逾期将被视为拒绝接收。',
    className: 'text-white',
  },
  {
    id: 3,
    content: '真诚期待合作代理商每天准时前来领取代理佣金！',
    className: 'text-white',
  },
])

// 样式
const headerCellStyle = {
  height: '55px',
  lineHeight: '55px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#363636',
  border: '1px solid #ddd',
  verticalAlign: 'middle',
  textAlign: 'center',
}

const cellStyle = {
  fontSize: '18px',
  height: '55px',
  paddingTop: '0',
  paddingBottom: '0',
  verticalAlign: 'middle',
  lineHeight: '55px',
  textAlign: 'center',
  backgroundColor: 'black',
  border: '1px solid #ddd',
}
</script>

<style scoped>
.commission-table {
  border: 1px solid #ddd;
  margin-bottom: 0;
  background-color: transparent;
}

.table-title,
.commission-table {
  width: 100%;
}

.promotion-container {
  width: 1200px;
  border-radius: 10px;
}

.promotion-description h3 {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.promotion-description p {
  font-size: 14px;
  margin: 1em 0;
  color: #fff;
  line-height: 2em;
}

.promotion-description li {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #fff;
  list-style-type: decimal;
}

.text-blue-500 {
  color: #409eff;
}

.text-white {
  color: #ffffff;
}

/* 单行区域样式 */
.single-line-tables {
  width: 100%;
  border: 1px solid #ddd;
  border-top: none;
}

.single-line-table {
  border-bottom: 1px solid #ddd;
}

.single-line-table:last-child {
  border-bottom: none;
}

.single-line-cell {
  height: 55px;
  line-height: 55px;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background-color: black;
  padding: 0 20px;
  display: block;
}

/* 默认链接样式 */
.router-link {
  color: #409eff;
  text-decoration: none;
}

/* hover 链接样式 */
.router-link:hover {
  color: #1e70bf;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .promotion-container {
    padding: 20px;
  }

  .promotion-title {
    font-size: 24px;
  }

  .single-line-cell {
    font-size: 16px;
    padding: 0 10px;
  }
}
</style>
