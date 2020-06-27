import {
  HeaderBackground,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import tinycolor from 'tinycolor2'

export default function CHeaderBackground(
  bgColor?: ReturnType<typeof tinycolor> | string,
  transparent?: boolean,
  headerShadowDisabled?: boolean,
): StackNavigationOptions['headerBackground'] {
  const $color = bgColor
    ? typeof bgColor === 'string'
      ? tinycolor(bgColor)
      : bgColor
    : transparent
    ? tinycolor('#ffffff00')
    : undefined
  return ({ style }) => {
    return (
      <HeaderBackground
        style={[
          style,
          {
            // android
            elevation: !headerShadowDisabled ? $color?.getAlpha() ?? 1 : 0,
            // ios
            shadowOpacity: !headerShadowDisabled ? 0.85 : 0,
          },
          $color
            ? {
                backgroundColor: $color?.toString('hex8'),
              }
            : {},
        ]}
      />
    )
  }
}
