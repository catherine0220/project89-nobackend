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
                backgroundImage: `url(${tab.icon})`,
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
            <img :src="game.image" alt="game icon" class="game-image" />
          </div>

          <!-- 游戏名称条 -->
          <div class="game-name">
            {{ game.name }}
          </div>

          <!-- Hover 遮罩层 + 按钮 -->
          <div v-if="hoveredIndex === index" class="game-overlay">
            <div class="play-button">今天开玩</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import bgImg from '@/assets/images/gamegrid/slotgamebg.jpg'

const router = useRouter()

const tabList = [
  { name: '电子城', icon: new URL('@/assets/images/gamegrid/slot1.png', import.meta.url).href },
  { name: 'FC 电子', icon: new URL('@/assets/images/gamegrid/slot2.png', import.meta.url).href },
  { name: 'PG 电子', icon: new URL('@/assets/images/gamegrid/slot3.png', import.meta.url).href },
  { name: 'CQ9 电子', icon: new URL('@/assets/images/gamegrid/slot4.png', import.meta.url).href },
  { name: '吉利电子', icon: new URL('@/assets/images/gamegrid/slot5.png', import.meta.url).href },
  { name: 'KA 电子', icon: new URL('@/assets/images/gamegrid/slot6.png', import.meta.url).href },
  { name: 'PNG 电子', icon: new URL('@/assets/images/gamegrid/slot7.png', import.meta.url).href },
]

const activeTab = ref(0) // 默认第一个 tab 激活

