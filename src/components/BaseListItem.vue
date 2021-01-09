<template>
  <div class="base-list-item">
    <!--PC样式-->
    <template v-if="getScreenIsPc">
      <div class="item name"><img src="@img/home/football.png" v-if="match.type===1"><img src="@img/home/basketball.png" v-else><span>{{match.name}}</span></div>
      <div class="item time">{{match.matchTime}}</div>
      <div class="item status">{{match.status | interpreter('MatchType')}}</div>
      <div class="item home"><img :src="match.hteam_logo" @error="errorImg"><span>{{match.hteam_name}}</span></div>
      <div class="item score">{{match.score}}</div>
      <div class="item guest"><img :src="match.ateam_logo" @error="errorImg"><span>{{match.ateam_name}}</span></div>
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
    <!--Mobile样式-->
    <template v-else>
      <div class="top">
        <div class="name"><img src="@img/home/football.png" v-if="match.type===1"><img src="@img/home/basketball.png" v-else><span>{{match.name}}</span></div>
        <div class="time">{{match.matchTime}}</div>
        <div class="status">{{match.status | interpreter('MatchType')}}</div>
      </div>
      <div class="middle">
        <div class="home line-word-hidden"><span>{{match.hteam_name}}</span><img :src="match.hteam_logo" @error="errorImg"></div>
        <div class="score">{{match.score}}</div>
        <div class="guest line-word-hidden"><img :src="match.ateam_logo" @error="errorImg"><span>{{match.ateam_name}}</span></div>
      </div>
      <div class="bottom">
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
        <!--啥信号都没有-->
        <div class="none" v-if="!match.live_urls || !match.live_cartoon_url || (match.live_urls.length === 0 && match.live_cartoon_url.length === 0)">
          <img src="@img/list/video_hd_disabled.png"/>
          <span>暂无更多信号</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from '@img/list/team_default_logo.png'
export default {
  name: 'BaseListItem',
  props: {
    match: {
      type: Object,
      default: () => {
        return {
          type: 0
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getScreenIsPc'
    ])
  },
  methods: {
    errorImg (event) {
      event.target.src = logo
    }
  }
}
</script>

<style scoped lang="less">
.base-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  color: #666666;
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
    color: #FB4B4B;
    img {
      width: 30px;
      height: 30px;
      margin-left: 30px;
      margin-right: 4px;
    }
  }
  .time {width: 65px; color: #27C5C3;}
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
  /*比赛中*/
  .underway {
    .name {
      color: #FB4B4B;
      img {
        -webkit-animation: loading 1300ms linear infinite;
        animation: loading 1300ms linear infinite;
      }
    }
    .status {color: #FB4B4B;}
  }
}
@media screen and (max-width: 700px) {
  .base-list-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    color: #666666;
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
      .name, .status {
        width: auto;
        flex: 1;
      }
      .name {
        color: #FB4B4B;
        text-align: left;
        img {
          .px2vw(width, 28);
          .px2vw(height, 28);
          margin-left: 0;
        }
      }
      .time {
        color: #27C5C3;
        font-size: 12px;
        .px2vw(width, 100);
      }
      .status {
        text-align: right;
      }
      /*底部细线*/
      &:before {
        content: '';
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
        opacity: 0.3;
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
        font-size: 14px;
        color: #000000;
        font-weight: 400;
        img {
          .px2vw(width, 38);
          .px2vw(height, 38);
          .px2vw(margin-left, 16);
        }
      }
      .score {
        font-size: 18px;
        font-weight: 600;
        color: #000000;
        .px2vw(width, 120);
        text-align: center;
      }
      .guest {
        flex: 1;
        text-align: left;
        font-size: 14px;
        color: #000000;
        font-weight: 400;
        img {
          .px2vw(width, 38);
          .px2vw(height, 38);
          .px2vw(margin-right, 16);
        }
      }
    }
    .bottom {
      .px2vw(width, 640);
      .px2vw(padding-bottom, 20);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      /*视频直播和动画直播图标*/
      .video, .animation {
        font-size: 14px;
        .px2vw(padding-left, 20);
        .px2vw(padding-right, 20);
        cursor: pointer;
        color: #27C5C3;
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
      .none {
        color: #C9C9C9;
        img {
          .px2vw(width, 32);
          .px2vw(height, 36);
          .px2vw(margin-right, 8);
        }
      }
    }
  }
}
</style>
