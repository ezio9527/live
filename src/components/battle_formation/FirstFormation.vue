<template>
  <div class="first-formation">
    <div class="wrapper">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstFormation'
}
</script>

<style scoped lang="less">
.first-formation {
  // 阵容图
  .wrapper {
    height: 1000px;
    background: #27C5C3;
    .px2vw(border-radius, 6);
  }
}
</style>
