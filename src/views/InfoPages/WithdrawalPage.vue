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
        <h1 class="title-main">如何提取资金</h1>
        <ul class="point-list">
          <li>第 1 步：登录 89bet 后，成员点击提现。</li>
          <li>
            第 2 步：输入要提取的积分数量（1 积分 = 1000
            越南盾，余额必须大于或等于所需的提款积分数量）。
          </li>
          <li>第 3 步：选择 发送 并等待资金更新到关联的银行账户。</li>

          <!-- 提现时的注意事项。 -->
          <li class="title-sub2">提现时的注意事项</li>
          <li>最低提款 100K （100,000 VND），最高提款 1,000,000K （10 亿越南盾）</li>
          <li>
            在注册帐户时，请确保您的银行信息准确无误，并且与您的真实姓名相匹配。如果此信息不正确或不匹配，系统将无法颁发帐户。
          </li>
          <li>
            如果您的余额没有存入主钱包，则无法提款（如果会员在维护期间访问游戏大厅，大厅可能会保留积分，因此无法提款）。
          </li>
          <li>
            在提款之前，必须满足所需的投注点数。如果未达到所需的积分数量，则可能会退回提款订单。如果系统在未达到所需投注点数的情况下批准提款顺序，则促销金额将被扣除，并收取存款金额
            50% 的管理费。 会员应注意，提款应在下注完成后的 10 至 30
            分钟内进行，以便系统从游戏大厅完全更新所有会员的投注。
          </li>
          <li>
            如果促销活动的条款尚未完全实施，则无法提款。如果违反促销活动的条款，可能会根据规定扣除利润和促销活动。
          </li>
          <li>
            如果系统在您不符合提款条件的情况下退回了积分并向您发送了一封信，但您仍然有意创建提款订单，则系统可能会暂停提款订单。会员需要联系在线客服部门讨论他们的问题。
          </li>

          <!-- 游戏区、体育活动、游戏期间有奖品的彩票。 -->
          <li class="title-sub2">游戏区、体育活动、游戏期间有奖品的彩票</li>
          <li>
            如出现掉线或意外注销等异常情况，可能是由于作不当或参与无效。导致奖金作废或取消等损害......公司不承担任何责任，因为它们不是由公司的系统引起的。
          </li>
          <li>会员需要检查他们的网络连接、设备以及应用程序和作系统，以免损害您的权利。</li>
          <li>
            请注意：不同的游戏将根据不同的方法进行计算。所有未被接受或取消的游戏和投注均视为无效投注。
            89bet 始终遵守游戏提供商的规则，因此当提供商确定存在不规则/无效的投注时， 89bet
            将不承担任何责任，因为这不是公司的决定。
          </li>
          <li>
            在任何情况下， 89bet 我们保留做出最终决定的权利。当您有任何问题需要解答时，请联系 24/7
            客服 非常感谢！
          </li>
        </ul>
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
  color: gold;
}

/* .title-sub1 {
  font-size: 16px;
  font-weight: bold;
  color: gold;
} */

.title-sub2 {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin: 10px 0;
}

/* .paragraph {
  font-size: 12px;
  text-align: justify;
  color: #fff;
} */

.point-list {
  list-style-type: disc; /* 实心圆点 */
  padding-left: 20px; /* 左缩进 */
  color: #fff;
  font-size: 14px;
  line-height: 1.8;
}
</style>
