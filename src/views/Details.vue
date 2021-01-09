<template>
  <div class="details">
    <BaseNavBar></BaseNavBar>
    <!--播放器部分-->
    <LivePlayer :matchDetails="matchDetails">
      <template #live>
        <template v-if="params.type === '1'">
          <FootballStatistics />
          <FootballText :impTxtLive="impTxtLive" :txtLive="txtLive" />
        </template>
        <!-- 足球******* -->
        <template v-if="params.type === '2'">
          <BasketballStatistics />
          <BasketballText />
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
import { matchDetailApi } from '@/http/api'
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
    BasketballText
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
        type: '',
        playType: '',
        channel: '',
        id: ''
      },
      token: '',
      loading: true,
      matchDetails: {},
      timer: null,
      isSocket: false, // 当前是ws状态
      msgContent: {}, // 接收的内容
      score: [], // 比分集合
      hScore: 0, // 主队比分
      aScore: 0, // 客队比分
      ftlive: [], // 足球文字直播集合
      txtLive: [], // 足球文字直播
      impTxtLive: [], // 足球重要事件
      // 播放器部分
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
  deactivated () { // 销毁断开
    handleWebsocketClose()
  },
  destroyed () {
    handleWebsocketClose()
  },
  created () {
    const routeParams = this.$route.params
    this.params = routeParams
    // this.qryMatch(Number(routeParams.id), Number(routeParams.type))
    // 播放器部分
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
        const video = {}
        const quality = []
        data.matchinfo.live_urls.forEach((item, index) => {
          quality[index] = item
          // quality[index].url = 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
          quality[index].type = 'customHls'
        })
        video.quality = quality
        if (this.playType === 1) {
          video.defaultQuality = this.channel
        } else {
          video.defaultQuality = 0
        }
        this.video = video
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
    getMsgResult (res) { // 接收
      let msg = res.data
      if (typeof msg === 'string') {
        msg = JSON.parse(msg)
      }
      if (msg && Object.keys(msg).length) {
        this.isSocket = true
        this.msgContent = msg
        if (this.params.type === '1') {
          // this.score = (msg.score && msg.score.length) && msg.score
          // this.hScore = this.score[2][0]
          // this.aScore = this.score[3][0]
          const score = (msg.score && msg.score.length) && msg.score
          const hScore = score[2][0]
          const aScore = score[3][0]
          this.$set(this.matchDetails, 'score', `${hScore}-${aScore}`)
          this.ftlive = (msg.tlive && msg.tlive.length) && msg.tlive.reverse()
          const newTxt = []
          const newImpTxt = []
          this.ftlive.forEach(e => {
            if (e.main) {
              newImpTxt.push(e)
            } else {
              newTxt.push(e)
            }
          })
          this.txtLive = newTxt
          this.impTxtLive = newImpTxt
        }
      }
    },
    loopSendMsg () { // 定时拉消息
      if (this.timer) window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        const { id, type } = this.params
        sendSock(id, type, this.token, this.getMsgResult)
      }, 10000)
    }
    // async qryMatch (mid, type) { // 请求详情数据
    //   const result = await matchDetailApi({ mid, type })
    //   if (result) {
    //     this.token = result.token
    //     this.matchDetails = result.matchinfo
    //     // 初始化连接
    //     if (this.token && result.matchinfo.status === 0) {
    //       const { id, type } = this.params
    //       sendSock(id, type, this.token, this.getMsgResult)
    //       this.loopSendMsg()
    //     }
    //   }
    //   // setTimeout(() => {
    //   //   this.matchDetails = {
    //   //     name: '英超  第15轮',
    //   //     matchTime: '12-24 21:00',
    //   //     hteam_name: '热刺',
    //   //     ateam_name: '曼城',
    //   //     score: '2 - 1',
    //   //     des: '加时 12',
    //   //     halfScore: '半场 0 - 0'
    //   //   }
    //   //   this.loading = false
    //   // }, 2000)
    // }
  }
}
</script>

<style scoped lang="less">
.details {
  min-height: 100%;
  background: #fcfcfc;
  /*播放器部分*/
  iframe {
    width: 100%;
    height: 210px;
    background: #000000;
  }
}
</style>
