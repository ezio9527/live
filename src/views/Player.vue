<template>
  <div class="player">
    <div class="headbar-desktop-default">
      <div class="inner">
        <div class="top-logo router-link-active"><img
          src="@img/logo-white-cn.png"></div>
        <div class="menu-list"><a href="/" class="menu-item active"><i
          class="icon icon-zhibo"></i><span class="title">说球帝直播</span></a><a
          href="/mine" class="menu-item"><i
          class="icon cubeic-person"></i><span
          class="title">我</span></a><a href="/download" class="menu-item"><i
          class="icon icon-xiazai2"></i><span class="title">APP下载</span></a></div>
        <div class="domains web-text"><span>备用域名</span><span
        >shuoqiudi.live</span></div>
      </div>
    </div>
    <div class="page-con player-open">
      <div class="header-top">
        <div class="go-back" @click="$router.push({name: 'Home'})"><i class="cubeic-back"></i></div>
        <div class="logo-top"></div>
      </div><!---->
      <div class="live-detailBox">
        <div class="my-video">
          <div v-if="playType==='1'" ref="videoWrap">
            <video id="video" data-setup='{}' class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" height="">
              <source id="source" type="application/x-mpegURL">
            </video>
          </div>
          <div v-else>
            <iframe :src="url"></iframe>
          </div>
        </div>
        <div class="live-con">
          <div class="live-box">
            <div class="live-path-kind">
              <div class="go-back-click" @click="$router.push({name: 'Home'})"><i class="cubeic-back"></i>返回</div>
              <div class="live-select-box">
                <div class="popover live-select-item live-popover">
                  <div aria-owns="popover-live-select-item live-popover" class="popover__face">
                    <BaseSelect :disabled="!details.animation" :text="details.animation?'动画直播':'暂无动画直播'" :options="details.animationUrl" @select="selectAnimationSource"></BaseSelect>
                  </div>
                </div>
                <div class="popover live-select-item live-popover">
                  <div aria-owns="popover-live-select-item live-popover" class="popover__face">
                    <BaseSelect :disabled="!details.video" :text="details.video?'視頻直播':'暂无視頻直播'" :options="details.videoUrl" @select="selectVideoSource"></BaseSelect>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-team-group">
            <div class="detail-team-top"><!---->
              <div class="listop-box">
                <div class="team-group">
                  <div class="sport-icon" :class="{'sport-icon-1': details.type==1, 'sport-icon-2': details.type==2}"></div>
                  <h1 class="detail-team-group-name">{{details.name}}</h1><span class="when-time">{{details.matchtime}}</span>
                </div>
                <p class="time"><span></span><!----></p></div>
            </div>
            <div class="detail-team-ifo-box">
              <div class="team-ifo">
                <div class="logo" :class="{logo_1: details.type==1,logo_2: details.type==2}"><!----></div>
                <h1 class="">{{details.ateam_name}}</h1><!----></div>
              <div class="team-score"><span>0</span> - <span>0</span></div>
              <div class="team-ifo right-ifo">
                <div class="logo" :class="{logo_1: details.type==1,logo_2: details.type==2}"><!----></div>
                <h1 class="">{{details.hteam_name}}</h1><!----></div>
            </div>
            <div class="half-score">
              <div class="score-item"></div>
              <div class="score-item"></div>
            </div>
            <div class="sub_line"></div>
          </div><!----><!----><p class="text-notice" style="display: none;"><span>以下数据/信息由程序采集第三方整合得出，仅供参考；<br
         ></span><span>本站不保证此数据/信息的准确性、可靠性等任何问题，亦不对使用此数据/信息造成的任何后果负责 。</span></p>
          <!----><!----></div>
        <div class="bottomHeight"></div>
      </div><!---->
      <!--<div>-->
        <!--<div class="refresh fix-video-btn fixLock"><span><i class="iconfont icon-zhibo-lock"></i></span></div>-->
      <!--</div>-->
      <div class="refresh"><i class="iconfont icon-shuaxin"></i></div><!---->
      <!---->
      <div class="footbar no-login-footbar">
        <div class="footbar-inner">
          <div class="menu-list"><a href="/" class="menu-item"><i
            class="icon icon-zhibo"></i><!----><span class="title">说球帝直播</span></a><a
            href="/mine" class="menu-item"><i class="icon cubeic-person"></i><!----><span
            class="title">我</span></a><a href="/download" class="menu-item"><i
            class="icon icon-xiazai2"></i><!----><span class="title">APP下載</span></a>
          </div>
          <div class="domains web-text"><span>備用域名</span><span
           >shuoqiudi.live</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { matchDetailApi } from '@/http/api'
import BaseSelect from '@comp/BaseSelect'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
export default {
  name: 'Player',
  components: {
    BaseSelect
  },
  data () {
    return {
      player: null,
      playType: '1',
      url: '',
      details: {}
    }
  },
  created () {
    const id = this.$route.params.id // 比赛ID
    const type = this.$route.params.type // 比赛类型
    this.playType = this.$route.params.playType // 播放类型：1视频直播2动画直播
    this.qryMatchDetails({ mid: id, type })
  },
  methods: {
    // 查询比赛详情
    qryMatchDetails (data = {}) {
      matchDetailApi(data).then(data => {
        this.details = data.matchinfo
        this.details.video = data.matchinfo.live_urls.length > 0
        this.details.animation = data.matchinfo.live_cartoon_url.length > 0
        this.details.videoUrl = data.matchinfo.live_urls.map((item, index) => {
          return {
            text: item.name,
            value: item.url
          }
        })
        this.details.animationUrl = data.matchinfo.live_cartoon_url.map((item, index) => {
          return {
            text: item.name,
            value: item.url
          }
        })
        // 根据当前播放类型选择播放地址
        if (this.playType === '1') {
          if (data.matchinfo.live_urls.length > 0) {
            this.url = data.matchinfo.live_urls[0].url
            this.selectVideoSource({
              value: this.url
            })
          }
        } else {
          if (data.matchinfo.live_cartoon_url.length > 0) {
            this.url = data.matchinfo.live_cartoon_url[0].url
          }
        }
      }).catch(() => {})
    },
    // 重选视频播放源
    selectVideoSource (item) {
      this.playType = '1'
      this.url = item.value
      setTimeout(() => {
        this.changeVideo()
      }, 2000)
    },
    // 重选动画播放源
    selectAnimationSource (item) {
      this.playType = '2'
      this.url = item.value
    },
    // 切换视频播放源
    changeVideo () {
      this.$refs.videoWrap.innerHTML = `
        <video id="video" data-setup='{}' class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto">
          <source id="source" src="${this.url}" type="application/x-mpegURL">
        </video>`
      // setTimeout(() => {
      //   this.player = videojs('video')
      //   this.player.pause()
      //   this.player.dispose()
      //   videojs('video', {
      //     bigPlayButton: true,
      //     textTrackDisplay: false,
      //     posterImage: false,
      //     errorDisplay: false
      //   }, function () {
      //     this.play()
      //   })
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
  .detail-team-group {
    margin: auto;
  }
  iframe {
    width: 1000px;
    height: 563px;
    margin-top: 100px;
  }
  @media screen and (max-width: 700px) {
    .player {
      height: 100%;
    }
    .my-video > div {
      height: 100%;
    }
    iframe {
      width: 100%;
      height: 100%;
      margin-top: 0;
    }
    .my-video {
      .video-js {
        height: 100% !important;
      }
    }
  }
</style>
