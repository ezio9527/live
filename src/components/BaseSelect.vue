<template>
  <button type="button" class="base-select cube-btn live-btn" :class="{disabled: disabled}" @click="hidden=disabled || false" @mouseenter="hidden=disabled || false" @focus="hidden=disabled || false" @blur="hidden=true">
    {{disabled? noneText : text}}<i class="cubeic-select" v-if="!disabled"></i>
    <ul :class="{hidden: hidden}" @mouseleave="hidden=true">
      <li :class="{active: activeIndex===index, disabled: item.disabled}" v-for="(item, index) in options" :key="index" @click.stop="select(item, index)">{{item.text}}</li>
    </ul>
  </button>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    text: {
      type: String
    },
    noneText: {
      type: String,
      default: '暂无选项'
    },
    active: {
      type: Number,
      default: -1
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      disabled: false,
      hidden: true,
      activeIndex: -1
    }
  },
  watch: {
    active (val) {
      this.activeIndex = val
    },
    options (val) {
      this.disabled = val.length === 0 || val.every(item => {
        return item.disabled
      })
    }
  },
  created () {
    this.activeIndex = this.active
    this.disabled = this.options.length === 0 || this.options.every(item => {
      return item.disabled
    })
  },
  methods: {
    select (item, index) {
      this.activeIndex = index
      this.$emit('select', {
        value: item.value,
        index
      })
      this.hidden = true
    }
  }
}
</script>

<style scoped lang="less">
  .base-select {
    position: relative;
    &:disabled {
      color: gray;
      border: 1px solid gray;
    }
    &:hover {
      position: relative;
      z-index: 99;
      opacity: 1;
    }
    .hidden {
      display: none;
    }
    ul {
      position: absolute;
      z-index: 99;
      top: 30px;
      left: 0;
      right: 0;
      background: white;
      width: 100%;
      border: 1px solid #0C9CE2;
      border-radius: 4px;
      li {
        height: 26px;
        line-height: 26px;
        &.active {
          background: #0C9CE2;
          color: white;
        }
        &.disabled {
          color: #777;
          background: transparent !important;
        }
        &.disabled:hover {
          background: transparent !important;
          color: #777;
          z-index: 99;
        }
      }
      li:hover {
        background: #0C9CE2;
        color: white;
        z-index: 99;
      }
    }
  }
</style>
