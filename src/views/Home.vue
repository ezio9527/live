<template>
  <div class="home">
    <div class="headbar-desktop-default">
      <div class="inner">
        <div class="top-logo router-link-active"><img
          src="@img/logo-white-cn.png"></div>
        <div class="menu-list"><a href="/" class="menu-item active"><i
          class="icon icon-zhibo"></i><span class="title">说球帝直播</span></a><a
          href="/mine" class="menu-item"><i
          class="icon cubeic-person"></i><span
          class="title">我</span></a><a href="/download" class="menu-item"><i
          class="icon icon-xiazai2"></i><span class="title">APP下载</span></a></div>
        <div class="domains web-text"><span>备用域名</span><span
        >shuoqiudi.live</span></div>
      </div>
    </div>
    <div class="page-con">
      <header>
        <div class="header-box">
          <div class="header-top">
            <div class="logo"></div>
            <!--<div class="select-header language-select">-->
              <!--<button type="button" class="cube-btn">&lt;!&ndash;&ndash;&gt;简体<i class="cubeic-select"></i></button>-->
              <!--<div class="language-content">-->
                <!--<div class="cube-popup language-box cube-popup_mask" style="z-index: 100; display: none;">-->
                  <!--<div class="cube-popup-mask"></div>-->
                  <!--<div class="cube-popup-container cube-popup-center">-->
                    <!--<div class="cube-popup-content">-->
                      <!--<ul class="language-box-select">-->
                        <!--<li>简体</li>-->
                        <!--<li>繁體</li>-->
                        <!--<li>EN</li>-->
                        <!--<li>VI</li>-->
                      <!--</ul>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="select-header">-->
              <!--<button type="button" class="cube-btn">&lt;!&ndash;&ndash;&gt;筛选</button>-->
            <!--</div>-->
            <div class="navList">
              <a href="#" :class="{'router-link-exact-active': type===0, 'router-link-active': type===0, 'head_sel': type===0}" @click="filtrateCategory(0)">全部</a>
              <a href="#" :class="{'router-link-exact-active': type===1, 'router-link-active': type===1, 'head_sel': type===1}" @click="filtrateCategory(1)">足球</a>
              <a href="#" :class="{'router-link-exact-active': type===2, 'router-link-active': type===2, 'head_sel': type===2}" @click="filtrateCategory(2)">篮球</a>
            </div>
          </div>
          <div class="head-nav __vuescroll" :class="{close: !fold}">
            <div class="__panel __hidebar"
                 style="position: relative; box-sizing: border-box; height: 100%; overflow: hidden;">
              <div class="__view"
                   style="position: relative; box-sizing: border-box; min-width: 100%; min-height: 100%;">
                <ul class=" horizontal-scroll-list-wrap">
                  <li :class="{'head_sel': categoryId===0}"><a href="/" aria-current="page" @click="filtrateMatch(0)">所有</a></li>
                  <li :class="{'head_sel': categoryId===item.id}" :data-id="item.id" v-for="(item, index) in categoryFilterList" :key="index" @click="filtrateMatch(item.id, item.type)"><a href="#">{{item.name}}</a></li>
                </ul>
                <div
                  style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;">
                  <object type="text/html" tabindex="-1" data="about:blank"
                          style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"></object>
                </div>
              </div>
            </div>
          </div>
          <div class="fold">
            <img src="@img/icon-arrow-up.png" v-show="fold" @click="fold=!fold"/>
            <img src="@img/icon-arrow-down.png" v-show="!fold" @click="fold=!fold"/>
          </div>
        </div>
      </header>
      <div class="scroll-list-wrap-live">
        <div class="__vuescroll hBarVisible"
             style="height: 100%; width: 100%; padding: 0px; position: relative; overflow: hidden;">
          <div class="__panel __hidebar" ref="scrollWrap"
               style="position: relative; box-sizing: border-box; height: 100%; overflow: hidden scroll;overflow-scrolling: touch;-webkit-overflow-scrolling: touch;" @scroll="scrollHandle" @mousewheel="scrollHandle" @DOMMouseScroll="scrollHandle">
            <div class="__view"
                 style="position: relative; box-sizing: border-box; min-width: 100%; min-height: 100%;" ref="scrollContent">
              <div class="list-content-scroll">
                <div class="cube-slide banner-show">
                  <div class="cube-slide-group"
                       style="width: 1000px; transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-duration: 400ms; transform: translate(0px, 0px) scale(1) translateZ(0px);">
                    <div class="cube-slide-item" style="width: 1000px;"><img src="@img/app1-web-cn120.jpg">
                      <div class="code-img">
                        <!--<img src="@img/url.png">-->
                      </div>
                    </div>
                  </div>
                  <div class="cube-slide-dots"><span class="active"></span></div>
                </div>
                <div class="web-title">
                  <div class="web-title-teamtime">
                    <div class="web-title-group">赛事</div>
                    <div class="web-title-status"><span>时间</span><span
                     >状态</span></div>
                  </div>
                  <ul class="web-title-ifo">
                    <li>主队</li>
                    <li class="web-title-ifo-score">比分</li>
                    <li>客队</li>
                  </ul>
                  <div class="web-title-path">频道</div>
                </div>
                <div class="list-error" v-if="matchList.length === 0 && load"><div class="error"><div class="error-icon"><i class="cubeic-lock"></i></div><div class="error-title">数据加载中</div><!----></div></div>
                <div class="list-error" v-else-if="matchList.length === 0"><div class="error"><div class="error-icon"><i class="cubeic-warn"></i></div><div class="error-title">暂无相关赛事</div><!----></div></div>
                <!-- 列表 -->
                <div>
                  <template  v-for="(item, index) in matchFilterList">
                    <div class="tab-panel-li" v-if="typeof(item) === 'string'" :key="index"><div class="live-data">{{item}}</div></div>

                    <div class="tab-panel-li" v-else :key="index">
                      <div class="live-index"><!---->
                        <div class="listop-box">
                          <div class="team-group">
                            <div class="sport-icon" :class="{'sport-icon-1': parseInt(item.type)===1, 'sport-icon-2': parseInt(item.type)===2}"></div>
                            <h1 class="level-54 level-99">{{item.name}}</h1>
                          </div>
                          <p class="time changed"><b>{{item.matchTime}}</b><span>{{convert(item.status)}}<i></i></span></p>
                        </div>
                        <div class="teamIfo-box">
                          <div class="team-ifo">
                            <!--<div class="logo" :class="{logo_1: parseInt(item.type)===1,logo_2: parseInt(item.type)===2}">&lt;!&ndash;&ndash;&gt;</div>-->
                            <img class="logo" :src="item.hteam_logo" style="background: none;">
                            <h1 class="">{{item.hteam_name}}</h1>
                          </div>
                          <div class="team-score">
                            <span class="">{{item.score.split('-')[0]}}</span> - <span class="red">{{item.score.split('-')[1]}}</span>
                          </div>
                          <div class="team-ifo">
                            <!--<div class="logo" :class="{logo_1: item.type===1,logo_2: item.type===2}">&lt;!&ndash;&ndash;&gt;</div>-->
                            <img class="logo" :src="item.ateam_logo" style="background: none;">
                            <h1 class="red">{{item.ateam_name}}</h1>
                          </div>
                          <div class="live-path-box">
                            <div class="live-item pathColor_1" v-for="(i, k) in item.live_urls" :key="k">
                              <a @click="player(item, 1, k)" class=""><i class="iconfont icon-naozhong"></i><span>{{i.name}}</span></a>
                            </div>
                            <div class="live-item pathColor_1" v-if="item.live_cartoon_url.length > 0">
                              <a @click="player(item, 2)" class=""><i class="iconfont icon-naozhong"></i><span>动画直播</span></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="bottom-content"><hr><span>我是有底线的</span><hr></div>
                </div>
              </div>
              <div
                style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;">
                <object type="text/html" tabindex="-1" data="about:blank"
                        style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"></object>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="refresh" :class="{'refresh-animation': load}" @click="refresh"><i class="iconfont icon-shuaxin"></i></div>
      <!--<div class="cube-popup select-teamGroup cube-popup_mask" style="z-index: 100; display: none;"><div class="cube-popup-mask"></div><div class="cube-popup-container cube-popup-center"><div class="cube-popup-content"><div class="select-popoup"><div class="select-header-top"><div><i class="cubeic-back"></i>筛选</div><div class="lever-select" style="display: none;"></div><i class="cubeic-close"></i></div><div class="select-scroll-list-wrap"><div class="__vuescroll" style="height: 100%; width: 100%; padding: 0px; position: relative; overflow: hidden;"><div class="__panel __hidebar" style="position: relative; box-sizing: border-box; height: 100%; overflow: hidden;"><div class="__view" style="position: relative; box-sizing: border-box; min-width: 100%; min-height: 100%;"><div style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"><object type="text/html" tabindex="-1" data="about:blank" style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"></object></div></div></div></div></div></div></div></div></div>-->
      <div class="footbar no-login-footbar"><div class="footbar-inner"><div class="menu-list"><a href="/" class="menu-item router-link-active active"><i class="icon icon-zhibo"></i><!----><span class="title">说球帝直播</span></a><a href="/mine" class="menu-item"><i class="icon cubeic-person"></i><!----><span class="title">我</span></a><a href="/mine" class="menu-item"><i class="icon icon-xiazai2"></i><!----><span class="title">APP下载</span></a></div><div class="domains web-text"><span>备用域名</span><span>shuoqiudi.live</span></div></div></div>
    </div>
  </div>
