<template>
  <div class="details">
    <!--播放器-->
    <template v-if="playing">
      <span class="header-back" @click="back">返回</span>
      <BaseVideoPlayer ref="player" :quality="channel" :video="video" v-if="playType===1"></BaseVideoPlayer>
      <iframe :src="animation" v-else></iframe>
    </template>
    <!--信息面板-->
    <BasePanel :matchDetails="matchDetails" v-else @play="play"></BasePanel>

    <!--tabs菜单-->
    <van-tabs v-model="tabActive" @change="tabsChanges" :class="{playing}" :swipeable="false">
      <van-tab title="直播">
        <!-- 足球 -->
        <template v-if="params.type === 1">
          <BaseListItem
            :match="matchDetails"
            v-if="playing"
            v-loading="detailsLoading"
            @play="play"
          ></BaseListItem>
          <FootballStatistics :match="matchDetails" :fStats="fStats" v-if="isSocket" />
          <FootballText
            :impTxtLive="impTxtLive"
            :txtLive="txtLive"
            v-if="txtLive &&txtLive.length"
          />
          <van-empty description="暂无直播信息" v-else></van-empty>
        </template>
        <!--篮球-->
        <template v-if="params.type === 2">
          <BaseListItem
            :match="matchDetails"
            v-if="playing"
            v-loading="detailsLoading"
            @play="play"
          ></BaseListItem>
          <BasketballStatistics
            :score="score"
            :bStats="bStats"
            :match="matchDetails"
            v-if="isSocket && bStats.length"
          />
          <BasketballText
            :btlive="btlive"
            :homeLogo="matchDetails.hteam_logo"
            :guestLogo="matchDetails.ateam_logo"
          />
        </template>
      </van-tab>
      <van-tab title="统计" v-if="matchData.hascount === 1 && matchDetails.type === 2">
        <!-- 足球 -->
        <template v-if="params.type === 1"></template>
        <!--篮球-->
        <template v-if="params.type === 2 && Object.keys(statisticsData).length">
          <BasketballPlayerChart :statisticsData="statisticsData"></BasketballPlayerChart>
          <BasketballTeam :match="matchDetails" :statisticsData="statisticsData"></BasketballTeam>
          <BasketballTeamChart :match="matchDetails" :statisticsData="statisticsData"></BasketballTeamChart>
        </template>
        <van-empty description="暂无统计信息" v-else></van-empty>
      </van-tab>
      <van-tab title="聊天">
        <slot name="chat">
          <van-empty description="暂无聊天信息"></van-empty>
        </slot>
      </van-tab>
      <van-tab title="数据">
        <slot name="data">
          <van-empty description="暂无数据信息"></van-empty>
        </slot>
      </van-tab>
      <van-tab title="会员">
        <slot name="vip">
          <van-empty description="暂无会员信息"></van-empty>
        </slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BasePanel from '@comp/BasePanel'
