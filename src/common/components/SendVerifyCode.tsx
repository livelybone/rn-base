import React from 'react'
import ColorVariable from '@styles/ColorVariable'
import useCountDown from '@livelybone/use-count-down'
import CAlert from './CAlert'
import CButton from './CButton'
import { GestureResponderEvent } from 'react-native'

interface Props {
  maxTime?: number
  color?: string
  borderColor?: string
  bgColor?: string

  onPress?(ev: GestureResponderEvent): any

  [key: string]: any
}

const SendVerifyCode: React.FC<Props> = ({
  maxTime = 60,
  color = ColorVariable.main,
  borderColor = ColorVariable.btnBorderColor,
  bgColor = 'transparent',
  onPress,
  ...btnProps
}) => {
  const { count, start, isRunning } = useCountDown(maxTime)

  const $onPress = ev => {
    if (!isRunning && onPress) {
      return Promise.resolve(onPress(ev))
        .then(() => start())
        .catch(CAlert)
    }
  }

  return (
    <CButton
      {...btnProps}
      color={isRunning ? ColorVariable.disabled : color}
      borderColor={borderColor}
      bgColor={bgColor}
      onPress={$onPress}
    >
      {isRunning ? `${count} s` : '发送验证码'}
    </CButton>
  )
}

export default SendVerifyCode
