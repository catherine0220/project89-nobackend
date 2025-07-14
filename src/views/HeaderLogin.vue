<template>
  <!-- Top Login Bar -->
  <div class="login-header-container flex flex-col h-20 items-center">
    <div class="login-date-container w-[1200px] h-6 mx-auto relative">
      <div class="login-time-display absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
        <span class="login-date">{{ vietnamDate }}</span>
        <span class="login-time">{{ vietnamTime }}</span>
        <img
          src="https://flagcdn.com/w40/vn.png"
          alt="VN"
          class="login-flag-icon w-6 h-4 object-cover rounded-sm ml-2"
        />
      </div>
    </div>

    <div class="login-header-content w-[1200px] mx-auto flex justify-between items-center">
      <router-link to="/home" class="login-logo absolute top-[20px] h-10">
        <img src="@/assets/images/logo.png" alt="Logo" class="h-full cursor-pointer" />
      </router-link>
      <div class="login-header-right flex justify-end flex-1">
        <div class="login-user-section flex items-center gap-1">
          <div class="login-user-info">
            <div class="login-info-label">账户:</div>
            <div class="login-info-value">{{ displayInfo.name }}</div>
            <i class="fa fa-solid fa-message" @click="goTo('/membercenter#mail')"></i>
          </div>
          <div class="login-user-info">
            <div class="login-info-label">剩余:</div>
            <div class="login-info-value">{{ displayInfo.gold }}</div>
            <i class="fa-solid fa-arrows-rotate" @click="refreshBalance"></i>
          </div>
          <button class="login-action-button" @click="goTo('/membercenter#deposit')">
            网上存款
          </button>
          <button class="login-action-button" @click="goTo('/membercenter#withdraw')">
            在线提现
          </button>
          <el-dropdown
            placement="bottom-end"
            popper-class="login-user-dropdown"
            trigger="click"
            @visible-change="(val) => (dropdownVisible = val)"
          >
            <el-button class="login-dropdown-button">
              <el-icon class="login-dropdown-icon rotate-icon" :class="{ open: dropdownVisible }">
                <ArrowDownBold />
              </el-icon>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goTo('/membercenter#betting')">投注历史</el-dropdown-item>
                <el-dropdown-item @click="goTo('/membercenter#transaction')"
                  >交易详情</el-dropdown-item
                >
                <el-dropdown-item @click="goTo('/membercenter#security')"
                  >更改您的提款密码</el-dropdown-item
                >
                <el-dropdown-item @click="goTo('/membercenter')">会员中心</el-dropdown-item>
              </el-dropdown-menu>
              <div class="login-logout-button pl-[20px] pb-[10px]" @click="handleLogout">
                <i class="fa-solid fa-door-open"> </i>
                <span class="logout text-[14px]">登出</span>
              </div>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation -->
  <div class="login-main-navigation">
    <div class="login-nav-container w-[1200px] mx-auto p-3">
      <el-row :gutter="20" justify="center" class="h-auto">
        <el-col v-for="(item, index) in menuItems" :key="index" :span="2">
          <div
            class="login-nav-item relative"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave()"
          >
            <router-link
              :to="item.path || '#'"
              class="login-nav-link flex flex-col items-center justify-center gap-1 no-underline"
            >
              <div
                class="nav-icon"
                :class="{ active: activeIndex === index }"
                :style="{ backgroundImage: `url(${item.image_url || fallbackImageUrl})` }"
              ></div>
              <span>{{ item.label }}</span>
            </router-link>

            <!-- Dropdown Drawer -->
            <div
              v-if="activeIndex === index && item.children"
              class="login-nav-dropdown"
              @mouseenter="activeIndex = index"
              @mouseleave="activeIndex = null"
            >
              <router-link
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                :to="child.path"
                class="login-dropdown-link no-underline"
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
import '@/assets/styles/main.css'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import fallbackImage from '@/assets/images/placeholder.png'

