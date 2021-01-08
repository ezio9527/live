<template>
  <div class="details">
    <BaseNavBar></BaseNavBar>
    <div class="header">
      <div class="title">
        <img src="@img/details/back.png">
        <div><span></span></div>
        <img src="@img/details/back.png">
      </div>
    </div>
  </div>
</template>

<script>
import BaseNavBar from '@comp/BaseNavBar'
// import { } from '@/http/api'
export default {
  name: 'Details',
  components: {
    BaseNavBar
  },
  props: {
    matchId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: true,
      matchDetails: {}
    }
  },
  created () {
  },
  methods: {
    qryMatch (matchId) {
      setTimeout(() => {
        this.matchDetails = {

        }
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
  .details {
    // 头部比赛基础信息
    .header {
      width: 100%;
      .px2vw(height, 424);
      background: url("../assets/images/details/background.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
