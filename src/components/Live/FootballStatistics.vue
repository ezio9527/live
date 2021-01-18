<template>
  <div class="football-statistics">
    <div class="title">
      <span class="float-left">{{match.hteam_name || '-'}}</span>
      <span class="float-right">{{match.ateam_name || '-'}}</span>
    </div>
    <div class="content">
      <div class="charts">
        <div class="item" v-for="(item,index) in circleMap" :key="index">
          <div class="top">{{item.name}}</div>
          <div class="bottom">
            <span>{{fStatsCalc(item.key).home}}</span>
            <van-circle
              :clockwise="false"
              v-model="item.currentRate"
              :rate="percentageRate(item.key)"
              layer-color="#E5E5E5"
              speed="50"
              color="#F6BD35"
              stroke-width="120"
            />
            <span>{{fStatsCalc(item.key).away}}</span>
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
          <div class="progressView" ref="item21">
            <van-progress
              :percentage="percentageCalc(21,true)"
              :show-pivot="false"
              color="#F6BD35"
            />
            <van-progress
              :percentage="percentageCalc(21,false)"
              :show-pivot="false"
              color="#27c5c3"
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
        <span class="item" ref="home2">{{fStatsCalc(2).home}}</span>
        <span class="item" ref="home4">{{fStatsCalc(4).home}}</span>
        <span class="item" ref="home3">{{fStatsCalc(3).home}}</span>
        <span class="item">{{fStatsCalc(22).home}}</span>
        <div class="progress">
          <span>射偏球门</span>
          <div class="progressView" ref="item22">
            <van-progress
              :percentage="percentageCalc(22,true)"
              :show-pivot="false"
              color="#F6BD35"
            />
            <van-progress
              :percentage="percentageCalc(22,false)"
              :show-pivot="false"
              color="#27c5c3"
            />
          </div>
          <span>&nbsp;</span>
        </div>
        <span class="item align-right">{{fStatsCalc(22).away}}</span>
        <span class="item align-right" ref="away3">{{fStatsCalc(3).away}}</span>
        <span class="item align-right" ref="away4">{{fStatsCalc(4).away}}</span>
        <span class="item align-right" ref="away2">{{fStatsCalc(2).away}}</span>
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
    fStatsData: {
      handler (newValue, oldValue) {
        try {
          const newV = this.findData(newValue, 21)
          const oldV = this.findData(oldValue, 21)
          if (oldV && newV !== oldV) {
            const dom = this.$refs.item21
            dom.style.animation = 'tipsfade 500ms 2'
            setTimeout(() => {
              dom.style.animation = 'none'
            }, 1000)
          }
        } catch { }
        try {
          const newV = this.findData(newValue, 22)
          const oldV = this.findData(oldValue, 22)
          if (oldV && newV !== oldV) {
            const dom = this.$refs.item22
            dom.style.animation = 'tipsfade 500ms 2'
            setTimeout(() => {
              dom.style.animation = 'none'
            }, 1000)
          }
        } catch { }
        try {
          const newV = this.findData(newValue, 2)
          const oldV = this.findData(oldValue, 2)
          if (oldV && newV !== oldV) {
            const dom = this.$refs.home2
            const dom2 = this.$refs.away2
            dom.style.animation = 'tipsfade 500ms 2'
            dom2.style.animation = 'tipsfade 500ms 2'
            setTimeout(() => {
              dom.style.animation = 'none'
              dom2.style.animation = 'none'
            }, 1000)
          }
        } catch { }
        try {
          const newV = this.findData(newValue, 3)
          const oldV = this.findData(oldValue, 3)
          if (oldV && newV !== oldV) {
            const dom = this.$refs.home3
            const dom2 = this.$refs.away3
            dom.style.animation = 'tipsfade 500ms 2'
            dom2.style.animation = 'tipsfade 500ms 2'
            setTimeout(() => {
              dom.style.animation = 'none'
              dom2.style.animation = 'none'
            }, 1000)
          }
        } catch { }
        try {
          const newV = this.findData(newValue, 4)
          const oldV = this.findData(oldValue, 4)
          if (oldV && newV !== oldV) {
            const dom = this.$refs.home4
            const dom2 = this.$refs.away4
            dom.style.animation = 'tipsfade 500ms 2'
            dom2.style.animation = 'tipsfade 500ms 2'
            setTimeout(() => {
              dom.style.animation = 'none'
              dom2.style.animation = 'none'
            }, 1000)
          }
        } catch { }
      },
      deep: true
    },
    fStats: {
      handler (newValue, oldValue) {
        this.fStatsData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      circleMap: [
        { key: 23, name: '进攻', currentRate: 0 },
        { key: 24, name: '危险进攻', currentRate: 0 },
        { key: 25, name: '控球率', currentRate: 0 }
      ],
      currentRate: 0,
      fStatsData: []
    }
  },
  created () {
    this.fStatsData = this.fStats
  },
  methods: {
    findData (item, key) {
      return JSON.stringify(item.find(e => (e.type === key)))
    },
    fStatsCalc (key) {
      const itemData = this.fStatsData.find(e => (e.type === key))
      return itemData
    },
    percentageRate (key) {
      const hteamV = this.fStatsCalc(key).home
      const ateamV = this.fStatsCalc(key).away
      const count = hteamV + ateamV
      const res = hteamV / count
      return Number(res).toFixed(2) * 100 || 0
    },
    percentageCalc (key, isHteam) {
      const hteamV = this.fStatsCalc(key).home
      const ateamV = this.fStatsCalc(key).away
      const count = hteamV + ateamV
      const res = isHteam ? hteamV / count : ateamV / count
      return res.toFixed(2) * 100 || 0
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
        background: #27c5c3;
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
<style>
@keyframes tipsfade {
  from {
    opacity: 1;
    color: red;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