const menuItems = ref([])
const fallbackImageUrl = new URL(fallbackImage, import.meta.url).href
const router = useRouter()

const goTo = (path) => {
  router.push(path)
}

const auth = useAuthStore()
const { user } = storeToRefs(auth)

onMounted(() => {
  auth.initialize()
})

const displayInfo = computed(() => ({
  name: user.value?.username || '未登录',
  gold: user.value?.game_data?.gold ?? 0,
}))

const refreshBalance = async () => {
  const savedUser = auth.user

  // 如果用户未登录或未保存密码，提示登录
  if (!savedUser?.username || !savedUser?.password) {
    ElMessage.error('请先重新登录以刷新余额')
    return
  }

  try {
    const response = await axios.post(
      'http://192.168.0.122/silver/user/user_login.php',
      new URLSearchParams({
        username: savedUser.username,
        password: savedUser.password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    if (response.data.success) {
      auth.login(response.data.data, savedUser.password)
      ElMessage.success('余额刷新成功')
      console.log('当前金币:', response.data.data.game_data.gold)
    } else {
      ElMessage.error(response.data.message || '刷新失败')
    }
  } catch (error) {
    console.error('刷新失败:', error)
    ElMessage.error(error.response?.data?.message || '刷新失败')
  }
}

const handleLogout = async () => {
  try {
    await auth.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const dropdownVisible = ref(false)

const vietnamTime = ref('')
const vietnamDate = ref('')
const activeIndex = ref(null)
let timer = null
let closeTimer = null

const handleMouseEnter = (index) => {
  clearTimeout(closeTimer)
  activeIndex.value = index
}

const handleMouseLeave = () => {
  closeTimer = setTimeout(() => {
    activeIndex.value = null
  }, 300)
}

const defaultMenuItems = [
  {
    label: '主页',
    path: '/',
    children: null,
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
    children: null,
  },
  {
    label: '应用程序',
    path: '/downloadapp',
    children: null,
  },
  {
    label: '代理',
    path: '/agents',
    children: null,
  },
  {
    label: '客服服务 24/7',
    path: '/customer-service',
    children: null,
  },
]

// 获取后端菜单
const fetchMenuItems = async () => {
  try {
    const response = await axios.get('http://192.168.0.122/silver/user/game_list.php', {
      params: {
        category: 18,
        status: 1,
      },
    })

    const backendData = response.data.success ? response.data.data : []

    // 🧠 把后端数据转成 Map 方便匹配
    const backendMap = new Map(backendData.map((item) => [item.game_name || item.name, item]))

    // ✅ 按 defaultMenuItems 顺序构建最终菜单
    menuItems.value = defaultMenuItems.map((defaultItem) => {
      const backendItem = backendMap.get(defaultItem.label)

      return {
        label: defaultItem.label,
        path: defaultItem.path,
        children: defaultItem.children || null,
        image_url:
          backendItem && backendItem.image_url
            ? `http://192.168.0.122${backendItem.image_url.startsWith('/') ? '' : '/'}${backendItem.image_url}`
            : fallbackImageUrl,
      }
    })
  } catch (error) {
    console.error('❌ 获取菜单失败:', error)
    // fallback
    menuItems.value = defaultMenuItems.map((item) => ({
      ...item,
      image_url: fallbackImageUrl,
    }))
  }
}

onMounted(() => {
  fetchMenuItems()
})

const updateVietnamTime = () => {
  const now = new Date()

  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
  }

  vietnamTime.value = now.toLocaleTimeString('vi-VN', {
    ...options,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const weekdayShort = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][now.getDay()]
  const year = now.getFullYear().toString().slice(0)
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')

  vietnamDate.value = `${year}/${month}/${day} (${weekdayShort})`
}

onMounted(() => {
  updateVietnamTime()
  timer = setInterval(updateVietnamTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style>
.nav-icon {
  height: 30px;
  width: 30px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top;
  border-radius: 9999px;
}

.nav-icon.active {
  background-position: bottom;
}

.login-logout-button {
  display: flex;
  align-items: center;
  color: white;
}

.login-logout-button:hover {
  color: #ffd630 !important;
}

.login-logout-button:hover {
  color: #ffd630 !important;
  cursor: pointer;
}

.login-logout-button:hover .fa-door-open {
  color: #ffd630 !important;
}

.login-header-container {
  background-color: #1e1e1e;
}

.login-user-dropdown .el-popper__arrow {
  display: none !important;
}

.login-user-dropdown {
  position: absolute;
  width: 180px !important;
  height: auto !important;
  z-index: 2 !important;
  font-size: 12px !important;
  border: 2px solid #ffd630 !important;
  border-radius: 6px !important;
  background-color: rgba(0, 0, 0, 0.85) !important;
  margin-top: 0 !important;
  transform: none !important;
}

.login-user-dropdown .el-dropdown-menu {
  background-color: transparent !important;
  border: none !important;
  padding-top: 5px !important;
}

.login-user-dropdown .el-dropdown-menu__item {
  position: relative;
  padding-left: 40px !important;
  font-size: 12px;
  color: white !important;
  background-color: transparent !important;
  margin-bottom: 5px;
}

.login-user-dropdown .el-dropdown-menu__item::before {
  content: '•';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: white;
}

.login-user-dropdown .el-dropdown-menu__item:hover {
  color: #ffd630 !important;
}

.login-user-dropdown .el-dropdown-menu__item:hover::before {
  color: #ffd630;
}

.rotate-icon {
  transition: transform 0.3s ease;
}

.rotate-icon.open {
  transform: rotate(180deg);
}

.login-dropdown-button {
  width: 36px !important;
  height: 36px !important;
  border: none !important;
  border-radius: 5px;
  background-color: #484848 !important;
  padding: 0px;
  margin-left: 10px;
}

.login-dropdown-icon svg {
  color: #ffd630 !important;
  width: 30px;
  height: 30px;
}

.login-user-info,
.login-info-label,
.login-info-value {
  line-height: 26px;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
}

.login-user-info {
  margin-left: 10px;
  background: #484848;
  display: flex;
  align-items: center;
  justify-items: center;
}

.login-info-label,
.login-info-value {
  padding: 5px 10px;
}

.login-info-label {
  display: inline-block;
  border-radius: 5px 0 0 5px;
  background: #363636;
}

.login-info-value {
  color: #fff48e;
}

.login-action-button {
  display: flex;
  align-items: center;
  justify-items: center;
  line-height: 26px;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px 30px;
  margin-left: 10px;
  background: #484848;
  cursor: pointer;
}

.login-time {
  font-size: 15px;
  letter-spacing: 0.5px;
  color: #fef3c7;
}

.login-date {
  color: #d1d5db;
}

.separator {
  font-weight: bold;
}

.login-user-section {
  order: 2;
  gap: 12px;
}

.login-time-display {
  right: 0;
}

.login-date-container {
  margin: 3px;
}
.login-date,
.login-time {
  color: white;
  font-size: 14px;
  margin-left: 5px;
}

.login-main-navigation {
  height: 72px;
  background-color: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-nav-link {
  color: white;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  width: 100px;
}

.login-nav-item:hover .login-nav-link,
.login-nav-item[data-active='true'] .login-nav-link {
  color: #ffd630;
}

.login-nav-item {
  height: 100%;
}

.login-nav-dropdown {
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

.login-dropdown-link {
  color: white;
  font-size: 12px;
  cursor: pointer;
  padding: 10px;
}

.login-dropdown-link:hover {
  color: #ffd630;
}

.fa-message {
  color: rgb(117, 233, 119);
  padding: 5px 10px;
  padding-left: 0px;
  cursor: pointer;
}

.fa-arrows-rotate {
  @apply text-yellow-300;
  padding: 5px 10px;
  padding-left: 0px;
  cursor: pointer;
}

.fa-door-open {
  color: white;
  font-size: 15px;
  margin-right: 10px;
}
</style>
