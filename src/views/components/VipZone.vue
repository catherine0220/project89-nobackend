<template>
  <div class="content">
    <div class="vip1">
      <img :src="vip1" :alt="item.label" class="vip-img" />
      <div class="vip-level">
        <h4>当前水平</h4>
        <h1>贵宾{{ currentLevel }}</h1>
        <h4>VIP{{ currentLevel }} 贵宾</h4>
      </div>
    </div>
    <div class="vip2">
      <div class="vip2-header">
        <div class="vip2-title">
          <span> VIP</span>
          <span>{{ nextLevel }}</span>
          <span> 升级条件</span>
        </div>
        <button class="upgrade">升级阈值</button>
      </div>
      <div class="value">
        <span class="value-title">VIP Points</span>
        <div class="value-num">
          <span>
            <span>{{ formattedCurrentPoints }}</span>
            <span>/</span>
            <span>{{ formattedRequiredPoints }}</span>
          </span>
          <span class="one">
            <span>缺乏</span>
            <span>：</span>
            <span>{{ formattedPointsNeeded }}</span>
          </span>
        </div>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progressPercentage }"></div>
          <div class="progress-text" v-if="showProgressText">{{ progressPercentage }}</div>
        </div>
        <div class="value-num1">
          <span>升级门槛</span>
          <span>：</span>
          <span>{{ formattedRequiredPoints }}</span>
        </div>
      </div>
    </div>

    <ul>
      <li href="/VipDetails">
        <img
          src="https://gwfd.katawee.net/system-requirement/Web.PortalNew/UD519-01/9bd5f199e8/images/04f64d39aeb7b2cab23f292f52d20665.png"
        />
        <span class="vip-subtitle">VIP 详细信息</span>
        <i class="fas fa-chevron-right"></i>
      </li>
      <li href="/VipRewardList">
        <img
          src="https://gwfd.katawee.net/system-requirement/Web.PortalNew/UD519-01/9bd5f199e8/images/25c754a1c3e3dde14db8977cd4aaf4ab.png"
        />
        <span class="vip-subtitle">申请奖励</span>
        <i class="fas fa-chevron-right"></i>
      </li>
      <li href="/VipGradeRecord">
        <img
          src="https://gwfd.katawee.net/system-requirement/Web.PortalNew/UD519-01/9bd5f199e8/images/1b39334ac7aed76d88afdcf4f1b9cd99.png"
        />
        <span class="vip-subtitle">升级历史</span>
        <i class="fas fa-chevron-right"></i>
      </li>
    </ul>
  </div>
</template>

<script setup>
import vip1 from '@/assets/images/vip1.png'
import { computed } from 'vue'

const currentLevel = 0
const nextLevel = 1
const currentPoints = 250 // Example value - connect to your data source
const requiredPoints = 1000

const item = {
  label: 'VIP 1',
}

const progressPercentage = computed(() => {
  return `${Math.min((currentPoints / requiredPoints) * 100, 100)}%`
})

const formattedCurrentPoints = computed(() => {
  return currentPoints.toLocaleString()
})

const formattedRequiredPoints = computed(() => {
  return requiredPoints.toLocaleString()
})

const formattedPointsNeeded = computed(() => {
  return Math.max(requiredPoints - currentPoints, 0).toLocaleString()
})

const showProgressText = false // Set to false if you don't want to show percentage
</script>

<style scoped>
h4,
h1 {
  margin-top: 10px;
  margin-bottom: 10px;
}

h4 {
  font-size: 18px;
  font-weight: 500;
}

h1 {
  font-size: 36px;
}

ul {
  width: 450px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
}

ul li {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  line-height: 75px;
  margin-bottom: 24px;
  color: #8b5211;
  font-size: 26px;
  cursor: pointer;
  background: url(@/assets/images/vip2.png) center / cover no-repeat;
}

ul li img {
  width: 90px;
  height: 60px;
  margin: 0 30px 0 20px;
}

ul li i {
  position: absolute;
  right: 20px;
  top: calc(50% - 13px);
}

.progress-container {
  position: relative;
  width: 425px;
  height: 8px;
  margin: 5px 0;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}

.progress-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(to right, #ffc107, #ff8f00);
  border-radius: 6px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(255, 193, 7, 0.3);
}

/* .progress-text {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
} */

.value {
  height: 80px;
  padding: 5px 13px 0 11px;
  border: solid 1px #f1da6f;
  border-radius: 0 0 8px 8px;
}

.value-title {
  font-size: 14px;
  font-weight: bold;
}

.value-num {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  font-size: 12px;
  font-weight: 500;
}

.one {
  display: flex;
  justify-content: end;
}

.value-num1 {
  display: flex;
  align-items: center;
  justify-content: end;
  color: #000;
  font-size: 12px;
  font-weight: 500;
}

.upgrade {
  min-width: 80px;
  max-width: 120px;
  line-height: 24px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 12px;
  border: solid 1px #b78510;
  background-image: linear-gradient(to bottom, #fefbb3, #ffcd51);
}

.vip2-title {
  color: #8b5211;
  font-size: 20px;
  font-weight: bold;
}

.vip2-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  background-image: linear-gradient(to bottom, #ffe980, #f1da6f);
  padding: 0 15px;
}

.vip2 {
  width: 450px;
  margin: 0 auto 25px;
  padding: 3px;
  color: #000;
  font-size: 12px;
  border-radius: 10px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(80deg, #fdffd1 3%, #fefff0 84%, #fff 99%);
}

.vip-level {
  position: absolute;
  top: 50px;
  left: 20px;
  width: 60%;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}

.vip1 {
  position: relative;
  width: 450px;
  min-height: 213px;
  margin: 0 auto 25px;
}

.vip-img {
  width: 450px;
}

.content {
  padding: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  background: #222;
  border-radius: 10px;
}
</style>
