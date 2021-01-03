<template>
  <div class="player2">
    <!--导航-->
    <BaseNavBar @categoryChange="categoryChange"></BaseNavBar>
    <!--播放器-->
    <div class="wrap">

    </div>
    <!--底部Footer-->
    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
import BaseNavBar from '@comp/BaseNavBar'
import BaseFooter from '@comp/BaseFooter'
import { matchDetailApi } from '@/http/api'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-landscape-fullscreen'
export default {
  name: 'Player2',
  components: {
    BaseNavBar,
    BaseFooter
  },
  data () {
    return {
      player: null,
      playType: 1,
      url: '',
      channel: 0,
      details: {},
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
      matchDetailApi(data).then(data => {
        this.details = data.matchinfo
        this.details.videoUrl = data.matchinfo.live_urls.map((item, index) => {
          return {
            disabled: item.status === 0,
            text: item.name,
            value: item.url
          }
        })
        this.details.animationUrl = data.matchinfo.live_cartoon_url.map((item, index) => {
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
      }).catch(() => {})
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
      if (this.player) {
        this.player.pause()
        this.player.dispose()
      }
      this.$refs.videoWrap.innerHTML = `
        <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" oncontextmenu="return false;" controls preload="auto" x5-playsinline="" playsinline="" webkit-playsinline="" disablepictureinpicture="">
          <source id="source" src="${this.url}" type="application/x-mpegURL">
        </video>`
      this.player = videojs('myVideo', {
        liveui: true,
        controls: true,
        preload: 'auto',
        autoplay: true,
        // src: this.url,
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: false,
        errorDisplay: true,
        notSupportedMessage: '暂无直播信息'
      }, () => {
        this.player.landscapeFullscreen({
          fullscreen: {
            enterOnRotate: true,
            alwaysInLandscapeMode: true,
            iOS: true
          }
        })
        this.player.on('loadstart', err => {
          console.log(err)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.player2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .wrap {
    flex: 1;
  }
}
</style>
