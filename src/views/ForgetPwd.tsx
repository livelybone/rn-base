import React from 'react'
import { View } from 'react-native'
import { User } from '@/api/User'
import CAlert from '@components/CAlert'
import CButton from '@components/CButton'
import CInput from '@components/CInput'
import CText from '@components/CText'
import { FormItems } from '@utils/form/FormItems'
import ColorVariable from '@styles/ColorVariable'
import CommonStyles from '@styles/CommonStyles'
import SizeVariable from '@styles/SizeVariable'
import { getWithoutProps } from '@utils/Object'
import { Captcha, CodeType } from '@/api/Capcha'
import { useForm } from '@livelybone/react-form'
import { pendingPromise } from '@utils/CommonFn'
import { useFocusEffect } from '@react-navigation/native'
import { useImgCaptcha } from '@components/ImgCaptcha'

const ForgetPwd: React.FC<ScreenProps> = () => {
  const form = useForm(
    FormItems.getItems([
      'phone',
      'imgCode',
      'verifyCode',
      'signInPwdNew',
      'pwdConfirm',
    ]),
  )

  useFocusEffect(() => {
    const formData = global.route.params?.formData
    if (formData) form.itemsChange(formData, false)
  })

  const onPress = () => {
    return form
      .submit()
      .then(data => User.forgetPwd(data))
      .catch(e => {
        CAlert(e)
        source[1]()
      })
  }

  const source = useImgCaptcha()

  const options = {
    uri: source[0].uri,
    refresh: source[1],
    sendCode: () => {
      const item = form.getItemByName('phone')!
      if (!item.valid) {
        CAlert(item.errorText)
        return pendingPromise()
      } else {
        return Captcha.send({
          ...form.data,
          type: CodeType.ForgetSignInPwd,
          img_id: source[0].id,
        })
      }
    },
  }

  return (
    <View style={{ paddingHorizontal: SizeVariable.padding }}>
      <CText fontSize={25} fontWeight="600" margin="30 0 50">
        找回密码
      </CText>
      {form.items.map(item => (
        <CInput
          {...getWithoutProps(item, ['label'])}
          options={options}
          key={item.name}
          onChangeText={value => form.itemChange(item.name, value)}
        />
      ))}
      <CButton
        style={{ ...CommonStyles.submitBtn, marginHorizontal: 0 }}
        onPress={onPress}
      >
        确认提交
      </CButton>
      <View
        style={{
          marginTop: 60,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <CText color={ColorVariable.fontLight}>还没有账号？</CText>
        <CButton
          bgColor="transparent"
          borderColor="transparent"
          color={ColorVariable.main}
          onPress={() => {
            global.navigation.push(...global.AppRoutes.SignUp({ formData: form.data }))
          }}
        >
          立即注册
        </CButton>
      </View>
    </View>
  )
}

export default ForgetPwd
