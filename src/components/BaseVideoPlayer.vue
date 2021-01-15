<template>
  <div class="base-video" ref="wrap">
    <!--<div class="loading" :class="{hidden: !loading}">-->
    <!--<img src="@img/nav/football_unselected.png" v-if="ball===1">-->
    <!--<img src="@img/nav/basketball_unselected.png" v-else>-->
    <!--<span>视频加载中...</span>-->
    <!--</div>-->
  </div>
</template>

<script>
import Hls from 'hls.js'
import DPlayer from 'dplayer'
import logo from '@img/nav/logo.png'
export default {
  name: 'BaseVideoPlayer',
  props: {
    // 播放源
    quality: {
      type: Number,
      default: 0
    },
    video: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    video (val) {
      if (val.quality) {
        // 传入一组直播地址，初始化
        this.init()
      }
    },
    quality (val) {
      this.currentQualityIndex = val
    }
  },
  data () {
    return {
      player: null,
      hls: null,
      loading: true,
      currentQualityIndex: 0 // 当前播放地址
    }
  },
  mounted () {
    if (this.video.quality) {
      // 传入一组直播地址，初始化
      this.init()
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.destroy()
      this.hls.destroy()
    }
  },
  methods: {
    // 切换播放源
    switchVideo (index, player) {
      // 取设置好的播放源
      const quality = player.options.video.quality
      // 检查是否有可切换的播放源
      if (index >= quality.length) {
        index = 0
        this.currentQualityIndex = 0
      }
      // 重新加载新的播放源
      const hls = this.hls = new Hls()
      hls.loadSource(quality[index].url)
      hls.attachMedia(player)
      hls.on(Hls.Events.ERROR, (event, data) => {
        this.hlsHanlder(data, hls, player)
      })
    },
    // hls监听器
    hlsHanlder (data, hls, player) {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // 网络错误
            console.log('fatal network error encountered, try to recover')
            hls.destroy()
            this.switchVideo(++this.currentQualityIndex, player)
            // hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('fatal media error encountered, try to recover')
            hls.destroy()
            this.switchVideo(++this.currentQualityIndex, player)
            // hls.recoverMediaError()
            break
          default:
            // cannot recover
            hls.destroy()
            break
        }
      }
    },
    // 设置自定义播放类型
    setCustomType (video) {
      video.customType = {
        customHls: (video, player) => {
          const hls = new Hls()
          hls.loadSource(video.src)
          hls.attachMedia(video)
          hls.on(Hls.Events.ERROR, (event, data) => {
            this.hlsHanlder(data, hls, player)
          })
        }
      }
    },
    init () {
      this.video.customType = {
        customHls: (video, player) => {
          const hls = this.hls = new Hls()
          hls.loadSource(video.src)
          hls.attachMedia(video)
          hls.on(Hls.Events.ERROR, (event, data) => {
            this.hlsHanlder(data, hls, player)
          })
        }
      }
      const player = this.player = new DPlayer({
        container: this.$refs.wrap,
        autoplay: false,
        theme: '#FADFA3',
        loop: true,
        lang: 'zh-cn',
        screenshot: true,
        hotkey: true,
        preload: 'auto',
        logo: logo,
        volume: 0.7,
        mutex: true,
        video: this.video
      })
      // player.on('abort', () => { debugger })
      // player.on('canplay', () => { debugger })
      // player.on('canplaythrough', () => { debugger })
      // player.on('durationchange', () => { debugger })
      // player.on('emptied', () => { debugger })
      // player.on('ended', () => { debugger })
      // player.on('error', () => { debugger })
      // player.on('loadeddata', () => { debugger })
      // player.on('loadedmetadata', () => { debugger })
      // player.on('loadstart', () => { debugger })
      // player.on('mozaudioavailable', () => { debugger })
      // player.on('pause', () => { debugger })
      // player.on('play', () => { debugger })
      // player.on('playing', () => { debugger })
      // player.on('progress', () => { debugger })
      // player.on('ratechange', () => { debugger })
      // player.on('seeked', () => { debugger })
      // player.on('seeking', () => { debugger })
      // player.on('stalled', () => { debugger })
      // player.on('suspend', () => { debugger })
      // player.on('timeupdate', () => { debugger })
      // player.on('volumechange', () => { debugger })
      // player.on('waiting', () => { debugger })
      player.on('play', () => {
        this.$emit('play')
      })
      player.on('pause', () => {
        this.$emit('pause')
      })
      player.on('canplay', () => {
        this.$emit('canplay')
      })
      player.on('playing', () => {
        this.$emit('playing')
      })
      player.on('ended', () => {
        this.$emit('ended')
      })
      player.on('waiting', () => {
        // 播放中的加载等待过程
      })
      player.on('abort', () => {
      })
      player.on('emptied', () => {
      })
      player.on('error', () => {
        // const len = this.urlArray.length
        // const num = this.num++
        // if (num < len) {
        //   const curUrl = this.urlArray[num]
        //   this.player.switchVideo({
        //     url: curUrl
        //   })
        //   const hls = new Hls();
        //   hls.loadSource(curUrl);
        //   hls.attachMedia(this.player);
        //   console.log('value:', this.url)
        // }
        // this.$emit('error')
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

@media screen and (max-width: 1024px) {
  .base-video {
    width: 100%;
    height: 250px;
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
