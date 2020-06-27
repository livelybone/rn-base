import { StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '@utils/Env'
import ColorVariable from './ColorVariable'
import SizeVariable from './SizeVariable'

export default StyleSheet.create({
  vipCard: {
    width: SCREEN_WIDTH - SizeVariable.padding * 2,
    marginTop: SizeVariable.padding,
    marginHorizontal: SizeVariable.padding,
    borderRadius: 8,
    backgroundColor: ColorVariable.white,
  },
  pageContainer: {
    backgroundColor: ColorVariable.main,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    marginRight: 8,
    borderRadius: 3,
    backgroundColor: ColorVariable.fontLight,
  },
  submitBtn: {
    marginTop: 40,
    marginHorizontal: SizeVariable.padding,
    height: SizeVariable.submitBtnHeight,
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: ColorVariable.main,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  scrollContainer: {
    flex: 1,
    // marginTop: 5,
    backgroundColor: ColorVariable.bg,
  },
})
