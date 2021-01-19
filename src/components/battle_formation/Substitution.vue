<template>
  <div class="substitution">
    <!--主队-->
    <div class="home">
      <div class="header">
        <van-image class="logo" lazy-load src="https://cdn.sportnanoapi.com/1.jpg" :error-icon="logo">
          <template #loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <span>热刺</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage, Lazyload, Loading as VanLoading } from 'vant'
import logo from '@img/list/team_default_logo.png'
Vue.use(Lazyload)
export default {
  name: 'Substitution',
  components: {
    VanImage,
    VanLoading
  }
}
</script>

<style scoped lang="less">
.substitution {
  // 阵容图
  .wrapper {
    height: 1000px;
    background: #27C5C3;
    .px2vw(border-radius, 6);
  }
}
</style>
