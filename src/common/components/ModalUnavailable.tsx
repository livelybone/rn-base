import React, { useRef } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable from '@styles/SizeVariable'
import CButton from './CButton'
import CText from './CText'
import Modal from './Modal'

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignItems: 'center',
    flex: 0,
    width: 280,
    height: 310,
    paddingTop: 165,
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

const ModalUnavailable: React.FC<Props> = ({ modalRef }) => {
  const $ref = useRef<Modal>()
  return (
    <Modal
      ref={ref => {
        modalRef(ref!)
        $ref.current = ref!
      }}
    >
      <ImageBackground
        source={require('@static/imgs/modal-unavailable-bg.png')}
        style={styles.wrap}
      >
        <CText fontSize={20} margin="0 0 15">
          此功能暂未开通
        </CText>
        <CText
          fontSize={SizeVariable.fontSubContent}
          color={ColorVariable.fontLight}
          margin="0 0 25"
        >
          此功能暂未开通
        </CText>
        <CButton
          style={styles.button}
          onPress={() => $ref.current!.setState({ visible: false })}
        >
          关闭窗口
        </CButton>
      </ImageBackground>
    </Modal>
  )
}

export default ModalUnavailable
