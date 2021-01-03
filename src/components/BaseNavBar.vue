<template>
  <nav class="base-nav-bar">
    <div class="container">
      <!--logo-->
      <a href="#">
        <img src="@img/nav/logo.png" class="logo">
      </a>
      <!--导航选项-->
      <ul  @mouseleave="hoverId=categoryId">
        <li class="item" :class="{active: hoverId === categoryId && categoryId===0}" @click="select(0)" @mouseenter="hoverId=0"><img src="@img/nav/icon_all.png"><span>全部</span></li>
        <li class="item" :class="{active: hoverId === categoryId && categoryId===1}" @click="select(1)" @mouseenter="hoverId=1"><img src="@img/nav/football_unselect.png"><span>足球</span></li>
        <li class="item" :class="{active: hoverId === categoryId && categoryId===2}" @click="select(2)" @mouseenter="hoverId=2"><img src="@img/nav/basketball_unselect.png"><span>篮球</span></li>
        <li class="background"></li>
      </ul>
      <!--搜索-->
      <el-input class="search" placeholder="搜索球队" prefix-icon="el-icon-search" clearable v-model="searchKey"></el-input>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BaseNavBar',
  data () {
    return {
      hoverId: 0, // 鼠标指针位置
      categoryId: 0, // 分类ID, 0:全部;1:足球;2:篮球;
      searchKey: '' // 搜索关键字
    }
  },
  methods: {
    select (id) {
      this.categoryId = id
      this.$emit('categoryChange', id)
    }
  }
}
</script>

<style scoped lang="less">
  .base-nav-bar {
    position: relative;
    width: 100%;
    height: 80px;
    background: #FFFFFF;
    /*内容区域*/
    .container {
      position: relative;
      width: 1200px;
      height: 80px;
      line-height: 80px;
      margin: auto;
      /*导航底部细线*/
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #979797;
        -webkit-transform: scaleY(0.5);
        -moz-transform: scaleY(0.5);
        -ms-transform: scaleY(0.5);
        -o-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      /*logo*/
      .logo {
        width: 169px;
        vertical-align: middle;
      }
      /*导航选项*/
      ul {
        position: relative;
        display: inline-block;
        margin-left: 30px;
        .background {
          position: absolute;
          width: 100px;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 0;
          background: #19ABF5;
          background: linear-gradient(135deg,#19ABF5, #68FF87);
          background: -webkit-linear-gradient(135deg, #19ABF5, #68FF87);
          background: -moz-linear-gradient-linear-gradient(135deg, #19ABF5, #68FF87);
          background: -ms-linear-gradient(135deg, #19ABF5, #68FF87);
          background: -o-linear-gradient(135deg, #19ABF5, #68FF87);
          -webkit-transition: left 200ms;
          -moz-transition: left 200ms;
          -ms-transition: left 200ms;
          -o-transition: left 200ms;
          transition: left 200ms;
        }
        /*第一个元素*/
        .item:hover + .item + .item + li.background {
          left: 0 !important;
        }
        .item.active + .item + .item + li.background {
          left: 0;
        }
        /*第二个元素*/
        .item:hover + .item + li.background {
          left: 100px !important;
        }
        .item.active + .item + li.background {
          left: 100px;
        }
        .item:hover + .item, .item:hover + .item + .item {
          color: #999999;
        }
        /*第三个元素*/
        .item:hover + li.background {
          left: 200px !important;
        }
        .item.active + li.background {
          left: 200px;
        }
        li {
          position: relative;
          z-index: 1;
          display: inline-block;
          width: 100px;
          height: 100%;
          cursor: pointer;
          text-align: center;
          color: #999999;
          -webkit-transition: color 200ms;
          -moz-transition: color 200ms;
          -ms-transition: color 200ms;
          -o-transition: color 200ms;
          transition: color 200ms;
          img {
            width: 12px;
            height: 12px;
            vertical-align: middle;
            margin-right: 4px;
          }
          span {
            vertical-align: middle;
          }
          &.active, &:hover {
            color: #FFF;
          }
        }
      }
      /*搜索*/
      .search {
        width: 270px;
        float: right;
      }
    }
  }
</style>
