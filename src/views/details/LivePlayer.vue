<template>
  <div class="live-player">
    <!--播放器部分-->
    <template v-if="playing">
      <span class="header-back" @click="$router.push({name: 'Home'})">返回</span>
      <BaseVideoPlayer ref="player" :quality="channel" :video="video" v-if="playType===1"></BaseVideoPlayer>
      <iframe :src="animation" v-else></iframe>
    </template>
    <!--基础信息面板-->
    <!--菜单-->
    <van-tabs v-model="tabActive" @change="tabsChange" :class="{playing}" :swipeable="true">
      <van-tab title="直播">
        <slot name="live">
          <van-empty description="暂无直播信息"></van-empty>
        </slot>
      </van-tab>
      <van-tab title="统计" v-if="matchData.hascount === 1 && matchDetails.type === 2">
        <slot name="statistics">
          <van-empty description="暂无统计信息"></van-empty>
        </slot>
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
import { Tab, Tabs, Empty, Toast } from 'vant'
import BaseVideoPlayer from '@comp/BaseVideoPlayer'
import ClipboardJS from 'clipboard'
export default {
  name: 'LivePlayer',
  components: {
    VanTab: Tab,
    VanTabs: Tabs,
    VanEmpty: Empty,
    BaseVideoPlayer
  },
  props: {
    matchDetails: {
      type: Object,
      default: () => {
        return {
          name: '英超  第15轮',
          matchTime: '12-24 21:00',
          hteam_name: '热刺',
          ateam_name: '曼城',
          score: '2 - 1',
          des: '加时 12',
          halfScore: '半场 0 - 0'
        }
      }
    },
    matchData: {
      type: Object,
      default: () => { }
    },
    video: {
      type: Object,
      default: () => { }
    },
    animation: {
      type: String,
      default: ''
    }
  },
  watch: {
    matchData: {
      handler (newValue, oldValue) {
        this.matchData = newValue
      },
      deep: true
    }
  },
  data () {
    return {
      loading: false,
      playing: false,
      // 比赛详情
      playType: 1, // 播放类型: 1视频 2动画
      channel: 0, // 播放源index
      animationActive: -1,
      videoActive: -1
    }
  },
  created () {
    this.$emit('tabsChanges', this.tabActive)
    const clipboard = new ClipboardJS('.share', {
      target: () => {
        return this.$refs.share
      }
    })
    clipboard.on('success', e => {
      Toast('地址已复制')
    })
    clipboard.on('error', e => {
      Toast('地址复制失败')
    })
  },
  methods: {
    play (type) {
      this.playType = type
      this.playing = true
      this.$emit('play', type)
    }
  }
}
</script>

<style lang="less">
.live-player {
  height: 100%;
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
  /*播放器*/
  .base-video {
    .px2vw(height, 424);
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
}
@media screen and (max-width: 1024px) {
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
</style>
