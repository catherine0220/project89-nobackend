<!-- MainHeader.vue -->
<template>
  <!-- Navigation -->
  <div class="main-header">
    <div class="w-[1200px] mx-auto p-3">
      <el-row :gutter="20" justify="center" class="h-auto">
        <el-col v-for="(item, index) in menuItems" :key="index" :span="2">
          <div
            class="nav-container relative"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave()"
          >
            <router-link
              :to="item.path || '#'"
              class="nav flex flex-col items-center justify-center gap-1 no-underline"
            >
              <img
                src="@/assets/images/placeholder.png"
                :alt="item.label"
                class="w-[25px] h-[25px] rounded-full"
              />
              <span>{{ item.label }}</span>
            </router-link>

            <!-- Dropdown Drawer -->
            <div
              v-if="activeIndex === index && item.children"
              class="dropdown-drawer"
              @mouseenter="activeIndex = index"
              @mouseleave="activeIndex = null"
            >
              <router-link
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                :to="child.path"
                class="dropdown-item no-underline"
              >
                {{ child.label }}
              </router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(null)
let closeTimer = null

const handleMouseEnter = (index) => {
  clearTimeout(closeTimer) // 清除之前的关闭计时器
  activeIndex.value = index
}

const handleMouseLeave = () => {
  // 设置延迟关闭（例如 300ms）
  closeTimer = setTimeout(() => {
    activeIndex.value = null
  }, 300)
}

const menuItems = [
  {
    label: '主页',
    path: '/',
  },
  {
    label: '爆炸罐',
    path: '/explosivegame',
    children: [
      { label: '经典模式', path: '/bomb/classic' },
      { label: '快速模式', path: '/bomb/quick' },
      { label: '团队模式', path: '/bomb/team' },
    ],
  },
  {
    label: '捕鱼',
    path: '/fishing',
    children: [
      { label: '深海捕鱼', path: '/fishing/deepsea' },
      { label: '黄金渔场', path: '/fishing/golden' },
      { label: '多人竞技', path: '/fishing/multiplayer' },
    ],
  },
  {
    label: '赌场',
    path: '/bet',
    children: [
      { label: '百家乐', path: '/casino/baccarat' },
      { label: '轮盘', path: '/casino/roulette' },
      { label: '二十一点', path: '/casino/blackjack' },
      { label: '德州扑克', path: '/casino/poker' },
    ],
  },
  {
    label: '3D 纸牌游戏',
    path: '/board',
    children: [
      { label: '3D 扑克', path: '/cards/poker' },
      { label: '3D 麻将', path: '/cards/mahjong' },
      { label: '3D 老虎机', path: '/cards/slot' },
    ],
  },
  {
    label: '运动',
    path: '/sports',
    children: [
      { label: '足球', path: '/sports/football' },
      { label: '篮球', path: '/sports/basketball' },
      { label: '网球', path: '/sports/tennis' },
      { label: '赛马', path: '/sports/horse' },
    ],
  },
  {
    label: '抽奖',
    path: '/lottery',
    children: [
      { label: '每日抽奖', path: '/lottery/daily' },
      { label: '幸运大转盘', path: '/lottery/wheel' },
      { label: 'VIP专属', path: '/lottery/vip' },
    ],
  },
  {
    label: '鸡踢',
    path: '/cockfighting',
    children: [
      { label: 'GT赛车', path: '/gt/race' },
      { label: 'GT竞猜', path: '/gt/bet' },
      { label: 'GT排行榜', path: '/gt/rank' },
    ],
  },
  {
    label: '晋升',
    path: '/promotions',
  },
  {
    label: '应用程序',
    path: '/downloadapp',
  },
  {
    label: '代理',
    path: '/agents',
  },
  {
    label: '客服服务 24/7',
    path: '/support',
  },
]
</script>

<style scoped>
.main-header {
  height: 72px;
}

.nav {
  color: white;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  width: 100px;
}

.nav-container:hover .nav,
.nav-container[data-active='true'] .nav {
  color: #ffd630;
}

/* Dropdown styles */
.nav-container {
  height: 100%;
}

.dropdown-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(30, 30, 30, 0.9);
  border-radius: 5px;
  z-index: 50;
  min-width: 100px;
  min-height: 150px;
  margin-top: 10px;
  border: 1px solid #ffd630;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  color: white;
  font-size: 12px;
  cursor: pointer;
  padding: 10px;
}

.dropdown-item:hover {
  color: #ffd630;
}
</style>