</template>

<script>
import { categoryListApi, matchListApi } from '@/http/api'
export default {
  name: 'Home',
  data () {
    return {
      load: false, // 数据加载
      pageIndex: 1,
      pageSize: 10,
      type: 0, // 分类类型: 0全部;1足球;2篮球
      categoryId: 0, // 分类ID
      categoryList: [], // 分类列表
      matchList: [], // 比赛列表
      fold: false // 列表折叠状态
    }
  },
  computed: {
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
    },
    categoryFilterList () {
      if (this.type === 0) {
        return this.categoryList
      } else {
        return this.categoryList.filter(item => {
          return parseInt(item.type) === parseInt(this.type)
        })
      }
    }
  },
  created () {
    this.qryCategoryList()
    // 默认查全部分类，第一页的十条数据
    this.qryMatchList({ pn: 1, type: 0, ps: this.pageSize })
  },
  methods: {
    convert (status) {
      switch (status) {
        case 0:
          return '开赛中'
        case 1:
          return '未开赛'
        case 2:
          return '已结束'
        case 3:
          return '已推迟'
        case 4:
          return '未确定'
        case 5:
          return '已取消'
      }
    },
    // 查询分类列表
    qryCategoryList () {
      categoryListApi().then(data => {
        this.categoryList = data.twoCategoryList
      })
    },
    // 查询比赛列表
    qryMatchList (params = { ps: this.pageSize }) {
      if (this.load) {
        return
      }
      this.load = true
      if (params.pn === 1) {
        this.matchList = []
      }
      matchListApi(params).then(data => {
        this.matchList = this.matchList.concat(data.dataList)
      }).finally(() => {
        this.load = false
      })
    },
    // 选择分类
    filtrateCategory (type) {
      if (this.load) {
        return
      }
      this.type = type
      this.categoryId = 0
      this.pageIndex = 1
      this.qryMatchList({ pn: 1, type, ps: this.pageSize })
    },
    // 筛选比赛
    filtrateMatch (id, type) {
      if (this.load) {
        return
      }
      this.pageIndex = 1
      this.categoryId = id
      this.qryMatchList({ pn: 1, cid: id, type, ps: this.pageSize })
    },
    // 刷新
    refresh () {
      this.pageIndex = 1
      this.qryMatchList({ type: this.type, cid: this.categoryId, pn: 1, ps: this.pageSize })
    },
    // 滚动处理
    scrollHandle () {
      const viewH = this.$refs.scrollWrap.clientHeight // 可见高度
      const contentH = this.$refs.scrollContent.clientHeight // 内容高度
      const scrollTop = this.$refs.scrollWrap.scrollTop// 滚动高度
      // if(contentH = viewH + scrollTop) { //当滚动到底部时，
      //
      // }
      // if(contentH - viewH - scrollTop <= 100) { //当滚动到距离底部100px时,
      //
      // }
      if (scrollTop / (contentH - viewH) >= 0.95 && !this.load) {
        // 当滚动到距离底部5%时
        // 这里加载数据..
        this.qryMatchList({ type: this.type, cid: this.categoryId, pn: ++this.pageIndex, ps: this.pageSize })
      }
    },
    // 播放
    player (item, playType, channel) {
      this.$router.push({ name: 'Player', params: { type: item.type, playType, id: item.id, channel } })
    }
  }
}
</script>

