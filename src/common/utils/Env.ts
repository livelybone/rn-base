import { Dimensions, Platform, StyleSheet } from 'react-native'

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

export const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT

export const isIOS = Platform.OS !== 'android'

export const isIPhoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812)

export const DPI = 1 / StyleSheet.hairlineWidth

// @ts-ignore
export const isDev = process.env.NODE_ENV === 'development'
