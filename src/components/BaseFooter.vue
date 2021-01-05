<template>
  <footer class="base-footer">
    <div class="container">
      <div class="float-left">
        <span>APP下载 | 帮助 | 关于说球帝 | 官方微博 | 加入我们 | 广告投放</span>
        <span>Copyright © www.shuoqiudi.live, All Rights Reserved. 版权所有</span>
      </div>
      <div class="float-right">
        <span><img src="@img/footer/police.png">鲁ICP备20025623号-1</span>
        <span>鲁ICP备20025623号-1</span>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'BaseFooter',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
  .base-footer {
    position: relative;
    width: 100%;
    height: 90px;
    background: #282828;
    color: #999999;
    font-size: 12px;
    .container {
      position: relative;
      margin: auto;
      width: 1200px;
      height: 100%;
      .float-left, .float-right {
        height: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        line-height: 25px;
      }
      .float-right {
        img {
          width: 19px;
          height: 18px;
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .base-footer {
      display: none;
    }
  }
</style>
