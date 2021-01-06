<template>
  <div class="mainWrap">
    <van-tabs type="card" v-model="tabActive" color="#0C9CE2">
      <van-tab title="文字直播">
        {{globalMsgAll}}
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
export default {
  name: 'LiveMsg',
  inject: ['globalMsg', 'getGlobalMsg'],
  components: {
    VanTab: Tab,
    VanTabs: Tabs
  },
  props: {
  },
  computed: {
    globalMsgAll () {
      return this.getGlobalMsg()
    }
  },
  watch: {
    // 'globalMsgAll': function (val) {
    //   this.calcGlobalMsgAll(val)
    // }
  },
  data () {
    return {
      tabActive: 0,
      tliveData: []
    }
  },
  created () {
  },
  methods: {
    // calcGlobalMsgAll (list) { // 数据处理
    //   this.tliveData = this.tliveData.filter(e => (e.tlive && e.tlive.length))
    // }
  }
}
</script>

<style scoped lang="less">
.mainWrap {
  padding: 20px 10px;
}
</style>
