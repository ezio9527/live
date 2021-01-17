import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './http'
import './plugs'
import '@/filter/index'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'lib-flexible/flexible'

Vue.use(Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
