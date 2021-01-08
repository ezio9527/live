<template>
  <div class="details">
    <BaseNavBar></BaseNavBar>
    <div class="header" v-loading="loading">
      <div class="title">
        <img class="back" src="@img/details/back.png" />
        <div>
          <span class="name">{{matchDetails.name}}</span>
          <span class="time">{{matchDetails.matchTime}}</span>
        </div>
        <img class="share" src="@img/details/share.png" />
      </div>
      <div class="content">
        <div class="home_team">
          <img class="team_logo" src="@img/list/team_default_logo.png" />
          <span class="team_name">{{matchDetails.hteam_name}}</span>
          <span class="team_des">英超第8</span>
        </div>
        <div class="info">
          <span class="des">{{matchDetails.des}}</span>
          <span class="score">{{matchDetails.score}}</span>
          <span class="half">{{matchDetails.halfScore}}</span>
          <div>
            <span class="btn">
              <img class="animation" src="@img/list/animation.png" />动画
            </span>
            <span class="btn">
              <img class="video" src="@img/list/video.png" />视频
            </span>
          </div>
        </div>
        <div class="guest_team">
          <img class="team_logo" src="@img/list/team_default_logo.png" />
          <span class="team_name">{{matchDetails.ateam_name}}</span>
          <span class="team_des">英超第8</span>
        </div>
      </div>
    </div>
    <!--播放器部分-->
    <!--播放器-->
    <BaseVideoPlayer ref="player" :quality="channel" :video="video" v-if="playType===1"></BaseVideoPlayer>
    <!--动画播放器-->
    <iframe :src="url" v-else></iframe>
    <div class="player-score" v-loading="detailsLoading">
      <div class="top">
        <div class="name">
          <img src="@img/home/football.png" v-if="match.type===1" />
          <img src="@img/home/basketball.png" v-else />
          <span>{{match.name}}</span>
        </div>
        <div class="time">{{match.matchTime}}</div>
        <div class="status">{{match.status | interpreter('MatchType')}}</div>
      </div>
      <div class="middle">
        <div class="home line-word-hidden">
          <span>{{match.hteam_name}}</span>
          <img :src="match.hteam_logo" />
        </div>
        <div class="score" v-if="isSocket">
          <span>{{hScore}}</span> -
          <span>{{aScore}}</span>
        </div>
        <div class="score" v-else>{{match.score}}</div>
        <div class="guest line-word-hidden">
          <img :src="match.ateam_logo" />
          <span>{{match.ateam_name}}</span>
        </div>
      </div>
      <div class="bottom">
        <!--<div-->
        <!--class="video"-->
        <!--:class="{disabled: video.status===0}"-->
        <!--v-for="(video, k) in match.live_urls"-->
        <!--:key="'video'+k"-->
        <!--@click="$emit('play', {type: match.type, playType: 1, channel: k, id: match.id})"-->
        <!--&gt;-->
        <!--<img class="able" src="@img/list/video.png" />-->
        <!--<img class="disabled" src="@img/list/video_disabled.png" />-->
        <!--<span>{{video.name}}</span>-->
        <!--</div>-->
        <div
          class="animation"
          :class="{disabled: match.status!==0}"
          v-for="(animation, k) in match.live_cartoon_url"
          :key="'animation'+k"
          @click="$emit('play', {type: match.type, playType: 2, channel: k, id: match.id})"
        >
          <img class="able" src="@img/list/animation.png" />
          <img class="disabled" src="@img/list/animation_disabled.png" />
          <span>{{animation.name}}</span>
        </div>
      </div>
    </div>
    <template v-if="params.type === '2'">
      <BaseLiveBasketBallText />
    </template>

    <!-- 足球******* -->
    <template v-if="params.type === '1'">
      <div class="statistics">
        <div class="title">
          <span class="float-left">热刺</span>
          <span class="float-right">曼城</span>
        </div>
        <div class="content">
          <div class="charts">
            <div class="item">
              <div class="top">进攻</div>
              <div class="bottom">
                <span>79</span>
                <van-circle
                  v-model="currentRate"
                  :rate="56"
                  layer-color="#E5E5E5"
                  color="#F6BD35"
                  stroke-width="120"
                />
                <span>79</span>
              </div>
            </div>
            <div class="item">
              <div class="top">进攻</div>
              <div class="bottom">
                <span>79</span>
                <van-circle
                  v-model="currentRate"
                  :rate="56"
                  layer-color="#E5E5E5"
                  color="#F6BD35"
                  stroke-width="120"
                />
                <span>79</span>
              </div>
            </div>
            <div class="item">
              <div class="top">进攻</div>
              <div class="bottom">
                <span>79</span>
                <van-circle
                  v-model="currentRate"
                  :rate="56"
                  layer-color="#E5E5E5"
                  color="#F6BD35"
                  stroke-width="120"
                />
                <span>79</span>
              </div>
            </div>
          </div>
          <div class="shoot">
            <span class="item">
              <img class="flag" src="@img/details/flag.png" />
            </span>
            <span class="item">
              <img class="red" src="@img/details/red.png" />
            </span>
            <span class="item">
              <img class="yellow" src="@img/details/yellow.png" />
            </span>
            <span class="item">5</span>
            <div class="progress">
              <span>射正球门</span>
              <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
              <span>&nbsp;</span>
            </div>
            <span class="item align-right">5</span>
            <span class="item align-right">
              <img class="yellow" src="@img/details/yellow.png" />
            </span>
            <span class="item align-right">
              <img class="red" src="@img/details/red.png" />
            </span>
            <span class="item align-right">
              <img class="flag" src="@img/details/flag.png" />
            </span>
          </div>
          <div class="shoot">
            <span class="item">5</span>
            <span class="item">12</span>
            <span class="item">5</span>
            <span class="item">5</span>
            <div class="progress">
              <span>射歪球门</span>
              <van-progress :percentage="50" :show-pivot="false" color="#F6BD35" />
              <span>&nbsp;</span>
            </div>
            <span class="item align-right">5</span>
            <span class="item align-right">5</span>
            <span class="item align-right">12</span>
            <span class="item align-right">5</span>
          </div>
        </div>
      </div>
      <!--文字直播&重要事件-->
      <div class="text">
        <ul class="nav">
          <li :class="{'cur':tliveTab}" @click="tliveTab = true">文字直播</li>
          <li :class="{'cur':!tliveTab}" @click="tliveTab = false">重要事件</li>
        </ul>
        <!--文字直播-->
        <ul class="live" v-if="tliveTab">
          <template v-if="txtLive && txtLive.length">
            <li v-for="(item,index) in txtLive" :key="index">
              <img src="@img/details/flag.png" />
              <div class="content">
                <p>{{item.data}}</p>
                <i v-if="item.position === 1" class="hColor"></i>
                <i v-if="item.position === 2" class="aColor"></i>
              </div>
            </li>
          </template>
          <p class="notData" v-else>暂无文字直播数据</p>
        </ul>
        <!--重要事件-->
        <ul class="live" v-else>
          <template v-if="impTxtLive && impTxtLive.length">
            <li v-for="(item,index) in impTxtLive" :key="index">
              <img src="@img/details/flag.png" />
              <div class="content">
                <p>{{item.data}}</p>
                <i v-if="item.position === 1" class="hColor"></i>
                <i v-if="item.position === 2" class="aColor"></i>
              </div>
            </li>
          </template>
          <p class="notData" v-else>暂无重要事件数据</p>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import BaseNavBar from '@comp/BaseNavBar'
