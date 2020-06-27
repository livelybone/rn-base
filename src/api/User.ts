import CAlert from '@components/CAlert'
import Http from '@services/Http'
import { isIOS } from '@utils/Env'
import LocalStorage from '@/localStorage'
import { signInToken } from '@/localStorage/schemas/Token'
import { store } from '@/store'
import { USER } from '@/store/models/user'
import { AppRoutes } from '@/route'

export class User {
  static getUserInfo() {
    return Http.get('/user')
      .then(info => {
        store.dispatch({
          type: USER.GET_USER_INFO,
          payload: info,
        })
      })
      .catch(e => {
        if (e.message === 'missing or malformed jwt') {
          CAlert('登录过期，请重新登录')
          return User.signOut()
        }
        CAlert('获取用户信息失败，请检查您的网络情况')
        return User.signOut()
      })
  }

  static signUp(data) {
    return Http.post('/register', {
      country_id: 44,
      username: data.phone,
      password: data.password,
      password_confirmation: data.confirmPwd,
      code: data.verifyCode,
      recommend_code: data.recommendCode,
      client_id: store.getState().getUI.clientId,
      platform: isIOS ? 'ios' : 'android',
    }).then(userInfo => {
      LocalStorage.update('Token', signInToken(userInfo.token))
      const redirect = global.route.params?.redirect
      if (redirect) global.navigation.replace(redirect)
      else global.navigation.replace(...AppRoutes.Home())
      User.getUserInfo()
    })
  }

  static signIn(data) {
    return Http.post('/login', {
      username: data.phone,
      password: data.password,
      client_id: store.getState().getUI.clientId,
      platform: isIOS ? 'ios' : 'android',
    }).then(userInfo => {
      LocalStorage.update('Token', signInToken(userInfo.token))
      const redirect = global.route.params?.redirect
      if (redirect) global.navigation.replace(redirect)
      else global.navigation.replace(...AppRoutes.Home())
      User.getUserInfo()
    })
  }

  static signOut() {
    return Promise.resolve().then(() => {
      LocalStorage.update('Token', signInToken(''))
      store.dispatch({ type: USER.GET_USER_INFO, payload: null })
      global.navigation.replace(...AppRoutes.SignIn())
    })
  }

  static updateAvatar($file) {
    const bs = `data:${$file.mime};base64,${$file.data}`
    const name = $file.filename
      ? $file.filename.toLowerCase()
      : $file.path.split('/').pop().toLowerCase()
    return Http.uploadFile({
      url: '/user/upload',
      fileKey: 'file',
      file: {
        uri: bs,
        type: 'multipart/form-data',
        name: name,
      },
    })
      .then(() => User.getUserInfo())
      .then(() => {
        CAlert('头像更改成功！')
      })
  }

  static forgetPwd(data) {
    return Http.post('/forgetPassword', {
      username: data.phone,
      code: data.verifyCode,
      password: data.password,
    }).then(() => {
      CAlert('密码重置成功，请登录！')
      global.navigation.goBack()
    })
  }

  static modifyPwd(params) {
    return Http.post('user/restPassword', {
      password: params.password,
      password_confirmation: params.confirmPwd,
      sms_code: params.verifyCode,
    }).then(res => {
      User.getUserInfo()
      return res
    })
  }
}
