<template>
  <div>
    <van-tabs v-model="tabActive" title-active-color="#0C9CE2" color="#0C9CE2">
      <van-tab title="直播">
        <LiveMsg/>
      </van-tab>
      <van-tab title="阵容">
        <div class="tipsBox">{{txtTips}}</div>
      </van-tab>
      <van-tab title="情报">
        <div class="tipsBox">{{txtTips}}</div>
      </van-tab>
      <van-tab title="分析">
        <div class="tipsBox">{{txtTips}}</div>
      </van-tab>
      <van-tab title="赔率">
        <div class="tipsBox">{{txtTips}}</div>
      </van-tab>
      <van-tab title="聊天">
        <div class="tipsBox">{{txtTips}}</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import LiveMsg from './LiveMsg'
import { Tab, Tabs } from 'vant'
// 进入详情页建立连接
import { sendSock, handleWebsocketClose } from '@/utils/webSocket'
export default {
  name: 'LiveTabView',
  components: {
    LiveMsg,
    VanTab: Tab,
    VanTabs: Tabs
  },
  props: {
  },
  data () {
    return {
      tabActive: 0,
      txtTips: '开发小哥正在加班，内容建设中...'
    }
  },
  deactivated () { // 销毁断开
    handleWebsocketClose()
  },
  computed: {
  },
  created () {
    // 初始化
    sendSock('hi', this.getMsgResult)
  },
  methods: {
    getMsgResult (res) { // 接收
      if (typeof res.data === 'string') {
        console.log(JSON.parse(res.data))
      } else {
        console.log(res.data)
      }
    }
  }
}
</script>

<style scoped lang="less">
.tipsBox {
  padding: 40px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>
