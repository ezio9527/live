<template>
  <div class="details">
    <BaseNavBar></BaseNavBar>
    <!--播放器部分-->
    <LivePlayer
      :matchDetails="matchDetails"
      :video="video"
      :animation="animation"
      @tabsChanges="tabsChanges"
      @play="play"
    >
      <template #live>
        <!-- 足球 -->
        <template v-if="params.type === 1">
          <BaseListItem :match="matchDetails" v-if="playing" v-loading="detailsLoading"></BaseListItem>
          <FootballStatistics :match="matchDetails" :fStats="fStats" v-if="isSocket" />
          <FootballText :impTxtLive="impTxtLive" :txtLive="txtLive" />
        </template>
        <!--篮球-->
        <template v-if="params.type === 2">
          <BaseListItem :match="matchDetails" v-if="playing" v-loading="detailsLoading"></BaseListItem>
          <BasketballStatistics
            :score="score"
            :bStats="bStats"
            :match="matchDetails"
            v-if="isSocket"
          />
          <BasketballText :btlive="btlive" />
        </template>
      </template>
    </LivePlayer>
  </div>
</template>

<script>
import BaseNavBar from '@comp/BaseNavBar'
import LivePlayer from '@comp/Live/LivePlayer'
import FootballStatistics from '@comp/Live/FootballStatistics'
import FootballText from '@comp/Live/FootballText'
import BasketballStatistics from '@comp/Live/BasketballStatistics'
import BasketballText from '@comp/Live/BasketballText'
import BaseListItem from '@comp/BaseListItem'
import { matchDetailApi, detailTabs } from '@/http/api'
import {
  sendSock,
  handleWebsocketClose
} from '@/utils/webSocket'
export default {
  name: 'Details',
  components: {
    BaseNavBar,
    LivePlayer,
    FootballStatistics,
    FootballText,
    BasketballStatistics,
    BasketballText,
    BaseListItem
  },
  props: {
    matchId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      params: {
        type: 1,
        playType: 1,
        channel: 0,
        id: 0
      },
      token: '',
      matchDetails: {},
      timer: null,
      isSocket: false, // 当前是ws状态
      msgContent: {}, // 接收的内容
      score: [], // 比分集合
      // hScore: 0, // 主队比分
      // aScore: 0, // 客队比分
      ftlive: [], // 足球文字直播集合
      fStats: [], // 足球技术统计
      txtLive: [], // 足球文字直播
      impTxtLive: [], // 足球重要事件
      btlive: [], // 篮球文字直播
      bStats: [], // 篮球技术统计
      // 播放器部分
      playing: false, // 当前播放状态
      // 视频播放参数
      video: {
        url: '',
        type: 'hls'
      },
      // 动画播放参数
      animation: '',
      detailsLoading: false, // 比赛详情加载中
      match: {
        live_urls: [],
        live_cartoon_url: []
      } // 比赛详情
    }
  },
  deactivated () { // 销毁断开
    console.log('deactivated')
    if (this.timer) window.clearInterval(this.timer)
    this.timer = null
    handleWebsocketClose()
  },
  destroyed () {
    console.log('destroyed')
    if (this.timer) window.clearInterval(this.timer)
    this.timer = null
    handleWebsocketClose()
  },
  created () {
    const routeParams = this.$route.params
    routeParams.type = parseInt(routeParams.type) // 比赛类型：1足球2篮球
    routeParams.playType = parseInt(routeParams.playType) // 播放类型：1视频直播2动画直播
    routeParams.channel = parseInt(routeParams.channel) // 视频播放信号
    routeParams.id = parseInt(routeParams.id) // 视频播放信号
    this.params = routeParams
    this.qryMatchDetails({ mid: routeParams.id, type: routeParams.type })
  },
  mounted () {

  },
  methods: {
    async tabsChanges (val) {
      const { id, type } = this.params
      const result = await detailTabs({ mid: id, type, tabtype: val + 1 })
      if (result && result.length) {
        this.extractData(JSON.parse(result))
      }
    },
    // 查询比赛详情
    qryMatchDetails (datas = {}) {
      this.detailsLoading = true
      matchDetailApi(datas).then(data => {
        this.token = data.token
        this.matchDetails = data.matchinfo
        // 初始化连接
        if (this.token && data.matchinfo.status === 0) {
          const { id, type } = this.params
          sendSock(id, type, this.token, this.getMsgResult)
          this.loopSendMsg()
        }
        // 设置视频播放地址参数
        const video = {}
        const quality = []
        data.matchinfo.live_urls.forEach((item, index) => {
          quality[index] = item
          // quality[index].url = 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
          quality[index].type = 'customHls'
        })
        video.quality = quality
        if (this.params.playType === 1) {
          video.defaultQuality = this.params.channel
        } else {
          video.defaultQuality = 0
        }
        this.video = video
        // 设置动画播放地址参数
        if (data.matchinfo.live_cartoon_url.length > 0) {
          this.animation = data.matchinfo.live_cartoon_url[this.params.channel].url
        }
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
        if (this.params.playType === 1) {
          if (data.matchinfo.live_urls.length > 0) {
            const url = data.matchinfo.live_urls[this.params.channel].url
            this.selectVideoSource({
              index: this.params.channel,
              value: url
            })
          }
        } else {
          if (data.matchinfo.live_cartoon_url.length > 0) {
            const url = data.matchinfo.live_cartoon_url[this.params.channel].url
            this.selectAnimationSource({
              index: this.params.channel,
              value: url
            })
          }
        }
      }).catch(() => { }).finally(() => {
        this.detailsLoading = false
      })
    },
    getMsgResult (res) { // 接收
      let msg = res.data
      if (typeof msg === 'string') {
        msg = JSON.parse(msg)
      }
      if (msg && Object.keys(msg).length) {
        this.extractData(msg)
      }
    },
    extractData (msg) { // 提取数据
      this.isSocket = true
      this.msgContent = msg
      const score = (msg.score && msg.score.length) && msg.score
      this.score = score
      if (this.params.type === 1) {
        const hScore = score[2][0]
        const aScore = score[3][0]
        this.$set(this.matchDetails, 'score', `${hScore}-${aScore}`)
        this.ftlive = (msg.tlive && msg.tlive.length) && msg.tlive.reverse()
        this.fStats = (msg.stats && msg.stats.length) && msg.stats
        const newImpTxt = []
        this.ftlive.forEach(e => {
          if (e.main) {
            newImpTxt.push(e)
          }
        })
        this.txtLive = this.ftlive
        this.impTxtLive = newImpTxt
      }
      if (this.params.type === 2) {
        const hScore = score[3].reduce((a, b) => (a + b))
        const aScore = score[4].reduce((a, b) => (a + b))
        this.$set(this.matchDetails, 'score', `${hScore}-${aScore}`)
        this.btlive = (msg.tlive && msg.tlive.length) && msg.tlive
        this.bStats = (msg.stats && msg.stats.length) && msg.stats
      }
    },
    loopSendMsg () { // 定时拉消息
      if (this.timer) window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        const { id, type } = this.params
        sendSock(id, type, this.token, this.getMsgResult)
      }, 10000)
    },
    play (type) {
      this.playType = type
      this.playing = true
    }
  }
}
</script>

<style scoped lang="less">
.details {
  min-height: 100%;
  background: #fcfcfc;
  .base-list-item {
    margin: auto;
    .px2vw(margin-top, 20);
    .px2vw(margin-bottom, 20);
    .px2vw(width, 700);
    .px2vw(min-height, 220);
    .px2vw(border-radius, 26);
    background: #ffffff;
    box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
  }
}
</style>
