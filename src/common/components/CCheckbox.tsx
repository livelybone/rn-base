import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import { calcMargin } from '@utils/Styles'
import CSvg from '@components/CSvg'
import useWatch from 'use-watch'
import { RenderNode } from '@components/CText'
import CommonStyles from '@styles/CommonStyles'
import SizeVariable from '@styles/SizeVariable'

interface Props {
  color?: string
  activeColor?: string
  width?: number
  height?: number
  style?: any
  margin?: string

  checked?: boolean

  onChange?(checked: boolean): any
}

const CCheckbox: React.FC<Props> = ({
  color = ColorVariable.fontLight,
  activeColor = ColorVariable.main,
  width = SizeVariable.fontSubHead,
  height = SizeVariable.fontSubHead,
  style = {},
  margin,
  checked,
  onChange,
  children,
}) => {
  const marginStyle = calcMargin(margin)
  const [$checked, setChecked] = useState(checked || false)

  useWatch(
    $checked,
    val => {
      if (onChange) onChange(val)
    },
    { immediate: true },
  )

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', ...CommonStyles.center }}
      onPress={() => setChecked(pre => !pre)}
    >
      <CSvg
        name={$checked ? 'icon-checkbox-checked' : 'icon-checkbox'}
        color={$checked ? activeColor : color}
        height={height}
        width={width}
        style={{ marginRight: 5, ...style, ...marginStyle }}
      />
      {RenderNode(children, { color: $checked ? activeColor : color })}
    </TouchableOpacity>
  )
}

export default CCheckbox
