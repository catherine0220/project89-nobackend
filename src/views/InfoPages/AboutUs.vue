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
        <h1 class="title-main">关于我们</h1>
        <h3 class="title-sub">娱乐、创新、合法性</h3>
        <p class="paragraph">
          89bet
          目前拥有一家在哥斯达黎加合法注册的游戏公司，所有赌博业务均受哥斯达黎加政府的赌博条约的约束。在日益火热的在线赌博市场中，
          我们不断寻求创新和变化，并与引以为豪的创意团队一起开发不同的游戏方法。为客户提供即时服务，我们公司的主要目的是刺激、
          周到的娱乐产品和优质的服务。
        </p>

        <h3 class="title-sub">以专业、公平的技术平台满足各种娱乐需求</h3>
        <p class="paragraph">
          89bet
          大量的人力和资源押注在体育博彩上，顶级盘手专业执行交易，提供完整的比赛，为热爱运动的玩家匹配丰富的组合玩法。
          真人娱乐场 –
          我们集团雇用的所有人员都必须经过严格且经过认证的国际赌场专业培训。在玩不同的赌场游戏时，所有赌博游戏都基于对动作做出反应的集群，而不是无聊的计算机概率。高科技网络直播技术可以为您带来令人兴奋的赌场体验！彩票游戏
          - 官方赛事结果是此类游戏唯一的输赢标准，让玩家在身临其境的投注界面中享受最公平的娱乐。
          老虎机 - 使用最公平的随机数生成概率，让您安心享受多样化和精彩的游戏。 所有游戏的共同优势 -
          下载不耗时;简单明了的界面;完成功能性活动;图形精致而优雅;游戏结果是公平透明的。
        </p>

        <h3 class="title-sub">安全和私密的在线环境</h3>
        <p class="paragraph">
          在竞争激烈的博彩市场中， 89bet 一直是众多玩家的首选，除了让人流连忘返的多样化娱乐产品。
          而且，由于其优质的服务和 89bet
          长期以来的良好声誉，它在广大玩家中建立了声誉。我们的意图随处可见，并已获得 GEOTRUST
          的权威国际证书，以确保网站活动的公平合理性。 89bet 本着无关服务的精神，我们每天 24
          小时处理与会员存款和取款相关的问题，并且经过严格培训的客户服务团队专业而繁荣。
          超前的态度解决您在网站和游戏中的难题，让每个玩家都感到体贴和热情！ 89bet
          为其会员提供各种在同类平台中从未见过的特别优惠，使其成为玩家最明智的选择！
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

.title-sub {
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