import BaseVideoPlayer from '@comp/BaseVideoPlayer'
import FootballStatistics from '@comp/Live/FootballStatistics'
import FootballText from '@comp/Live/FootballText'
import BasketballStatistics from '@comp/Live/BasketballStatistics'
import BasketballText from '@comp/Live/BasketballText'
import BaseListItem from '@comp/BaseListItem'
import BasketballPlayerChart from '@comp/Statistics/BasketballPlayerChart'
import BasketballTeam from '@comp/Statistics/BasketballTeam'
import BasketballTeamChart from '@comp/Statistics/BasketballTeamChart'
import { matchDetailApi, detailTabs } from '@/http/api'
import { Tab, Tabs, Empty, Toast } from 'vant'
import {
  sendSock,
  handleWebsocketClose
} from '@/utils/webSocket'
export default {
  name: 'Details',
  components: {
    BasePanel,
    BaseVideoPlayer,
    FootballStatistics,
    FootballText,
    BasketballStatistics,
    BasketballText,
    BaseListItem,
    BasketballPlayerChart,
    BasketballTeam,
    BasketballTeamChart,
    VanTab: Tab,
    VanTabs: Tabs,
    VanEmpty: Empty
  },
  props: {
    matchId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 页面参数
      params: {
        type: 1,
        playType: 1,
        channel: 0,
        id: 0
      },
      // 当前播放参数
      playing: false, // 当前播放状态
      playType: 1, // 当前播放类型
      channel: 0, // 当前播放源
      token: '',
      tabsToken: '',
      matchData: {},
      detailsLoading: false, // 比赛详情加载中
      matchDetails: {}, // 比赛详情信息
      statisticsData: {},
      timer: null,
      nux: 0,
      isSocket: false, // 当前是ws状态
      firstSend: true, // 当前是ws状态
      msgContent: {}, // 接收的内容
      score: [], // 比分集合
      // hScore: 0, // 主队比分
      // aScore: 0, // 客队比分
      fStats: [], // 足球技术统计
      txtLive: [], // 足球文字直播集合
      impTxtLive: [], // 足球重要事件
      btlive: [[], [], [], []], // 篮球文字直播
      bStats: [], // 篮球技术统计
      tabActive: 0 // 菜单
    }
  },
  computed: {
    // 视频播放地址
    video () {
      // 设置视频播放地址参数
      const video = {
        url: '',
        type: 'hls',
        defaultQuality: 0,
        quality: []
      }
      const quality = []
      const urls = this.matchDetails.live_urls || []
      urls.forEach((item, index) => {
        quality[index] = item
        quality[index].type = 'customHls'
      })
      video.quality = quality
      if (this.params.playType === 1) {
        video.defaultQuality = this.params.channel
      }
      return video
    },
    // 动画播放地址
    animation () {
      // 设置动画播放地址参数
      if (this.matchDetails.live_cartoon_url && this.matchDetails.live_cartoon_url.length > 0) {
        return this.matchDetails.live_cartoon_url[0].url
      } else {
        return ''
      }
    }
  },
  deactivated () { // 销毁断开
    if (this.timer) window.clearInterval(this.timer)
    this.timer = null
    handleWebsocketClose()
  },
  destroyed () {
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
    this.channel = routeParams.channel
    this.qryMatchDetails({ mid: routeParams.id, type: routeParams.type })
  },
  methods: {
    back () {
      this.playing = false
    },
    async tabsChanges (val) {
      const { id, type } = this.params
      const tabtype = val + 1
      const result = await detailTabs({ mid: id, type, tabtype })
      if (result && result.data.length) {
        console.log(123)
        console.log('🚀 ~ file: Index.vue ~ line 216 ~ tabsChanges ~ tabtype', tabtype)
        if (type === 2 && tabtype === 2) { // 篮球统计
          this.statisticsData = JSON.parse(result.data)
        }
        if (tabtype === 1 && this.firstSend) {
          console.log(222)
          this.extractData(JSON.parse(result.data), true)
          // 初始化连接
          this.tabsToken = result.token
          if (this.tabsToken && this.match.status === 0) {
            const { id, type } = this.params
            sendSock(id, type, this.tabsToken, this.getMsgResult)
            this.loopSendMsg()
          }
        }
        // else {
        //   this.extractData(JSON.parse(result.data), true)
        // }
      }
    },
    // 查询比赛详情
    qryMatchDetails (params = {}) {
      this.detailsLoading = true
      matchDetailApi(params).then(data => {
        this.token = data.token
        this.matchData = data
        this.matchDetails = data.matchinfo
        this.match = data.matchinfo
        this.tabsChanges(this.tabActive)
        // 处理一下比赛时间格式
        data.matchinfo.matchTime = new Date(data.matchinfo.matchtime.replace(/-/g, '/')).format('hh:mm')
        this.matchDetails.videoUrl = data.matchinfo.live_urls.map((item, index) => {
          return {
            disabled: item.status === 0,
            text: item.name,
            value: item.url
          }
        })
        this.matchDetails.animationUrl = data.matchinfo.live_cartoon_url.map((item, index) => {
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
    extractData (msg, isfirst) { // 提取数据
      this.firstSend = false
      this.isSocket = true
      this.msgContent = msg
      const score = (msg.score && msg.score.length) && msg.score
      this.score = score
      if (this.params.type === 1) { // 增量更新
        const hScore = score[2][0]
        const aScore = score[3][0]
        this.txtLive.forEach(e => (e.new = false))
        this.$set(this.matchDetails, 'score', `${hScore}-${aScore}`)
        const ftlive = msg.tlive && msg.tlive.length ? msg.tlive : []
        this.fStats = msg.stats && msg.stats.length ? msg.stats : []
        const newImpTxt = []
        ftlive.forEach(e => {
          e.new = !isfirst
          if (e.main) {
            newImpTxt.push(e)
          }
        })
        ftlive.length && this.txtLive.push(...ftlive)
        newImpTxt.length && this.impTxtLive.push(...newImpTxt)
      }
      if (this.params.type === 2) {
        const hScore = score[3].reduce((a, b) => (a + b))
        const aScore = score[4].reduce((a, b) => (a + b))
        this.btlive.forEach(e => {
          if (e.length) {
            e.forEach((q, ind) => {
              e[ind][11] = 'old'
            })
          }
        })
        this.$set(this.matchDetails, 'score', `${hScore}-${aScore}`)
        const tlive = msg.tlive && msg.tlive.length ? msg.tlive : []
        tlive.forEach((e, i) => {
          if (e.length) {
            e.forEach((q, ind) => {
              e[ind] = q.split('^')
              if (isfirst) {
                e[ind].push('old')
              } else {
                e[ind].push('new')
              }
            })
            this.btlive[i].push(...e)
          }
        })
        this.bStats = msg.stats && msg.stats.length ? msg.stats : []
      }
      // if (this.params.type === 1) {//覆盖更新
      //   const hScore = score[2][0]
      //   const aScore = score[3][0]
      //   this.$set(this.matchDetails, 'score', `${hScore}-${aScore}`)
      //   this.ftlive = (msg.tlive && msg.tlive.length) && msg.tlive.reverse()
      //   this.fStats = (msg.stats && msg.stats.length) && msg.stats
      //   const newImpTxt = []
      //   this.ftlive.forEach(e => {
      //     if (e.main) {
      //       newImpTxt.push(e)
      //     }
      //   })
      //   this.txtLive = this.ftlive
      //   this.impTxtLive = newImpTxt
      // }
      // if (this.params.type === 2) {
      //   const hScore = score[3].reduce((a, b) => (a + b))
      //   const aScore = score[4].reduce((a, b) => (a + b))
      //   this.$set(this.matchDetails, 'score', `${hScore}-${aScore}`)
      //   this.btlive = (msg.tlive && msg.tlive.length) && msg.tlive
      //   this.bStats = (msg.stats && msg.stats.length) && msg.stats
      // }
    },
    loopSendMsg () { // 定时拉消息
      if (this.timer) window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        const { id, type } = this.params
        sendSock(id, type, this.tabsToken, this.getMsgResult)
      }, 3000)
    },
    play (params) {
      // 选择视频播放或者动画播放
      if (this.$type(params) === 'number') {
        if (params === 1 && this.video.quality.length === 0) {
          Toast('暂无视频直播')
          return
        }
        if (params === 2 && !this.animation) {
          Toast('暂无动画直播')
          return
        }
        this.playing = true
        this.playType = params
      } else {
        // 选择指定视频源或动画源播放
      }
    }
  }
}
</script>

<style lang="less">
.details {
  height: 100%;
  background: #fcfcfc;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  /*返回*/
  .header-back {
    color: #ffffff;
    position: absolute;
    z-index: 1;
    .px2vw(right, 40);
    .px2vw(top, 40);
  }
  /*比赛信息*/
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
  // tabs菜单
  .van-tabs.van-tabs--line {
    .px2vw(margin-top, -82);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: center;
    flex: 1;
  }
  .van-tabs.van-tabs--line.playing {
    margin-top: 0;
    .van-tabs__nav.van-tabs__nav--line {
      background: url("../../assets/images/details/background.png") no-repeat;
    }
  }
  .van-tabs__content {
    flex: 1;
    overflow: hidden scroll;
  }
  .van-tabs--line .van-tabs__wrap {
    .px2vw(height, 82);
  }
  .van-tabs__nav.van-tabs__nav--line {
    background-color: rgba(0, 0, 0, 0.05);
    padding-bottom: 0;
  }
  .van-tab {
    .px2vw(font-size, 28);
    color: rgba(255, 255, 255, 0.6);
  }
  .van-tab.van-tab--active {
    .px2vw(font-size, 28);
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  .van-tabs__line {
    .px2vw(width, 46);
    .px2vw(height, 6);
    .px2vw(bottom, 12);
    background-color: #ffffff;
  }
  // tabs菜单
}
@media screen and (max-width: 1024px) {
  .details {
    .base-video {
      width: 100%;
      height: 250px;
    }
    iframe {
      width: 100%;
      height: 210px;
      border: none;
      background: #000;
    }
  }
}
</style>
