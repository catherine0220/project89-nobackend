<template>
  <div class="slot-game flex-col">
    <span class="slot-game-title">爆炸罐子游戏</span>

    <div class="slot-table" :style="bgStyle">
      <!-- Indicator -->
      <ul class="indicator">
        <template v-for="(tab, index) in tabList" :key="index">
          <!-- 每个 tab -->
          <li
            @click="activeTab = index"
            class="group relative flex flex-col items-center justify-center w-[100px] h-[90px] cursor-pointer transition"
          >
            <!-- 背景图 -->
            <div
              class="w-[60px] h-[40px] bg-no-repeat bg-cover mb-[10px]"
              :style="{
                backgroundImage: `url(${tab.icon_url})`,
                backgroundPosition: activeTab === index ? '0 -40px' : '0 0',
                backgroundSize: '60px 80px',
              }"
            ></div>

            <!-- 名称 -->
            <span
              class="text-[14px] font-semibold transition"
              :class="activeTab === index ? 'text-white' : 'text-[#333]'"
            >
              {{ tab.name }}
            </span>

            <!-- 黄色横线 -->
            <div
              v-if="activeTab === index"
              class="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#ffd630]"
            ></div>
          </li>

          <!-- 在每两个分组之间插入 slotindicator 图 -->
          <img
            v-if="index < tabList.length - 1"
            src="@/assets/images/gamegrid/slotindicator.png"
            alt=""
            class="slot-separator"
          />
        </template>
      </ul>

      <!-- 游戏网格 -->
      <div class="slot-grid">
        <div
          v-for="(game, index) in filteredGames"
          :key="index"
          @click="goToLogin"
          class="game-card"
          @mouseover="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <!-- 游戏图片 -->
          <div class="game-image-container">
            <img :src="game.image_url" alt="game icon" class="game-image" />
          </div>

          <!-- 游戏名称条 -->
          <div class="game-name">
            {{ game.game_name || game.name }}
          </div>

          <!-- Hover 遮罩层 + 按钮 -->
          <div v-if="hoveredIndex === index" class="game-overlay">
            <a class="play-button" :href="game.url" target="_blank">今天开玩</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <LoginModal
    v-if="showLoginModal"
    @close="showLoginModal = false"
    @show-register="
      () => {
        showLoginModal = false
        showRegisterModal = true
      }
    "
  />
  <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
</template>

<script setup>
import { ref, computed } from 'vue'
import RegisterModal from '@/views/components/RegisterModal.vue'
import LoginModal from '@/views/components/LoginModal.vue'
import bgImg from '@/assets/images/gamegrid/slotgamebg.jpg'

// // 图片路径工具函数
// function localImg(path) {
//   return new URL(`@/assets/images/${path}`, import.meta.url).href
// }

// 弹窗 & hover 控制
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const hoveredIndex = ref(null)

// 当前 Tab 索引
const activeTab = ref(0)
const gamesPerGroup = 14

