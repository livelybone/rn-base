import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable from '@styles/SizeVariable'
import { calcMargin, calcPadding } from '@utils/Styles'

interface Props {
  fontSize?: number
  color?: string
  margin?: number | string
  padding?: number | string
  bgColor?: string
  borderRadius?: number | string
  height?: number
  lineHeight?: number
  numberOfLines?: number
  textAlign?: string
  fontWeight?: string
  style?: any

  [key: string]: any
}

const CText: React.FC<Props> = ({
  fontSize: fontS,
  color: c,
  margin,
  padding,
  bgColor = 'transparent',
  borderRadius,
  height,
  lineHeight,
  numberOfLines = 100,
  textAlign,
  fontWeight,
  style = {},
  children,
  ...otherProps
}) => {
  const fontSize = fontS || style.fontSize || SizeVariable.fontContent
  const color = c || style.color || ColorVariable.font
  const marginStyle = calcMargin(margin)
  const paddingStyle = calcPadding(padding)
  return (
    <Text
      style={{
        ...style,
        ...marginStyle,
        ...paddingStyle,
        fontSize,
        color,
        backgroundColor: bgColor,
        height: height,
        lineHeight: lineHeight || height,
        textAlign,
        fontWeight: fontWeight,
        borderRadius,
      }}
      numberOfLines={numberOfLines}
      {...otherProps}
    >
      {children}
    </Text>
  )
}

export default CText

function render(txt: ReactNode, style?: any) {
  return typeof txt === 'string' ? (
    <CText
      fontSize={style.fontSize}
      color={style.color}
      textAlign={style.textAlign}
      fontWeight={style.fontWeight}
    >
      {txt}
    </CText>
  ) : (
    txt
  )
}

export function RenderNode(node: V_FnV<ReactNode>, style = {}, options = {}) {
  const $node = typeof node === 'function' ? node(options) : node

  return $node instanceof Array
    ? $node.map(t => render(t, style))
    : render($node, style)
}
