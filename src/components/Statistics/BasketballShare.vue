<template>
  <van-overlay :show="show" @click="$emit('update:show', false)" class="basketball-share">
    <div class="wrapper" @click.stop>
      <div class="player">
        <img src="@img/list/team_default_logo.png" class="header-img"/>
        <div class="info">
          <span class="name">威尔·卡明斯</span>
          <span class="num">32号</span>
        </div>
      </div>
      <ul class="btn-group">
        <li>1</li><li>2</li><li>3</li><li>4</li><li class="active">全场</li>
      </ul>
      <ul class="data data-first">
        <li><span class="value">25</span><span class="name">时间</span></li>
        <li><span class="value">23</span><span class="name">得分</span></li>
        <li><span class="value">5</span><span class="name">篮板</span></li>
        <li><span class="value">65</span><span class="name">助攻</span></li>
        <li><span class="value">12</span><span class="name">抢断</span></li>
        <li><span class="value">99</span><span class="name">盖帽</span></li>
      </ul>
      <ul class="data data-second">
        <li><span class="value">5/11</span><span class="name">投篮</span></li>
        <li><span class="value">45.5%</span><span class="name">命中率</span></li>
        <li><span class="value">5/11</span><span class="name">两分球</span></li>
        <li><span class="value">5/11</span><span class="name">三分球</span></li>
        <li><span class="value">3/3</span><span class="name">罚球</span></li>
      </ul>
      <div class="share">
        <p>分享投篮分布点给好友</p>
        <div class="btn-group">
          <div class="item"><img src="@img/details/qq.png"/><span>QQ好友</span></div>
          <div class="item"><img src="@img/details/wechat.png"/><span>微信好友</span></div>
          <div class="item"><img src="@img/details/friends.png"/><span>朋友圈</span></div>
          <div class="item"><img src="@img/details/save.png"/><span>保存图片</span></div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { Overlay } from 'vant'
export default {
  name: 'BasketballShare',
  components: {
    VanOverlay: Overlay
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .basketball-share {
    position: relative;
    /*容器*/
    .wrapper {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #FFFFFF;
      -webkit-box-shadow: 0px 10px 88px 0px rgba(0, 0, 0, 0.06);
      -moz-box-shadow: 0px 10px 88px 0px rgba(0, 0, 0, 0.06);
      box-shadow: 0px 10px 88px 0px rgba(0, 0, 0, 0.06);
      .px2vw(border-top-left-radius, 26);
      .px2vw(border-top-right-radius, 26);
      .px2vw(padding-top, 57);
      /*顶部小横杠*/
      &:before {
        content: '';
        position: absolute;
        .px2vw(top, 24);
        left: 0;
        right: 0;
        margin: auto;
        .px2vw(width, 54);
        .px2vw(height, 8);
        border-radius: 100px;
        background: #D6D6D6;
      }
      /*球员信息*/
      .player {
        .px2vw(margin-bottom, 46);
        .header-img {
          border-radius: 100%;
          .px2vw(width, 70);
          .px2vw(height, 70);
          .px2vw(margin-left, 30);
          .px2vw(margin-right, 16);
        }
        .info {
          display: inline-block;
          vertical-align: middle;
          span {
            display: block;
          }
          .name {
            .px2vw(font-size, 28);
            .px2vw(line-height, 40);
            font-weight: 600;
            color: #000000;
          }
          .num {
            .px2vw(font-size, 22);
            .px2vw(line-height, 30);
            font-weight: 400;
            color: #999999;

          }
        }
      }
      /*按钮*/
      .btn-group {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          justify-content: center;
          align-items: center;
          .px2vw(width, 122);
          .px2vw(height, 53);
          .px2vw(margin-right, 20);
          .px2vw(border-radius, 10);
          border: 1px solid #D9D9D9;
          text-align: center;
          color: #666666;
          font-weight: 600;
          .px2vw(font-size, 24);
          &:last-child {
            margin-right: 0;
          }
          &.active {
            color: #27C5C3;
            border: none;
            background: rgba(25, 171, 245, 0.1);
            background: linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
            background: -webkit-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
            background: -moz-linear-gradient-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
            background: -ms-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
            background: -o-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
          }
        }
      }
      /*数据统计*/
      .data{
        position: relative;
        .px2vw(width, 690);
        margin: auto;
        li {
          display: inline-block;
          text-align: center;
          span {
            display: block;
            &.name {
              .px2vw(font-size, 24);
              .px2vw(line-height, 33);
              color: #999999;
            }
            &.value {
              .px2vw(font-size, 24);
              .px2vw(line-height, 33);
              color: #666666;
              .px2vw(margin-bottom, 6);
            }
          }
        }
      }
      /*第一行*/
      .data-first {
        .px2vw(padding-top, 40);
        .px2vw(padding-bottom, 30);
        &:before {
          content: '';
          position: absolute;
          height: 1px;
          left: 0;
          right: 0;
          bottom: 0;
          background: #979797;
          opacity: 0.2;
        }
        li {
          .px2vw(width, 115);
        }
      }
      /*第二行*/
      .data-second {
        .px2vw(padding-top, 30);
        .px2vw(padding-bottom, 40);
        li {
          .px2vw(width, 138);
        }
      }
      /*底部分享按钮*/
      .share {
        overflow: hidden;
        background: #F6F6F6;
        p {
          .px2vw(line-height, 33);
          .px2vw(font-size, 24);
          .px2vw(margin-top, 30);
          .px2vw(margin-bottom, 40);
          color: #999999;
          text-align: center;
        }
        .btn-group {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          justify-content: space-around;
          .px2vw(margin-bottom, 30);
          .item {
            .px2vw(width, 150);
            text-align: center;
            img {
              display: block;
              .px2vw(width, 80);
              .px2vw(height, 80);
              margin: auto;
              .px2vw(margin-bottom, 10);
            }
            span {
              .px2vw(font-size, 24);
              .px2vw(line-height, 33);
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
