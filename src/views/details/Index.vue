<template>
  <div class="details">
    <!--播放器-->
    <template v-if="playing">
      <span class="header-back" @click="$router.push({name: 'Home'})">返回</span>
      <BaseVideoPlayer ref="player" :quality="channel" :video="video" v-if="playType===1"></BaseVideoPlayer>
      <iframe :src="animation" v-else></iframe>
    </template>
    <!--信息面板-->
    <BasePanel :matchDetails="matchDetails" v-else @play="play"></BasePanel>

    <!--tabs菜单-->
    <van-tabs v-model="tabActive" @change="tabsChanges" :class="{playing}" :swipeable="true">
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
            v-if="isSocket"
          />
          <BasketballText :btlive="btlive" />
        </template>
      </van-tab>
      <van-tab title="统计" v-if="matchData.hascount === 0 && matchDetails.type === 2">
        <!-- 足球 -->
        <template v-if="params.type === 1"></template>
        <!--篮球-->
        <template v-if="params.type === 2 && Object.keys(statisticsData).length">
          <BasketballPlayerChart :statisticsData="statisticsData"></BasketballPlayerChart>
          <BasketballTeam :statisticsData="statisticsData"></BasketballTeam>
          <BasketballTeamChart :statisticsData="statisticsData"></BasketballTeamChart>
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
      matchData: {},
      detailsLoading: false, // 比赛详情加载中
      matchDetails: {}, // 比赛详情信息
      statisticsData: {},
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
    this.tabsChanges(this.tabActive)
  },
  methods: {
    async tabsChanges (val) {
      const { id, type } = this.params
      const tabtype = val + 1
      let result = await detailTabs({ mid: id, type, tabtype })
      if (result) {
        if (type === 2 && tabtype === 2) { // 篮球统计
          result = {
            awayrank: '{"lanban":{"name_zh":"韩德君","lanban":14,"qiuyi":"55","name_zht":"Dejun Han","logo":"https://cdn.sportnanoapi.com/basketball/player/1dbf2ab2f3e5a2d6b32bc9f35bfbc658.jpg","zhugong":2,"defen":57,"playerid":12869,"name_en":"韓德君"},"zhugong":{"name_zh":"郭艾伦","lanban":6,"qiuyi":"13","name_zht":"Ailun Guo","logo":"https://cdn.sportnanoapi.com/basketball/player/b97a80d4c3287bb2be01a4a1248e98ee.jpg","zhugong":12,"defen":62,"playerid":13110,"name_en":"郭艾倫"},"defen":{"name_zh":"郭艾伦","lanban":6,"qiuyi":"13","name_zht":"Ailun Guo","logo":"https://cdn.sportnanoapi.com/basketball/player/b97a80d4c3287bb2be01a4a1248e98ee.jpg","zhugong":12,"defen":62,"playerid":13110,"name_en":"郭艾倫"}}',
            players: [
              [
                [
                  43673,
                  '阿斯基亚·图桑特·布克',
                  '',
                  'Askia Toussaint Booker',
                  'https://cdn.sportnanoapi.com/basketball/player/d881cc431df30c03705b5636c800b79c.png',
                  '31',
                  '27^7-17^2-7^4-4^0^0^3^7^0^0^4^1^0^20^1^1^0'
                ],
                [
                  13133,
                  '顾全',
                  '顧全',
                  'Quan Gu',
                  'https://cdn.sportnanoapi.com/basketball/player/31c07e11223c8bf366af843f09968a42.jpg',
                  '12',
                  '37^7-11^2-5^3-3^0^0^3^2^0^0^3^2^0^19^1^1^0'
                ],
                [
                  13381,
                  '贺希宁',
                  '賀希寧',
                  'Xining He',
                  'https://cdn.sportnanoapi.com/basketball/player/286d766f58309bff79f2d46c9f6513b7.jpg',
                  '3',
                  '36^6-15^3-6^1-1^0^0^6^4^1^0^2^1^0^16^1^1^0'
                ],
                [
                  13315,
                  '沈梓捷',
                  '沈梓捷',
                  'Zijie Shen',
                  'https://cdn.sportnanoapi.com/basketball/player/1939b5e420898b1ad3120c2203b2a93a.jpg',
                  '11',
                  '35^5-5^0-0^1-2^0^0^8^4^2^3^2^3^0^11^1^1^0'
                ],
                [
                  13396,
                  '卢艺文',
                  '盧藝文',
                  'Yiwen Lu',
                  'https://cdn.sportnanoapi.com/basketball/player/fef216bc6c695970be0e3ab8ec514b2c.jpg',
                  '9',
                  '22^4-7^2-4^0-0^0^0^1^3^0^0^2^1^0^10^1^1^0'
                ],
                [
                  13640,
                  '肯尼-伯顿',
                  '',
                  'Kenny Burton',
                  'https://cdn.sportnanoapi.com/basketball/player/052f0a4d2f5e0264fa74d9bab0f539b8.png',
                  '2',
                  '19^4-10^0-3^0-0^0^0^2^2^0^0^1^2^0^8^1^1^1'
                ],
                [
                  13241,
                  '杨林祎',
                  '楊林祎',
                  'Linyi Yang',
                  'https://cdn.sportnanoapi.com/basketball/player/faa5111029158c650f60589c365e32f8.jpg',
                  '6',
                  '13^3-8^2-5^0-0^0^0^1^1^0^0^2^2^0^8^1^1^1'
                ],
                [
                  14777,
                  '卢鹏羽',
                  '盧鵬羽',
                  'Pengyu Lu',
                  'https://cdn.sportnanoapi.com/basketball/player/586f03ae29ad189c91dd3da88c2c9429.jpg',
                  '2',
                  '14^2-4^1-1^1-2^0^0^2^2^2^0^0^4^0^6^1^1^1'
                ],
                [
                  13601,
                  '李想',
                  '李想',
                  'Xiang Li',
                  'https://cdn.sportnanoapi.com/basketball/player/36d63d6f068a94b929dbcc3d7c9095d5.jpg',
                  '16',
                  '8^1-3^0-1^0-0^0^0^4^0^2^0^0^1^0^2^1^1^1'
                ],
                [
                  13672,
                  '赵义明',
                  '趙義明',
                  'Yiming Zhao',
                  'https://cdn.sportnanoapi.com/basketball/player/169a2c6a97fe17bbe9c5f2e605a494d2.jpg',
                  '19',
                  '8^0-0^0-0^2-2^0^0^1^0^0^0^0^3^0^2^1^1^1'
                ],
                [
                  12976,
                  '买尔丹',
                  '買爾丹-吐爾遜',
                  'Erdan Mai',
                  'https://cdn.sportnanoapi.com/basketball/player/ea8364efbdab86cbd047857b6585058c.jpg',
                  '33',
                  '6^0-0^0-0^0-0^0^0^1^0^0^0^0^3^0^0^1^1^1'
                ],
                [
                  12801,
                  '于梁',
                  '于梁',
                  'Liang Yu',
                  'https://cdn.sportnanoapi.com/basketball/player/fdaf5655601aa2495ce3547f34a8eb26.png',
                  '35',
                  '6^0-1^0-1^0-0^0^0^0^0^1^1^0^0^0^0^1^1^1'
                ],
                [
                  47783,
                  '孟翔',
                  '孟翔',
                  'Xiang Meng',
                  'https://cdn.sportnanoapi.com/basketball/player/9bb43fa348138ad8d8c29cf878419ff4.jpg',
                  '18',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13602,
                  '容子峰',
                  '容子峰',
                  'Zifeng Rong',
                  'https://cdn.sportnanoapi.com/basketball/player/b054ece3f74a5a01d02325b0e45e8ec9.jpg',
                  '25',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13599,
                  '白昊天',
                  '白昊天',
                  'Haotian Bai',
                  'https://cdn.sportnanoapi.com/basketball/player/4ada090ec97163cd4c9adc22ccf5e76b.jpg',
                  '10',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13245,
                  '郭晓鹏',
                  '郭曉鵬',
                  'Xiaopeng Guo',
                  'https://cdn.sportnanoapi.com/basketball/player/665082f0222271ddd32be546a86b0878.jpg',
                  '1',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13317,
                  '刘春庆',
                  '',
                  'Chunqing Liu',
                  'https://cdn.sportnanoapi.com/basketball/player/4bb2428d40a2e1d66746ae4e1e9921c2.jpg',
                  '5',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13635,
                  '李柏润',
                  '李柏潤',
                  'Bairun Li',
                  'https://cdn.sportnanoapi.com/basketball/player/5d946599d65d5641249d10d0d447c47c.jpg',
                  '8',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13057,
                  '常亚松',
                  '常亞松',
                  'Yasong Chang',
                  'https://cdn.sportnanoapi.com/basketball/player/ef7b8de144585ebf40c0623b854b20c5.png',
                  '21',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13060,
                  '何忠勉',
                  '何忠勉',
                  'Zhongmian He',
                  'https://cdn.sportnanoapi.com/basketball/player/3f2d3b178aee0ed50d0b76a6ac601617.jpg',
                  '20',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13477,
                  '侯兴宇',
                  '',
                  'Xingyu Hou',
                  'https://cdn.sportnanoapi.com/basketball/player/0cdc2a7b91104dc4d8afd8d4db0fc562.png',
                  '15',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13673,
                  '陈柏石',
                  '陳柏石',
                  'Baishi Chen',
                  'https://cdn.sportnanoapi.com/basketball/player/1124391c6241e8d0f51fde38beba8ff0.jpg',
                  '27',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ]
              ],
              [
                [
                  13110,
                  '郭艾伦',
                  '郭艾倫',
                  'Ailun Guo',
                  'https://cdn.sportnanoapi.com/basketball/player/b97a80d4c3287bb2be01a4a1248e98ee.jpg',
                  '13',
                  '41^10-17^1-2^9-11^0^0^6^12^4^0^6^3^0^30^1^1^0'
                ],
                [
                  12869,
                  '韩德君',
                  '韓德君',
                  'Dejun Han',
                  'https://cdn.sportnanoapi.com/basketball/player/1dbf2ab2f3e5a2d6b32bc9f35bfbc658.jpg',
                  '55',
                  '31^13-13^0-0^4-5^0^0^14^2^3^0^0^2^0^30^1^1^0'
                ],
                [
                  11025,
                  'OJ·梅奥',
                  '',
                  'OJ·Mayo',
                  'https://cdn.sportnanoapi.com/basketball/player/d664c55f817721cfdb6871512dd73aa5.png',
                  '24',
                  '27^6-17^2-7^4-4^0^0^5^1^2^0^2^6^0^18^1^1^0'
                ],
                [
                  13240,
                  '赵继伟',
                  '趙繼偉',
                  'Jiwei Zhao',
                  'https://cdn.sportnanoapi.com/basketball/player/ab52ecbbb38af8fe3892143a02f40136.jpg',
                  '3',
                  '35^7-11^2-4^0-0^0^0^4^2^5^0^4^3^0^16^1^1^0'
                ],
                [
                  54846,
                  '张镇麟',
                  '',
                  'Zhenlin Zhang',
                  'https://cdn.sportnanoapi.com/basketball/player/53d327f3c5d6e5737d7b4bef82525d4a.jpg',
                  '7',
                  '20^1-5^0-2^0-0^0^0^0^0^0^0^1^0^0^2^1^1^0'
                ],
                [
                  54848,
                  '吴昌泽',
                  '',
                  'Changze Wu',
                  'https://cdn.sportnanoapi.com/basketball/player/7d1d72a41d68d0c15ecc3a5bb6dd8d5f.jpg',
                  '21',
                  '26^4-5^0-1^1-3^0^0^6^0^0^1^2^4^0^9^1^1^1'
                ],
                [
                  13116,
                  '刘志轩',
                  '劉志軒',
                  'Zhixuan Liu',
                  'https://cdn.sportnanoapi.com/basketball/player/ec045f32befef776cb065dc1b18e7424.jpg',
                  '11',
                  '23^2-5^2-4^0-0^0^0^2^3^0^0^0^2^0^6^1^1^1'
                ],
                [
                  13405,
                  '丛明晨',
                  '叢明晨',
                  'Mingchen Cong',
                  'https://cdn.sportnanoapi.com/basketball/player/e8782157afc853c7a5431a2452f9e330.jpg',
                  '10',
                  '14^0-4^0-3^3-3^0^0^0^0^0^0^1^1^0^3^1^1^1'
                ],
                [
                  13553,
                  '朱荣振',
                  '朱榮振',
                  'Rongzhen Zhu',
                  'https://cdn.sportnanoapi.com/basketball/player/9d3a67dc946249ee5b1ad8e1878961ad.jpg',
                  '35',
                  '15^1-3^0-0^0-0^0^0^3^0^0^0^0^2^0^2^1^1^1'
                ],
                [
                  54945,
                  '周俊成',
                  '',
                  'Juncheng Zhou',
                  'https://cdn.sportnanoapi.com/basketball/player/9eb423febfe66204ae44a5f38fdb3f7f.png',
                  '5',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  14776,
                  '王化东',
                  '王化東',
                  'Huadong Wang',
                  'https://cdn.sportnanoapi.com/basketball/player/1fd7d9ab4334815983bb73930bbc0ed3.jpg',
                  '32',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  54847,
                  '俞泽辰',
                  '',
                  'Zechen Yu',
                  'https://cdn.sportnanoapi.com/basketball/player/076743f4c5698c0bb9d13563a0839b62.png',
                  '27',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13542,
                  '孙锴祺',
                  '孫鍇祺',
                  'Kaiqi Sun',
                  'https://cdn.sportnanoapi.com/basketball/player/f1066ea15f8097e03e156b5e57978358.png',
                  '18',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13620,
                  '鄢手骐',
                  '鄢手騏',
                  'Shouqi Yan',
                  'https://cdn.sportnanoapi.com/basketball/player/d07a672a7c1a68e6d0178bb96fdc9d0f.png',
                  '36',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13576,
                  '张宗睿',
                  '',
                  'Zongrui Zhang',
                  'https://cdn.sportnanoapi.com/basketball/player/757bda5bcf02caaf6dd8ffcf5c44f276.jpg',
                  '19',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  14775,
                  '刘雁宇',
                  '劉雁宇',
                  'Yanyu Liu',
                  'https://cdn.sportnanoapi.com/basketball/player/8506fb5367944bc2288a96f5b1d7d98d.jpg',
                  '17',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ],
                [
                  13671,
                  '卢梓杰',
                  '盧梓傑',
                  'Zijie Lu',
                  'https://cdn.sportnanoapi.com/basketball/player/5ab0e05da18490bbf22ec8dbcf72aa5c.png',
                  '28',
                  '0^0-0^0-0^0-0^0^0^0^0^0^0^0^0^0^0^0^1^1'
                ]
              ],
              '0^39-81^12-33^12-14^0^0^32^25^8^4^16^23^0^102',
              '0^44-80^7-23^21-26^0^0^40^20^14^1^16^23^0^116'
            ],
            homerank: '{"lanban":{"name_zh":"沈梓捷","lanban":8,"qiuyi":"11","name_zht":"Zijie Shen","logo":"https://cdn.sportnanoapi.com/basketball/player/1939b5e420898b1ad3120c2203b2a93a.jpg","zhugong":4,"defen":45,"playerid":13315,"name_en":"沈梓捷"},"zhugong":{"name_zh":"阿斯基亚·图桑特·布克","lanban":3,"qiuyi":"31","name_zht":"Askia Toussaint Booker","logo":"https://cdn.sportnanoapi.com/basketball/player/d881cc431df30c03705b5636c800b79c.png","zhugong":7,"defen":43,"playerid":43673,"name_en":""},"defen":{"name_zh":"顾全","lanban":3,"qiuyi":"12","name_zht":"Quan Gu","logo":"https://cdn.sportnanoapi.com/basketball/player/31c07e11223c8bf366af843f09968a42.jpg","zhugong":2,"defen":53,"playerid":13133,"name_en":"顧全"}}'
          }
          if (typeof msg === 'string') {
            this.statisticsData = JSON.parse(result)
          } else {
            this.statisticsData = result
          }
        } else {
          this.extractData(JSON.parse(result))
        }
      }
    },
    // 查询比赛详情
    qryMatchDetails (params = {}) {
      this.detailsLoading = true
      matchDetailApi(params).then(data => {
        this.token = data.token
        this.matchData = data
        this.matchDetails = data.matchinfo
        // 初始化连接
        if (this.token && data.matchinfo.status === 0) {
          const { id, type } = this.params
          sendSock(id, type, this.token, this.getMsgResult)
          this.loopSendMsg()
        }
        this.match = data.matchinfo
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
