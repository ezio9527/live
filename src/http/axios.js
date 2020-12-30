// 为vue实例引入axios组件
const Axios = {}
Axios.install = function (Vue, options) {
  const axios = require('axios')
  Vue.prototype.$http = axios
  Vue.$http = axios
}
export default Axios
