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
    if (document.body.clientWidth > 700) {
      this.$store.commit('setScreenByPc')
    } else {
      this.$store.commit('setScreenByMobile')
    }
    this.desktop = document.body.clientWidth > 700
    window.onresize = () => {
      this.desktop = document.body.clientWidth > 700
      if (document.body.clientWidth > 700) {
        this.$store.commit('setScreenByPc')
      } else {
        this.$store.commit('setScreenByMobile')
      }
    }
  }
}
</script>

<style lang="less">
#app {
}
</style>
