<template>
  <div class="basketball-text">
    <p class="live-title">文字直播</p>
    <van-tabs type="card" v-model="tabActive">
      <!-- <van-tab title="第二节">
        <van-steps direction="vertical" :active="-1">
          <van-step>
            <p>
              <span class="title">第一节 00:00</span>
              <span class="sub-title">18-9</span>
            </p>
            <p class="content">本节比赛开始</p>
          </van-step>
          <van-step>
            <p>
              <span class="title">第一节 00:15</span>
            </p>
            <p class="content">乔哈特 三分 跳投 不中</p>
          </van-step>
        </van-steps>
      </van-tab>
      <van-tab title="第二节"></van-tab>-->
      <van-tab :title="tabList[indKont]" :key="indKont" v-for="(itemKnot,indKont) in btliveData">
        <van-steps direction="vertical" :active="-1" v-if="itemKnot && itemKnot.length">
          <van-step v-for="(item,index) in itemKnot" :key="index">
            <div v-html="parseItem(item,index,indKont)"></div>
          </van-step>
        </van-steps>
        <p class="notData" v-else>暂无文字直播数据</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Steps, Step } from 'vant'
export default {
  name: 'BaseBasketBallText',
  props: {
    btlive: {
      type: Array,
      default: () => []
    }
  },
  components: {
    VanTab: Tab,
    VanTabs: Tabs,
    VanSteps: Steps,
    VanStep: Step
  },
  watch: {
    btlive: {
      handler (newValue, oldValue) {
        this.btliveData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      tabActive: '',
      tabList: [
        '第一节',
        '第二节',
        '第三节',
        '第四节',
        '第五节',
        '第六节',
        '第七节',
        '第八节'
      ],
      btliveData: []
    }
  },
  created () {
    this.btliveData = this.btlive
  },
  methods: {
    parseItem (item, index, indKont) {
      const Data = JSON.parse(JSON.stringify(item)).split('^')
      return `
        <p>
          <span class="title">${this.tabList[indKont]} ${Data[1]}</span>
          <span class="sub-title">${Data[4]}</span>
        </p>
        <p class="content">${Data[5]}</p>
      `
    }
  }
}
</script>

<style lang="less">
.basketball-text {
  position: relative;
  margin: auto !important;
  .px2vw(margin-top, 20);
  .px2vw(margin-bottom, 20);
  .notData {
    text-align: center;
    padding: 20px 0;
    font-size: 14px;
    color: #666;
  }
  // Tabs在card模式下的样式
  //整体背景色
  .van-tabs__nav.van-tabs__nav--card {
    background-color: rgba(216, 216, 216, 0.1);
  }
  //去外边框
  .van-tabs__nav--card {
    border: none;
  }
  //去内边框
  .van-tabs__nav--card .van-tab {
    border-right: none;
  }
  //默认字体颜色
  .van-tabs__nav--card .van-tab {
    color: #666666;
  }
  //调圆角，选中字体颜色，背景渐变色
  .van-tabs__nav--card .van-tab.van-tab--active {
    .px2vw(border-radius, 20);
    color: #27C5C3;
    background: rgba(25, 171, 245, 0.1);
    background: linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
    background: -webkit-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
    background: -moz-linear-gradient-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
    background: -ms-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
    background: -o-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
  }
  //默认字体大小
  .van-tabs.van-tabs--card {
    .px2vw(font-size, 28);
  }
  //最后一项的延长线
  .van-tabs.van-tabs--card .van-tabs__content .van-tab__pane .van-step:last-child .van-step__line {
    border: none;
  }
  // Tabs在card模式下的样式
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
