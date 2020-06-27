import React from 'react'
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import useStateTrackProp from 'use-state-track-prop'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable from '@styles/SizeVariable'
import { calcMargin, calcPadding } from '@utils/Styles'
import CAlert from './CAlert'
import { RenderNode } from './CText'
import useMounted from '@livelybone/use-mounted'

interface Props extends TouchableOpacityProps {
  style?: any
  onPress?(ev: GestureResponderEvent): any
  disabled?: boolean
  color?: string
  bgColor?: string
  borderColor?: string
  disabledColor?: string
  disabledBgColor?: string
  disabledBorderColor?: string
  fontSize?: string | number
  margin?: string
  padding?: string
}

const CButton: React.FC<Props> = ({
  style = {},
  onPress,
  children,
  disabled,
  color = ColorVariable.white,
  bgColor = ColorVariable.main,
  borderColor = ColorVariable.main,
  disabledColor = ColorVariable.white,
  disabledBgColor = ColorVariable.disabled,
  disabledBorderColor = ColorVariable.disabled,
  fontSize,
  margin,
  padding,
  ...otherProps
}) => {
  const borderRadius =
    style.borderRadius !== undefined
      ? style.borderRadius
      : SizeVariable.borderRadius
  const styles = StyleSheet.create({
    style: disabled
      ? {
          justifyContent: 'center',
          alignItems: 'center',
          color: disabledColor,
          borderWidth: StyleSheet.hairlineWidth,
          backgroundColor: disabledBgColor,
          borderColor: disabledBorderColor,
          borderRadius,
        }
      : {
          justifyContent: 'center',
          alignItems: 'center',
          color,
          borderWidth: StyleSheet.hairlineWidth,
          backgroundColor: bgColor,
          borderColor,
          borderRadius,
        },
  })

  const marginStyle = calcMargin(margin)
  const paddingStyle = calcPadding(padding)
  const compState = useMounted()

  const $style = {
    ...style,
    ...styles.style,
    ...marginStyle,
    ...paddingStyle,
    fontSize: fontSize || style.fontSize,
  }

  const [$disabled, setDisabled] = useStateTrackProp(disabled)
  const $onPress = ev => {
    if (!$disabled && onPress) {
      setDisabled(true)
      Promise.resolve(onPress(ev))
        .catch(CAlert)
        .then(() => {
          if (!compState.current.unmounted) setDisabled(false)
        })
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={$style}
      onPress={$onPress}
      {...otherProps}
    >
      {RenderNode(children, $style)}
    </TouchableOpacity>
  )
}

export default CButton
