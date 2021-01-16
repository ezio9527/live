<template>
  <div class="rank">
    <div class="title">胜分差</div>
    <div class="wrap">
      <div class="header">
        <div class="checkbox clear-fix">
          <van-checkbox v-model="checked" shape="square" checked-color="#27C5C3" class="float-left">同主客</van-checkbox>
          <van-checkbox v-model="checked" shape="square" checked-color="#27C5C3" class="float-left">同赛事</van-checkbox>
        </div>
        <div class="btn-group"><button :class="{active: active==='all'}" @click="active='all'">10场</button><button :class="{active: active==='half'}" @click="active='half'">20场</button></div>
      </div>
      <div class="header-logo">
        <div class="logo-wrap">
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <span>热刺</span>
        </div>
        <div class="logo-wrap">
          <span>热刺</span>
          <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
            <template #loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </div>
      <ul class="content">
        <li class="th"><div>主(18)</div><div>客(18)</div><div>总(12)</div><div>全场</div><div>主(18)</div><div>客(18)</div><div>总(12)</div></li>
        <li v-for="item in [1,2,3,4,5]" :key="item">
          <div>4</div><div>6</div><div>6</div><div>12-12</div><div>6</div><div>6</div><div class="lose">6</div>
        </li>
      </ul>
      <div class="des">PS：当前赛季的所有比赛</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Checkbox, Image as VanImage, Lazyload, Loading as VanLoading } from 'vant'
import logo from '@img/list/team_default_logo.png'
Vue.use(Lazyload)
export default {
  name: 'Rank',
  components: {
    VanCheckbox: Checkbox,
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
.rank {
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
      font-weight: 400;
      color: #333333;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo-wrap {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        .logo {
          .px2vw(width, 38);
          .px2vw(min-height, 38);
          .px2vw(font-size, 38);
          &:first-child {
            .px2vw(margin-left, 24);
            .px2vw(margin-right, 8);
          }
          &:last-child {
            .px2vw(margin-left, 8);
            .px2vw(margin-right, 24);
          }
        }
      }
      /*客队和上面主队的距离*/
      &.guest {
        .px2vw(margin-top, 25);
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
      .px2vw(margin-bottom, 25);
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
          .px2vw(width, 80);
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
          .px2vw(width, 80);
          text-align: center;
          display: inline-block;
        }
        &:nth-child(2n) {
          background: #f7f7f7;
        }
      }
    }
    .des {
      margin: auto;
      color: #999999;
      .px2vw(font-size, 24);
      .px2vw(width, 645);
      .px2vw(margin-top, 30);
    }
  }
}
</style>
<style lang="less">
  .rank {
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
