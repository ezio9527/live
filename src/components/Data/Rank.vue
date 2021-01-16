<template>
  <div class="rank">
    <div class="title">积分排名</div>
    <div class="wrap">
      <!--主队-->
      <template>
        <div class="header-logo">
          <img src="@img/list/team_default_logo.png"/>
          <span>热刺</span>
        </div>
        <ul class="content">
          <li class="th"><div></div><div>赛</div><div>胜</div><div>平</div><div>负</div><div>进/失</div><div>积分</div><div>排名</div></li>
          <li v-for="item in [1,2,3,4,5,6]" :key="item">
            <div>总</div><div>6</div><div>6</div><div>6</div><div>6</div><div>6</div><div>22/16</div><div class="lose">6</div>
          </li>
        </ul>
        <div class="des">近10场交锋 4单6双 罗斯托夫火车头，胜率50%赢率20%大率40%</div>
      </template>
      <!--客队-->
      <template>
        <div class="header-logo guest">
          <img src="@img/list/team_default_logo.png"/>
          <span>热刺</span>
        </div>
        <ul class="content">
          <li class="th"><div></div><div>赛</div><div>胜</div><div>平</div><div>负</div><div>进/失</div><div>积分</div><div>排名</div></li>
          <li v-for="item in [1,2,3,4,5,6]" :key="item">
            <div>总</div><div>6</div><div>6</div><div>6</div><div>6</div><div>6</div><div>22/16</div><div class="lose">6</div>
          </li>
        </ul>
        <div class="des">近10场交锋 4单6双 罗斯托夫火车头，胜率50%赢率20%大率40%</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rank',
  data () {
    return {
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
      img {
        .px2vw(width, 38);
        .px2vw(height, 38);
        .px2vw(margin-left, 24);
        .px2vw(margin-right, 8);
      }
      /*客队和上面主队的距离*/
      &.guest {
        .px2vw(margin-top, 25);
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
      color: #666666;
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
