import Http, { joinBaseUrl } from '@services/Http'

export const CodeType = {
  SignUp: 0,
  ForgetSignInPwd: 1,
  Withdraw: 2,
  ExchangePwdAdd: 3,
  ExchangePwdModify: 4,
  SignInPwdModify: 5,
}

export class Captcha {
  static img() {
    return Http.get<{ id: string }>('/captcha/id').then(({ id }) => ({
      uri: joinBaseUrl(`/captcha/${id}.png`),
      id,
    }))
  }

  static send(params) {
    return Http.post('/sms', {
      country_id: 44,
      username: params.phone,
      use_type: params.type,
      img_id: params.img_id,
      img_code: params.imgCode,
    })
  }

  static sendAfterAuth(type) {
    return Http.get('/user/sms', { use_type: type })
  }
}
