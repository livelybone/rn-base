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
import { AppRoutes } from '@/route'
import { useForm } from '@livelybone/react-form'

const SignIn: React.FC<ScreenProps> = () => {
  const form = useForm(FormItems.getItems(['phone', 'password']), {
    validateOnChange: true,
  })

  const onPress = () => {
    if (form.pristine) {
      return CAlert('手机号不能为空')
    } else if (!form.valid) {
      return CAlert(form.errorText)
    } else {
      return User.signIn(form.data).catch(CAlert)
    }
  }

  return (
    <View style={{ paddingHorizontal: SizeVariable.padding }}>
      <CText fontSize={25} fontWeight="600" margin="30 0 50">
        登录
      </CText>
      {form.items.map(item => (
        <CInput
          {...getWithoutProps(item, ['label'])}
          key={item.name}
          onChangeText={value => form.itemChange(item.name, value)}
        />
      ))}
      <CButton
        style={{ ...CommonStyles.submitBtn, marginHorizontal: 0 }}
        onPress={onPress}
      >
        立即登录
      </CButton>
      <CButton
        color={ColorVariable.main}
        fontSize={SizeVariable.fontSubContent}
        bgColor="transparent"
        borderColor="transparent"
        style={{ width: 70, alignItems: 'flex-start' }}
        padding="0"
        margin="30 0 0"
        onPress={() =>
          global.navigation.push(
            ...AppRoutes.ForgetPwd({ formData: form.data }),
          )
        }
      >
        忘记密码？
      </CButton>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 60,
          justifyContent: 'flex-start',
        }}
      >
        <CText color={ColorVariable.fontLight}>还没有账号？</CText>
        <CButton
          bgColor="transparent"
          borderColor="transparent"
          color={ColorVariable.main}
          onPress={() => {
            global.navigation.push(...AppRoutes.SignUp({ formData: form.data }))
          }}
        >
          立即注册
        </CButton>
      </View>
    </View>
  )
}

export default SignIn
