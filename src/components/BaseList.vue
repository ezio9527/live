<template>
  <div class="base-list" ref="wrap" v-infinite-scroll="scrollHandle" infinite-scroll-distance="700" @scroll="record" @mousewheel="record" @DOMMouseScroll="record">
    <!--@scroll="scrollHandle" @mousewheel="scrollHandle" @DOMMouseScroll="scrollHandle"-->
    <!--PC样式-->
    <ul class="list-content" ref="content" v-if="getScreenIsPc">
      <li v-for="(match, index) in list" :key="index" :class="{'group-header': $type(match)==='string', underway: parseInt(match.status)===0}" @click="$emit('play', {type: match.type, playType: match.live_urls.length>0?1:2, channel: 0, id: match.id})">
        <template v-if="$type(match)==='object'">
          <BaseListItem :match="match"></BaseListItem>
        </template>
        <template v-else>
          {{match}}
        </template>
      </li>
      <li class="more" @click="$emit('load')">
        <span v-show="loading">数据加载中</span>
        <span v-show="!loading">点击加载更多</span>
      </li>
    </ul>
    <!--Mobile样式-->
    <ul class="list-content" ref="content" v-else>
      <li v-for="(match, index) in list" :key="index" :class="{'group-header': $type(match)==='string', underway: parseInt(match.status)===0}" @click="$emit('play', {type: match.type, playType: match.live_urls.length>0?1:2, channel: 0, id: match.id})">
        <template v-if="$type(match)==='object'">
          <BaseListItem :match="match"></BaseListItem>
        </template>
        <template v-else>
          {{match}}
        </template>
      </li>
      <li class="more" @click="$emit('load')">
        <span v-show="loading">数据加载中</span>
        <span v-show="!loading">点击加载更多</span>
      </li>
    </ul>
    <el-backtop target=".base-list" :bottom="100">
      <img src="@img/list/backtop.png"/>
    </el-backtop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseListItem from '@comp/BaseListItem'
export default {
  name: 'BaseList',
  components: { BaseListItem },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'getScreenIsPc',
      'getScreenIsMobile'
    ])
  },
  data () {
    return {
      scrollTop: 0
    }
  },
  activated () {
    this.$refs.wrap.scrollTop = this.scrollTop
  },
  methods: {
    // 记录滚动
    record () {
      // 失活之后拿不到高度了,记录滚动高度
      this.scrollTop = this.$refs.wrap.scrollTop
    },
    // 处理滚动
    scrollHandle () {
      this.$emit('load')
      // const viewH = this.$refs.wrap.clientHeight // 可见高度
      // const contentH = this.$refs.content.clientHeight // 内容高度
      // const scrollTop = this.$refs.wrap.scrollTop// 滚动高度
      // // 当滚动到底部时
      // if (contentH === viewH + scrollTop) {}
      // // 当滚动到距离底部100px时
      // if (contentH - viewH - scrollTop <= 100) {}
      // // 当滚动到距离底部5%时
      // if (scrollTop / (contentH - viewH) >= 0.95 && !this.load) {}
    }
  }
}
</script>

<style scoped lang="less">
  .base-list {
    overflow: hidden scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar-thumb {
      background: rgba(25, 171, 245, 0.6) !important;
      background: linear-gradient(135deg, rgba(25, 171, 245, 0.6), rgba(104, 255, 135, 0.6))!important;
      background: -webkit-linear-gradient(135deg, rgba(25, 171, 245, 0.6), rgba(104, 255, 135, 0.6))!important;
      background: -moz-linear-gradient-linear-gradient(135deg, rgba(25, 171, 245, 0.6), rgba(104, 255, 135, 0.6))!important;
      background: -ms-linear-gradient(135deg, rgba(25, 171, 245, 0.6), rgba(104, 255, 135, 0.6))!important;
      background: -o-linear-gradient(135deg, rgba(25, 171, 245, 0.6), rgba(104, 255, 135, 0.6))!important;
    }
    .list-content {
      flex: 1;
      li {
        position: relative;
        width: 1200px;
        height: 84px;
        margin: 15px auto;
        border-radius: 10px;
        background: #FFF;
        -webkit-box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
        -moz-box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
        -webkit-transition: all 200ms;
        -moz-transition: all 200ms;
        -ms-transition: all 200ms;
        -o-transition: all 200ms;
        transition: all 200ms;
      }
      // 单个列表项的一些特效
      li:hover {
        width: 1210px;
        height: 88px;
        -webkit-box-shadow: 4px 10px 10px 0px rgba(104, 255, 135, 0.2);
        -moz-box-shadow: 4px 10px 10px 0px rgba(104, 255, 135, 0.2);
        box-shadow: 4px 10px 10px 0px rgba(104, 255, 135, 0.2);
      }
      /*列表分组的日期头部*/
      li.group-header {
        position: relative;
        display: block;
        background: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        height: 20px;
        line-height: 20px;
        font-weight: 600;
        color: #333333;
        padding-left: 14px;
        cursor: default;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        &:before {
          content: '';
          position: absolute;
          width: 4px;
          height: 20px;
          left: 0;
          top: 0;
          background: #27C5C3;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
        }
        &:hover {
          width: 1200px;
          height: 20px;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }
      }
      /*底部加载更多*/
      li.more {
        display: block;
        width: 1200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #F7F7F7;
        border-radius: 10px;
        color: #999999;
        font-size: 12px;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        &:hover {
          cursor: pointer;
          width: 1200px;
          height: 40px;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .base-list {
      overflow: hidden scroll;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling: touch;
      font-size: 12px;
      .list-content {
        .px2vw(width, 700);
        margin: auto;
        li {
          position: relative;
          width: 100%;
          height: auto;
          .px2vw(margin-top, 10);
          .px2vw(margin-bottom, 10);
          border-radius: 10px;
          background: #FFF;
          -webkit-box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
          -moz-box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
          box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
          -webkit-transition: all 200ms;
          -moz-transition: all 200ms;
          -ms-transition: all 200ms;
          -o-transition: all 200ms;
          transition: all 200ms;
        }
        /*去掉特效*/
        li:hover {
          width: 100%;
          height: auto;
        }
        /*底部加载更多*/
        li.more {
          display: block;
          width: 100%;
          height: 36px;
          line-height: 36px;
          margin-top: 10px;
          text-align: center;
          background: #F7F7F7;
          border-radius: 10px;
          color: #999999;
          font-size: 14px;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          &:hover {
            cursor: pointer;
            width: 100%;
            height: 40px;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
          }
        }
      }
    }
  }

  @-webkit-keyframes loading {
    from {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(1turn);
      -moz-transform: rotate(1turn);
      -ms-transform: rotate(1turn);
      -o-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
  @keyframes loading {
    from {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(1turn);
      -moz-transform: rotate(1turn);
      -ms-transform: rotate(1turn);
      -o-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
</style>
