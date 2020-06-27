import { NativeAppEventEmitter } from 'react-native'
import { store } from '@/store'
import { MSG } from '@models/msg'

export function initMsgModule() {
  store.dispatch({
    type: MSG.UPDATE_MSG_INFO,
    payload: {
      // ...the info of msg module you use
    },
  })
}

export function subscribeMsg() {
  const receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
    'receiveRemoteNotification',
    notification => {
      switch (notification.type) {
        case 'cid':
          console.log('初始化获取到cid', notification)
          break
        case 'payload':
          console.log('payload 消息通知', notification)
          break
        case 'cmd':
          console.log(
            'cmd 消息通知',
            `cmd action = ${notification.cmd}`,
            notification,
          )
          break
        case 'notificationArrived':
          console.log('notificationArrived 通知到达', notification)
          store.dispatch({ type: MSG.APPEND_MSG, payload: notification })
          break
        case 'notificationClicked':
          console.log('notificationClicked 通知点击', notification)
          global.navigation.push('UserMsgList')
          store.dispatch({ type: MSG.MAKE_MSG_READ, payload: notification })
          break
        default:
          break
      }
    },
  )

  const clickRemoteNotificationSub = NativeAppEventEmitter.addListener(
    'clickRemoteNotification',
    notification => {
      console.log('点击通知', notification)
    },
  )

  return { receiveRemoteNotificationSub, clickRemoteNotificationSub }
}