import BaseVideoPlayer from '@comp/BaseVideoPlayer'
import BaseLiveBasketBallText from '@comp/Live/BaseLiveBasketBallText'
import { matchDetailApi } from '@/http/api'
import {
  sendSock,
  handleWebsocketClose
} from '@/utils/webSocket'
export default {
  name: 'Details',
  components: {
    BaseNavBar,
    BaseVideoPlayer,
    BaseLiveBasketBallText
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
      currentRate: 88,
      timer: null,
      isSocket: false, // 当前是ws状态
      msgContent: {}, // 接收的内容
      score: [], // 比分集合
      hScore: 0, // 主队比分
      aScore: 0, // 客队比分
      ftlive: [], // 足球文字直播集合
      txtLive: [], // 足球文字直播
      impTxtLive: [], // 足球重要事件
      tliveTab: true, // 足球文字直播切换栏
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
    let routeParams = this.$route.params
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
          this.score = (msg.score && msg.score.length) && msg.score
          this.hScore = this.score[2][0]
          this.aScore = this.score[3][0]
          this.ftlive = (msg.tlive && msg.tlive.length) && msg.tlive.reverse()
          let newTxt = []
          let newImpTxt = []
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
  // 头部比赛基础信息
  .header {
    width: 100%;
    .px2vw(height, 424);
    background: url("../assets/images/details/background.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      .px2vw(width, 640);
      .px2vw(height, 40);
      margin: auto;
      .px2vw(margin-top, 36);
      color: #ffffff;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        .px2vw(margin-right, 8);
        .px2vw(font-size, 24);
        font-weight: 400;
      }
      .back {
        .px2vw(width, 34);
        .px2vw(height, 28);
      }
      .share {
        .px2vw(width, 40);
        .px2vw(height, 40);
      }
    }
    /*球队比赛信息*/
    .content {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      .px2vw(margin-bottom, 120);
      .home_team,
      .guest_team,
      .info {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      /*主队，客队*/
      .home_team,
      .guest_team {
        justify-content: flex-end;
        .team_logo {
          .px2vw(width, 92);
          .px2vw(height, 92);
          border-radius: 100%;
        }
        .team_name {
          font-size: 16px;
          color: #ffffff;
        }
        .team_des {
          font-size: 12px;
          color: #d8d8d8;
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .info {
        .px2vw(margin-left, 60);
        .px2vw(margin-right, 60);
        color: #ffffff;
        .des {
          .px2vw(font-size, 24);
          font-weight: 400;
          .px2vw(padding-top, 6);
          .px2vw(padding-bottom, 6);
          .px2vw(padding-left, 12);
          .px2vw(padding-right, 12);
          .px2vw(border-radius, 6);
          background: #5f6574;
          background: rgba(255, 255, 255, 0.1);
        }
        .score {
          .px2vw(font-size, 45);
          font-weight: 600;
        }
        .half {
          .px2vw(font-size, 24);
          font-weight: 400;
          .px2vw(margin-bottom, 16);
        }
        .btn {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          flex-direction: column;
          align-items: center;
          display: inline-block;
          .px2vw(width, 105);
          .px2vw(height, 48);
          border-radius: 1000px;
          border: 1px solid #27c5c3;
          color: #27c5c3;
          text-align: center;
          img.animation {
            .px2vw(width, 24);
            .px2vw(height, 16);
            .px2vw(margin-right, 7);
          }
          img.video {
            .px2vw(width, 20);
            .px2vw(height, 20);
            .px2vw(margin-right, 7);
          }
        }
      }
    }
  }
  /*播放器部分*/
  iframe {
    width: 100%;
    height: 210px;
    background: #000000;
  }
  /*比赛详情*/
  .player-score {
    position: relative;
    width: 100%;
    height: auto;
    margin: 0;
    border-radius: 0;
    color: #666666;
    background: #fff;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-transition: all 200ms;
    -moz-transition: all 200ms;
    -ms-transition: all 200ms;
    -o-transition: all 200ms;
    transition: all 200ms;
    .top {
      position: relative;
      .px2vw(width, 640);
      .px2vw(height, 60);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name,
      .status {
        width: auto;
        flex: 1;
      }
      .name {
        color: #333333;
        text-align: left;
        img {
          .px2vw(width, 40);
          .px2vw(height, 40);
          margin-left: 0;
        }
      }
      .time {
        color: #333333;
        .px2vw(width, 100);
      }
      .status {
        color: #333333;
        text-align: right;
      }
      /*底部细线*/
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 1px;
        background: #979797;
        -webkit-transform: scaleY(0.5);
        -moz-transform: scaleY(0.5);
        -ms-transform: scaleY(0.5);
        -o-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
    .middle {
      .px2vw(width, 640);
      .px2vw(height, 90);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      .home {
        flex: 1;
        text-align: right;
        font-size: 12px;
        color: #000000;
        img {
          .px2vw(width, 38);
          .px2vw(height, 38);
          .px2vw(margin-left, 16);
        }
      }
      .score {
        font-size: 14px;
        color: #000000;
        .px2vw(width, 120);
        text-align: center;
      }
      .guest {
        flex: 1;
        text-align: left;
        font-size: 12px;
        color: #000000;
        img {
          .px2vw(width, 38);
          .px2vw(height, 38);
          .px2vw(margin-right, 16);
        }
      }
    }
    .bottom {
      .px2vw(width, 640);
      .px2vw(padding-bottom, 40);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      /*视频直播和动画直播图标*/
      .video,
      .animation {
        font-size: 12px;
        .px2vw(padding-left, 20);
        .px2vw(padding-right, 20);
        cursor: pointer;
        color: #27c5c3;
        -webkit-transition: all 100ms;
        -moz-transition: all 100ms;
        -ms-transition: all 100ms;
        -o-transition: all 100ms;
        transition: all 100ms;
        img {
          .px2vw(margin-right, 8);
        }
        &:hover {
          font-size: 12px;
        }
      }
      .video {
        img {
          .px2vw(width, 28);
          .px2vw(height, 32);
        }
        &:hover {
          img {
            .px2vw(width, 32);
            .px2vw(height, 36);
          }
        }
      }
      .animation {
        img {
          .px2vw(width, 36);
          .px2vw(height, 24);
        }
        &:hover {
          img {
            .px2vw(width, 40);
            .px2vw(height, 28);
          }
        }
      }
      /*不可用和可用状态下的样式*/
      .video,
      .animation {
        img.disabled {
          display: none;
        }
      }
      .video.disabled,
      .animation.disabled {
        color: #c9c9c9;
        img.able {
          display: none;
        }
        img.disabled {
          display: inline-block;
        }
      }
    }
  }
  /*统计*/
  .statistics {
    .title {
      color: #333333;
      margin: auto;
      .px2vw(margin-top, 28);
      .px2vw(margin-bottom, 28);
      .px2vw(width, 700);
      .px2vw(height, 22);
      .px2vw(line-height, 22);
      .float-left,
      .float-right {
        position: relative;
        .px2vw(padding-left, 15);
        &:before {
          content: "";
          position: absolute;
          background: #f6bd35;
          .px2vw(width, 5);
          .px2vw(height, 22);
          border-radius: 100%;
          left: 0;
        }
      }
      .float-right {
        .px2vw(padding-right, 15);
        &:before {
          left: auto;
          right: 0;
        }
      }
    }
    .content {
      margin: auto;
      .px2vw(width, 700);
      .px2vw(height, 344);
      background: #ffffff;
      -webkit-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.06);
      -moz-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.06);
      box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.06);
      border-radius: 26px;
      /*统计*/
      .charts {
        .item {
          display: inline-block;
          .px2vw(width, 233);
          text-align: center;
          .bottom {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            align-items: center;
            .van-circle {
              .px2vw(width, 76);
              .px2vw(height, 76);
              .px2vw(margin, 22);
            }
          }
        }
      }
      /*射门*/
      .shoot {
        .px2vw(margin-top, 8);
        .px2vw(margin-bottom, 8);
        display: flex;
        justify-content: center;
        align-items: center;
        .item {
          display: inline-block;
          .px2vw(width, 40);
          text-align: left;
          .flag,
          .red,
          .yellow {
            .px2vw(width, 27);
          }
          &.align-right {
            text-align: right;
          }
        }
        .progress {
          display: inline-block;
          .px2vw(width, 305);
          span {
            display: inline-block;
            width: 100%;
            font-size: 14px;
            color: #333333;
            text-align: center;
          }
        }
      }
    }
  }
  /*文字直播*/
  .text {
    .nav {
      color: #333333;
      .px2vw(font-size, 30);
      width: 100%;
      text-align: center;
      li {
        position: relative;
        display: inline-block;
        .px2vw(padding-top, 30);
        .px2vw(padding-bottom, 30);
        .px2vw(margin-bottom, 17);
        &:first-child {
          .px2vw(margin-right, 140);
        }
        &.cur:before {
          content: "";
          .px2vw(width, 58);
          .px2vw(height, 8);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          border-radius: 10px;
          background: #0c9ce2;
          background: -webkit-linear-gradient(#19abf5, #68ff87);
          background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#19abf5),
            to(#68ff87)
          );
          background: linear-gradient(#19abf5, #68ff87);
        }
      }
    }
    .live {
      .px2vw(width, 700);
      margin: auto;
      li {
        .px2vw(margin-bottom, 10);
        img {
          .px2vw(width, 27);
          .px2vw(margin-right, 23);
          vertical-align: top;
          padding-top: 16px;
        }
        .content {
          display: inline-block;
          padding: 10px;
          .px2vw(width, 600);
          // .px2vw(height, 90);
          .px2vw(line-height, 46);
          .px2vw(padding-left, 25);
          .px2vw(padding-right, 25);
          .px2vw(font-size, 24);
          color: #333333;
          font-weight: 400;
          background: #ffffff;
          -webkit-box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          -moz-box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          .px2vw(border-radius, 26);
        }
      }
    }
    .notData {
      text-align: center;
      padding: 20px 0;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
