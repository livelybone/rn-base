import React from 'react'
import { View } from 'react-native'
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
import { User } from '@/api/User'
import { AppRoutes } from '@/route'
import { useFocusEffect } from '@react-navigation/native'
import { useImgCaptcha } from '@components/ImgCaptcha'

const SignUp: React.FC<ScreenProps> = () => {
  const form = useForm(
    FormItems.getItems([
      'phone',
      'imgCode',
      'verifyCode',
      'password',
      'pwdConfirm',
      'recommendCode',
    ]),
    {
      validateOnChange: true,
    },
  )

  useFocusEffect(() => {
    form.itemsChange(global.route.params?.formData, false)
  })

  const source = useImgCaptcha()

  const options = {
    uri: source.data.uri,
    refresh: source.getData,
    sendCode: () => {
      const item = form.getItemByName('phone')!
      if (!item.valid) {
        CAlert(item.errorText)
        return pendingPromise()
      } else {
        return Captcha.send({
          type: CodeType.SignUp,
          ...getWithoutProps(form.data, ['password']),
          img_id: source.data.id,
        })
      }
    },
  }

  const onPress = () => {
    if (form.pristine) {
      return CAlert('手机号不能为空')
    } else if (!form.valid) {
      return CAlert(form.errorText)
    } else {
      return User.signUp(form.data).catch(e => {
        CAlert(e)
        source.getData()
      })
    }
  }

  return (
    <View style={{ paddingHorizontal: SizeVariable.padding }}>
      <CText fontSize={25} fontWeight="600" margin="30 0 50">
        注册
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
        立即注册
      </CButton>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 25,
          justifyContent: 'center',
        }}
      >
        <CText
          fontSize={SizeVariable.fontSubContent}
          color={ColorVariable.fontLight}
        >
          注册即同意
        </CText>
        <CButton
          bgColor="transparent"
          borderColor="transparent"
          color={ColorVariable.main}
          fontSize={SizeVariable.fontSubContent}
          onPress={() => {
            global.navigation.push(
              ...AppRoutes.Article({ id: 'user-agreement' }),
            )
          }}
        >
          《用户注册协议》
        </CButton>
      </View>
    </View>
  )
}

export default SignUp
