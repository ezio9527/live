<template>
  <div class="base-video" ref="wrap">
    <div class="loading" :class="{hidden: !loading}">
      <img src="@img/nav/football_unselected.png" v-if="ball===1">
      <img src="@img/nav/basketball_unselected.png" v-else>
      <span>视频加载中...</span>
    </div>
  </div>
</template>

<script>
import DPlayer from 'dplayer'
import logo from '@img/nav/logo.png'
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
    this.player = new DPlayer({
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
      video: {
        url: 'dplayer.mp4',
        pic: 'dplayer.png',
        thumbnails: logo,
        type: 'auto'
      }
    })
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

  @media screen and (max-width: 700px) {
    .base-video {
      width: 100%;
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
