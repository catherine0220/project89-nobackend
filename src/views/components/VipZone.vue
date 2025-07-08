<template>
  <div class="content">
    <div class="vip1">
      <img :src="vip1" :alt="item.label" class="vip-img" />
      <div class="vip-level">
        <h4>当前水平</h4>
        <h1>贵宾0</h1>
        <h4>VIP0 贵宾</h4>
      </div>
    </div>
    <div class="vip2">
      <div class="vip2-header">
        <div class="vip2-title">
          <span> VIP</span>
          <span>1</span>
          <span> 升级条件</span>
        </div>
        <button class="upgrade">升级阈值</button>
      </div>
      <div class="value">
        <span class="value-title">VIP Points</span>
        <div class="value-num">
          <span _mstvisible="1">
            <span class="ng-binding _2C_ekPPMgBRdLGeKx82XOn">0</span>
            <span _mstvisible="2" _mstmutation="1" _istranslated="1">/</span>
            <span class="ng-binding">1,000</span>
          </span>
          <span _mstvisible="1">
            <font _mstmutation="1" _msttexthash="12726558" _msthash="803"
              ><span
                translate="VIP_Missing"
                class="ng-scope"
                _mstvisible="2"
                _mstmutation="1"
                _istranslated="1"
                >缺乏</span
              >
              <span
                _msttexthash="5278"
                _msthash="770"
                _mstvisible="2"
                _mstmutation="1"
                _istranslated="1"
                >：</span
              >
              <span
                ng-bind="$ctrl.point.missing | currencyDefault:'':0"
                class="ng-binding"
                _mstvisible="2"
                _mstmutation="1"
                _istranslated="1"
                >1,000</span
              ></font
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vip1 from '@/assets/images/vip1.png'

const item = {
  label: 'VIP 1',
}
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
