import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RNCamera, RNCameraProps } from 'react-native-camera'
import ColorVariable from '@styles/ColorVariable'
import CommonStyles from '@styles/CommonStyles'
import SizeVariable from '@styles/SizeVariable'
import CSvg from './CSvg'
import CText from './CText'
import HeaderBack from './HeaderBack'

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface Props {
  size?: number
  color?: string
  onSuccess?: RNCameraProps['onBarCodeRead']
}

const Scanner: React.FC<Props> = ({
  size = 20,
  color = ColorVariable.white,
  onSuccess,
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.wrap, width: 44, height: 44 }}
      onPress={() => {
        global.Camera.show(onSuccess)
      }}
    >
      <CSvg name="icon-scan" width={size} height={size} style={{ color }} />
    </TouchableOpacity>
  )
}

export default Scanner

export interface CameraRefProps {
  show(cd?: RNCameraProps['onBarCodeRead']): void
  hide(): void
}

const Camera = forwardRef<CameraRefProps>((props, ref) => {
  const [show, setShow] = useState(false)
  const callback = useRef<RNCameraProps['onBarCodeRead']>()

  useImperativeHandle(ref, () => ({
    show: $callback => {
      setShow(true)
      callback.current = $callback
    },
    hide: () => {
      setShow(false)
      callback.current = undefined
    },
  }))

  if (!show) {
    return <></>
  }

  return (
    <RNCamera
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        ...CommonStyles.center,
      }}
      type={RNCamera.Constants.Type.back}
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      googleVisionBarcodeType={
        RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
      }
      flashMode={RNCamera.Constants.FlashMode.auto}
      captureAudio={false}
      onBarCodeRead={e => {
        const fn = callback.current
        if (fn) fn(e)
        if (e.data) setShow(false)
      }}
    >
      <HeaderBack
        forceShow={true}
        style={{
          position: 'absolute',
          left: SizeVariable.padding,
          top: (StatusBar.currentHeight || 44) + SizeVariable.padding,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        onPress={() => {
          setShow(false)
        }}
      />
      <View
        style={{
          width: 200,
          height: 200,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: ColorVariable.fontLighter,
          borderStyle: 'dashed',
        }}
      />
      <CText color={ColorVariable.fontLight} margin="10 0 0">
        请将二维码对准上面的方框
      </CText>
    </RNCamera>
  )
})

export { Camera }
