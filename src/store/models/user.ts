export const USER = {
  GET_USER_INFO: 'GET_USER_INFO',
  SET_AUTH_VERIFY_CODE: 'SET_AUTH_VERIFY_CODE',
}

export default {
  namespace: 'user',
  state: {
    userInfo: null,
    authVerifyCode: {},
  },
  reducers: {
    [USER.GET_USER_INFO](state, payload) {
      return {
        ...state,
        userInfo:
          payload === null ? (state.userInfo === null ? NaN : null) : payload,
      }
    },
    [USER.SET_AUTH_VERIFY_CODE](state, payload) {
      return {
        ...state,
        authVerifyCode: payload,
      }
    },
  },
}
