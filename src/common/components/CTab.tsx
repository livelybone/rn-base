import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import CommonStyles from '@styles/CommonStyles'
import { RenderNode } from './CText'

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  tabStyle: {
    ...CommonStyles.center,
    position: 'relative',
    color: ColorVariable.font,
  },
  activatedStyle: {
    color: ColorVariable.main,
  },
})

export interface OptionItem {
  label: V_FnV<ReactNode>
  value: string | number

  [key: string]: any
}

interface Props {
  value?: OptionItem['value']
  options?: OptionItem[]
  style?: any
  tabStyle?: any
  activatedTabStyle?: any
  renderOption?(it: OptionItem, selected: boolean, style: any): ReactNode
  onChange?(value: OptionItem['value'], op: OptionItem): any
}

const CTab: React.FC<Props> = ({
  value = '',
  options = [],
  style = {},
  tabStyle = {},
  activatedTabStyle = {},
  renderOption,
  onChange,
}) => {
  const $tabStyle = { ...styles.tabStyle, ...tabStyle }
  const $activatedTabStyle = { ...styles.activatedStyle, ...activatedTabStyle }
  return (
    <View style={{ ...styles.wrap, ...style }}>
      {options.map(op => {
        const $style =
          op.value === value
            ? { ...$tabStyle, ...$activatedTabStyle }
            : $tabStyle
        return (
          <TouchableOpacity
            key={op.value}
            style={$style}
            onPress={() => onChange && onChange(op.value, op)}
          >
            {renderOption
              ? renderOption(op, op.value === value, $style)
              : RenderNode(op.label, $style, { style: $style })}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default CTab
