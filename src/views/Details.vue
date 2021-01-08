<template>
  <div class="details">
    <BaseNavBar></BaseNavBar>
    <div class="header" v-loading="loading">
      <div class="title">
        <img class="back" src="@img/details/back.png" />
        <div>
          <span class="name">{{matchDetails.name}}</span>
          <span class="time">{{matchDetails.matchTime}}</span>
        </div>
        <img class="share" src="@img/details/share.png" />
      </div>
      <div class="content">
        <div class="home_team">
          <img class="team_logo" src="@img/list/team_default_logo.png" />
          <span class="team_name">{{matchDetails.hteam_name}}</span>
          <span class="team_des">英超第8</span>
        </div>
        <div class="info">
          <span class="des">{{matchDetails.des}}</span>
          <span class="score">{{matchDetails.score}}</span>
          <span class="half">{{matchDetails.halfScore}}</span>
          <div>
            <span class="btn">
              <img class="animation" src="@img/list/animation.png" />动画
            </span>
            <span class="btn">
              <img class="video" src="@img/list/video.png" />视频
            </span>
          </div>
        </div>
        <div class="guest_team">
          <img class="team_logo" src="@img/list/team_default_logo.png" />
          <span class="team_name">{{matchDetails.ateam_name}}</span>
          <span class="team_des">英超第8</span>
        </div>
      </div>
    </div>
    <div class="statistics">
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
    <!--文字直播&重要事件-->
    <div class="text">
      <ul class="nav">
        <li>文字直播</li>
        <li>重要事件</li>
      </ul>
      <!--文字直播-->
      <ul class="live">
        <li>
          <img src="@img/details/flag.png" />
          <div class="content">01:13 - 奥莫尼亚 首先达到7个角球</div>
        </li>
        <li>
          <img src="@img/details/flag.png" />
          <div class="content">01:13 - 奥莫尼亚 首先达到7个角球</div>
        </li>
        <li>
          <img src="@img/details/flag.png" />
          <div class="content">01:13 - 奥莫尼亚 首先达到7个角球</div>
        </li>
      </ul>
      <!--重要事件-->
    </div>
  </div>
</template>

<script>
import BaseNavBar from '@comp/BaseNavBar'
import { matchDetailApi } from '@/http/api'
import { Toast } from 'vant'
export default {
  name: 'Details',
  components: {
    BaseNavBar
  },
  props: {
    matchId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      params: {
        type: '',
        playType: '',
        channel: '',
        id: ''
      },
      token: '',
      loading: true,
      matchDetails: {},
      currentRate: 88
    }
  },
  created () {
    let routeParams = this.$route.params
    this.params = routeParams
    this.qryMatch(Number(routeParams.id), Number(routeParams.type))
  },
  methods: {
    async qryMatch (mid, type) {
      const result = await matchDetailApi({ mid, type })
      if (result.code === '0') {
        let Data = result.data
        this.token = Data.token
        this.matchDetails = Data.matchinfo
      } else {
        Toast.fail(result.msg)
        this.$router.push({ path: '/' })
      }
      // setTimeout(() => {
      //   this.matchDetails = {
      //     name: '英超  第15轮',
      //     matchTime: '12-24 21:00',
      //     hteam_name: '热刺',
      //     ateam_name: '曼城',
      //     score: '2 - 1',
      //     des: '加时 12',
      //     halfScore: '半场 0 - 0'
      //   }
      //   this.loading = false
      // }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.details {
  min-height: 100%;
  background: #fcfcfc;
  // 头部比赛基础信息
  .header {
    width: 100%;
    .px2vw(height, 424);
    background: url("../assets/images/details/background.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      .px2vw(width, 640);
      .px2vw(height, 40);
      margin: auto;
      .px2vw(margin-top, 36);
      color: #ffffff;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        .px2vw(margin-right, 8);
        .px2vw(font-size, 24);
        font-weight: 400;
      }
      .back {
        .px2vw(width, 34);
        .px2vw(height, 28);
      }
      .share {
        .px2vw(width, 40);
        .px2vw(height, 40);
      }
    }
    /*球队比赛信息*/
    .content {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      .px2vw(margin-bottom, 120);
      .home_team,
      .guest_team,
      .info {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      /*主队，客队*/
      .home_team,
      .guest_team {
        justify-content: flex-end;
        .team_logo {
          .px2vw(width, 92);
          .px2vw(height, 92);
          border-radius: 100%;
        }
        .team_name {
          font-size: 16px;
          color: #ffffff;
        }
        .team_des {
          font-size: 12px;
          color: #d8d8d8;
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .info {
        .px2vw(margin-left, 60);
        .px2vw(margin-right, 60);
        color: #ffffff;
        .des {
          .px2vw(font-size, 24);
          font-weight: 400;
          .px2vw(padding-top, 6);
          .px2vw(padding-bottom, 6);
          .px2vw(padding-left, 12);
          .px2vw(padding-right, 12);
          .px2vw(border-radius, 6);
          background: #5f6574;
          background: rgba(255, 255, 255, 0.1);
        }
        .score {
          .px2vw(font-size, 45);
          font-weight: 600;
        }
        .half {
          .px2vw(font-size, 24);
          font-weight: 400;
          .px2vw(margin-bottom, 16);
        }
        .btn {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          flex-direction: column;
          align-items: center;
          display: inline-block;
          .px2vw(width, 105);
          .px2vw(height, 48);
          border-radius: 1000px;
          border: 1px solid #27c5c3;
          color: #27c5c3;
          text-align: center;
          img.animation {
            .px2vw(width, 24);
            .px2vw(height, 16);
            .px2vw(margin-right, 7);
          }
          img.video {
            .px2vw(width, 20);
            .px2vw(height, 20);
            .px2vw(margin-right, 7);
          }
        }
      }
    }
  }
  /*统计*/
  .statistics {
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
  /*文字直播*/
  .text {
    .nav {
      color: #333333;
      .px2vw(font-size, 30);
      width: 100%;
      text-align: center;
      li {
        position: relative;
        display: inline-block;
        .px2vw(padding-top, 30);
        .px2vw(padding-bottom, 30);
        .px2vw(margin-bottom, 17);
        &:first-child {
          .px2vw(margin-right, 140);
        }
        &:before {
          content: "";
          .px2vw(width, 58);
          .px2vw(height, 8);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          border-radius: 10px;
          background: #0c9ce2;
          background: -webkit-linear-gradient(#19abf5, #68ff87);
          background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#19abf5),
            to(#68ff87)
          );
          background: linear-gradient(#19abf5, #68ff87);
        }
      }
    }
    .live {
      .px2vw(width, 700);
      margin: auto;
      li {
        .px2vw(margin-bottom, 10);
        img {
          .px2vw(width, 27);
          .px2vw(margin-right, 23);
        }
        .content {
          display: inline-block;
          .px2vw(width, 600);
          .px2vw(height, 90);
          .px2vw(line-height, 90);
          .px2vw(padding-left, 25);
          .px2vw(padding-right, 25);
          .px2vw(font-size, 28);
          color: #333333;
          font-weight: 400;
          background: #ffffff;
          -webkit-box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          -moz-box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          .px2vw(border-radius, 26);
        }
      }
    }
  }
}
</style>
