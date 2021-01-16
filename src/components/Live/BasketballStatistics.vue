<template>
  <div class="basketball-statistics">
    <div class="top">
      <div class="left" v-if="match && Object.keys(match).length">
        <div class="guest line-word-hidden">{{match.ateam_name || '-'}}</div>
        <div class="home line-word-hidden">{{match.hteam_name || '-'}}</div>
      </div>
      <div class="right">
        <div class="body">
          <span v-for="(item,key) in scoreData[3]" :key="key">{{item || 0}}</span>
          <span>{{scoreData[3].reduce((a, b) => (a + b))}}</span>
        </div>
        <div class="body">
          <span v-for="(item,key) in scoreData[4]" :key="key">{{item || 0}}</span>
          <span>{{scoreData[4].reduce((a, b) => (a + b))}}</span>
        </div>
        <div class="header">
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>OT</span>
          <span>总分</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <span>本节犯规数</span>
        <span class="home" ref="home41">{{bStatsData[4][1]}}</span>
        <span>剩余暂停</span>
        <span class="home" ref="home31">{{bStatsData[3][1]}}</span>
      </div>
      <div class="middle">
        <div class="item">
          <span>{{bStatsData[0][1]}}</span>
          <div class="progress">
            <span>3分球得分</span>
            <div class="progressView">
              <van-progress
                :percentage="percentageCalc(bStatsData[0],true)"
                :show-pivot="false"
                color="#F6BD35"
              />
              <van-progress
                :percentage="percentageCalc(bStatsData[0],false)"
                :show-pivot="false"
                color="#27c5c3"
              />
            </div>
            <span>&nbsp;</span>
          </div>
          <span>{{bStatsData[0][2]}}</span>
        </div>
        <div class="item">
          <span>{{bStatsData[1][1]}}</span>
          <div class="progress">
            <span>2分球得分</span>
            <div class="progressView">
              <van-progress
                :percentage="percentageCalc(bStatsData[1],true)"
                :show-pivot="false"
                color="#F6BD35"
              />
              <van-progress
                :percentage="percentageCalc(bStatsData[1],false)"
                :show-pivot="false"
                color="#27c5c3"
              />
            </div>
            <span>&nbsp;</span>
          </div>
          <span>{{bStatsData[1][2]}}</span>
        </div>
        <div class="item">
          <span>{{bStatsData[2][1]}}</span>
          <div class="progress">
            <span>罚球得分</span>
            <div class="progressView">
              <van-progress
                :percentage="percentageCalc(bStatsData[2],true)"
                :show-pivot="false"
                color="#F6BD35"
              />
              <van-progress
                :percentage="percentageCalc(bStatsData[2],false)"
                :show-pivot="false"
                color="#27c5c3"
              />
            </div>
            <span>&nbsp;</span>
          </div>
          <span>{{bStatsData[2][2]}}</span>
        </div>
        <div class="item">
          <span>{{bStatsData[5][1]}}</span>
          <div class="progress">
            <span>罚球命中率(%)</span>
            <div class="progressView">
              <van-progress
                :percentage="percentageCalc(bStatsData[5],true)"
                :show-pivot="false"
                color="#F6BD35"
              />
              <van-progress
                :percentage="percentageCalc(bStatsData[5],false)"
                :show-pivot="false"
                color="#27c5c3"
              />
            </div>
            <span>&nbsp;</span>
          </div>
          <span>{{bStatsData[5][1]}}</span>
        </div>
      </div>
      <div class="right">
        <span>本节犯规数</span>
        <span class="guest" ref="guest42">{{bStatsData[4][2]}}</span>
        <span>剩余暂停</span>
        <span class="guest" ref="guest32">{{bStatsData[3][2]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress } from 'vant'
export default {
  name: 'BasketBallStatistics',
  components: {
    VanProgress: Progress
  },
  props: {
    score: {
      type: Array,
      default: () => []
    },
    bStats: {
      type: Array,
      default: () => []
    },
    match: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    'bStatsData.4.1' (newV, oldV) {
      if (oldV && newV !== oldV) {
        const dom = this.$refs.home41
        dom.style.animation = 'tipsfade 500ms 2'
        setTimeout(() => {
          dom.style.animation = 'none'
        }, 1000)
      }
    },
    'bStatsData.4.2' (newV, oldV) {
      if (oldV && newV !== oldV) {
        const dom = this.$refs.guest42
        dom.style.animation = 'tipsfade 500ms 2'
        setTimeout(() => {
          dom.style.animation = 'none'
        }, 1000)
      }
    },
    'bStatsData.3.1' (newV, oldV) {
      if (oldV && newV !== oldV) {
        const dom = this.$refs.home31
        dom.style.animation = 'tipsfade 500ms 2'
        setTimeout(() => {
          dom.style.animation = 'none'
        }, 1000)
      }
    },
    'bStatsData.3.2' (newV, oldV) {
      if (oldV && newV !== oldV) {
        const dom = this.$refs.guest32
        dom.style.animation = 'tipsfade 500ms 2'
        setTimeout(() => {
          dom.style.animation = 'none'
        }, 1000)
      }
    },
    score: {
      handler (newValue, oldValue) {
        this.scoreData = newValue
      },
      deep: true
    },
    bStats: {
      handler (newValue, oldValue) {
        this.bStatsData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      scoreData: [],
      bStatsData: []
    }
  },
  created () {
    this.scoreData = this.score
    this.bStatsData = this.bStats
  },
  methods: {
    percentageCalc (data, isHteam) {
      const hteamV = data[1]
      const ateamV = data[2]
      const count = hteamV + ateamV
      const res = isHteam ? hteamV / count : ateamV / count
      return res.toFixed(2) * 100
    }
  }
}
</script>

<style scoped lang="less">
.basketball-statistics {
  position: relative;
  margin: auto;
  .px2vw(margin-top, 20);
  .px2vw(margin-bottom, 20);
  .px2vw(width, 700);
  // .px2vw(height, 540);
  background: #ffffff;
  box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
  .px2vw(border-radius, 26);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  .px2vw(padding-top, 15);
  .px2vw(padding-bottom, 25);
  .px2vw(padding-left, 25);
  .px2vw(padding-right, 25);
  .top {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    position: relative;
    &:before {
      width: 100%;
      height: 1px;
      background: #979797;
      opacity: 0.3;
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .left,
    .right {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      flex-direction: column-reverse;
      .px2vw(margin-bottom, 24);
    }
    .left {
      .px2vw(font-size, 24);
      div {
        // .px2vw(width, 200);
        font-size: 12px;
        .px2vw(height, 33);
        .px2vw(line-height, 33);
        .px2vw(padding-left, 10);
        text-align: left;
        position: relative;
        &:before {
          .px2vw(width, 5);
          .px2vw(height, 33);
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 10px;
        }
        &.home {
          .px2vw(margin-bottom, 16);
        }
        &.home:before {
          background: #f6bd35;
        }
        &.guest:before {
          background: #27c5c3;
        }
      }
    }
    .right {
      text-align: right;
      .px2vw(font-size, 22);
      .header,
      .body {
        margin-right: -10px;
        span {
          display: inline-block;
          text-align: center;
          .px2vw(width, 70);
          .px2vw(height, 42);
        }
      }
      .header {
        color: #999999;
      }
      .body {
        color: #333333;
      }
    }
  }
  .bottom {
    .px2vw(margin-top, 27);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    position: relative;
    .left,
    .right {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #333333;
      .home {
        color: #f6bd35;
        margin-bottom: 12px;
      }
      .guest {
        color: #27c5c3;
        margin-bottom: 12px;
      }
    }
    .middle {
      .item {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .progress {
          display: inline-block;
          .px2vw(width, 245);
          .px2vw(margin-left, 28);
          .px2vw(margin-right, 28);
          span {
            display: inline-block;
            width: 100%;
            font-size: 12px;
            color: #333333;
            text-align: center;
            -webkit-transform: scale(0.95);
            -moz-transform: scale(0.95);
            -ms-transform: scale(0.95);
            -o-transform: scale(0.95);
            transform: scale(0.95);
          }
        }
        .progressView {
          display: flex;
          justify-content: space-between;
          .van-progress {
            margin: 2px;
            width: 100%;
            position: relative;
          }
          .van-progress:first-child {
            -moz-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            transform: scaleX(-1);
          }
        }
      }
    }
  }
}
</style>
<style>
@keyframes tipsfade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
