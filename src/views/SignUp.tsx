import React, { useState } from 'react'
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
import CCheckbox from '@components/CCheckbox'

const SignUp: React.FC<ScreenProps> = () => {
  const [agree, setAgree] = useState(false)
  const form = useForm(
    FormItems.getItems([
      'username',
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
    const formData = global.route.params?.formData
    if (formData) form.itemsChange(formData, false)
  })

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
          type: CodeType.SignUp,
          ...getWithoutProps(form.data, ['password']),
          img_id: source[0].id,
        })
      }
    },
  }

  const onPress = () => {
    if (!agree) {
      return CAlert('请阅读并同意用户协议！')
    } else {
      return form
        .submit()
        .then(data => User.signUp(data))
        .catch(e => {
          CAlert(e)
          source[1]()
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
        <CCheckbox checked={agree} onChange={setAgree}>
          {style => (
            <CText fontSize={SizeVariable.fontSubContent} style={style}>
              阅读并同意
            </CText>
          )}
        </CCheckbox>
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
