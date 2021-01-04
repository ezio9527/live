<template>
  <div class="base-video" ref="wrap">
    <div class="loading" :class="{hidden: !loading}">
      <img src="@img/nav/football_unselected.png" v-if="ball===1">
      <img src="@img/nav/basketball_unselected.png" v-else>
      <span>视频加载中...</span>
    </div>
    <video id="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-landscape-fullscreen'
import zhCN from 'video.js/dist/lang/zh-CN.json'
export default {
  name: 'BaseVideoPlayer',
  props: {
    ball: {
      type: Number,
      default: 1
    },
    url: {
      type: String,
      default: ''
    }
  },
  watch: {
    url (val) {
      if (val) {
        this.$set(this.setup, 'sources', [{ src: val, type: 'application/x-mpegURL' }])
        this.createPlayer()
      }
    }
  },
  data () {
    return {
      player: null,
      loading: true,
      setup: {
        autoplay: true,
        liveui: true,
        controls: true,
        fluid: true,
        suppressNotSupportedError: false
        // children: [
        //   'bigPlayButton',
        //   'controlBar'
        // ],
        // sources: [
        //   {
        //     src: this.url,
        //     type: 'application/x-mpegURL'
        //   }
        // ]
      }
    }
  },
  mounted () {
    // 设置语言
    videojs.addLanguage('zh-CN', zhCN)
  },
  destroyed () {
    this.destroyPlayer()
  },
  methods: {
    destroyPlayer () {
      if (this.player) {
        this.player.pause()
        this.player.dispose()
        this.player = null
        this.$refs.wrap.innerHTML = `<video id="videoPlayer" class="video-js"></video>`
      }
    },
    createPlayer () {
      this.player = videojs('videoPlayer', this.setup, () => {
        videojs.log('Your player is ready!')

        this.player.on('loadstart', () => {
          console.log('开始请求数据 ')
          this.loading = false
        })
        this.player.on('progress', () => {
          console.log('正在请求数据 ')
        })
        this.player.on('loadedmetadata', () => {
          console.log('获取资源长度完成 ')
        })
        this.player.on('canplaythrough', () => {
          console.log('视频源数据加载完成')
        })
        this.player.on('waiting', () => {
          console.log('等待数据')
        })
        this.player.on('play', () => {
          console.log('视频开始播放')
          this.loading = false
        })
        this.player.on('playing', () => {
          console.log('视频播放中')
        })
        this.player.on('pause', () => {
          console.log('视频暂停播放')
        })
        this.player.on('ended', () => {
          console.log('视频播放结束')
        })
        this.player.on('error', () => {
          console.log('加载错误')
          this.loading = false
        })
        this.player.on('seeking', () => {
          console.log('视频跳转中')
        })
        this.player.on('seeked', () => {
          console.log('视频跳转结束')
        })
        this.player.on('ratechange', () => {
          console.log('播放速率改变')
        })
        this.player.on('timeupdate', () => {
          console.log('播放时长改变')
        })
        this.player.on('volumechange', () => {
          console.log('音量改变')
        })
        this.player.on('stalled', () => {
          console.log('网速异常')
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .base-video {
    position: relative;
    width: 1200px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    .video-js {
      width: 100%;
      flex: 1;
    }
    .loading {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      z-index: 1;
      color: #999999;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-right: 20px;
        -webkit-animation: loading 1300ms linear infinite;
        animation: loading 1300ms linear infinite;
      }
      &.hidden {
        display: none;
      }
    }
  }

  @-webkit-keyframes loading {
    from {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(1turn);
      -moz-transform: rotate(1turn);
      -ms-transform: rotate(1turn);
      -o-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
  @keyframes loading {
    from {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(1turn);
      -moz-transform: rotate(1turn);
      -ms-transform: rotate(1turn);
      -o-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
</style>
