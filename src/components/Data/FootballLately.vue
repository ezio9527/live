<template>
  <div class="football-lately">
    <div class="title">近期战绩</div>
    <div class="wrap">
      <!--主队-->
      <template>
        <div class="header-logo">
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <span>热刺</span>
        </div>
        <div class="header">
          <div class="checkbox clear-fix">
            <van-checkbox v-model="checked" shape="square" checked-color="#27C5C3" class="float-left">同主客</van-checkbox>
            <van-checkbox v-model="checked" shape="square" checked-color="#27C5C3" class="float-left">同赛事</van-checkbox>
          </div>
          <div class="btn-group"><button :class="{active: active==='all'}" @click="active='all'">10场</button><button :class="{active: active==='half'}" @click="active='half'">20场</button></div>
        </div>
        <ul class="content">
          <li class="th"><div>日期/赛事</div><div>主队</div><div>比分</div><div>客队</div><div>盘路</div><div>进球</div><div>角球</div></li>
          <li v-for="item in [1,2,3,4,5,6]" :key="item">
            <div><span>2020/10/21</span><br/><span>NBA</span></div>
            <div>菲尼克斯太阳</div>
            <div><span class="win">106-110</span><br/><span>0-1</span></div>
            <div>罗斯托夫火车头</div>
            <div class="lose"><span>0.75</span><br/><span>输</span></div>
            <div class="lose"><span>0.75</span><br/><span>大</span></div>
            <div>12</div>
          </li>
        </ul>
        <div class="chart">
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="middle">
            <div class="win-num"><span>5胜</span><span>5胜</span></div>
            <van-progress
              :show-pivot="false"
              :percentage="50"
              stroke-width="8"
              color="#27C5C3"/>
            <div class="score"><span>场均96.7分</span><span>共10场</span><span>场均96.1分</span></div>
          </div>
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="des">近10场交锋 4单6双 罗斯托夫火车头，胜率50%赢率20%大率40%</div>
      </template>
      <!--客队-->
      <template>
        <div class="header-logo guest">
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <span>热刺</span>
        </div>
        <div class="header">
          <div class="checkbox clear-fix">
            <van-checkbox v-model="checked" shape="square" checked-color="#27C5C3" class="float-left">同主客</van-checkbox>
            <van-checkbox v-model="checked" shape="square" checked-color="#27C5C3" class="float-left">同赛事</van-checkbox>
          </div>
          <div class="btn-group"><button :class="{active: active==='all'}" @click="active='all'">10场</button><button :class="{active: active==='half'}" @click="active='half'">20场</button></div>
        </div>
        <ul class="content">
          <li class="th"><div>日期/赛事</div><div>主队</div><div>比分</div><div>客队</div><div>让分</div><div>总分</div></li>
          <li v-for="item in [1,2,3,4,5,6]" :key="item">
            <div><span>2020/10/21</span><br/><span>NBA</span></div>
            <div>菲尼克斯太阳</div>
            <div><span class="win">106-110</span><br/><span>0-1</span></div>
            <div>罗斯托夫火车头</div>
            <div class="lose"><span>0.75</span><br/><span>输</span></div>
            <div class="lose"><span>0.75</span><br/><span>大</span></div>
            <div>12</div>
          </li>
        </ul>
        <div class="chart">
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="middle">
            <div class="win-num"><span>5胜</span><span>5胜</span></div>
            <van-progress
              :show-pivot="false"
              :percentage="50"
              stroke-width="8"
              color="#27C5C3"/>
            <div class="score"><span>场均96.7分</span><span>共10场</span><span>场均96.1分</span></div>
          </div>
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="des">近10场交锋 4单6双 罗斯托夫火车头，胜率50%赢率20%大率40%</div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Checkbox, Progress, Image as VanImage, Lazyload, Loading as VanLoading } from 'vant'
import logo from '@img/list/team_default_logo.png'
Vue.use(Lazyload)
export default {
  name: 'Lately',
  components: {
    VanCheckbox: Checkbox,
    VanProgress: Progress,
    VanImage,
    VanLoading
  },
  data () {
    return {
      logo,
      checked: true,
      active: 'all'
    }
  }
}
</script>

