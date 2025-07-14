<template>
  <div>
    <!-- Header -->
    <DynamicHeader />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/aboutus.jpg" alt="banner" class="about-banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="about-textcontainer">
      <div class="about-textwrapper">
        <h1 class="title-main">联系我们</h1>
        <p class="paragraph">89bet 客户服务中心全年开放，每周 7 天、每天 24 小时提供优质服务。</p>
        <p class="paragraph">
          如果您对本网站的使用有任何疑问，您可以通过以下任一方式联系客服代表，以享受最实时的服务：
        </p>
        <p class="paragraph">
          点击
          <router-link to="/customer-service" class="link">在线客服</router-link>
          链接，即可进入在线客服系统，联系客服人员。
        </p>
      </div>
    </div>

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import DynamicHeader from '@/views/DynamicHeader.vue'
import ABar from '@/views/ABar.vue'
import FooterMain from '../FooterMain.vue'
</script>

<style scoped>
.about-textcontainer {
  position: relative;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
}

.about-textwrapper {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
}

.title-main {
  margin: 0 0 25px;
  padding-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
  text-align: left;
  color: #fff;
}

.link {
  color: red;
  cursor: pointer;
  font-weight: bold;
}

.link:hover {
  color: gold;
}

/* .title-sub {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
} */

.paragraph {
  font-size: 12px;
  text-align: justify;
  color: #fff;
}
</style>
