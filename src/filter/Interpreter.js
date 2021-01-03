import Vue from 'vue'
import Interpreter from '@/assets/data/interpreter/index'
Vue.filter('interpreter', function (value, type) {
  return Interpreter[type][value] || '未定义'
})
