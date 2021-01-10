<template>
  <div class="live-player">
    <!--播放器部分-->
    <template v-if="playing">
      <BaseVideoPlayer ref="player" :quality="channel" :video="video" v-if="playType===1"></BaseVideoPlayer>
      <iframe :src="animation" v-else></iframe>
    </template>
    <!--基础信息面板-->
    <div class="panel" v-loading="loading" v-else>
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
          <span class="team_name line-word-hidden">{{matchDetails.hteam_name}}</span>
        </div>
        <div class="info">
          <!--<span class="des">{{matchDetails.des}}</span>-->
          <span class="score">{{matchDetails.score}}</span>
          <!--<span class="half">{{matchDetails.halfScore}}</span>-->
          <div class="btn-group">
            <button class="btn" @click="play(2)">
              <img class="animation" src="@img/list/animation.png" /><span>动画</span>
            </button>
            <button class="btn" @click="play(1)">
              <img class="video" src="@img/list/video.png"/><span>视频</span>
            </button>
          </div>
        </div>
        <div class="guest_team">
          <img class="team_logo" src="@img/list/team_default_logo.png" />
          <span class="team_name line-word-hidden">{{matchDetails.ateam_name}}</span>
        </div>
      </div>
    </div>
    <!--菜单-->
    <van-tabs v-model="tabActive" animated :class="{playing}">
      <van-tab title="直播">
        <slot name="live"><van-empty description="暂无直播信息"></van-empty></slot>
      </van-tab>
      <van-tab title="统计">
        <slot name="statistics"><van-empty description="暂无统计信息"></van-empty></slot>
      </van-tab>
      <van-tab title="聊天">
        <slot name="chat"><van-empty description="暂无聊天信息"></van-empty></slot>
      </van-tab>
      <van-tab title="数据">
        <slot name="data"><van-empty description="暂无数据信息"></van-empty></slot>
      </van-tab>
      <van-tab title="会员">
        <slot name="vip"><van-empty description="暂无会员信息"></van-empty></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Empty } from 'vant'
import BaseVideoPlayer from '@comp/BaseVideoPlayer'
export default {
  name: 'LivePlayer',
  components: {
    VanTab: Tab,
    VanTabs: Tabs,
    VanEmpty: Empty,
    BaseVideoPlayer
  },
  props: {
    matchDetails: {
      type: Object,
      default: () => {
        return {
          name: '英超  第15轮',
          matchTime: '12-24 21:00',
          hteam_name: '热刺',
          ateam_name: '曼城',
          score: '2 - 1',
          des: '加时 12',
          halfScore: '半场 0 - 0'
        }
      }
    },
    video: {
      type: Object,
      default: () => {}
    },
    animation: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      playing: false,
      tabActive: 0, // 菜单
      // 比赛详情
      playType: 1, // 播放类型: 1视频 2动画
      channel: 0, // 播放源index
      animationActive: -1,
      videoActive: -1
    }
  },
  methods: {
    play (type) {
      this.playType = type
      this.playing = true
      this.$emit('play', type)
    }
  }
}
</script>

