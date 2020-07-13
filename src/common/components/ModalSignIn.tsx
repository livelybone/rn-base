import React from 'react'
import { StyleSheet, View } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable from '@styles/SizeVariable'
import CButton from './CButton'
import CSvg from './CSvg'
import CText from './CText'
import Modal from './Modal'

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignItems: 'center',
    flex: 0,
    width: 280,
    height: 310,
    paddingTop: 135,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  button: {
    width: 210,
    height: 40,
    borderRadius: 20,
  },
})

interface Props {
  modalRef(ref: Modal): void
}

const ModalSignIn: React.FC<Props> = ({ modalRef }) => {
  return (
    <Modal ref={modalRef}>
      <View style={styles.wrap}>
        <CSvg
          style={styles.bg}
          name="sign-in-modal-bg"
          width={280}
          height={310}
        />
        <CText fontSize={20} margin="0 0 15">
          您还没登录
        </CText>
        <CText
          fontSize={SizeVariable.fontSubContent}
          color={ColorVariable.fontLight}
          margin="0 0 20"
        >
          请先登录或注册再进行此操作
        </CText>
        <CButton
          style={styles.button}
          onPress={() => global.navigation.push(...global.AppRoutes.SignIn())}
        >
          {({ color }) => <CText style={{ color }}>立即登录</CText>}
        </CButton>
        <CButton
          color={ColorVariable.main}
          bgColor="transparent"
          borderColor="transparent"
          margin="20 0 0"
          onPress={() =>
            global.navigation.push(...global.AppRoutes.SignUp({ formData: {} }))
          }
        >
          {({ color }) => <CText style={{ color }}>还未注册</CText>}
        </CButton>
      </View>
    </Modal>
  )
}

export default ModalSignIn
