<template>
  <div class="football-statistics">
    <div class="title">
      <span class="float-left">{{match.hteam_name || '-'}}</span>
      <span class="float-right">{{match.ateam_name || '-'}}</span>
    </div>
    <div class="content">
      <div class="charts">
        <div class="item">
          <div class="top">进攻</div>
          <div class="bottom">
            <span>{{fStatsCalc(23).home}}</span>
            <van-circle
              :clockwise="false"
              v-model="currentRate"
              :rate="percentageCalc(23)"
              layer-color="#E5E5E5"
              color="#F6BD35"
              stroke-width="120"
            />
            <span>{{fStatsCalc(23).away}}</span>
          </div>
        </div>
        <div class="item">
          <div class="top">危险进攻</div>
          <div class="bottom">
            <span>{{fStatsCalc(24).home}}</span>
            <van-circle
              :clockwise="false"
              v-model="currentRate"
              :rate="percentageCalc(24)"
              layer-color="#E5E5E5"
              color="#F6BD35"
              stroke-width="120"
            />
            <span>{{fStatsCalc(24).away}}</span>
          </div>
        </div>
        <div class="item">
          <div class="top">控球率</div>
          <div class="bottom">
            <span>{{fStatsCalc(25).home}}</span>
            <van-circle
              :clockwise="false"
              v-model="currentRate"
              :rate="percentageCalc(25)"
              layer-color="#E5E5E5"
              color="#F6BD35"
              stroke-width="120"
            />
            <span>{{fStatsCalc(25).away}}</span>
          </div>
        </div>
      </div>
      <div class="shoot">
        <span class="item">
          <img class="flag" src="@img/minIcon/tlive2.png" />
        </span>
        <span class="item">
          <img class="red" src="@img/minIcon/tlive4.png" />
        </span>
        <span class="item">
          <img class="yellow" src="@img/minIcon/tlive3.png" />
        </span>
        <span class="item">{{fStatsCalc(21).home}}</span>
        <div class="progress">
          <span>射正球门</span>
          <div class="progressView">
            <van-progress
              :percentage="percentageCalc(21,true)"
              :show-pivot="false"
              color="#F6BD35"
            />
            <van-progress
              :percentage="percentageCalc(21,false)"
              :show-pivot="false"
              color="#F6BD35"
            />
          </div>
          <span>&nbsp;</span>
        </div>
        <span class="item align-right">{{fStatsCalc(21).away}}</span>
        <span class="item align-right">
          <img class="yellow" src="@img/minIcon/tlive3.png" />
        </span>
        <span class="item align-right">
          <img class="red" src="@img/minIcon/tlive4.png" />
        </span>
        <span class="item align-right">
          <img class="flag" src="@img/minIcon/tlive2.png" />
        </span>
      </div>
      <div class="shoot">
        <span class="item">{{fStatsCalc(2).home}}</span>
        <span class="item">{{fStatsCalc(4).home}}</span>
        <span class="item">{{fStatsCalc(3).home}}</span>
        <span class="item">{{fStatsCalc(22).home}}</span>
        <div class="progress">
          <span>射歪球门</span>
          <div class="progressView">
            <van-progress
              :percentage="percentageCalc(22,true)"
              :show-pivot="false"
              color="#F6BD35"
            />
            <van-progress
              :percentage="percentageCalc(22,false)"
              :show-pivot="false"
              color="#F6BD35"
            />
          </div>
          <span>&nbsp;</span>
        </div>
        <span class="item align-right">{{fStatsCalc(22).away}}</span>
        <span class="item align-right">{{fStatsCalc(3).away}}</span>
        <span class="item align-right">{{fStatsCalc(4).away}}</span>
        <span class="item align-right">{{fStatsCalc(2).away}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress, Circle } from 'vant'
export default {
  name: 'FootballStatistics',
  components: {
    VanProgress: Progress,
    VanCircle: Circle
  },
  props: {
    fStats: {
      type: Array,
      default: () => []
    },
    match: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    fStats: {
      handler (newValue, oldValue) {
        this.fStatsData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      currentRate: 88,
      fStatsData: []
    }
  },
  created () {
    this.fStatsData = this.fStats
  },
  methods: {
    fStatsCalc (key) {
      const itemData = this.fStatsData.find(e => (e.type === key))
      return itemData
    },
    percentageCalc (key, isHteam) {
      const hteamV = this.fStatsCalc(key).home
      const ateamV = this.fStatsCalc(key).away
      const count = hteamV + ateamV
      const res = isHteam ? hteamV / count : ateamV / count
      return res.toFixed(2) * 100
    }
  }
}
</script>

<style scoped lang="less">
.football-statistics {
  .px2vw(margin-top, 20);
  .px2vw(margin-bottom, 20);
  .title {
    color: #333333;
    margin: auto;
    .px2vw(margin-top, 28);
    .px2vw(margin-bottom, 28);
    .px2vw(width, 700);
    .px2vw(height, 22);
    .px2vw(line-height, 22);
    .float-left,
    .float-right {
      position: relative;
      .px2vw(padding-left, 15);
      &:before {
        content: "";
        position: absolute;
        background: #f6bd35;
        .px2vw(width, 5);
        .px2vw(height, 22);
        border-radius: 100%;
        left: 0;
      }
    }
    .float-right {
      .px2vw(padding-right, 15);
      &:before {
        left: auto;
        right: 0;
      }
    }
  }
  .content {
    margin: auto;
    .px2vw(width, 700);
    .px2vw(height, 344);
    background: #ffffff;
    -webkit-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.06);
    border-radius: 26px;
    /*统计*/
    .charts {
      .item {
        display: inline-block;
        .px2vw(width, 233);
        text-align: center;
        .bottom {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          justify-content: center;
          align-items: center;
          .van-circle {
            .px2vw(width, 76);
            .px2vw(height, 76);
            .px2vw(margin, 22);
          }
        }
      }
    }
    /*射门*/
    .shoot {
      .px2vw(margin-top, 8);
      .px2vw(margin-bottom, 8);
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        display: inline-block;
        .px2vw(width, 40);
        text-align: left;
        .flag,
        .red,
        .yellow {
          .px2vw(height, 27);
        }
        &.align-right {
          text-align: right;
        }
      }
      .progress {
        display: inline-block;
        .px2vw(width, 305);
        span {
          display: inline-block;
          width: 100%;
          font-size: 14px;
          color: #333333;
          text-align: center;
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
</style>
