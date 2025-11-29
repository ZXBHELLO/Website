---
pageLayout: home
home: true
title: ZakoZakoCraft
createTime: 2025/09/06 23:49:14
permalink: /ZakoZakoCraft/
externalLinkIcon: true
config:
  - type: hero
    full: false
    backgroundImage: /
    hero:
      name: ZakoZakoCraft
      text: 高版本 · 纯公益 · 零杂质 · 高品质 Minecraft 服务器
      actions:
        - theme: brand
          text: 加入我们
          link: /ZakoZakoCraft/getting-started/
        - theme: alt
          text: 快速审核
          link: https://qm.qq.com/q/wGEB6fFybC
        - theme: alt
          text: 游玩规则
          link: /ZakoZakoCraft/terms/
  - type: custom
---
:::: demo-wrapper
# 服务器介绍

- **定位** >
  高版本公益群组服务器
  公益性质的Minecraft多人游戏服务器，不以盈利为目的

- **由来** >
  我们来自另一个生存服务器，由于受不了服务器的神权，我们自己决定开一个公益群组服务器，
  让玩家可以享受游戏带来的快乐。

- **版本** >
  JAVA 版（离线/正版）1.19–1.21.10
  手机(FCL/HMCL-PE)电脑(PCL/HMCL)都能玩~！
::::

<CardGrid>
  <Card> 
    <Swiper :items="[
      '/assets/ZakoZakoCraft/ExchangeImage/7.png',
      '/assets/ZakoZakoCraft/ExchangeImage/8.png',
      '/assets/ZakoZakoCraft/ExchangeImage/9.png',
      '/assets/ZakoZakoCraft/ExchangeImage/a.png',  
      '/assets/ZakoZakoCraft/ExchangeImage/b.png',
      '/assets/ZakoZakoCraft/ExchangeImage/c.png',
    ]"
    effect="fade"
    swipe="true"
    pauseOnMouseEnter="true"
    style="aspect-ratio: 16/9; width: 100%;"
    />
  </Card>
  <Card> 
    <Swiper :items="[
      '/assets/ZakoZakoCraft/ExchangeImage/1.png',
      '/assets/ZakoZakoCraft/ExchangeImage/2.png',
      '/assets/ZakoZakoCraft/ExchangeImage/3.png',
      '/assets/ZakoZakoCraft/ExchangeImage/4.png',
      '/assets/ZakoZakoCraft/ExchangeImage/5.png',
      '/assets/ZakoZakoCraft/ExchangeImage/6.png',
    ]"
    effect="fade"
    swipe="true"
    pauseOnMouseEnter="true"
    style="aspect-ratio: 16/9; width: 100%;"
    />
  </Card> 
</CardGrid>

<style scoped>
:deep(.swiper) {
  aspect-ratio: 16/9;
  width: 100%;
  height: unset !important;
}

:deep(.swiper-slide) img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script setup>
  import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
</script>


<center>
  <h1>服务器特色</h1>
</center>


<CardGrid>
  <Card title="保护系统" icon="twemoji:house-with-garden">
    拥有一个属于自己的小家吧！在这里你可以自由建造心中理想家园，不用担心别人来捣乱。邀请好友一起来参观你的杰作，分享快乐时光~
  </Card>
  <Card title="生电支持" icon="twemoji:high-voltage">
    生电爱好者的乐园！我们完全不限制生电玩法，几乎所有的生电装置都可以在这里实现。发挥你的创造力，打造炫酷的自动化设备吧！
  </Card>
  <Card title="社交系统" icon="twemoji:busts-in-silhouette">
    在这里你会遇到很多有趣的小伙伴！可以一起探险、建家、聊天谈心，甚至组建自己的小团体。快来交新朋友，扩大朋友圈吧！
  </Card>
  <Card title="模组扩展" icon="twemoji:package">
    厌倦了普通的玩法？来试试我们的趣味模组吧！它们会让你的游戏体验变得超级有趣，就像打开了新世界的大门一样！
  </Card>
  <Card title="养老种田" icon="twemoji:seedling">
    想放松一下？那就来种种菜、养养花吧！悠闲地享受田园生活，感受四季变化的美好。这里是治愈心灵的小天地哟~
  </Card>
  <Card title="民主共建" icon="twemoji:ballot-box-with-check">
    拒绝神权，人人平等！我们实行透明化管理制度，所有规则公开公正。每个玩家都能参与建设，提出宝贵建议，共同打造理想中的服务器！
  </Card>
</CardGrid>

<center>
  <h1>服务器列表</h1>
</center>

<CardGrid>
  <LinkCard title="休闲生存服" icon="twemoji:desktop-computer" href="function/overview/">
    不限生电 | 经济 | 领地 | 公会 | 反作弊 | 超大视距
  </LinkCard>
  <LinkCard title="实验创造服" icon="twemoji:open-book" href="Creative/overview/">
    Carpet Mod、Axiom Mod等功能性MOD加持
  </LinkCard>
  <LinkCard title="建筑创造服" icon="twemoji:rocket" href="Building/overview/">
    内置256x256超大地皮系统、公理MOD、创世神
  </LinkCard>
  <LinkCard title="娱乐游戏服" icon="twemoji:video-game" href="Games/overview/">
    数百种休闲小游戏、闲暇之余的消遣之地
  </LinkCard>
</CardGrid>

---

<center>
《我的世界》和《Minecraft》是微软公司和 Mojang Synergies AB 的商标<br/>本站点及服务器与微软公司没有从属关系
</center>
