<template>
  <div class="footer">
    <div class="footer-wrapper">
      <!-- 第一列：公司信息 -->
      <section class="fsection">
        <img
          src="@/assets/images/logo.png"
          alt="flogo"
          class="w-[170px] h-[39px] mb-[30px] bg-no-repeat bg-contain"
        />
        <span class="ftitle">
          我们有适合每个玩家玩在线赌场的游戏。我们不仅有数百种赌场游戏，而且还为我们的会员提供各种奖金和促销活动。
        </span>
        <img
          src="@/assets/images/footer/f18.png"
          alt="f18"
          class="w-[244px] h-[41px] mt-[40px] bg-no-repeat bg-center"
        />
      </section>

      <!-- 第二列：快速链接 -->
      <section class="fsection">
        <div class="footer-heading">
          <img src="@/assets/images/footer/footer1.png" alt="footer1" class="footericon" />
          <h3 class="ftitle2">快速链接</h3>
        </div>
        <div class="site-footer">
          <div class="footer-links">
            <router-link
              v-for="link in quickLinks1"
              :key="link.path"
              :to="link.path"
              class="sitelink"
            >
              <svg class="sitelinkicon" stroke="currentColor" fill="none" viewBox="0 0 21 21">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 5l7 7-7 7M4 5l7 7-7 7"
                />
              </svg>
              <span class="sitelinktext">{{ link.text }}</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 第三列：合成游戏 -->
      <section class="fsection">
        <div class="footer-heading">
          <img src="@/assets/images/footer/footer2.png" alt="footer1" class="footericon" />
          <h3 class="ftitle2">合成游戏</h3>
        </div>
        <div class="site-footer">
          <div class="footer-links">
            <router-link
              v-for="link in quickLinks2"
              :key="link.path"
              :to="link.path"
              class="sitelink"
            >
              <svg class="sitelinkicon" stroke="currentColor" fill="none" viewBox="0 0 21 21">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 5l7 7-7 7M4 5l7 7-7 7"
                />
              </svg>
              <span class="sitelinktext">{{ link.text }}</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 第四列：联系我们 -->
      <section class="fsection mt-[90px]">
        <div class="flex justify-end items-end w-[270px] h-[285px]">
          <img src="@/assets/images/footer/footer3.png" alt="footer3" class="w-[285px] h-[270px]" />
        </div>
      </section>
    </div>

    <div class="reserved flex justify-center items-center">
      <p class="text-[14px]">版权所有 © 89bet Reserved</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const quickLinks1 = ref([
  { path: '/aboutus', text: '关于我们' },
  { path: '/agents', text: '代理' },
  { path: '/deposit', text: '存款说明' },
  { path: '/withdrawal', text: '提款指示' },
  { path: '/contact', text: '联系我们' },
  { path: '/downloadapp', text: '移动应用程序' },
])

const quickLinks2 = ref([
  { path: '/bet', text: '赌场' },
  { path: '/explosivegame', text: '爆炸罐' },
  { path: '/fishing', text: '捕鱼' },
  { path: '/sports', text: '运动' },
  { path: '/board', text: '3D纸牌游戏' },
  { path: '/cockfighting', text: '鸡踢' },
  { path: '/lottery', text: '抽奖' },
])
</script>

<style scoped>
.reserved {
  height: 58px;
  margin: 0px;
  background-color: #363636;
}

.footer {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 500px;
  color: #a7a7a7;
  background-color: #1e1e1e;
}

.footer-wrapper {
  display: inline-flex;
  align-items: center;
  height: 442px;
  position: relative;
  width: 1200px;
  margin: 0 auto;
}

/* 列样式 */
.fsection {
  height: 350px;
  width: 270px;
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}

.fsection:first-child {
  margin-left: 0;
}

/* 标题和描述 */
.ftitle {
  font-size: 14px;
  color: #a7a7a7;
  line-height: 1.5;
}

.ftitle2 {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  margin: 0px;
}

/* 头部图标 */
.footer-heading {
  display: inline-flex;
  align-items: center;
  height: 35px;
  margin: 0px;
}

.footericon {
  width: 21px;
  height: 21px;
  margin-right: 5px;
}

/* 链接容器 */
.site-footer {
  background-color: transparent;
  padding: 0;
  text-align: left;
  margin-top: 5px;
}

.footer-links {
  display: flex;
  flex-direction: column;
}

/* 链接项样式 */
.sitelink {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dotted #a7a7a7;
  text-decoration: none;
  color: #a7a7a7;
}

.sitelinkicon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  stroke-width: 4;
  color: #a7a7a7;
}

.sitelinktext {
  font-size: 14px;
}

/* Hover 效果（关键修改点） */
.sitelink:hover .sitelinkicon,
.sitelink:hover .sitelinktext {
  color: #ffd630;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.sitelink:hover .sitelinktext {
  font-weight: bold; /* 文字加粗 */
}

/* 激活路由高亮 */
.footer-links a.router-link-exact-active .sitelinktext,
.footer-links a.router-link-exact-active .sitelinkicon {
  color: #ffd630;
  font-weight: bold;
}
</style>
