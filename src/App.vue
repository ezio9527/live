<template>
  <div id="app" class="lang-cn" :class="{desktop: desktop, mobile: !desktop}">
    <keep-alive :include="['Home', 'Home2']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
// import eruda from 'eruda'
export default {
  data () {
    return {
      desktop: true
    }
  },
  mounted () {
    // eruda.init()
    this.desktop = document.body.clientWidth > 700
    window.onresize = () => {
      this.desktop = document.body.clientWidth > 700
    }
  }
}
</script>

<style lang="less">
#app {
}
</style>
