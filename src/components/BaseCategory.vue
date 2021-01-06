<template>
  <div class="base-category">
    <ul class="container" v-loading="categoryLoading">
      <li :class="{active: id===category.id}" @click="change(category.id)" v-for="(category, index) in categoryFilterList" :key="index">{{category.name}}</li>
    </ul>
  </div>
</template>

<script>

import { categoryListApi } from '@/http/api'
export default {
  name: 'BaseCategory',
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      id: 0, // 分类项ID, 0:全部;
      categoryLoading: false, // 分类接口等待
      categoryList: ['全部'] // 分类列表数据
    }
  },
  computed: {
    categoryFilterList () {
      if (this.type === 0) {
        return [{ id: 0, name: '全部' }].concat(this.categoryList)
      } else {
        return [{ id: 0, name: '全部' }].concat(this.categoryList.filter(item => {
          return parseInt(item.type) === this.type
        }))
      }
    }
  },
  created () {
    this.qryCategoryList()
  },
  methods: {
    // 查询分类列表
    qryCategoryList () {
      this.categoryLoading = true
      categoryListApi().then(data => {
        this.categoryList = data.twoCategoryList
      }).finally(() => {
        this.categoryLoading = false
      })
    },
    // 选中比赛分类
    change (id) {
      this.id = id
      this.$emit('categoryChange', id)
    }
  }
}
</script>

<style scoped lang="less">
  .base-category {
    position: relative;
    width: 100%;
    background: #FFFFFF;
    .container {
      position: relative;
      width: 1200px;
      min-height: 46px;
      margin: auto;
      padding-top: 12px;
      -webkit-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.04);
      -moz-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.04);
      box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.04);
      li {
        display: inline-block;
        padding: 0 15px;
        height: 34px;
        line-height: 34px;
        margin-bottom: 12px;
        text-align: center;
        cursor: pointer;
        color: #666666;
        border-radius: 4px;
        &:hover, &.active {
          color: #27C5C3;
          background: rgba(25, 171, 245, 0.1);
          background: linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
          background: -webkit-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
          background: -moz-linear-gradient-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
          background: -ms-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
          background: -o-linear-gradient(135deg, rgba(25, 171, 245, 0.1), rgba(104, 255, 135, 0.1));
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .base-category {
      overflow: scroll;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
      .container {
        width: 100%;
        padding-top: 0;
        white-space: nowrap;
        li {
          display: inline-block;
          .px2vw(padding-left, 30);
          .px2vw(padding-right, 30);
          height: 34px;
          margin-bottom: 0;
        }
      }
    }
  }
</style>
