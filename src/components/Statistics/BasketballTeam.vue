<template>
  <div class="basketball-team">
    <van-tabs type="card" v-model="tabActive" :swipeable="false">
      <van-tab :title="match.hteam_name">
        <div class="scorllView">
          <div class="fix">
            <dd>
              <span>球员</span>
            </dd>
            <template v-for="(item,index) in hteamPlayers">
              <dd :key="index">
                <span>{{ item[1] }}</span>
              </dd>
            </template>
          </div>
          <div class="scorllItem">
            <dd>
              <span v-for="(item,index) in titleList" :key="index">{{item}}</span>
            </dd>
            <dd v-for="(item,index) in hteamPlayers" :key="index" v-html="parseTeam(item)"></dd>
          </div>
        </div>
      </van-tab>
      <van-tab :title="match.ateam_name">
        <div class="scorllView">
          <div class="fix">
            <dd>
              <span>球员</span>
            </dd>
            <template v-for="(item,index) in ateamPlayers">
              <dd :key="index">
                <span>{{ item[1] }}</span>
              </dd>
            </template>
          </div>
          <div class="scorllItem">
            <dd>
              <span v-for="(item,index) in titleList" :key="index">{{item}}</span>
            </dd>
            <dd v-for="(item,index) in ateamPlayers" :key="index" v-html="parseTeam(item)"></dd>
          </div>
        </div>
        <!-- <div class="flex header">
          <span v-for="(item,index) in titleList" :key="index">{{item}}</span>
        </div>
        <div
          class="flex content"
          v-for="(item,index) in ateamPlayers"
          :key="index"
          v-html="parseTeam(item)"
        ></div>-->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
export default {
  name: 'BasketballTeam',
  props: {
    statisticsData: {
      type: Object,
      default: () => { }
    },
    match: {
      type: Object,
      default: () => { }
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
      titleList: [
        '球员',
        '首发',
        '时间',
        '得分',
        '投篮',
        '三分',
        '罚球',
        '前篮板',
        '后篮板',
        '总篮板',
        '助攻',
        '抢断',
        '盖帽',
        '失误',
        '犯规'
      ],
      tabActive: 0,
      domain: 'https://cdn.sportnanoapi.com/basketball/player/',
      hteamPlayers: [],
      ateamPlayers: []
    }
  },
  created () {
    // const lanqiuData = require('@/utils/lanqiuApi.json')
    const lanqiuData = this.statisticsData
    const bTeamData = lanqiuData.players
    this.hteamPlayers = bTeamData[0]
    this.ateamPlayers = bTeamData[1]
  },
  methods: {
    parseTeam (item) {
      const Data = JSON.parse(JSON.stringify(item[6])).split('^')
      const first = Data[16] === '0' ? '是' : '否'
      const time = Data[0]// 事件
      const score = Data[13]// 得分
      const shoot = Data[1]// 投篮
      const three = Data[2]// 三分
      const penalty = Data[3]// 罚球
      const offensive = Data[4]// 进攻篮板
      const guard = Data[5]// 防守篮板
      const allbackboard = Data[6]// 总篮板
      const assist = Data[7]// 助攻
      const steal = Data[8]// 抢断
      const blockShot = Data[9]// 盖帽
      const fault = Data[10]// 失误
      const foul = Data[11]// 犯规
      return `
        <span>${item[1]}</span>
        <span>${first}</span>
        <span>${time}</span>
        <span>${score}</span>
        <span>${shoot}</span>
        <span>${three}</span>
        <span>${penalty}</span>
        <span>${offensive}</span>
        <span>${guard}</span>
        <span>${allbackboard}</span>
        <span>${assist}</span>
        <span>${steal}</span>
        <span>${blockShot}</span>
        <span>${fault}</span>
        <span>${foul}</span>
        `
    }
  }
}
</script>

<style lang="less">
.basketball-team {
  position: relative;
  margin: auto !important;
  .px2vw(width, 700);
  .px2vw(margin-top, 20) !important;
  // .px2vw(margin-bottom, 20) !important;
  .px2vw(padding-top, 30) !important;
  .px2vw(padding-bottom, 30) !important;
  // .px2vw(padding-left, 30) !important;
  // .px2vw(padding-right, 30) !important;
  .px2vw(border-radius, 26) !important;
  .px2vw(font-size, 24) !important;
  box-shadow: 0px 10px 88px 0px rgba(0, 0, 0, 0.06);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*列表样式*/
  .scorllView {
    width: 100%;
    position: relative;
    padding-left: 140px;
    overflow: hidden;
    .scorllItem {
      overflow-x: scroll;
      position: relative;
      margin-left: -140px;
      margin-right: 140px;
      dd {
        width: 200%;
        span {
          white-space: nowrap;
          text-align: center;
          width: 40px;
          flex-shrink: 0;
          &:first-child {
            text-align: left;
            flex-shrink: 0;
            width: 100px;
            margin-right: 40px;
            display: block;
            white-space: normal;
          }
        }
      }
    }
    .fix {
      width: 120px;
      position: absolute;
      left: 0;
      height: 100%;
      z-index: 2;
      dd {
        background: #fcfcfc;
        span {
          text-align: left;
          position: relative;
          width: 100px;
          display: block;
          white-space: normal;
        }
        &:nth-child(2n) {
          background: #f7f7f7;
        }
      }
    }
    dd {
      padding: 8px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #666;
      width: 100%;
      position: relative;
      box-sizing: border-box;
      &:first-child {
        border-bottom: 1px solid #e9e9e9;
      }
      &:nth-child(2n) {
        background: #f7f7f7;
      }
      span {
        width: 100%;
        text-align: center;
        word-wrap: break-word;
        word-break: normal;
      }
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 100%;
      line-height: 18px;
      color: #666;
      text-align: center;
      font-size: 12px;
      margin-right: -10px;
      &:first-child {
        text-align-last: left;
        width: 100px;
        flex-shrink: 0;
        margin-right: 10px;
      }
    }
  }
  .content {
    &:nth-child(2n) {
      background: rgba(205, 205, 205, 0.1);
    }
  }
  // .player,
  // .basketball,
  // .first,
  // .time,
  // .score,
  // .shoot,
  // .three {
  //   display: inline-block;
  //   text-align: center;
  //   -webkit-box-sizing: border-box;
  //   -moz-box-sizing: border-box;
  //   box-sizing: border-box;
  // }
  // .player {
  //   text-align: left;
  // }
  // .header .content {
  //   .px2vw(height, 80);
  // }
  // .header {
  //   color: #999999;
  // }
  // .content {
  //   display: flex;
  //   /*间隔的背景色*/
  //   &:nth-child(2n-1) {
  //     background: rgba(205, 205, 205, 0.1);
  //   }
  // }
  // /*球员*/
  // .player {
  //   .px2vw(width, 210);
  // }
  // /*篮球*/
  // .basketball {
  //   .px2vw(width, 60);
  //   img {
  //     .px2vw(width, 30);
  //     .px2vw(height, 30);
  //   }
  // }
  // /*首发*/
  // .first {
  //   .px2vw(width, 60);
  // }
  // /*时间*/
  // .time {
  //   .px2vw(width, 70);
  // }
  // /*得分*/
  // .score {
  //   .px2vw(width, 80);
  // }
  // /*投篮*/
  // .shoot {
  //   .px2vw(width, 80);
  // }
  // /*三分*/
  // .three {
  //   .px2vw(width, 80);
  // }
  // .hidden {
  //   img {
  //     display: none;
  //   }
  // }
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
    font-size: 14px;
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