const bgStyle = {
  backgroundImage: `url(${bgImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '1900px',
  color: 'white',
}

const imageModules = import.meta.glob('@/assets/images/gamegrid/*.png', {
  eager: true,
  import: 'default',
})

const imageMap = Object.entries(imageModules).reduce((map, [path, url]) => {
  const fileName = path.split('/').pop()
  map[fileName] = url
  return map
}, {})

const allGames = [
  // 分组 1
  { name: '麻将路2号', image: imageMap['gamegrid1.png'] },
  { name: '超级特大号', image: imageMap['gamegrid2.png'] },
  { name: '麻将Thang', image: imageMap['gamegrid3.png'] },
  { name: '决定性奖品', image: imageMap['gamegrid4.png'] },
  { name: '麻将路', image: imageMap['gamegrid5.png'] },
  { name: '黄金城4', image: imageMap['gamegrid6.png'] },
  { name: '玛雅黄金2', image: imageMap['gamegrid7.png'] },
  { name: '玛雅黄金3', image: imageMap['gamegrid8.png'] },
  { name: 'Aztec 宝藏', image: imageMap['gamegrid9.png'] },
  { name: 'Aztec 女王', image: imageMap['gamegrid10.png'] },
  { name: 'Gem Candy', image: imageMap['gamegrid11.png'] },
  { name: '财富降临', image: imageMap['gamegrid12.png'] },
  { name: '福星', image: imageMap['gamegrid13.png'] },
  { name: '财富神', image: imageMap['gamegrid14.png'] },
  // 分组 2
  // 分组 2
  { name: '夜市', image: imageMap['gamegrid2-1.png'] },
  { name: '农历新年', image: imageMap['gamegrid2-2.png'] },
  { name: '黄金精灵', image: imageMap['gamegrid2-3.png'] },
  { name: '新年快乐2', image: imageMap['gamegrid2-4.png'] },
  { name: '夜市2', image: imageMap['gamegrid2-5.png'] },
  { name: '印加女王', image: imageMap['gamegrid2-6.png'] },
  { name: '蜂蜜炸弹', image: imageMap['gamegrid2-7.png'] },
  { name: '古墓宝藏', image: imageMap['gamegrid2-8.png'] },
  { name: '丰裕财富3x3', image: imageMap['gamegrid2-9.png'] },
  { name: '新年快乐', image: imageMap['gamegrid2-10.png'] },
  { name: '连年致富', image: imageMap['gamegrid2-11.png'] },
  { name: '黄报', image: imageMap['gamegrid2-12.png'] },
  { name: '印加传说', image: imageMap['gamegrid2-13.png'] },
  { name: '匹配的魔力', image: imageMap['gamegrid2-14.png'] },

  // 分组 3
  { name: '麻将路', image: imageMap['gamegrid3-1.png'] },
  { name: '阿兹特克宝藏', image: imageMap['gamegrid3-2.png'] },
  { name: '麻将路2', image: imageMap['gamegrid3-3.png'] },
  { name: '奖励战斗', image: imageMap['gamegrid3-4.png'] },
  { name: '幸运猫', image: imageMap['gamegrid3-5.png'] },
  { name: '野外海盗', image: imageMap['gamegrid3-6.png'] },
  { name: '独角兽讲述', image: imageMap['gamegrid3-7.png'] },
  { name: '幸运兔', image: imageMap['gamegrid3-8.png'] },
  { name: '酗酒的女士', image: imageMap['gamegrid3-9.png'] },
  { name: '财神胜利', image: imageMap['gamegrid3-10.png'] },
  { name: '象头神的宝藏', image: imageMap['gamegrid3-11.png'] },
  { name: '野外烟花', image: imageMap['gamegrid3-12.png'] },
  { name: '澳门梦', image: imageMap['gamegrid3-13.png'] },
  { name: '幸运龙', image: imageMap['gamegrid3-14.png'] },

  // 分组 4
  { name: '祝你好运', image: imageMap['gamegrid4-1.png'] },
  { name: '迪斯科之夜 M', image: imageMap['gamegrid4-2.png'] },
  { name: '摇钱树', image: imageMap['gamegrid4-3.png'] },
  { name: '发财神2游戏', image: imageMap['gamegrid4-4.png'] },
  { name: '跳高2', image: imageMap['gamegrid4-5.png'] },
  { name: '跳高', image: imageMap['gamegrid4-6.png'] },
  { name: '移动跳高', image: imageMap['gamegrid4-7.png'] },
  { name: '阿拉丁与神灯', image: imageMap['gamegrid4-8.png'] },
  { name: '翱翔', image: imageMap['gamegrid4-9.png'] },
  { name: '5个吉祥物', image: imageMap['gamegrid4-10.png'] },
  { name: '祝你好运', image: imageMap['gamegrid4-11.png'] },
  { name: '迪斯科之夜', image: imageMap['gamegrid4-12.png'] },
  { name: '雷神', image: imageMap['gamegrid4-13.png'] },
  { name: '火焰女王2', image: imageMap['gamegrid4-14.png'] },

  // 分组 5
  { name: '超级王牌', image: imageMap['gamegrid5-1.png'] },
  { name: '黄金帝国', image: imageMap['gamegrid5-2.png'] },
  { name: '卡拉宝石', image: imageMap['gamegrid5-3.png'] },
  { name: '拳击之王', image: imageMap['gamegrid5-4.png'] },
  { name: '幸运宝石2', image: imageMap['gamegrid5-5.png'] },
  { name: '无限王牌', image: imageMap['gamegrid5-6.png'] },
  { name: '疯狂777', image: imageMap['gamegrid5-7.png'] },
  { name: '疯狂枪手', image: imageMap['gamegrid5-8.png'] },
  { name: '幸运宝石 3', image: imageMap['gamegrid5-9.png'] },
  { name: '阿里酒吧', image: imageMap['gamegrid5-10.png'] },
  { name: '幸运豹', image: imageMap['gamegrid5-11.png'] },
  { name: '超级王牌豪华版', image: imageMap['gamegrid5-12.png'] },
  { name: '3枚野马币', image: imageMap['gamegrid5-13.png'] },
  { name: '硬币树', image: imageMap['gamegrid5-14.png'] },
  // 分组 6
  { name: '宝藏罐', image: imageMap['gamegrid6-1.png'] },
  { name: '疯狂奖励', image: imageMap['gamegrid6-2.png'] },
  { name: '超级能量', image: imageMap['gamegrid6-3.png'] },
  { name: '幸运88', image: imageMap['gamegrid6-4.png'] },
  { name: '金水牛', image: imageMap['gamegrid6-5.png'] },
  { name: '金虎兴旺', image: imageMap['gamegrid6-6.png'] },
  { name: '祝你好运和繁荣', image: imageMap['gamegrid6-7.png'] },
  { name: '祝你好运和繁荣', image: imageMap['gamegrid6-8.png'] },
  { name: '疯狂奖励高级版', image: imageMap['gamegrid6-9.png'] },
  { name: '超级火焰', image: imageMap['gamegrid6-10.png'] },
  { name: '幸运象头神', image: imageMap['gamegrid6-11.png'] },
  { name: '超级龙虎', image: imageMap['gamegrid6-12.png'] },
  { name: '四海龙王', image: imageMap['gamegrid6-13.png'] },
  { name: '僵尸道士锁 好运连连', image: imageMap['gamegrid6-14.png'] },

  // 分组 7
  { name: '泰山--红书', image: imageMap['gamegrid7-1.png'] },
  { name: '寻找黄金 - 练习好运', image: imageMap['gamegrid7-2.png'] },
  { name: '黑狼 - 红色运气', image: imageMap['gamegrid7-3.png'] },
  { name: '爆炸糖果', image: imageMap['gamegrid7-4.png'] },
  { name: '大道', image: imageMap['gamegrid7-5.png'] },
  { name: '阿兹特克之火 - 吉红云', image: imageMap['gamegrid7-6.png'] },
  { name: '太阳神殿3 - 吉鸿运', image: imageMap['gamegrid7-7.png'] },
  { name: '太阳女神 - 红色幸运系列', image: imageMap['gamegrid7-8.png'] },
  { name: '莲花浪漫 - 超野姬红云', image: imageMap['gamegrid7-9.png'] },
  { name: '毒苹果--练习好运', image: imageMap['gamegrid7-10.png'] },
  { name: '快乐鱼', image: imageMap['gamegrid7-11.png'] },
  { name: '黄金快车 - 红运', image: imageMap['gamegrid7-12.png'] },
  { name: '珍珠挖掘者2：宝箱', image: imageMap['gamegrid7-13.png'] },
]

const gamesPerGroup = 14
const filteredGames = computed(() => {
  const start = activeTab.value * gamesPerGroup
  return allGames.slice(start, start + gamesPerGroup)
})
const hoveredIndex = ref(null)
function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
.indicator {
  display: flex;
  justify-content: center; /* ✅ 允许 gap 起作用 */
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