<style scoped lang="less">
  .home {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    height: 100%;
    width: 100%;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .desktop .fold {
    display: none;
  }
  .head-nav.__vuescroll {
    height: 100%; width: 100%; padding: 0px; position: relative; overflow: hidden;
  }
  .mobile .head-nav.__vuescroll {
    height: 100%;
    -webkit-transition: height 300ms;
    -moz-transition: height 300ms;
    -ms-transition: height 300ms;
    -o-transition: height 300ms;
    transition: height 300ms;
  }
  .mobile .head-nav.__vuescroll.close {
    height: 30px;
  }
  .mobile .fold {
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .mobile .fold img{
    width: 20px;
  }
  .mobile header {
    line-height: normal;
  }
  .mobile header .head-nav {
    top: 0;
  }
  .desktop header {
    position: relative;
  }

  header .header-top {
    display: inline-block;
    width: 100%
  }

  .desktop header .header-box {
    max-width: 1000px;
    margin: 0 auto
  }

  .desktop header .logo {
    display: none
  }

  header .navList {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
  }

  .lang-vi header .navList {
    font-size: 12px
  }

  .lang-tw header .navList {
    font-size: 13px
  }

  .lang-en header .navList {
    font-size: 12px
  }

  header .navList a {
    float: left;
    padding: 0 5px;
    line-height: 44px;
    cursor: pointer;
  }
  .bottom-content {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    margin: 15px auto;
    width: 80%;
    max-width: 1000px;
  }
</style>
