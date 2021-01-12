<template>
  <div class="basketball-player-chart">
    <div class="item">
      <!--主队-->
      <img class="header-img home" src="@img/list/team_default_logo.png">
      <div class="info home">
        <span class="num line-word-hidden">#10</span>
        <span class="name line-word-hidden">明道加斯·库兹明斯卡斯</span>
      </div>
      <!--比分-->
      <div class="score">
        <div class="name">得分</div>
        <div class="value">9-7</div>
        <div class="chart">
          <!--这里是比分的柱子，通过style height:10%来指定高度;不指定有对低高度-->
          <div class="home" style="height: 50%;"></div>
          <div class="guest" style="height: 80%;"></div>
        </div>
      </div>
      <!--客队-->
      <div class="info guest">
        <span class="num line-word-hidden">#10</span>
        <span class="name line-word-hidden">明道加拉科技的</span>
      </div>
      <img class="header-img guest" src="@img/list/team_default_logo.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketballPlayerChart',
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
          color: #27C5C3;
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
          .home, .guest {
            display: inline-block;
            .px2vw(width, 14);
            .px2vw(min-height, 6);
          }
          .home {
            background: #F6BD35;
            .px2vw(margin-right, 36);
          }
          .guest {
            background: #27C5C3;
          }
        }
      }
    }
  }
</style>
