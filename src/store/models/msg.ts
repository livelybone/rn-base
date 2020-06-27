import LocalStorage from '@/localStorage'

export const MSG = {
  UPDATE_MSG_INFO: 'UPDATE_MSG_INFO',
  INIT_MSG_LIST: 'INIT_MSG_LIST',
  APPEND_MSG: 'APPEND_MSG',
  MAKE_MSG_READ: 'MAKE_MSG_READ',
  MAKE_ALL_MSG_READ: 'MAKE_ALL_MSG_READ',
}

export const GetUIStatus = {
  Pending: '0',
  Started: '1',
  Stopped: '2',
}

export default {
  namespace: 'msg',
  state: {
    clientId: '',
    version: '',
    status: '0',
    msgList: [] as any[],
  },
  reducers: {
    [MSG.UPDATE_MSG_INFO](state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
    [MSG.INIT_MSG_LIST](state) {
      return {
        ...state,
        msgList: [...LocalStorage.query('Msg', '').values()].sort(
          (a, b) => b.createTime.getTime() - a.createTime.getTime(),
        ),
      }
    },
    [MSG.APPEND_MSG](state, payload) {
      const msg = {
        ...payload,
        createTime: new Date(),
        isRead: payload.isRead || false,
      }
      LocalStorage.create('Msg', msg)
      return {
        ...state,
        msgList: [msg, ...state.msgList],
      }
    },
    [MSG.MAKE_ALL_MSG_READ](state) {
      const unReadList: any[] = []
      const msgList = state.msgList.map(msg => {
        if (msg.isRead) {
          return msg
        }
        const $msg = { ...msg, isRead: true, type: 'notificationClicked' }
        unReadList.push($msg)
        return $msg
      })

      LocalStorage.batchUpdate('Msg', unReadList)

      return {
        ...state,
        msgList,
      }
    },
    [MSG.MAKE_MSG_READ](state, payload) {
      return {
        ...state,
        msgList: state.msgList.map(msg => {
          if (msg.messageId !== payload.messageId) {
            return msg
          }
          const $msg = { ...msg, isRead: true, type: 'notificationClicked' }
          LocalStorage.update('Msg', $msg)
          return $msg
        }),
      }
    },
  },
}
