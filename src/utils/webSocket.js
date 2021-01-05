// webSocket
import { Toast } from 'vant'
// 建立连接
var websock = null
var globalCallback = null
var timer = null
var timer2 = null
// 初始化
function initWebSocket (agentData, token) {
  if ('WebSocket' in window) {
    var url = `${location.protocol === 'https' ? 'wss' : 'ws'}://${location.host}/ws/live/detail?token=${token}`
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
      if (agentData) {
        websocketsend(agentData)
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
  console.log('数据接收', e)
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
  clearTimeout(timer2)
  timer2 = null
  timer2 = setTimeout(() => {
    initWebSocket()
  }, 1000)
}
export function handleWebsocketClose (e) {
  if (websock) {
    console.log(`连接已关闭`)
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
 * @returns sendSock(data, this.getConfigResult)
 */
export function sendSock (agentData, token, callback) {
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
        sendSock(agentData, callback)
      }, 1000)
    } else {
      // 若未开启
      initWebSocket(agentData, token)
    }
  } else {
    Toast('数据不能为空')
  }
}
