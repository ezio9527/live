<template>
  <div class="football-statistics">
    <div class="title">
      <span class="float-left">热刺</span>
      <span class="float-right">曼城</span>
    </div>
    <div class="content">
      <div class="charts">
        <div class="item">
          <div class="top">进攻</div>
          <div class="bottom">
            <span>79</span>
            <van-circle
              v-model="currentRate"
              :rate="56"
              layer-color="#E5E5E5"
              color="#F6BD35"
              stroke-width="120"
            />
            <span>79</span>
          </div>
        </div>
        <div class="item">
          <div class="top">进攻</div>
          <div class="bottom">
            <span>79</span>
            <van-circle
              v-model="currentRate"
              :rate="56"
              layer-color="#E5E5E5"
              color="#F6BD35"
              stroke-width="120"
            />
            <span>79</span>
          </div>
        </div>
        <div class="item">
          <div class="top">进攻</div>
          <div class="bottom">
            <span>79</span>
            <van-circle
              v-model="currentRate"
              :rate="56"
              layer-color="#E5E5E5"
              color="#F6BD35"
              stroke-width="120"
            />
            <span>79</span>
          </div>
        </div>
      </div>
      <div class="shoot">
            <span class="item">
              <img class="flag" src="@img/details/flag.png" />
            </span>
        <span class="item">
              <img class="red" src="@img/details/red.png" />
            </span>
        <span class="item">
              <img class="yellow" src="@img/details/yellow.png" />
            </span>
        <span class="item">5</span>
        <div class="progress">
          <span>射正球门</span>
          <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
          <span>&nbsp;</span>
        </div>
        <span class="item align-right">5</span>
        <span class="item align-right">
              <img class="yellow" src="@img/details/yellow.png" />
            </span>
        <span class="item align-right">
              <img class="red" src="@img/details/red.png" />
            </span>
        <span class="item align-right">
              <img class="flag" src="@img/details/flag.png" />
            </span>
      </div>
      <div class="shoot">
        <span class="item">5</span>
        <span class="item">12</span>
        <span class="item">5</span>
        <span class="item">5</span>
        <div class="progress">
          <span>射歪球门</span>
          <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
          <span>&nbsp;</span>
        </div>
        <span class="item align-right">5</span>
        <span class="item align-right">5</span>
        <span class="item align-right">12</span>
        <span class="item align-right">5</span>
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
  data () {
    return {
      currentRate: 88
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
            .px2vw(width, 27);
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
      }
    }
  }
</style>
