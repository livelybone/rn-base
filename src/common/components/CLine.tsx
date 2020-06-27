import React from 'react'
import { View } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import { calcMargin } from '@utils/Styles'

interface Props {
  color?: string
  width?: string | number
  height?: string | number
  style?: any
  margin?: string
}

const CLine: React.FC<Props> = ({
  color = ColorVariable.tableBorder,
  width = '100%',
  height = 1,
  style = {},
  margin,
}) => {
  const marginStyle = calcMargin(margin)
  return (
    <View
      style={{
        ...style,
        backgroundColor: color,
        width,
        height,
        ...marginStyle,
      }}
    />
  )
}

export default CLine
