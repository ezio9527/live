<template>
  <div class="base-list" ref="wrap" v-infinite-scroll="scrollHandle" @scroll="record" @mousewheel="record" @DOMMouseScroll="record">
    <!--@scroll="scrollHandle" @mousewheel="scrollHandle" @DOMMouseScroll="scrollHandle"-->
    <ul class="list-content" ref="content">
      <li v-for="(match, index) in list" :key="index" :class="{'group-header': $type(match)==='string'}">
        <template v-if="$type(match)==='object'">
          <div class="item name"><img src="@img/home/football.png" v-if="match.type===1"><img src="@img/home/basketball.png" v-else><span>{{match.name}}</span></div>
          <div class="item time">{{match.matchTime}}</div>
          <div class="item status">{{match.status | interpreter('MatchType')}}</div>
          <div class="item home"><img :src="match.hteam_logo"><span>{{match.hteam_name}}</span></div>
          <div class="item score">{{match.score}}</div>
          <div class="item guest"><img :src="match.ateam_logo"><span>{{match.ateam_name}}</span></div>
          <div class="item channel">
            <div class="video" :class="{disabled: video.status===0}" v-for="(video, k) in match.live_urls" :key="'video'+k" @click="$emit('play', {type: match.type, playType: 1, channel: k, id: match.id})">
              <img class="able" src="@img/list/video.png"/>
              <img class="disabled" src="@img/list/video_disabled.png"/>
              <span>{{video.name}}</span>
            </div>
            <div class="animation" :class="{disabled: match.status!==0}" v-for="(animation, k) in match.live_cartoon_url" :key="'animation'+k" @click="$emit('play', {type: match.type, playType: 2, channel: k, id: match.id})">
              <img class="able" src="@img/list/animation.png"/>
              <img class="disabled" src="@img/list/animation_disabled.png"/>
              <span>{{animation.name}}</span>
            </div>
          </div>
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
export default {
  name: 'BaseList',
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
    .list-content {
      flex: 1;
      li {
        position: relative;
        width: 1200px;
        height: 84px;
        margin: 15px auto;
        border-radius: 10px;
        color: #666666;
        background: #FFF;
        -webkit-box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
        -moz-box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 10px 44px 0px rgba(0, 0, 0, 0.08);
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-transition: all 200ms;
        -moz-transition: all 200ms;
        -ms-transition: all 200ms;
        -o-transition: all 200ms;
        transition: all 200ms;
        .item {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .name {
          width: 150px;
          img {
            width: 30px;
            height: 30px;
            margin-left: 30px;
            margin-right: 4px;
          }
        }
        .time {width: 65px;}
        .status {width: 100px;}
        .home, .guest {
          flex-direction: column;
          width: 195px;
          img {
            width: 38px;
            height: 38px;
          }
        }
        .score {width: 100px;}
        .channel {
          width: 395px;
          flex-wrap: wrap;
          justify-content: center;
          /*视频直播和动画直播图标*/
          .video, .animation {
            padding: 0 10px;
            cursor: pointer;
            color: #27C5C3;
            -webkit-transition: all 100ms;
            -moz-transition: all 100ms;
            -ms-transition: all 100ms;
            -o-transition: all 100ms;
            transition: all 100ms;
            img {
              margin-right: 4px;
            }
            &:hover {
              font-size: 16px;
            }
          }
          .video {
            img {
              width: 14px;
              height: 16px;
            }
            &:hover {
              img {
                width: 16px;
                height: 18px;
              }
            }
          }
          .animation {
            img {
              width: 18px;
              height: 12px;
            }
            &:hover {
              img {
                width: 20px;
                height: 14px;
              }
            }
          }
          /*不可用和可用状态下的样式*/
          .video, .animation {
            img.disabled {
              display: none;
            }
          }
          .video.disabled, .animation.disabled {
            color: #C9C9C9;
            img.able {
              display: none;
            }
            img.disabled {
              display: inline-block;
            }
          }
        }
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
</style>
