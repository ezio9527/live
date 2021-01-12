<template>
  <div class="basketball-team-chart">
    <div class="header">
      <img src="@img/list/team_default_logo.png" class="logo left"/>
      <span class="team-name">罗斯托夫火车头</span>
      <span class="middle">VS</span>
      <span class="team-name">忽热</span>
      <img src="@img/list/team_default_logo.png" class="logo right"/>
    </div>
    <div class="content">
      <span class="score">15</span>
      <van-progress :show-pivot="false" :percentage="15" stroke-width="8" color="#F6BD35" class="progress rotate"/>
      <span class="middle">得分</span>
      <van-progress :show-pivot="false" :percentage="11" stroke-width="8" color="#27C5C3" class="progress"/>
      <span class="score">11</span>
    </div>
    <div class="content">
      <span class="score">15</span>
      <van-progress :show-pivot="false" :percentage="15" stroke-width="8" color="#F6BD35" class="progress rotate"/>
      <span class="middle">篮板</span>
      <van-progress :show-pivot="false" :percentage="11" stroke-width="8" color="#27C5C3" class="progress"/>
      <span class="score">11</span>
    </div>
    <div class="content">
      <span class="score">15</span>
      <van-progress :show-pivot="false" :percentage="15" stroke-width="8" color="#F6BD35" class="progress rotate"/>
      <span class="middle">盖帽</span>
      <van-progress :show-pivot="false" :percentage="11" stroke-width="8" color="#27C5C3" class="progress"/>
      <span class="score">121</span>
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
  },
  watch: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
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
    .header, .content {
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