// 背景图样式
const bgStyle = {
  backgroundImage: `url(${bgImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '1900px',
  color: 'white',
}

// 🧨 tab 和游戏本地静态数据（可改成你自己的图）
const tabList = ref([
  {
    name: '电子城',
    icon_url: new URL('@/assets/images/gamegrid/slot1.png', import.meta.url).href,
    games: [
      {
        game_name: '麻将路2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid1.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '麻将唐',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '决定性胜负',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: 'm麻将路',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '黄金城4',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '玛雅黄金城2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '玛雅黄金城3',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '阿次特克',
        image_url: new URL('@/assets/images/gamegrid/gamegrid8.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '财富降临',
        image_url: new URL('@/assets/images/gamegrid/gamegrid9.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '福星',
        image_url: new URL('@/assets/images/gamegrid/gamegrid10.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '富贵财神',
        image_url: new URL('@/assets/images/gamegrid/gamegrid11.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运舞狮7',
        image_url: new URL('@/assets/images/gamegrid/gamegrid12.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '黄金城5',
        image_url: new URL('@/assets/images/gamegrid/gamegrid13.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '龙神寻宝2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid14.png', import.meta.url).href,
        url: '#',
      },
    ],
  },
  {
    name: 'FC 电子',
    icon_url: new URL('@/assets/images/gamegrid/slot2.png', import.meta.url).href,
    games: [
      {
        game_name: '夜市',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-1.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '农历新年',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-2.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '精灵灯',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-3.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '新年快乐2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-4.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '夜市2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-5.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '印加女王',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-6.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '糖暴击',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-7.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '古墓宝藏',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-8.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '丰厚财富 3x3',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-9.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '新年多多',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-10.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运财富',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-11.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '金豹',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-12.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '印加神话',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-13.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '魔法配对',
        image_url: new URL('@/assets/images/gamegrid/gamegrid2-14.png', import.meta.url).href,
        url: '#',
      },
    ],
  },
  {
    name: 'PG 电子',
    icon_url: new URL('@/assets/images/gamegrid/slot3.png', import.meta.url).href,
    games: [
      {
        game_name: '麻将路',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-1.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '阿兹特克',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-2.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '麻将路2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-3.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '战斗奖励',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-4.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运猫',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-5.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '狂野盗贼',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-6.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '独角兽小贴士',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-7.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运兔',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-8.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '醉酒女王',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-9.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '战胜财神',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-10.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '象头神',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-11.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '狂野烟花',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-12.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '澳门梦',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-13.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运龙',
        image_url: new URL('@/assets/images/gamegrid/gamegrid3-14.png', import.meta.url).href,
        url: '#',
      },
    ],
  },
  {
    name: 'CQ9 电子',
    icon_url: new URL('@/assets/images/gamegrid/slot4.png', import.meta.url).href,
    games: [
      {
        game_name: '好命运',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-1.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: 'Disco 夜晚',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-2.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '赚钱摇钱树',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-3.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '发财神2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-4.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '跳高2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-5.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '跳高',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-6.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '移动跳高',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-7.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '阿拉丁与神灯',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-8.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '飞起来',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-9.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '5 吉祥物',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-10.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '好命运',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-11.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '迪斯科之夜',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-12.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '雷神',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-13.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '火女王2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid4-14.png', import.meta.url).href,
        url: '#',
      },
    ],
  },
  {
    name: 'JL 电子',
    icon_url: new URL('@/assets/images/gamegrid/slot5.png', import.meta.url).href,
    games: [
      {
        game_name: '超级王牌',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-1.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '黄金帝国',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-2.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运宝石',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-3.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '拳击王',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-4.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运宝石2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-5.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '无限王牌',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-6.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '疯狂 777',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-7.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '抢手疯了',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-8.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运宝石3',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-9.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '阿里巴巴',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-10.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运豹',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-11.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '超级王牌豪华房',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-12.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '3个野马币',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-13.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '硬币树',
        image_url: new URL('@/assets/images/gamegrid/gamegrid5-14.png', import.meta.url).href,
        url: '#',
      },
    ],
  },
  {
    name: 'KA 电子',
    icon_url: new URL('@/assets/images/gamegrid/slot6.png', import.meta.url).href,
    games: [
      {
        game_name: '宝罐',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-1.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '疯狂奖励',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-2.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '超级能量',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-3.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运 88',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-4.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '金水牛',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-5.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '金虎财富',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-6.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '财富与财富',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-7.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运财富',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-8.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '高级版疯狂奖励',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-9.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '超级火焰',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-10.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '幸运之神',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-11.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '超级龙虎',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-12.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '四海龙王',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-13.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '僵尸道人',
        image_url: new URL('@/assets/images/gamegrid/gamegrid6-14.png', import.meta.url).href,
        url: '#',
      },
    ],
  },
  {
    name: 'BNG 电子',
    icon_url: new URL('@/assets/images/gamegrid/slot7.png', import.meta.url).href,
    games: [
      {
        game_name: '森林王',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-1.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '寻找黄金',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-2.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '黑狼',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-3.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '大盗',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-5.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '阿慈特火焰',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-6.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '太阳神庙3',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-7.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '太阳女神',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-8.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '浪漫莲花',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-9.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '毒苹果',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-10.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '快乐鱼',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-11.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '黄金特快车',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-12.png', import.meta.url).href,
        url: '#',
      },
      {
        game_name: '采珠者2',
        image_url: new URL('@/assets/images/gamegrid/gamegrid7-13.png', import.meta.url).href,
        url: '#',
      },
    ],
  },
])

// 当前选中 Tab 对应的游戏
const filteredGames = computed(() => {
  if (!tabList.value[activeTab.value]) return []
  return tabList.value[activeTab.value].games.slice(0, gamesPerGroup)
})

// 模拟跳转登录（你原本逻辑保留）
const goToLogin = () => {
  showLoginModal.value = true
}
</script>

<!-- <script setup>
import { ref, computed, onMounted } from 'vue'
import RegisterModal from '@/views/components/RegisterModal.vue'
import bgImg from '@/assets/images/gamegrid/slotgamebg.jpg'
import axios from 'axios'
import fallbackImage from '@/assets/images/placeholder.png'
import LoginModal from '@/views/components/LoginModal.vue'

const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const hoveredIndex = ref(null)
const backendGames = ref([])
const tabList = ref([])
const fallbackImageUrl = new URL(fallbackImage, import.meta.url).href

const activeTab = ref(0)
const gamesPerGroup = 14

const bgStyle = {
  backgroundImage: `url(${bgImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '1900px',
  color: 'white',
}

// Fetch all data from backend
const fetchData = async () => {
  try {
    // 1. First fetch tab data from category 10
    const tabResponse = await axios.get('https://192.168.0.122/silver/user/game_list.php', {
      params: {
        category: 10,
        status: 1,
      },
    })

    if (tabResponse.data.success) {
      const rawTabs = tabResponse.data.data

      rawTabs.sort((a, b) => a.id - b.id) // 如果后端数据有 ID，可以用这个方式排序

      tabList.value = rawTabs.map((tab) => ({
        name: tab.game_name || tab.name || '未知标签',
        icon_url: tab.image_url
          ? `https://192.168.0.122${tab.image_url.startsWith('/') ? '' : '/'}${tab.image_url}`
          : fallbackImageUrl,
      }))
    }

    // 2. Then fetch games for each tab (categories 11+)
    const gameCategories = Array.from({ length: tabList.value.length }, (_, i) => 11 + i)
    const gameRequests = gameCategories.map((category) =>
      axios.get('https://192.168.0.122/silver/user/game_list.php', {
        params: {
          category,
          status: 1,
        },
      }),
    )

    const gameResponses = await Promise.all(gameRequests)

    // Process game responses
    backendGames.value = gameResponses.map((response) => {
      if (response.data.success) {
        return response.data.data.map((game) => ({
          ...game,
          image_url: game.image_url
            ? `https://192.168.0.122${game.image_url.startsWith('/') ? '' : '/'}${game.image_url}`
            : fallbackImageUrl,
          game_name: game.game_name || game.name || '未知游戏',
          // url: (function (a) {
          //   console.log(a)
          // })([game.url, game.game_name]),
          url: `https://192.168.0.122${game.url.startsWith('/') ? '' : '/'}${game.url}`,
        }))
      }
      return []
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    tabList.value = []
    backendGames.value = []
  }
}

const filteredGames = computed(() => {
  if (!backendGames.value[activeTab.value]) return []
  return backendGames.value[activeTab.value].slice(0, gamesPerGroup)
})

onMounted(() => {
  fetchData()
})
</script> -->

<style scoped>
.indicator {
  display: flex;
  justify-content: center;
  max-width: 1200px;
  padding: 0;
  margin: 0 auto 25px;
  list-style: none;
  border-bottom: 2px solid #363636;
  gap: 18px;
}

.indicator-item::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 2px;
  background-color: #ffd630;
}

.slot-separator {
  width: 10px;
  height: 2px;
  margin: 0 8px;
  align-self: center;
  position: relative;
  top: -10px;
}

.slot-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 10px;
  row-gap: 20px;
}

.game-card {
  position: relative;
  width: 160px;
  height: 192px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #1e1e1e;
  transition: all 0.3s ease;
}

.game-image-container {
  width: 135px;
  height: 135px;
  margin: 12px auto;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 32px;
  background: #363636;
  color: #fff;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.game-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid gold;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 104px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #000;
  border-radius: 16px;
  background-color: #ffd630;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.slot-game {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding-bottom: 20px;
  height: 688px;
}

.slot-game-title {
  margin-bottom: 55px;
  font-size: 30px;
  font-weight: bold;
  color: #ffd630;
}

.slot-game-title::before {
  content: '';
  display: inline-block;
  width: 52px;
  height: 36px;
  margin-right: 10px;
  background-image: url('@/assets/images/slotgame.png');
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: middle;
}

.slot-game-title::after {
  content: '';
  display: inline-block;
  width: 52px;
  height: 36px;
  margin-left: 10px;
  background-image: url('@/assets/images/slotgame1.png');
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: middle;
}
</style>
