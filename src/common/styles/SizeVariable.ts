import { isIPhoneX, isLandscape } from '@utils/Env'

export const tabBarExtraHeight = isIPhoneX ? (isLandscape ? 21 : 32) : 0

export default {
  tabBarHeight: 49 + tabBarExtraHeight,
  padding: 12,
  fontTiny: 10,
  fontSubContent: 13,
  fontContent: 15,
  fontSubHead: 17,
  fontHead: 30,
  inputHeight: 44,
  borderRadius: 2,
  submitBtnHeight: 44,
}
