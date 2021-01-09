<template>
  <div class="basketball-statistics">
    <div class="top">
      <div class="left" v-if="matchDetails && Object.keys(matchDetails).length">
        <div class="guest">{{matchDetails.ateam_name || '-'}}</div>
        <div class="home">{{matchDetails.hteam_name || '-'}}</div>
      </div>
      <div class="right">
        <div class="body">
          <span v-for="(item,key) in scoreData[3]" :key="key">{{item || 0}}</span>
        </div>
        <div class="body">
          <span v-for="(item,key) in scoreData[4]" :key="key">{{item || 0}}</span>
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
    <div class="bottom" v-if="false">
      <div class="left">
        <span>本节犯规数</span>
        <span class="home">1</span>
        <span>剩余暂停</span>
        <span class="home">1</span>
      </div>
      <div class="middle">
        <div class="item">
          <span>12</span>
          <div class="progress">
            <span>3分球得分</span>
            <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
            <span>&nbsp;</span>
          </div>
          <span>12</span>
        </div>
        <div class="item">
          <span>12</span>
          <div class="progress">
            <span>2分球得分</span>
            <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
            <span>&nbsp;</span>
          </div>
          <span>12</span>
        </div>
        <div class="item">
          <span>12</span>
          <div class="progress">
            <span>罚球得分</span>
            <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
            <span>&nbsp;</span>
          </div>
          <span>12</span>
        </div>
        <div class="item">
          <span>12</span>
          <div class="progress">
            <span>发球命中率(%)</span>
            <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
            <span>&nbsp;</span>
          </div>
          <span>12</span>
        </div>
      </div>
      <div class="right">
        <span>本节犯规数</span>
        <span class="guest">1</span>
        <span>剩余暂停</span>
        <span class="guest">1</span>
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
    matchDetails: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    score: {
      handler (newValue, oldValue) {
        this.scoreData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      scoreData: []
    }
  },
  created () {
    this.scoreData = this.score
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
  .px2vw(height, 540);
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
        .px2vw(width, 80);
        .px2vw(height, 33);
        .px2vw(line-height, 33);
        text-align: right;
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
        span {
          display: inline-block;
          .px2vw(width, 80);
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
      }
      .guest {
        color: #27c5c3;
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
      }
    }
  }
}
</style>
