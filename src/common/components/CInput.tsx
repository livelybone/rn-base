import React, { ReactNode, useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable from '@styles/SizeVariable'
import { RenderNode } from './CText'

interface Props extends Omit<TextInputProps, 'placeholder'> {
  label?: V_FnV<ReactNode>
  prefix?: V_FnV<ReactNode>
  suffix?: V_FnV<ReactNode>
  placeholder?: V_FnV<string>
  placeholderTextColor?: string
  options?: any
  style?: any
}

const CInput: React.FC<Props> = ({
  label,
  prefix,
  suffix,
  placeholder,
  placeholderTextColor = ColorVariable.placeholder,
  options = {},
  style = {},
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const [isFocus, setFocus] = useState(false)

  const $onFocus = ev => {
    if (onFocus) {
      onFocus(ev)
    }
    setFocus(true)
  }

  const $onBlur = ev => {
    if (onBlur) {
      onBlur(ev)
    }
    setFocus(false)
  }

  const $style = {
    ...style,
    flex: 1,
    height: style.height || 40,
    padding: style.padding || 0,
    color: style.color || ColorVariable.font,
    fontSize: style.fontSize || SizeVariable.fontContent,
    fontWeight: style.fontWeight || '500',
  }
  return (
    <View
      style={{
        position: 'relative',
        flexDirection: 'row',
        height: $style.height + (label ? 16 : 0),
        paddingTop: label ? 16 : 0,
        marginTop: 15,
        borderBottomWidth: 1,
        borderColor: isFocus ? ColorVariable.main : ColorVariable.inputBorder,
      }}
    >
      {label && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            flexDirection: 'row',
            alignItems: 'center',
            height: 16,
          }}
        >
          {RenderNode(
            label,
            { lineHeight: 16, fontSize: 12, color: ColorVariable.fontLight },
            options,
          )}
        </View>
      )}
      <View
        style={{
          position: 'relative',
          height: $style.height,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0,
        }}
      >
        {RenderNode(prefix, {}, options)}
      </View>
      <TextInput
        {...inputProps}
        placeholder={
          typeof placeholder === 'function' ? placeholder(options) : placeholder
        }
        placeholderTextColor={placeholderTextColor}
        style={$style}
        onFocus={$onFocus}
        onBlur={$onBlur}
      />
      <View
        style={{
          position: 'relative',
          height: $style.height,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0,
        }}
      >
        {RenderNode(suffix, {}, options)}
      </View>
    </View>
  )
}

export default CInput
