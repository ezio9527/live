<template>
  <div class="base-eventline">
    <div class="end"><img src="@img/minIcon/timer.png"/></div>
    <ul class="wrapper">
      <!--纵向排列的事件节点-->
      <li class="node start-node"><div class="node-middle"><i class="circle"></i></div></li>
      <li class="node" v-for="(event, index) in eventsFilter" :key="index">
        <div class="node-left" :class="{show: event.eventType==='home'}">
          <div class="content" v-show="event.eventType==='home'" v-for="(e, i) in event.eventData" :key="i"><span>{{e.eventText}}</span><img :src="icons[e.eventIcon]"/></div>
        </div>
        <div class="node-middle">
          <span class="node-name" :class="{number: event.eventType==='home' || event.eventType==='guest', text: event.eventType==='neutrality'}">{{event.eventName}}</span>
        </div>
        <div class="node-right" :class="{show: event.eventType==='guest'}">
          <div class="content" v-for="(e, i) in event.eventData" :key="i"><img :src="icons[e.eventIcon]"/><span>{{e.eventText}}</span></div>
        </div>
      </li>
      <li class="node end-node" v-if="eventEnd.eventType==='end'"><div class="node-middle"><span class="text">{{eventEnd.eventName}}</span></div></li>
    </ul>
    <div class="start"><img src="@img/minIcon/whistle.png"/></div>
  </div>
</template>

<script>
import icon1 from '@img/football-type/1.png'
import icon2 from '@img/football-type/2.png'
import icon3 from '@img/football-type/3.png'
import icon4 from '@img/football-type/4.png'
import icon5 from '@img/football-type/5.png'
import icon6 from '@img/football-type/6.png'
import icon7 from '@img/football-type/7.png'
import icon8 from '@img/football-type/8.png'
import icon9 from '@img/football-type/9.png'
import icon10 from '@img/football-type/10.png'
import icon11 from '@img/football-type/11.png'
export default {
  name: 'BaseEventLine',
  props: {
    // eventName事件名称:String类型;
    // eventType事件类型:home主队 guest客队 neutrality中立 end结束
    // eventData事件内容
    // eventIcon事件图标:Number类型，对应的图标在文件夹里，我乱标的序号
    // eventText事件文字内容
    events: {
      type: Array,
      default: () => {
        return [
          {
            eventName: '',
            eventType: '',
            eventData: [
              {
                eventIcon: 0,
                eventText: ''
              }
            ]
          }]
      }
    }
  },
  computed: {
    eventsFilter () {
      if (this.eventEnd.eventType === 'end') {
        return this.events.slice(0, this.events.length - 1)
      } else {
        return this.events
      }
    },
    eventEnd () {
      // 取最后一条数据判断是否是结束事件
      const end = this.events[this.events.length - 1] || { eventType: '' }
      return end.eventType === 'end' && end
    }
  },
  data () {
    return {
      icons: [null, icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11]
    }
  }
}
</script>

<style scoped lang="less">
.base-eventline {
  background: #FCFCFE;
  /*开始口哨和结束*/
  .start, .end {
    width: 100%;
    text-align: center;
    img {
      .px2vw(width, 25);
    }
  }
  .start {
    .px2vw(margin-top, 30);
  }
  .end {
    .px2vw(margin-bottom, 18);
  }
  /*开始口哨和结束*/
  /*flex布局*/
  .flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  /*小圆点样式*/
  .circle {
    display: block;
    .px2vw(width, 18);
    .px2vw(height, 18);
    border-radius: 100%;
    background: #27C5C3;
  }
  /*数字圆*/
  .number {
    .flex;
    justify-content: center;
    align-items: center;
    .px2vw(width, 42);
    .px2vw(height, 42);
    .px2vw(font-size, 22);
    color: #FFFFFF;
    background: #27C5C3;
    border-radius: 100%;
  }
  /*文字*/
  .text {
    .flex;
    justify-content: center;
    align-items: center;
    .px2vw(height, 42);
    .px2vw(padding-left, 20);
    .px2vw(padding-right, 20);
    .px2vw(font-size, 22);
    color: #FFFFFF;
    background: #27C5C3;
    border-radius: 100px;
  }
  /*所有节点整体由上至下排列*/
  ul.wrapper {
    &:before {
      content: '';
      width: 1px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #27C5C3;
      z-index: 0;
    }
    .flex;
    position: relative;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    .px2vw(padding-left, 25);
    .px2vw(padding-right, 25);
    /*********************************节点样式START*********************************/
    /*开始节点，额外指定高度，上部分连接线隐藏*/
    .node.start-node {
      min-height: 0;
      .px2vw(height, 40);
      .node-middle {
        .px2vw(height, 40);
        align-items: flex-end;
      }
    }
    /*结束节点，额外指定高度，上部分连接线隐藏*/
    .node.end-node {
      min-height: 0;
      .px2vw(height, 40);
      .node-middle {
        .px2vw(height, 40);
        align-items: flex-start;
      }
    }
    /*每个节点有最低高度，单个节点由一个或三个部分组成*/
    .node {
      z-index: 1;
      .flex;
      justify-content: center;
      align-items: flex-start;
      .px2vw(min-height, 118);
      /*中间部分*/
      .node-middle {
        .flex;
        .px2vw(min-width, 92);
        .px2vw(height, 118);
        justify-content: center;
        align-items: flex-start;
        .node-name {
          .px2vw(margin-top, 36);
        }
      }
      /*两边自动扩充宽度*/
      .node-left, .node-right {
        visibility: hidden;
        flex: 1;
        .px2vw(width, 304);
        .px2vw(min-height, 74);
        .px2vw(margin-top, 22);
        background: #FFFFFF;
        box-shadow: 0px 10px 88px 0px rgba(0, 0, 0, 0.06);
        .content {
          .flex;
          align-items: center;
          .px2vw(min-height, 74);
          .px2vw(padding-left, 18);
          .px2vw(padding-right, 18);
          img {
            .px2vw(width, 27);
            .px2vw(height, 27);
          }
        }
        &.show {
          visibility: visible;
        }
      }
      .node-left {
        .content {
          justify-content: flex-end;
          img {
            .px2vw(margin-left, 18);
          }
        }
      }
      .node-right {
        .content {
          justify-content: flex-start;
          img {
            .px2vw(margin-right, 18);
          }
        }
      }
    }
    /*********************************节点样式END*********************************/
  }
}
</style>
