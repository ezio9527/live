const axios = require('axios')
// const baseUrl = 'https://www.shuoqiudi.app' // 不做代理时默认http请求的URL地址
const baseUrl = window.config.apiUrl // 不做代理时默认http请求的URL地址
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Referer'] = 'https://shuoqiudi.live'
axios.defaults.timeout = 20000

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.url = baseUrl + config.url
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  const res = response.data
  if (res.code === '0') {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data)
  }
}, function (error) {
  return Promise.reject(error)
})
