<template>
  <div class="basketball-text">
    <p class="live-title">文字直播</p>
    <van-tabs
      type="card"
      v-model="tabActive"
      @rendered="autoTabs"
      v-if="btliveData && btliveData.length"
    >
      <van-tab :title="tabList[indKont]" :key="indKont" v-for="(itemKnot,indKont) in btliveData">
        <van-steps
          direction="vertical"
          :active="-1"
          v-if="itemKnot && itemKnot.length"
          class="btliveDataView"
        >
          <van-step v-for="(item,index) in itemKnot" :key="index" :class="dotCalc(item)">
            <div v-html="parseItem(item,index,indKont)"></div>
          </van-step>
        </van-steps>
        <van-empty description="暂无文字直播数据" v-else></van-empty>
      </van-tab>
    </van-tabs>
    <van-empty description="暂无文字直播数据" v-else></van-empty>
  </div>
</template>

<script>
import { Tab, Tabs, Empty, Steps, Step } from 'vant'
export default {
  name: 'BaseBasketBallText',
  props: {
    btlive: {
      type: Array,
      default: () => []
    },
    // 主队logo
    homeLogo: {
      type: String,
      default: ''
    },
    // 客队logo
    guestLogo: {
      type: String,
      default: ''
    }
  },
  components: {
    VanTab: Tab,
    VanTabs: Tabs,
    VanSteps: Steps,
    VanStep: Step,
    VanEmpty: Empty
  },
  watch: {
    btlive: {
      handler (newValue, oldValue) {
        this.btliveData = newValue
        this.autoTabs()
      },
      deep: true
    }
  },
  data () {
    return {
      tabActive: 2,
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
    autoTabs () {
      const btlive = this.btlive
      const len = this.btlive.length
      for (let i = len - 1; i >= 0; i--) {
        if (btlive[i].length > 0) {
          this.tabActive = i
          break
        }
      }
      // var endLength = this.btlive && this.btlive.length - 1
      // this.tabActive = endLength
    },
    dotCalc (item) {
      const Data = JSON.parse(JSON.stringify(item)).split('^')
      let teamType = ''
      if (Data[2] === '1') {
        teamType = 'home'
      } else if (Data[2] === '2') {
        teamType = 'guest'
      }
      return teamType
    },
    parseItem (item, index, indKont) {
      const Data = JSON.parse(JSON.stringify(item)).split('^')
      let teamType = ''
      if (Data[2] === '1') {
        teamType = `<img src="${this.homeLogo}"/>`
      } else if (Data[2] === '2') {
        teamType = `<img src="${this.guestLogo}"/>`
      }
      const scoreNum = Data[4].split('-')
      const scoreHteam = scoreNum[1]
      const scoreAteam = scoreNum[0]
      return `
        <p>
          <span class="title">${this.tabList[indKont]} ${Data[1]}</span>
          <span class="sub-title">${scoreHteam}-${scoreAteam}</span>
        </p>
        <p class="content">${teamType}${Data[5]}</p>
      `
    }
  }
}
</script>

<style lang="less">
.basketball-text {
  position: relative;
  margin: auto !important;
  .px2vw(margin-top, 20) !important;
  .px2vw(margin-bottom, 20) !important;
  .px2vw(padding-top, 30) !important;
  /*主队颜色*/
  .van-step__circle {
    background: #999;
  }
  .van-step:last-child .van-step__line {
    border-left: 1px dotted #cdcdcd !important;
  }
  .van-step:first-child .van-step__line {
    border: none !important;
  }
  .home {
    .van-step__circle {
      background: #f6bd35;
    }
  }
  /*客队颜色*/
  .guest {
    .van-step__circle {
      background: #27c5c3;
    }
  }
  .notData {
    text-align: center;
    padding: 20px 0;
    font-size: 14px;
    color: #666;
  }
  .btliveDataView .van-steps__items {
    display: flex;
    flex-direction: column-reverse;
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
  .van-tabs__nav--card .van-tab {
    //去内边框
    border-right: none;
    padding: 0;
    //默认字体颜色
    color: #666666;
  }
  //调圆角，选中字体颜色，背景渐变色
  .van-tabs__nav--card .van-tab.van-tab--active {
    .px2vw(border-radius, 20);
    color: #27c5c3;
    background: rgba(25, 171, 245, 0.1);
    background: linear-gradient(
      135deg,
      rgba(25, 171, 245, 0.1),
      rgba(104, 255, 135, 0.1)
    );
    background: -webkit-linear-gradient(
      135deg,
      rgba(25, 171, 245, 0.1),
      rgba(104, 255, 135, 0.1)
    );
    background: -moz-linear-gradient-linear-gradient(
      135deg,
      rgba(25, 171, 245, 0.1),
      rgba(104, 255, 135, 0.1)
    );
    background: -ms-linear-gradient(
      135deg,
      rgba(25, 171, 245, 0.1),
      rgba(104, 255, 135, 0.1)
    );
    background: -o-linear-gradient(
      135deg,
      rgba(25, 171, 245, 0.1),
      rgba(104, 255, 135, 0.1)
    );
  }
  //默认字体大小
  .van-tabs.van-tabs--card {
    .px2vw(font-size, 28);
  }
  //最后一项的延长线
  .van-tabs.van-tabs--card
    .van-tabs__content
    .van-tab__pane
    .van-step:last-child
    .van-step__line {
    border: none;
  }
  // Tabs在card模式下的样式
  .px2vw(width, 700);
  .px2vw(border-radius, 26);
  background: #ffffff;
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
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .px2vw(width, 623);
      .px2vw(line-height, 70);
      .px2vw(border-radius, 10);
      background: #fbfbfb;
      color: #333333;
      .px2vw(font-size, 24);
      .px2vw(padding-left, 25);
      .px2vw(padding-right, 25);
      img {
        .px2vw(width, 40);
        .px2vw(margin-right, 10);
      }
    }
  }
}
</style>
