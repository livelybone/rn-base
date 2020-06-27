import React from 'react'
import { SvgUri, SvgXml } from 'react-native-svg'
import { SvgImages } from '@static/svg'

const isHttp = (str: string) => /^https?:\/\//.test(str)

interface Props {
  name: string
  color?: string
  width?: number
  height?: number
  style?: any

  [key: string]: any
}

const CSvg: React.FC<Props> = ({ name, color, style, ...props }) => {
  const isXML = !isHttp(name)

  if (isXML && !SvgImages[name]) {
    throw new Error(
      `找不到对应的 Svg 文件(${name})，请尝试运行 \`npm run svg\` 重新编译！`,
    )
  }

  const $style = { ...style, color: color || (style && style.color) }

  return !isXML ? (
    <SvgUri uri={name} {...props} style={$style} />
  ) : (
    <SvgXml xml={SvgImages[name]} {...props} style={$style} />
  )
}

export default CSvg
