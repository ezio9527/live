<template>
  <div class="player2">
    <!--导航-->
    <BaseNavBar></BaseNavBar>
    <div class="mobile-nav-bar">
      <!--logo-->
      <a href="/home">
        <img src="@img/nav/logo.png" class="logo" />
      </a>
    </div>
    <!--播放器-->
    <!-- <BaseVideoPlayer :url="url" :ball="match.type" v-if="playType===1"></BaseVideoPlayer> -->
    <BaseVideoPlayer
      v-if="playType===1"
      ref="player"
      :video="video"
      :contextmenu="contextmenu"
      @play="play"
    ></BaseVideoPlayer>
    <!--动画播放器-->
    <iframe :src="url" v-else></iframe>
    <!--比赛信息PC版-->
    <div class="details" v-loading="detailsLoading" v-if="getScreenIsPc">
      <div class="item name">
        <img src="@img/home/football.png" v-if="match.type===1" />
        <img src="@img/home/basketball.png" v-else />
        <span>{{match.name}}</span>
      </div>
      <div class="item time">{{match.matchTime}}</div>
      <div class="item status">{{('1') | interpreter('MatchType')}}</div>
      <div class="item home">
        <img :src="match.hteam_logo" />
        <span>{{match.hteam_name}}</span>
      </div>
      <div class="item score">{{match.score}}</div>
      <div class="item guest">
        <img :src="match.ateam_logo" />
        <span>{{match.ateam_name}}</span>
      </div>
      <div class="item channel">
        <div
          class="video"
          :class="{disabled: video.status===0}"
          v-for="(video, k) in match.live_urls"
          :key="'video'+k"
          @click="changeVideo(1, video)"
        >
          <img class="able" src="@img/list/video.png" />
          <img class="disabled" src="@img/list/video_disabled.png" />
          <span>{{video.name}}</span>
        </div>
        <div
          class="animation"
          :class="{disabled: match.status!==0}"
          v-for="(animation, k) in match.live_cartoon_url"
          :key="'animation'+k"
          @click="changeVideo(1, animation)"
        >
          <img class="able" src="@img/list/animation.png" />
          <img class="disabled" src="@img/list/animation_disabled.png" />
          <span>{{animation.name}}</span>
        </div>
      </div>
    </div>
    <!--比赛信息手机版-->
    <div class="details" v-loading="detailsLoading" v-else>
      <div class="top">
        <div class="name">
          <img src="@img/home/football.png" v-if="match.type===1" />
          <img src="@img/home/basketball.png" v-else />
          <span>{{match.name}}</span>
        </div>
        <div class="time">{{match.matchTime}}</div>
        <div class="status">{{match.status | interpreter('MatchType')}}</div>
      </div>
      <div class="middle">
        <div class="home line-word-hidden">
          <span>{{match.hteam_name}}</span>
          <img :src="match.hteam_logo" />
        </div>
        <div class="score">{{match.score}}</div>
        <div class="guest line-word-hidden">
          <img :src="match.ateam_logo" />
          <span>{{match.ateam_name}}</span>
        </div>
      </div>
      <div class="bottom">
        <div
          class="video"
          :class="{disabled: video.status===0}"
          v-for="(video, k) in match.live_urls"
          :key="'video'+k"
          @click="$emit('play', {type: match.type, playType: 1, channel: k, id: match.id})"
        >
          <img class="able" src="@img/list/video.png" />
          <img class="disabled" src="@img/list/video_disabled.png" />
          <span>{{video.name}}</span>
        </div>
        <div
          class="animation"
          :class="{disabled: match.status!==0}"
          v-for="(animation, k) in match.live_cartoon_url"
          :key="'animation'+k"
          @click="$emit('play', {type: match.type, playType: 2, channel: k, id: match.id})"
        >
          <img class="able" src="@img/list/animation.png" />
          <img class="disabled" src="@img/list/animation_disabled.png" />
          <span>{{animation.name}}</span>
        </div>
      </div>
    </div>
    <!--底部Footer-->
    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
