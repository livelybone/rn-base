import { FormItemsManager } from '@livelybone/form'
import React from 'react'
import CText from '@components/CText'
import Scanner from '@components/Scanner'
import SendVerifyCode from '@components/SendVerifyCode'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable from '@styles/SizeVariable'
import { phoneValidator, pwdValidator } from '@utils/form/Validators'
import ImgCaptcha from '@components/ImgCaptcha'
import { trimFormatter } from '@utils/form/Formatters'

const items = {
  verifyCode: {
    label: '手机验证码',
    name: 'verifyCode' as const,
    value: '',
    placeholder: '请输入手机验证码',
    suffix: ({ sendCode }) => (
      <SendVerifyCode
        style={{
          height: 26,
          paddingHorizontal: 5,
          fontSize: SizeVariable.fontSubContent,
        }}
        onPress={sendCode}
      />
    ),
  },
  addressAdd: {
    label: '地址',
    name: 'address' as const,
    value: '',
    placeholder: '输入地址',
    suffix: ({ scan }) => (
      <>
        <Scanner size={16} color={ColorVariable.main} onSuccess={scan} />
      </>
    ),
  },
  remark: {
    label: '备注',
    name: 'remark' as const,
    value: '',
    placeholder: '输入备注',
  },

  signInPwdNew: {
    label: '新登录密码',
    placeholder: '请输入新登录密码',
    name: 'password' as const,
    value: '',
    secureTextEntry: true,
    validator: pwdValidator,
  },
  pwdConfirm: {
    label: '确认密码',
    placeholder: '请确认密码',
    name: 'confirmPwd' as const,
    value: '',
    secureTextEntry: true,
    validator: pwdValidator,
  },

  username: {
    label: '用户名',
    name: 'username' as const,
    value: '',
    placeholder: '请输入用户名',
    formatter: trimFormatter,
  },
  phone: {
    label: '手机号',
    name: 'phone' as const,
    value: '',
    placeholder: '请输入手机号',
    keyboardType: 'numeric',
    prefix: (
      <CText fontWeight="600" padding="0 10 0 0">
        +86
      </CText>
    ),
    validator: phoneValidator,
  },
  imgCode: {
    label: '图形验证码',
    name: 'imgCode' as const,
    value: '',
    placeholder: '请输入图形验证码',
    keyboardType: 'numeric',
    suffix: ImgCaptcha,
    required: false,
  },
  password: {
    label: '密码',
    name: 'password' as const,
    value: '',
    placeholder: '请输入6～16位字母加数字密码',
    secureTextEntry: true,
    validator: pwdValidator,
  },
  recommendCode: {
    label: '邀请码',
    name: 'recommendCode' as const,
    value: '',
    placeholder: '邀请码（选填）',
    required: false,
  },
}

export const FormItems = new FormItemsManager(items)
