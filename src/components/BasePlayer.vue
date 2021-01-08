<template>
  <div class="base-player" v-loading="loading">
    <div class="">
      <div class="title">
        <img class="back" src="@img/details/back.png">
        <div><span class="name">{{matchDetails.name}}</span><span class="time">{{matchDetails.matchTime}}</span></div>
        <img class="share" src="@img/details/share.png">
      </div>
      <div class="content">
        <div class="home_team">
          <img class="team_logo" src="@img/list/team_default_logo.png">
          <span class="team_name">{{matchDetails.hteam_name}}</span>
          <span class="team_des">英超第8</span>
        </div>
        <div class="info">
          <span class="des">{{matchDetails.des}}</span>
          <span class="score">{{matchDetails.score}}</span>
          <span class="half">{{matchDetails.halfScore}}</span>
          <div>
            <span class="btn"><img class="animation" src="@img/list/animation.png">动画</span>
            <span class="btn"><img class="video" src="@img/list/video.png">视频</span>
          </div>
        </div>
        <div class="guest_team">
          <img class="team_logo" src="@img/list/team_default_logo.png">
          <span class="team_name">{{matchDetails.ateam_name}}</span>
          <span class="team_des">英超第8</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
export default {
  name: 'BasePlayer',
  components: {
    VanTab: Tab,
    VanTabs: Tabs
  },
  props: {
  },
  watch: {
  },
  data () {
    return {
      active: '',
      matchDetails: {},
      currentRate: 88,
      loading: true
    }
  },
  created () {
    this.qryMatch(this.MatchId)
  },
  methods: {
    qryMatch (matchId) {
      setTimeout(() => {
        this.matchDetails = {
          name: '英超  第15轮',
          matchTime: '12-24 21:00',
          hteam_name: '热刺',
          ateam_name: '曼城',
          score: '2 - 1',
          des: '加时 12',
          halfScore: '半场 0 - 0'
        }
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
  .base-player {
    position: relative;
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
      color: #FFFFFF;
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
      .home_team, .guest_team, .info {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      /*主队，客队*/
      .home_team, .guest_team {
        justify-content: flex-end;
        .team_logo {
          .px2vw(width, 92);
          .px2vw(height, 92);
          border-radius: 100%;
        }
        .team_name {
          font-size: 16px;
          color: #FFFFFF;
        }
        .team_des {
          font-size: 12px;
          color: #D8D8D8;
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .info {
        .px2vw(margin-left, 60);
        .px2vw(margin-right, 60);
        color: #FFFFFF;
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
          border: 1px solid #27C5C3;
          color: #27C5C3;
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
    .van-tabs {
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
</style>
