<template>
  <div class="basketball-player-chart">
    <div class="item" v-for="(item,index) in countMap" :key="index">
      <!--主队-->
      <img class="header-img home" :src="homerank[item.key].logo" />
      <div class="info home">
        <span class="num line-word-hidden">#{{homerank[item.key].qiuyi}}</span>
        <span class="name line-word-hidden">{{homerank[item.key].name_zh}}</span>
      </div>
      <!--比分-->
      <div class="score">
        <div class="name">{{item.name}}</div>
        <div class="value">{{homerank[item.key][item.key]}}-{{awayrank[item.key][item.key]}}</div>
        <div class="chart">
          <!--这里是比分的柱子，通过style height:10%来指定高度;不指定有对低高度-->
          <div
            class="home"
            :style="`height: ${percentageCalc(homerank[item.key][item.key],awayrank[item.key][item.key],true)}%;`"
          ></div>
          <div
            class="guest"
            :style="`height: ${percentageCalc(homerank[item.key][item.key],awayrank[item.key][item.key],false)}%;`"
          ></div>
        </div>
      </div>
      <!--客队-->
      <div class="info guest">
        <span class="num line-word-hidden">#{{awayrank[item.key].qiuyi}}</span>
        <span class="name line-word-hidden">{{awayrank[item.key].name_zh}}</span>
      </div>
      <img class="header-img guest" :src="awayrank[item.key].logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketballPlayerChart',
  props: {
    statisticsData: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
  },
  data () {
    return {
      countMap: [
        { key: 'defen', name: '得分' },
        { key: 'lanban', name: '篮板' },
        { key: 'zhugong', name: '助攻' }
      ],
      homerank: {},
      awayrank: {}
    }
  },
  created () {
    // const lanqiuData = require('@/utils/lanqiuApi.json')
    const lanqiuData = this.statisticsData
    this.homerank = JSON.parse(lanqiuData.homerank)
    this.awayrank = JSON.parse(lanqiuData.awayrank)
  },
  methods: {
    percentageCalc (hVal, aVal, isMain) {
      const count = Number(hVal) + Number(aVal)
      const result = isMain ? Number(hVal) / count : Number(aVal) / count
      return result.toFixed(2) * 2 * 100
    }
  }
}
</script>

<style scoped lang="less">
.basketball-player-chart {
  position: relative;
  margin: auto;
  .px2vw(width, 700);
  .px2vw(margin-top, 20);
  .px2vw(margin-bottom, 20);
  .px2vw(padding-left, 30);
  .px2vw(padding-right, 30);
  .px2vw(border-radius, 26);
  background: white;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  .item {
    .px2vw(padding-bottom, 20);
    .px2vw(height, 168);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: flex-end;
    /*头像*/
    .header-img {
      .px2vw(width, 70);
      .px2vw(height, 70);
      border-radius: 100%;
      &.home {
        .px2vw(margin-right, 16);
      }
      &.guest {
        .px2vw(margin-left, 16);
      }
    }
    /*球员信息*/
    .info {
      .px2vw(width, 180);
      span {
        display: inline-block;
        width: 100%;
      }
      .num {
        .px2vw(line-height, 30);
        .px2vw(font-size, 22);
        color: #999999;
      }
      .name {
        .px2vw(line-height, 33);
        .px2vw(font-size, 24);
        color: #000000;
      }
      &.home {
        text-align: left;
      }
      &.guest {
        text-align: right;
      }
    }
    /*比分*/
    .score {
      flex: 1;
      text-align: center;
      /*比分名*/
      .name {
        .px2vw(line-height, 33);
        .px2vw(font-size, 24);
        color: #27c5c3;
      }
      /*比分值*/
      .value {
        color: #666666;
        .px2vw(line-height, 30);
        .px2vw(font-size, 22);
        .px2vw(margin-top, 10);
        .px2vw(margin-bottom, 5);
      }
      /*比分柱状图的容器*/
      .chart {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .px2vw(height, 50);
        .home,
        .guest {
          display: inline-block;
          .px2vw(width, 14);
          .px2vw(min-height, 6);
        }
        .home {
          background: #f6bd35;
          .px2vw(margin-right, 36);
        }
        .guest {
          background: #27c5c3;
        }
      }
    }
  }
}
</style>
