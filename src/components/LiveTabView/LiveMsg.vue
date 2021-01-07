<template>
  <div class="mainWrap">
    <van-tabs type="card" v-model="tabActive" color="#0C9CE2">
      <van-tab title="文字直播">
        <div v-for="(liveItems,index) in tliveData.tlive" :key="index">
          <div v-for="(item,ind) in liveItems" :key="ind">
            <!-- <MsgContent :data-parse="dataParse(item)"></MsgContent> -->
            <div v-html="dataParse(item)"></div>
          </div>
        </div>
        <!-- <ul>
          <li v-for="(item,index) in liveData.tlive" :key="index">
            <div class="head"></div>
            <div class="content">{{item.data}}</div>
          </li>
        </ul>-->
      </van-tab>
      <van-tab title="重要事件"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
// import MsgContent from './MsgContent'
export default {
  name: 'LiveMsg',
  inject: ['globalMsg', 'getGlobalMsg'],
  components: {
    VanTab: Tab,
    VanTabs: Tabs
    // MsgContent
  },
  props: {
  },
  computed: {
    globalMsgAll () {
      return this.getGlobalMsg()
    }
  },
  watch: {
    'globalMsgAll': function (val) {
      this.calcGlobalMsgAll(val)
    }
  },
  data () {
    return {
      tabActive: 0,
      num: 0,
      tliveData: {}
    }
  },
  created () {
  },
  methods: {
    calcGlobalMsgAll (val) { // 数据处理
      this.tliveData = val
      console.log('🚀 ~ file: LiveMsg.vue ~ line 58 ~ calcGlobalMsgAll ~ this.tliveData', JSON.stringify(this.tliveData))
    },
    dataParse (item) {
      let Data = JSON.parse(JSON.stringify(item)).split('^')
      let html = `
        <div>
          <span>时间:${Data[1]}</span>
          <span>比分:${Data[4]}</span>
          <span>内容:${Data[5]}</span>
        </div>
      `
      return html
      // return (
      //   <div>
      //     <span>时间:{Data[1]}</span>
      //     <span>比分:{Data[4]}</span>
      //     <span>内容:{Data[5]}</span>
      //     <span>index:{nums}</span>
      //   </div>
      // )
    }
  }
}
</script>

<style scoped lang="less">
.mainWrap {
  padding: 20px 10px;
}
</style>