<style scoped lang="less">
  .football-lately {
    position: relative;
    margin: auto;
    .px2vw(margin-top, 25);
    .px2vw(margin-bottom, 25);
    .px2vw(width, 700);
    /*标题*/
    .title {
      .px2vw(margin-bottom, 25);
      .px2vw(line-height, 42);
      .px2vw(font-size, 30);
      font-weight: 600;
      color: #333333;
    }
    /*主体*/
    .wrap {
      background: #FFFFFF;
      box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
      .px2vw(border-radius, 26);
      .px2vw(padding-top, 26);
      .px2vw(padding-bottom, 30);
      .win {
        color: #DA4155;
      }
      .lose {
        color: #73D9D8;
      }
      /*表头的logo*/
      .header-logo {
        .px2vw(margin-bottom, 32);
        font-weight: 400;
        color: #333333;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .logo {
          .px2vw(width, 38);
          .px2vw(min-height, 38);
          .px2vw(font-size, 38);
          .px2vw(margin-left, 24);
          .px2vw(margin-right, 8);
          * {
            font-size: 1em;
          }
        }
        /*客队和上面主队的距离*/
        &.guest {
          .px2vw(margin-top, 40);
        }
      }
      /*表头*/
      .header {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .px2vw(height, 45);
        .px2vw(padding-left, 25);
        .px2vw(padding-right, 25);
        /*复选框*/
        .checkbox {
          .float-left {
            .px2vw(margin-right, 20);
          }
        }
        .btn-group {
          button {
            .px2vw(width, 78);
            .px2vw(height, 45);
            .px2vw(font-size, 22);
            border: none;
            background: rgba(205, 205, 205, 0.2);
            color: #999999;
            &.active {
              color: #FFFFFF;
              background: #27C5C3;
            }
            &:first-child {
              border-top-left-radius: 99px;
              border-bottom-left-radius: 99px;
            }
            &:last-child {
              border-top-right-radius: 99px;
              border-bottom-right-radius: 99px;
            }
          }
        }
      }
      /*表格*/
      .content {
        .th {
          color: #999999;
          .px2vw(font-size, 24);
          .px2vw(line-height, 33);
          .px2vw(padding-top, 40);
          .px2vw(padding-bottom, 32);
          div {
            text-align: center;
          }
        }
        li {
          color: #333333;
          .px2vw(font-size, 24);
          .px2vw(line-height, 33);
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          justify-content: space-between;
          .px2vw(padding-left, 30);
          .px2vw(padding-right, 30);
          .px2vw(padding-top, 20);
          .px2vw(padding-bottom, 16);
          div {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
          }
          div:nth-child(1) {
            .px2vw(width, 119);
          }
          div:nth-child(2) {
            text-align: right;
            .px2vw(width, 72);
          }
          div:nth-child(3) {
            .px2vw(width, 87);
            color: #999999;
          }
          div:nth-child(4) {
            .px2vw(width, 72);
          }
          div:nth-child(5) {
            .px2vw(width, 52);
          }
          div:nth-child(6) {
            .px2vw(width, 52);
          }
          div:nth-child(7) {
            .px2vw(width, 52);
          }
          &:nth-child(2n) {
            background: #f7f7f7;
          }
        }
      }
      /*图表*/
      .chart {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .px2vw(padding-left, 40);
        .px2vw(padding-right, 40);
        .logo {
          .px2vw(width, 56);
          .px2vw(min-height, 56);
          .px2vw(font-size, 56);
          div, i {
            font-size: 1em !important;
          }
        }
        .middle {
          .px2vw(width, 450);
          div {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            justify-content: space-between;
          }
          /*胜场*/
          .win-num {
            font-weight: 600;
            color: #333333;
            .px2vw(font-size, 24);
            .px2vw(line-height, 33);
          }
          .van-progress {
            .px2vw(margin-top, 6);
            .px2vw(margin-bottom, 6);
          }
          /*比分*/
          .score {
            span {
              color: #666666;
              display: inline-block;
              .px2vw(width, 150);
              .px2vw(font-size, 22);
              .px2vw(line-height, 30);
              &:nth-child(1) {
                text-align: left;
              }
              &:nth-child(2) {
                text-align: center;
              }
              &:nth-child(3) {
                text-align: right;
              }
            }
          }
        }
      }
      .des {
        margin: auto;
        color: #666666;
        .px2vw(font-size, 24);
        .px2vw(width, 645);
        .px2vw(margin-top, 30);
      }
    }
  }
</style>
<style lang="less">
  .football-lately {
    /*主体*/
    .wrap {
      .van-image {
        * {
          font-size: 1em !important;
        }
      }
      /*表头*/
      .header {
        .van-checkbox {
          .px2vw(font-size, 22);
          .van-checkbox__icon {
            font-size: 1em;
            .van-icon {
              border: none;
              background: rgba(205, 205, 205, 0.2);
              .px2vw(border-radius, 6);
            }
          }
          .van-checkbox__label {
            .px2vw(margin-left, 8) !important;
            color: #999999;
          }
        }
      }
    }
  }
</style>
