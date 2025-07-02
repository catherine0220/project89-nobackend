<template>
  <div>
    <!-- Header -->
    <HeaderMain />

    <!-- Banner -->
    <div class="flex justify-center">
      <img src="@/assets/images/aboutus.jpg" alt="banner" class="about-banner" />
    </div>

    <!-- Announcement -->
    <ABar />
    <div class="about-textcontainer">
      <div class="about-textwrapper">
        <h1 class="title-main">如何存款</h1>
        <h3 class="title-sub1">如何存款</h3>
        <p class="paragraph">
          第 1 步：登录后，会员点击存款。 <br />
          第 2 步：选择适合您的转账方式的存款网关。 <br />
          第 3 步：选择存款银行，输入存款点号并继续。 <br />
          第 4 步：通过 上显示的银行信息进行转账。<br />
        </p>

        <h3 class="title-sub1">存款说明</h3>
        <p class="paragraph">
          为了让存款更方便、简单，我们一直在调整和优化作流程，提供多种存款方式。我们将继续研究以满足您的需求。以下是您可以向您的账户转账的一些方法：
        </p>

        <h3 class="title-sub2">第一：在线支付</h3>
        <p class="paragraph">
          1.在线支付分为两种类型，即通过电子钱包支付和网上银行转账支付。 <br />
          2.每种转账方式都可以有多个不同的账户，您只需选择任意 1 个账户即可支付。<br />
          3.您可以按照公司预装系统上的步骤进行作。 <br />
          4.下单后，系统需要一小段时间才能确认您的转账信息，我们建议您保留转账收据。 <br />
          5.付款成功后，系统金额将立即更新到您的帐户中。<br />
        </p>

        <h3 class="title-sub2">周一：存款建议</h3>
        <p class="paragraph">
          1.89bet .com规定最低存款金额为 10,000 越南盾，对于银行账户转账，最高存款限额为 300,000,000
          越南盾，对于通过电子钱包进行的转账，每次转账的最高转账额为 50,000,000 越南盾。 <br />
          2.在线支付的最低和最高金额会有所不同，具体取决于用户选择的付款方式。您可以 24/7
          联系客户服务了解更多详情。<br />
          3.一个二维码仅用于一个交易。 <br />
          4.扫描二维码后输入正确的 数量 和 转移内容.<br />
          5.保存成功交易收据的图像，以便在需要时进行对帐。<br />
        </p>
      </div>
    </div>

    <!-- Footer -->
    <FooterMain />
  </div>
</template>

<script setup>
import HeaderMain from '@/views/HeaderMain.vue'
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

.title-sub1 {
  font-size: 16px;
  font-weight: bold;
  color: gold;
}

.title-sub2 {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.paragraph {
  font-size: 12px;
  text-align: justify;
  color: #fff;
}
</style>
