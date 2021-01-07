// webSocket
import { Toast } from 'vant'
// 建立连接
var websock = null
var globalCallback = null
var isClose = false
var timer = null
var timer2 = null
var agentDatas = null
var types = null
var tokens = null
// 初始化
function initWebSocket (agentData, type, token) {
  console.log('🚀 ~ file: webSocket.js ~ line 14 ~ initWebSocket ~ agentData, type, token', agentData, type, token)
  agentDatas = agentData
  types = type
  tokens = token
  if (!token) return
  if ('WebSocket' in window) {
    isClose = false
    tokens = token
    let typeName = types === '1' ? 'zuqiu' : 'lanqiu'
    var url = `${location.protocol === 'https' ? 'wss' : 'ws'}://${location.host}/ws/live/detail/${typeName}?token=${tokens}`
    console.log(url)
    websock = new WebSocket(url)
    websock.onmessage = (e) => {
      websocketonmessage(e)
    }
    websock.onclose = (e) => {
      websocketclose(e)
    }
    websock.onopen = () => {
      websocketOpen()
      if (agentDatas) {
        websocketsend(agentDatas)
      }
    }
    // 连接发生错误的回调方法
    websock.onerror = (event) => {
      console.log('WebSocket连接发生错误')
      Toast.fail('WebSocket连接发生错误')
    }
  } else {
    Toast.fail('您的浏览器不支持WebSocket协议,请更换浏览器!')
    return false
  }
}

// 数据接收
function websocketonmessage (e) {
  // console.log('数据接收', e)
  globalCallback(e)
  // globalCallback(JSON.parse(e.data))
}

// 数据发送
function websocketsend (agentData) {
  if (agentData) {
    console.log('数据发送', agentData)
    if (typeof agentData === 'string') {
      websock.send(agentData)
    } else {
      websock.send(JSON.stringify(agentData))
    }
  }
}

// 关闭
export function websocketclose (e) {
  console.log(`关闭`)
  if (!isClose) { // 非手动关闭重连
    clearTimeout(timer2)
    timer2 = null
    timer2 = setTimeout(() => {
      initWebSocket(agentDatas, types, tokens)
    }, 1000)
  }
}
export function handleWebsocketClose (e) {
  if (websock) {
    console.log(`连接已关闭`)
    isClose = true
    websock.close()
  }
}
// 创建 websocket 连接
function websocketOpen (e) {
  console.log('连接成功')
}

/**
 * 实际调用的方法
 *
 * @export
 * @param {*} agentData
 * @param {*} callback
 * @returns sendSock(data,type,token this.getConfigResult)
 */
export function sendSock (agentData, type, token, callback) {
  if (agentData) {
    globalCallback = callback
    if (websock && websock.readyState === websock.OPEN) {
      // 若是ws开启状态
      websocketsend(agentData)
    } else if (websock && websock.readyState === websock.CONNECTING) {
      // 若是 正在开启状态，则等待1s后重新调用
      clearTimeout(timer)
      timer = null
      timer = setTimeout(() => {
        sendSock(agentData, type, token, callback)
      }, 1000)
    } else {
      // 若未开启
      initWebSocket(agentData, type, token)
    }
  } else {
    Toast('数据不能为空')
  }
}
