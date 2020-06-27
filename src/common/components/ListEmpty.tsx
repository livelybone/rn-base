import React from 'react'
import { View } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import CommonStyles from '@styles/CommonStyles'
import SizeVariable from '@styles/SizeVariable'
import CSvg from './CSvg'
import CText from './CText'

interface Props {
  style?: any
  txt?: string
}

const ListEmpty: React.FC<Props> = ({ style, txt }) => {
  return (
    <View
      style={{
        ...style,
        ...CommonStyles.center,
        paddingTop: (style && style.paddingTop) || 100,
        opacity: 0.5,
      }}
    >
      <CSvg name="icon-search" width={52} height={52} />
      <CText
        fontSize={SizeVariable.fontSubContent}
        color={ColorVariable.fontLight}
        margin="10 0 0"
      >
        {txt || '暂无记录'}
      </CText>
    </View>
  )
}

export default ListEmpty
