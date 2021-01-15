<template>
  <div class="base-panel" v-loading="loading">
    <div class="title">
      <img class="back" src="@img/details/back.png" @click="$router.push({name: 'Home'})" />
      <div>
        <span class="name">{{matchDetails.name}}</span>
        <span class="time">{{matchDetails.matchTime}}</span>
      </div>
      <img class="share" src="@img/details/share.png" ref="share" />
    </div>
    <div class="content">
      <div class="home_team">
        <img class="team_logo" :src="matchDetails.hteam_logo" @error="errorImg"/>
        <span class="team_name line-word-hidden">{{matchDetails.hteam_name}}</span>
      </div>
      <div class="info">
        <span class="status">{{matchDetails.status | interpreter('MatchType')}}</span>
        <span class="score">{{matchDetails.score}}</span>
        <div class="btn-group">
          <button class="btn" @click="$emit('play', 2)">
            <img class="animation" src="@img/list/animation.png" />
            <span>动画</span>
          </button>
          <button class="btn" @click="$emit('play', 1)">
            <img class="video" src="@img/list/video.png" />
            <span>视频</span>
          </button>
        </div>
      </div>
      <div class="guest_team">
        <img class="team_logo" :src="matchDetails.ateam_logo" @error="errorImg"/>
        <span class="team_name line-word-hidden">{{matchDetails.ateam_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import { Toast } from 'vant'
import logo from '@img/nav/logo.png'
export default {
  name: 'BasePanel',
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
    }
  },
  watch: {
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
    const clipboard = new ClipboardJS('.share', {
      target: () => {
        return this.$refs.share
      }
    })
    clipboard.on('success', e => {
      Toast('地址已复制')
    })
    clipboard.on('error', e => {
      Toast('地址复制失败')
    })
  },
  methods: {
    errorImg (event) {
      event.target.src = logo
    }
  }
}
</script>

<style scoped lang="less">
// 头部比赛基础信息
.base-panel {
    width: 100%;
    .px2vw(height, 424);
    background: url("../assets/images/details/background.png") no-repeat;
    background-size: 100% 100%;
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
</style>
