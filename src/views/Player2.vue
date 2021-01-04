<template>
  <div class="player2">
    <!--导航-->
    <BaseNavBar></BaseNavBar>
    <!--播放器-->
    <BaseVideoPlayer></BaseVideoPlayer>
    <!--比赛信息-->
    <div class="details" v-loading="detailsLoading">
      <div class="item name"><img src="@img/home/football.png" v-if="match.type===1"><img src="@img/home/basketball.png" v-else><span>{{match.name}}</span></div>
      <div class="item time">{{match.matchTime}}</div>
      <div class="item status">{{('1') | interpreter('MatchType')}}</div>
      <div class="item home"><img :src="match.hteam_logo"><span>{{match.hteam_name}}</span></div>
      <div class="item score">{{match.score}}</div>
      <div class="item guest"><img :src="match.ateam_logo"><span>{{match.ateam_name}}</span></div>
      <div class="item channel">
        <div class="video" :class="{disabled: video.status===0}" v-for="(video, k) in match.live_urls" :key="'video'+k" @click="$emit('play', {type: match.type, playType: 1, channel: k, id: match.id})">
          <img class="able" src="@img/list/video.png"/>
          <img class="disabled" src="@img/list/video_disabled.png"/>
          <span>{{video.name}}</span>
        </div>
        <div class="animation" :class="{disabled: match.status!==0}" v-for="(animation, k) in match.live_cartoon_url" :key="'animation'+k" @click="$emit('play', {type: match.type, playType: 2, channel: k, id: match.id})">
          <img class="able" src="@img/list/animation.png"/>
          <img class="disabled" src="@img/list/animation_disabled.png"/>
          <span>{{animation.name}}</span>
        </div>
      </div>
    </div>
    <!--底部Footer-->
    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
import BaseNavBar from '@comp/BaseNavBar'
import BaseVideoPlayer from '@comp/BaseVideoPlayer'
import BaseFooter from '@comp/BaseFooter'
import { matchDetailApi } from '@/http/api'
export default {
  name: 'Player2',
  components: {
    BaseNavBar,
    BaseVideoPlayer,
    BaseFooter
  },
  data () {
    return {
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
  destroyed () {
    if (this.player) {
      this.player.pause()
      this.player.dispose()
      this.player = null
    }
  },
  methods: {
    // 查询比赛详情
    qryMatchDetails (data = {}) {
      this.detailsLoading = true
      matchDetailApi(data).then(data => {
        this.match = data.matchinfo
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
      }).catch(() => {}).finally(() => {
        this.detailsLoading = false
      })
    },
    // 重选视频播放源
    selectVideoSource (item) {
      this.playType = 1
      this.url = item.value
      this.changeVideo()
      this.videoActive = item.index
      this.animationActive = -1
    },
    // 重选动画播放源
    selectAnimationSource (item) {
      this.playType = 2
      this.url = item.value
      if (this.player) {
        this.player.pause()
        this.player.dispose()
        this.player = null
      }
      this.videoActive = -1
      this.animationActive = item.index
    },
    // 切换视频播放源
    changeVideo () {
      // if (this.player) {
      //   this.player.pause()
      //   this.player.dispose()
      // }
      // this.$refs.videoWrap.innerHTML = `
      //   <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" oncontextmenu="return false;" controls preload="auto" x5-playsinline="" playsinline="" webkit-playsinline="" disablepictureinpicture="">
      //     <source id="source" src="${this.url}" type="application/x-mpegURL">
      //   </video>`
      // this.player = videojs('myVideo', {
      //   liveui: true,
      //   controls: true,
      //   preload: 'auto',
      //   autoplay: true,
      //   // src: this.url,
      //   bigPlayButton: true,
      //   textTrackDisplay: false,
      //   posterImage: false,
      //   errorDisplay: true,
      //   notSupportedMessage: '暂无直播信息'
      // }, () => {
      //   this.player.landscapeFullscreen({
      //     fullscreen: {
      //       enterOnRotate: true,
      //       alwaysInLandscapeMode: true,
      //       iOS: true
      //     }
      //   })
      //   this.player.on('loadstart', err => {
      //     console.log(err)
      //   })
      // })
    }
  }
}
</script>

<style scoped lang="less">
.player2 {
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    background: #FFF;
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
    .time {width: 65px;}
    .status {width: 100px;}
    .home, .guest {
      flex-direction: column;
      width: 195px;
      img {
        width: 38px;
        height: 38px;
      }
    }
    .score {width: 100px;}
    .channel {
      width: 395px;
      flex-wrap: wrap;
      justify-content: center;
      .video, .animation {
        padding: 0 10px;
        cursor: pointer;
        color: #27C5C3;
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
      .video, .animation {
        img.disabled {
          display: none;
        }
      }
      .video.disabled, .animation.disabled {
        color: #C9C9C9;
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
</style>
