<template>
  <!--文字直播&重要事件-->
  <div class="foot-text">
    <ul class="nav">
      <li :class="{'cur':tliveTab}" @click="tliveTab = true">文字直播</li>
      <li :class="{'cur':!tliveTab}" @click="tliveTab = false">重要事件</li>
    </ul>
    <!--文字直播-->
    <ul class="live" v-if="tliveTab">
      <template v-if="txtLive && txtLive.length">
        <li v-for="(item,index) in txtLive" :key="index">
          <img src="@img/details/flag.png" />
          <div class="content">
            <p>{{item.data}}</p>
            <i v-if="item.position === 1" class="hColor"></i>
            <i v-if="item.position === 2" class="aColor"></i>
          </div>
        </li>
      </template>
      <p class="notData" v-else>暂无文字直播数据</p>
    </ul>
    <!--重要事件-->
    <ul class="live" v-else>
      <template v-if="impTxtLive && impTxtLive.length">
        <li v-for="(item,index) in impTxtLive" :key="index">
          <img src="@img/details/flag.png" />
          <div class="content">
            <p>{{item.data}}</p>
            <i v-if="item.position === 1" class="hColor"></i>
            <i v-if="item.position === 2" class="aColor"></i>
          </div>
        </li>
      </template>
      <p class="notData" v-else>暂无重要事件数据</p>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FootballStatistics',
  props: {
    txtLive: {
      type: Array,
      default: () => []
    },
    // 足球重要事件
    impTxtLive: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tliveTab: true // 足球文字直播切换栏
    }
  }
}
</script>

<style scoped lang="less">
  /*文字直播*/
  .foot-text {
    .nav {
      color: #333333;
      .px2vw(font-size, 30);
      width: 100%;
      text-align: center;
      li {
        position: relative;
        display: inline-block;
        .px2vw(padding-top, 30);
        .px2vw(padding-bottom, 30);
        .px2vw(margin-bottom, 17);
        &:first-child {
          .px2vw(margin-right, 140);
        }
        &.cur:before {
          content: "";
          .px2vw(width, 58);
          .px2vw(height, 8);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          border-radius: 10px;
          background: #0c9ce2;
          background: -webkit-linear-gradient(#19abf5, #68ff87);
          background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#19abf5),
            to(#68ff87)
          );
          background: linear-gradient(#19abf5, #68ff87);
        }
      }
    }
    .live {
      .px2vw(width, 700);
      margin: auto;
      li {
        .px2vw(margin-bottom, 10);
        img {
          .px2vw(width, 27);
          .px2vw(margin-right, 23);
          vertical-align: top;
          padding-top: 16px;
        }
        .content {
          display: inline-block;
          padding: 10px;
          .px2vw(width, 600);
          // .px2vw(height, 90);
          .px2vw(line-height, 46);
          .px2vw(padding-left, 25);
          .px2vw(padding-right, 25);
          .px2vw(font-size, 24);
          color: #333333;
          font-weight: 400;
          background: #ffffff;
          -webkit-box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          -moz-box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          box-shadow: 0px 5px 44px 0px rgba(0, 0, 0, 0.06);
          .px2vw(border-radius, 26);
        }
      }
    }
    .notData {
      text-align: center;
      padding: 20px 0;
      font-size: 14px;
      color: #666;
    }
  }
</style>
