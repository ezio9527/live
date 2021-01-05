<template>
  <nav class="base-nav-bar">
    <div class="container">
      <!--logo-->
      <a href="/home">
        <img src="@img/nav/logo.png" class="logo">
      </a>
      <!--导航选项-->
      <ul  @mouseleave="hoverId=typeId">
        <li class="item" :class="{active: activeItem1}" @click="select(0)" @mouseenter="hoverId=0"><img src="@img/nav/all_selected.png" v-show="activeItem1"><img src="@img/nav/all_unselected.png" v-show="!activeItem1"><span>全部</span></li>
        <li class="item" :class="{active: activeItem2}" @click="select(1)" @mouseenter="hoverId=1"><img src="@img/nav/football_selected.png" v-show="activeItem2"><img src="@img/nav/football_unselected.png" v-show="!activeItem2"><span>足球</span></li>
        <li class="item" :class="{active: activeItem3}" @click="select(2)" @mouseenter="hoverId=2"><img src="@img/nav/basketball_selected.png" v-show="activeItem3"><img src="@img/nav/basketball_unselected.png" v-show="!activeItem3"><span>篮球</span></li>
        <li class="background"></li>
      </ul>
      <!--搜索-->
      <el-input class="search" placeholder="搜索球队或赛事" prefix-icon="el-icon-search" clearable v-model="searchKey"></el-input>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BaseNavBar',
  props: {
    clear: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hoverId: 0, // 鼠标指针位置
      typeId: 0, // 分类ID, 0:全部;1:足球;2:篮球;
      searchKey: '' // 搜索关键字
    }
  },
  watch: {
    clear (val) {
      if (!val) {
        this.searchKey = ''
      }
    },
    searchKey (val) {
      this.$emit('search', val)
    }
  },
  computed: {
    // 第一项被激活
    activeItem1 () {
      if (this.hoverId === this.typeId) {
        // 没有鼠标hover
        return this.typeId === 0
      } else {
        // 有鼠标hover
        return this.hoverId === 0
      }
    },
    // 第二项被激活
    activeItem2 () {
      if (this.hoverId === this.typeId) {
        // 没有鼠标hover
        return this.typeId === 1
      } else {
        // 有鼠标hover
        return this.hoverId === 1
      }
    },
    // 第三项被激活
    activeItem3 () {
      if (this.hoverId === this.typeId) {
        // 没有鼠标hover
        return this.typeId === 2
      } else {
        // 有鼠标hover
        return this.hoverId === 2
      }
    }
  },
  methods: {
    select (id) {
      this.typeId = id
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
  @media screen and (max-width: 700px) {
    .base-nav-bar {
      .px2vw(height, 140);
      /*内容区域*/
      .container {
        width: 100%;
        .px2vw(height, 140);
        line-height: normal;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        /*清理导航底部细线*/
        &:before {
          display: none;
        }
        /*logo*/
        .logo {
          .px2vw(width, 200);
        }
        /*导航选项*/
        ul {
          margin-left: 0;
          .px2vw(width, 428);
          .px2vw(height, 60);
          border: 1px solid #D7D7DA;
          border-radius: 100px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          .background {
            .px2vw(width, 140);
            .px2vw(height, 60);
            border-radius: 100px;
          }
          /*第一个元素*/
          .item.active + .item + .item + li.background {
            left: 0;
          }
          /*第二个元素*/
          .item.active + .item + li.background {
            .px2vw(left, 140) !important;
          }
          /*第三个元素*/
          .item.active + li.background {
            .px2vw(left, 280) !important;
          }
          li {
            .px2vw(width, 140);
            height: 100%;
            .px2vw(line-height, 60);
            img {
              .px2vw(width, 30);
              .px2vw(height, 30);
              /*vertical-align: middle;*/
            }
            span {
              /*vertical-align: middle;*/
            }
            &.active {
              color: #FFF;
            }
          }
        }
        /*搜索*/
        .search {
          display: none;
        }
      }
    }
  }
</style>
