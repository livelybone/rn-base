export const phoneReg = /^1[\d]{10}$/
export const pwdReg = /^(?=.*\d)(?=.*\w)[\d\w]{6,16}$/
export const ethReg = /^(0x)?[0-9a-fA-F]{40}$/
export const btcReg1 = /^[13][a-zA-Z\d]{24,33}$/
export const btcReg2 = /^[^0OlI]{25,34}$/

export function pwdValidator(val) {
  return pwdReg.test(val) ? '' : '密码格式错误'
}

export function phoneValidator(val) {
  return phoneReg.test(val) ? '' : '手机号格式错误'
}

export function amountValidator(val, { precision }) {
  if (precision <= 0) {
    return /^\d+$/.test(val) && +val % 10 ** -precision === 0
      ? ''
      : '请输入正确的金额'
  }
  const reg = new RegExp(`^(0|[1-9]\\d*)(\\.\\d{1,${precision}})?$`)
  return reg.test(val) ? '' : '请输入正确的金额'
}

export function ethAddressValidator(val) {
  return ethReg.test(val) ? '' : '地址不合法'
}

export function btcAddressValidator(val) {
  return btcReg1.test(val) && btcReg2.test(val) ? '' : '地址不合法'
}
