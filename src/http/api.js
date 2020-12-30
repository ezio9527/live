const http = require('axios')

// 分类列表
export function categoryListApi () {
  return http.post('/category/list')
}
// 比赛列表
export function matchListApi (data) {
  return http.get('/match/list', { params: data })
}
// 比赛详情
export function matchDetailApi (data) {
  return http.get('/match/detail', { params: data })
}
