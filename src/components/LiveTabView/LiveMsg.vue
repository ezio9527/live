<template>
  <div class="mainWrap">
    <van-tabs type="card" v-model="tabActive" color="#0C9CE2">
      <van-tab title="文字直播">
        <ul>
            <li v-for="(item,index) in liveData.tlive" :key="index">
              <div class="head"></div>
              <div class="content">{{item.data}}</div>
            </li>
          </ul>
      </van-tab>
      <van-tab title="重要事件"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
export default {
  name: 'LiveMsg',
  components: {
    VanTab: Tab,
    VanTabs: Tabs
  },
  props: {
  },
  data () {
    return {
      tabActive: 0,
      liveData: {
        id: 3402213,
        score: [
          3402213,
          4,
          [
            2,
            1,
            0,
            1,
            4,
            0,
            0
          ],
          [
            0,
            0,
            0,
            3,
            9,
            0,
            0
          ],
          1601022685,
          ''
        ],
        stats: [
          {
            type: 3,
            home: 1,
            away: 3
          }
        ],
        incidents: [
          {
            type: 1,
            position: 1,
            time: 36,
            second: 2178,
            home_score: 1,
            away_score: 0,
            player_id: 1108991,
            assist1_id: 961231,
            player_name: '高翔',
            assist1_name: '杨宇'
          },
          {
            type: 9,
            position: 2,
            time: 62,
            second: 3772,
            in_player_id: 62660,
            out_player_id: 62603,
            in_player_name: '刘洋',
            out_player_name: '郭皓'
          }
        ],
        tlive: [
          {
            time: '',
            type: 10,
            data: '随着主裁判一声哨响,上半场比赛开始',
            position: 0
          },
          {
            time: "2'",
            type: 3,
            data: "2' - 第1张黄牌，裁判出示了本场比赛的第一张黄牌，给了天津泰达",
            position: 2,
            main: 1
          }
        ]
      }
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.mainWrap{
  padding: 20px 10px;
}
</style>
