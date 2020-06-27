import { FormItemsManager } from '@livelybone/form'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import CText from '@components/CText'
import Scan from '@components/Scan'
import SendVerifyCode from '@components/SendVerifyCode'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable from '@styles/SizeVariable'
import { phoneValidator, pwdValidator } from '@utils/Validators'
import useAsyncData from '@livelybone/use-async-data'
import { Captcha } from '@/api/Capcha'
import CAlert from '@components/CAlert'
import useMounted from '@livelybone/use-mounted'
import ImgCaptcha from '@components/ImgCaptcha'

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
        <Scan size={16} color={ColorVariable.main} onSuccess={scan} />
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

  phone: {
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
    name: 'imgCode' as const,
    value: '',
    placeholder: '请输入图形验证码',
    keyboardType: 'numeric',
    suffix: ImgCaptcha,
    required: false,
  },
  password: {
    name: 'password' as const,
    value: '',
    placeholder: '请输入6～16位字母加数字密码',
    secureTextEntry: true,
    validator: pwdValidator,
  },
  recommendCode: {
    name: 'recommendCode' as const,
    value: '',
    placeholder: '邀请码（选填）',
    required: false,
  },
}

export const FormItems = new FormItemsManager(items)
