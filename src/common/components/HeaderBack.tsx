import React from 'react'
import { TouchableOpacity } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import CSvg from './CSvg'
import { StackHeaderLeftButtonProps } from '@react-navigation/stack'

interface Props extends StackHeaderLeftButtonProps {
  forceShow?: boolean
  style?: any
}

const HeaderBack: React.FC<Props> = props => {
  return props.canGoBack || props.forceShow ? (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...props.style,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
      }}
    >
      <CSvg
        name="icon-back"
        width={20}
        height={20}
        style={{
          color: ColorVariable.fontLighter,
        }}
      />
    </TouchableOpacity>
  ) : (
    <></>
  )
}

export default HeaderBack
