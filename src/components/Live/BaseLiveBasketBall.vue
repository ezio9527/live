<template>
  <div class="live-basketball-text">
    <p class="live-title">文字直播</p>
    <van-tabs type="card" v-model="tabActive">
      <van-tab title="第一节">
        <van-steps direction="vertical" :active="-1">
          <van-step>
            <p><span class="title">第一节 00:00</span><span class="sub-title">18-9</span></p>
            <p class="content">本节比赛开始</p>
          </van-step>
          <van-step>
            <p><span class="title">第一节 00:15</span></p>
            <p class="content">乔哈特 三分 跳投 不中</p>
          </van-step>
        </van-steps>
      </van-tab>
      <van-tab title="第二节"></van-tab>
      <van-tab title="第三节"></van-tab>
      <van-tab title="第四节"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Steps, Step } from 'vant'
export default {
  name: 'BaseBasketBallText',
  components: {
    VanTab: Tab,
    VanTabs: Tabs,
    VanSteps: Steps,
    VanStep: Step
  },
  data () {
    return {
      tabActive: ''
    }
  }
}
</script>

<style lang="less">
.live-basketball-text{
  .px2vw(width, 700);
  .px2vw(border-radius, 26);
  background: #FFFFFF;
  box-shadow: 0px 10px 88px 0px rgba(0, 0, 0, 0.06);
  .px2vw(padding-left, 25);
  .px2vw(padding-right, 25);
  .px2vw(padding-top, 30);
  .px2vw(padding-bottom, 30);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  .live-title {
    text-align: center;
    .px2vw(line-height, 42);
    .px2vw(font-size, 30);
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    .px2vw(margin-bottom, 20);
  }
  .van-step {
    .title {
      color: #999999;
      .px2vw(font-size, 22);
      -webkit-transform: scale(0.95);
      -moz-transform: scale(0.95);
      -ms-transform: scale(0.95);
      -o-transform: scale(0.95);
      transform: scale(0.95);
    }
    .sub-title {
      float: right;
      color: #333333;
      .px2vw(font-size, 24);
      font-weight: 600;
    }
    .content {
      .px2vw(width, 623);
      .px2vw(line-height, 70);
      .px2vw(border-radius, 10);
      background: #FBFBFB;
      color: #333333;
      .px2vw(font-size, 24);
      .px2vw(padding-left, 25);
      .px2vw(padding-right, 25);
    }
  }
}
</style>
