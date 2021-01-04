<template>
  <div class="home2">
    <!--导航-->
    <BaseNavBar @categoryChange="categoryTypeChange"></BaseNavBar>
    <!--分类-->
    <BaseCategory :type="typeId" @categoryChange="categoryIdChange"></BaseCategory>
    <!--列表头-->
    <ul class="list-header">
      <li class="name">赛事</li><li class="time">时间</li><li class="status">状态</li><li class="home">主队</li><li class="score">比分</li><li class="guest">客队</li><li class="channel">频道</li>
    </ul>
    <!--固定日期栏-->
    <!--列表区域-->
    <BaseList :list="matchFilterList" :loading="listLoading" @load="load" @play="play"></BaseList>
    <!--底部Footer-->
    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
import BaseNavBar from '@comp/BaseNavBar'
import BaseCategory from '@comp/BaseCategory'
import BaseList from '@comp/BaseList'
import BaseFooter from '@comp/BaseFooter'
import { matchListApi } from '@/http/api'
export default {
  name: 'Home2',
  components: {
    BaseNavBar,
    BaseCategory,
    BaseList,
    BaseFooter
  },
  data () {
    return {
      typeId: 0, // 球分类ID
      categoryId: 0, // 球赛ID
      // 列表相关
      listLoading: false,
      pageSize: 20,
      pageIndex: 1,
      matchList: []
    }
  },
  computed: {
    // 处理后的列表
    matchFilterList () {
      let newList = []
      if (this.matchList.length > 0) {
        // 1.将数据按天分组
        const groupList = [[]]
        let lastTime = new Date(this.matchList[0].matchtime.replace(/-/g, '/')).format('yyyy年MM月dd日')
        this.matchList.forEach((item) => {
          const matchTimeStr = new Date(item.matchtime.replace(/-/g, '/')).format('yyyy年MM月dd日')
          if (lastTime !== matchTimeStr) {
            lastTime = matchTimeStr
            groupList[groupList.length] = []
          }
          groupList[groupList.length - 1].push(item)
          // 处理一下比赛时间格式
          item.matchTime = new Date(item.matchtime.replace(/-/g, '/')).format('hh:mm')
          // 处理一下比赛类型
          item.type = parseInt(item.type)
        })
        // 2.将分组数据加上时间头
        groupList.forEach(item => {
          const time = new Date(item[0].matchtime.replace(/-/g, '/'))
          // 加时间头
          newList.push(time.format('yyyy年MM月dd日') + ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][time.getDay()])
          // 加分组数据
          newList = newList.concat(item)
        })
      }
      return newList
    }
  },
  created () {
    // 默认查全部分类，第一页的十条数据
    this.qryMatchList({ pn: 0, type: 0, ps: this.pageSize })
  },
  methods: {
    // 切换球类
    categoryTypeChange (id) {
      this.typeId = id
      this.categoryId = 0
      this.pageIndex = 0
      this.qryMatchList({ type: this.typeId, cid: this.categoryId, pn: this.pageIndex, ps: this.pageSize })
    },
    // 切换比赛分类
    categoryIdChange (id) {
      this.categoryId = id
      this.pageIndex = 0
      this.qryMatchList({ type: this.typeId, cid: this.categoryId, pn: this.pageIndex, ps: this.pageSize })
    },
    // 列表的load事件
    load () {
      this.qryMatchList({ type: this.typeId, cid: this.categoryId, pn: ++this.pageIndex, ps: this.pageSize })
    },
    // 列表的play事件
    play (params) {
      this.$router.push({ name: 'Player2', params })
    },
    // 查询比赛列表
    qryMatchList (params = { ps: this.pageSize }) {
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      if (params.pn === 0) {
        this.matchList = []
      }
      matchListApi(params).then(data => {
        this.matchList = this.matchList.concat(data.dataList)
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home2 {
    font-size: 14px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    height: 100%;
    background: #f0f2f5;
    /*列表头*/
    .list-header {
      position: relative;
      font-size: 14px;
      background: #F7F7F7;
      width: 1200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin: 15px auto;
      border-radius: 10px;
      li {
        display: inline-block;
        color: #999999;
      }
      .name {width: 150px;}
      .time {width: 65px;}
      .status {width: 100px;}
      .home {width: 195px;}
      .score {width: 100px;}
      .guest {width: 195px;}
      .channel {width: 395px;}
    }
    /*列表体 */
    .base-list {
      flex: 1;
    }
  }
</style>
