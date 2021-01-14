<template>
  <div class="basketball-team-chart">
    <div class="header">
      <img :src="match.hteam_logo" class="logo left" />
      <span class="team-name">{{match.hteam_name}}</span>
      <span class="middle">VS</span>
      <span class="team-name">{{match.ateam_name}}</span>
      <img :src="match.ateam_logo" class="logo right" />
    </div>
    <div class="content" v-for="(item,index) in countMap" :key="index">
      <span class="score">{{hteamCount[item.key]}}</span>
      <van-progress
        :show-pivot="false"
        :percentage="percentageCalc(hteamCount[item.key],ateamCount[item.key],true)"
        stroke-width="8"
        color="#F6BD35"
        class="progress rotate"
      />
      <span class="middle">{{item.name}}</span>
      <van-progress
        :show-pivot="false"
        :percentage="percentageCalc(hteamCount[item.key],ateamCount[item.key],false)"
        stroke-width="8"
        color="#27C5C3"
        class="progress"
      />
      <span class="score">{{ateamCount[item.key]}}</span>
    </div>
  </div>
</template>

<script>
import { Progress } from 'vant'
export default {
  name: 'BasketballTeamChart',
  components: {
    VanProgress: Progress
  },
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
  watch: {
  },
  data () {
    return {
      countMap: [
        { key: 13, name: '得分' },
        { key: 6, name: '篮板' },
        { key: 7, name: '助攻' },
        { key: 9, name: '盖帽' },
        { key: 8, name: '抢断' },
        { key: 10, name: '失误' }
      ],
      hteamCount: [],
      ateamCount: []
    }
  },
  created () {
    // const lanqiuData = require('@/utils/lanqiuApi.json')
    const lanqiuData = this.statisticsData
    const bTeamData = lanqiuData.players
    this.hteamCount = bTeamData[2] && bTeamData[2].split('^')
    this.ateamCount = bTeamData[3] && bTeamData[3].split('^')
  },
  methods: {
    percentageCalc (hVal, aVal, isMain) {
      const count = Number(hVal) + Number(aVal)
      const result = isMain ? Number(hVal) / count : Number(aVal) / count
      return result.toFixed(2) * 100
    }
  }
}
</script>

<style scoped lang="less">
.basketball-team-chart {
  position: relative;
  margin: auto;
  .px2vw(width, 700);
  .px2vw(margin-top, 20);
  .px2vw(margin-bottom, 20);
  .px2vw(padding-top, 40);
  .px2vw(padding-bottom, 40);
  .px2vw(padding-left, 30);
  .px2vw(padding-right, 30);
  .px2vw(border-radius, 26);
  background: white;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  .header,
  .content {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /*标题头*/
  .header {
    color: #333333;
    font-weight: 600;
    .middle {
      .px2vw(width, 100);
      .px2vw(font-size, 28);
      text-align: center;
    }
    .team-name {
      .px2vw(font-size, 24);
      text-align: center;
      .px2vw(width, 220);
    }
    .logo {
      .px2vw(width, 55);
      .px2vw(height, 55);
      &.left {
        .px2vw(margin-right, 30);
      }
      &.right {
        .px2vw(margin-left, 30);
      }
    }
  }
  /*内容*/
  .content {
    .px2vw(margin-top, 40);
    color: #666666;
    .middle {
      .px2vw(width, 100);
      .px2vw(font-size, 22);
      font-weight: 400;
      text-align: center;
    }
    .progress {
      .px2vw(width, 230);
      .px2vw(margin-right, 20);
      &.rotate {
        margin-right: 0;
        .px2vw(margin-left, 20);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
    .score {
      display: inline-block;
      .px2vw(width, 20);
      .px2vw(font-size, 24);
    }
  }
}
</style>