<style lang="less">
.live-player {
  /*播放器*/
  .base-video {
    .px2vw(height, 342);
  }
  /*比赛详情*/
  .player-score {
    position: relative;
    width: 100%;
    height: auto;
    margin: 0;
    border-radius: 0;
    color: #666666;
    background: #fff;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-transition: all 200ms;
    -moz-transition: all 200ms;
    -ms-transition: all 200ms;
    -o-transition: all 200ms;
    transition: all 200ms;
    .top {
      position: relative;
      .px2vw(width, 640);
      .px2vw(height, 60);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name,
      .status {
        width: auto;
        flex: 1;
      }
      .name {
        color: #333333;
        text-align: left;
        img {
          .px2vw(width, 40);
          .px2vw(height, 40);
          margin-left: 0;
        }
      }
      .time {
        color: #333333;
        .px2vw(width, 100);
      }
      .status {
        color: #333333;
        text-align: right;
      }
      /*底部细线*/
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 1px;
        background: #979797;
        -webkit-transform: scaleY(0.5);
        -moz-transform: scaleY(0.5);
        -ms-transform: scaleY(0.5);
        -o-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
    .middle {
      .px2vw(width, 640);
      .px2vw(height, 90);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      .home {
        flex: 1;
        text-align: right;
        font-size: 12px;
        color: #000000;
        img {
          .px2vw(width, 38);
          .px2vw(height, 38);
          .px2vw(margin-left, 16);
        }
      }
      .score {
        font-size: 14px;
        color: #000000;
        .px2vw(width, 120);
        text-align: center;
      }
      .guest {
        flex: 1;
        text-align: left;
        font-size: 12px;
        color: #000000;
        img {
          .px2vw(width, 38);
          .px2vw(height, 38);
          .px2vw(margin-right, 16);
        }
      }
    }
    .bottom {
      .px2vw(width, 640);
      .px2vw(padding-bottom, 40);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      /*视频直播和动画直播图标*/
      .video,
      .animation {
        font-size: 12px;
        .px2vw(padding-left, 20);
        .px2vw(padding-right, 20);
        cursor: pointer;
        color: #27c5c3;
        -webkit-transition: all 100ms;
        -moz-transition: all 100ms;
        -ms-transition: all 100ms;
        -o-transition: all 100ms;
        transition: all 100ms;
        img {
          .px2vw(margin-right, 8);
        }
        &:hover {
          font-size: 12px;
        }
      }
      .video {
        img {
          .px2vw(width, 28);
          .px2vw(height, 32);
        }
        &:hover {
          img {
            .px2vw(width, 32);
            .px2vw(height, 36);
          }
        }
      }
      .animation {
        img {
          .px2vw(width, 36);
          .px2vw(height, 24);
        }
        &:hover {
          img {
            .px2vw(width, 40);
            .px2vw(height, 28);
          }
        }
      }
      /*不可用和可用状态下的样式*/
      .video,
      .animation {
        img.disabled {
          display: none;
        }
      }
      .video.disabled,
      .animation.disabled {
        color: #c9c9c9;
        img.able {
          display: none;
        }
        img.disabled {
          display: inline-block;
        }
      }
    }
  }
  // 头部比赛基础信息
  .panel {
    width: 100%;
    .px2vw(height, 424);
    background: url("../../assets/images/details/background.png") no-repeat;
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
        justify-content: center;
        .px2vw(width, 158);
        .px2vw(height, 210);
        .team_logo {
          .px2vw(width, 92);
          .px2vw(height, 92);
          .px2vw(margin-bottom, 18);
          border-radius: 100%;
        }
        .team_name {
          text-align: center;
          font-size: 16px;
          color: #ffffff;
          display: inline-block;
          width: 100%;
        }
      }
      .info {
        justify-content: flex-end;
        .px2vw(width, 220);
        .px2vw(height, 210);
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
          .px2vw(margin-bottom, 60);
        }
        .half {
          .px2vw(font-size, 24);
          font-weight: 400;
          .px2vw(margin-bottom, 16);
        }
        .btn-group {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          justify-content: center;
          align-items: center;
          .btn {
            &:first-child {
              .px2vw(margin-right, 14);
            }
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            align-items: center;
            .px2vw(width, 105);
            .px2vw(height, 48);
            border-radius: 1000px;
            border: 1px solid #27c5c3;
            color: #27c5c3;
            text-align: center;
            background-color: transparent;
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
  }
  // tabs菜单
  .van-tabs.van-tabs--line {
    .px2vw(margin-top, -82);
  }
  .van-tabs.van-tabs--line.playing {
    margin-top: 0;
    .van-tabs__nav.van-tabs__nav--line {
      background: url("../../assets/images/details/background.png") no-repeat;
    }
  }
  .van-tabs--line .van-tabs__wrap {
    .px2vw(height, 82);
  }
  .van-tabs__nav.van-tabs__nav--line {
    background-color: rgba(0, 0, 0, 0.05);
    padding-bottom: 0;
  }
  .van-tab {
    .px2vw(font-size, 28);
    color: rgba(255, 255, 255, 0.6);
  }
  .van-tab.van-tab--active {
    .px2vw(font-size, 28);
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  .van-tabs__line {
    .px2vw(width, 46);
    .px2vw(height, 6);
    .px2vw(bottom, 12);
    background-color: #FFFFFF;
  }
  // tabs菜单
}
</style>