import Hls from 'hls.js'
import BaseNavBar from '@comp/BaseNavBar'
import BaseVideoPlayer from '@comp/BaseVideoPlayer'
import BaseFooter from '@comp/BaseFooter'
import { matchDetailApi } from '@/http/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Player2',
  components: {
    BaseNavBar,
    BaseVideoPlayer,
    BaseFooter
  },
  data () {
    return {
      video: {
        url: '',
        // pic: require('../../assets/'),//底图
        type: 'hls'
      },
      autoplay: false,
      player: null,
      contextmenu: [],
      detailsLoading: false, // 比赛详情加载中
      match: {
        live_urls: [],
        live_cartoon_url: []
      }, // 比赛详情
      playType: 1, // 播放类型: 1视频 2动画
      url: '', // 播放url
      channel: 0, // 播放源index
      animationActive: -1,
      videoActive: -1
    }
  },
  computed: {
    ...mapGetters([
      'getScreenIsPc',
      'getScreenIsMobile'
    ])
  },
  created () {
    const id = this.$route.params.id // 比赛ID
    const type = this.$route.params.type // 比赛类型
    this.playType = parseInt(this.$route.params.playType) // 播放类型：1视频直播2动画直播
    this.channel = parseInt(this.$route.params.channel) // 视频播放信号
    if (this.playType === 1) {
      this.videoActive = this.channel
    } else {
      this.animationActive = this.channel
    }
    this.qryMatchDetails({ mid: id, type })
  },
  methods: {
    play () {
      console.log('play callback')
    },
    // 查询比赛详情
    qryMatchDetails (data = {}) {
      this.detailsLoading = true
      matchDetailApi(data).then(data => {
        this.player = this.$refs.player.dp
        const liveUrl = data.url//
        this.player.switchVideo({
          url: liveUrl,
          type: 'hls'
        })
        const hls = new Hls()
        hls.loadSource(liveUrl)
        hls.attachMedia(this.player)

        this.match = data.matchinfo
        // 处理一下比赛时间格式
        data.matchinfo.matchTime = new Date(data.matchinfo.matchtime.replace(/-/g, '/')).format('hh:mm')
        this.match.videoUrl = data.matchinfo.live_urls.map((item, index) => {
          return {
            disabled: item.status === 0,
            text: item.name,
            value: item.url
          }
        })
        this.match.animationUrl = data.matchinfo.live_cartoon_url.map((item, index) => {
          return {
            disabled: item.status === 0,
            text: item.name,
            value: item.url
          }
        })
        // 根据当前播放类型选择播放地址
        if (this.playType === 1) {
          if (data.matchinfo.live_urls.length > 0) {
            this.url = data.matchinfo.live_urls[this.channel].url
            this.selectVideoSource({
              index: this.channel,
              value: this.url
            })
          }
        } else {
          if (data.matchinfo.live_cartoon_url.length > 0) {
            this.url = data.matchinfo.live_cartoon_url[this.channel].url
            this.selectAnimationSource({
              index: this.channel,
              value: this.url
            })
          }
        }
      }).catch(() => { }).finally(() => {
        this.detailsLoading = false
      })
    },
    changeSource (type, item) {
      if (type === 1) {
        // 重选视频播放源
        this.playType = 1
        this.url = item.value
        this.animationActive = -1
        this.videoActive = item.index
      } else {
        // 重选动画播放源
        this.playType = 2
        this.url = item.value
        this.videoActive = -1
        this.animationActive = item.index
      }
    }
  }
}
</script>

<style scoped lang="less">
.player2 {
  .mobile-nav-bar {
    display: none;
  }
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  /*视频播放器*/
  .base-video {
    flex: 1;
  }
  /*比赛详情*/
  .details {
    position: relative;
    width: 1200px;
    height: 84px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #666666;
    background: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    .item {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .name {
      width: 150px;
      img {
        width: 30px;
        height: 30px;
        margin-left: 30px;
        margin-right: 4px;
      }
    }
    .time {
      width: 65px;
    }
    .status {
      width: 100px;
    }
    .home,
    .guest {
      flex-direction: column;
      width: 195px;
      img {
        width: 38px;
        height: 38px;
      }
    }
    .score {
      width: 100px;
    }
    .channel {
      width: 395px;
      flex-wrap: wrap;
      justify-content: center;
      .video,
      .animation {
        padding: 0 10px;
        cursor: pointer;
        color: #27c5c3;
        -webkit-transition: all 100ms;
        -moz-transition: all 100ms;
        -ms-transition: all 100ms;
        -o-transition: all 100ms;
        transition: all 100ms;
        img {
          margin-right: 4px;
        }
        &:hover {
          font-size: 16px;
        }
      }
      .video {
        img {
          width: 14px;
          height: 16px;
        }
        &:hover {
          img {
            width: 16px;
            height: 18px;
          }
        }
      }
      .animation {
        img {
          width: 18px;
          height: 12px;
        }
        &:hover {
          img {
            width: 20px;
            height: 14px;
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
}

@media screen and (max-width: 700px) {
  .player2 {
    .base-nav-bar {
      display: none;
    }
    .mobile-nav-bar {
      display: block;
      width: 100%;
      .px2vw(height, 100);
      .px2vw(line-height, 100);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      text-align: left;
      a {
        display: block;
        img {
          .px2vw(height, 54);
          .px2vw(margin-left, 25);
        }
      }
    }
    /*比赛详情*/
    .details {
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
    /*去掉特效*/
    li:hover {
      width: 100%;
      height: auto;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
  }
}
</style>
