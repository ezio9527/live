<template>
  <div>
    <BaseEventLine :events="testData"/>
  </div>
</template>

<script>
import BaseEventLine from '@comp/BaseEventLine'
export default {
  name: 'Test',
  components: {
    BaseEventLine
  },
  data () {
    return {
      // eventName事件名称:String类型;
      // eventType事件类型:home主队 guest客队 neutrality中立 end结束
      // eventData事件内容
      // eventIcon事件图标:Number类型，对应的图标在文件夹里，我乱标的序号
      // eventText事件文字内容
      testData: [
        {
          eventName: '36',
          eventType: 'home',
          eventData: [
            {
              eventIcon: 9,
              eventText: '科尔马奎因'
            },
            {
              eventIcon: 6,
              eventText: '科尔马奎因'
            }
          ]
        },
        {
          eventName: '36',
          eventType: 'home',
          eventData: [
            {
              eventIcon: 11,
              eventText: '科尔马奎因'
            }
          ]
        },
        {
          eventName: '36',
          eventType: 'guest',
          eventData: [
            {
              eventIcon: 5,
              eventText: '科尔马奎因'
            }
          ]
        },
        {
          eventName: '中场 1-1',
          eventType: 'neutrality',
          eventData: [
            {
              eventIcon: 1,
              eventText: '科尔马奎因'
            }
          ]
        },
        {
          eventName: '比赛结束',
          eventType: 'end'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
