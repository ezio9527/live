<template>
  <div class="base-video">
    <video id="videoPlayer" class="video-js" data-setup='{"autoplay": "true", "liveui": "true", "controls": "true", "fluid": "true", "suppressNotSupportedError": ""}' poster="@img/nav/logo.png">
    <source id="source" src="https://play.k56t.cn/live/stream50778.m3u8" type="application/x-mpegURL">
    </video>
    <!--<video id="videoPlayer" class="video-js" poster="@img/nav/logo.png">-->
      <!--<source id="source" type="application/x-mpegURL">-->
    <!--</video>-->
    <!--<video id="videoPlayer" ref="videoPlayer" class="video-js"></video>-->
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-landscape-fullscreen'
import zhCN from 'video.js/dist/lang/zh-CN.json'
export default {
  name: 'BaseVideoPlayer',
  data () {
    return {
      setup: {
        autoplay: true,
        liveui: true,
        controls: true,
        fluid: true,
        suppressNotSupportedError: false,
        children: [
          'bigPlayButton',
          'controlBar'
        ],
        sources: [
          {
            src: 'https://play.k56t.cn/live/streamhd22158.m3u8',
            type: 'application/x-mpegURL'
          }
        ]
      }
    }
  },
  mounted () {
    // 设置语言
    videojs.addLanguage('zh-CN', zhCN)
    videojs('videoPlayer', this.setup, function onPlayerReady () {
      videojs.log('Your player is ready!')

      this.on('loadstart', function () {
        console.log('开始请求数据 ')
      })
      this.on('progress', function () {
        console.log('正在请求数据 ')
      })
      this.on('loadedmetadata', function () {
        console.log('获取资源长度完成 ')
      })
      this.on('canplaythrough', function () {
        console.log('视频源数据加载完成')
      })
      this.on('waiting', function () {
        console.log('等待数据')
      })
      this.on('play', function () {
        console.log('视频开始播放')
      })
      this.on('playing', function () {
        console.log('视频播放中')
      })
      this.on('pause', function () {
        console.log('视频暂停播放')
      })
      this.on('ended', function () {
        console.log('视频播放结束')
      })
      this.on('error', function () {
        console.log('加载错误')
      })
      this.on('seeking', function () {
        console.log('视频跳转中')
      })
      this.on('seeked', function () {
        console.log('视频跳转结束')
      })
      this.on('ratechange', function () {
        console.log('播放速率改变')
      })
      this.on('timeupdate', function () {
        console.log('播放时长改变')
      })
      this.on('volumechange', function () {
        console.log('音量改变')
      })
      this.on('stalled', function () {
        console.log('网速异常')
      })
    })
  }
}
</script>

<style scoped lang="less">
  .base-video {
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
  }
</style>
