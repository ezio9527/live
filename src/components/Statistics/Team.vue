<template>
  <div class="team">
    <van-tabs type="card" v-model="tabActive">
      <van-tab title="罗斯托夫火车头">
        <div class="header"><span class="player">球员</span><span class="basketball"></span><span class="first">首发</span><span class="time">时间</span><span class="score">得分</span><span class="shoot">投篮</span><span class="three">三分</span></div>
        <div class="content bg"><span class="player">明道加斯·库兹明斯卡斯</span><span class="basketball"></span><span class="first">9</span><span class="time">8</span><span class="score">12</span><span class="shoot">2-1</span><span class="three">9-0</span></div>
        <div class="content"><span class="player">明道加斯·库兹明斯卡斯</span><span class="basketball"></span><span class="first">9</span><span class="time">8</span><span class="score">12</span><span class="shoot">2-1</span><span class="three">9-0</span></div>
        <div class="content bg"><span class="player">明道加斯·库兹明斯卡斯</span><span class="basketball"></span><span class="first">9</span><span class="time">8</span><span class="score">12</span><span class="shoot">2-1</span><span class="three">9-0</span></div>
      </van-tab>
      <van-tab title="菲尼克斯太阳"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
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
    VanTabs: Tabs
  },
  watch: {
  },
  data () {
    return {
      tabActive: 0
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less">
.team {
  position: relative;
  margin: auto !important;
  .px2vw(width, 700);
  .px2vw(margin-top, 20) !important;
  .px2vw(margin-bottom, 20) !important;
  .px2vw(padding-top, 30) !important;
  .px2vw(padding-bottom, 30) !important;
  .px2vw(padding-left, 30);
  .px2vw(padding-right, 30);
  .px2vw(border-radius, 26);
  .px2vw(font-size, 24) !important;
  box-shadow: 0px 10px 88px 0px rgba(0, 0, 0, 0.06);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*列表样式*/
  .player, .basketball, .first, .time, .score, .shoot, .three {
    display: inline-block;
    text-align: center;
  }
  .player {
    text-align: left;
  }
  .header .content {
    .px2vw(height, 80);
  }
  .header {
    color: #999999;
  }
  .content {
    color: #666666;
  }
  /*间隔的背景色*/
  .bg {
    background: rgba(205, 205, 205, 0.1);
  }
  /*球员*/
  .player {
    .px2vw(width, 210);
  }
  /*篮球*/
  .basketball {
    .px2vw(width, 60);
  }
  /*首发*/
  .first {
    .px2vw(width, 60);
  }
  /*时间*/
  .time {
    .px2vw(width, 70);
  }
  /*得分*/
  .score {
    .px2vw(width, 80);
  }
  /*投篮*/
  .shoot {
    .px2vw(width, 80);
  }
  /*三分*/
  .three {
    .px2vw(width, 80);
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
}
</style>
