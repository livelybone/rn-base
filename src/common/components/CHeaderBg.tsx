import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { isIPhoneX, SCREEN_WIDTH } from '@utils/Env'

const balanceWrapHeight = (SCREEN_WIDTH * 277) / 375 + (isIPhoneX ? 24 : 0)

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: balanceWrapHeight,
    paddingHorizontal: 38,
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SCREEN_WIDTH,
    height: '100%',
  },
})

interface Props {
  source: ImageSourcePropType
}

const CHeaderBg: React.FC<Props> = ({ source, children }) => {
  return (
    <View style={styles.header}>
      <Image style={{ ...styles.bg }} source={source} />
      {children}
    </View>
  )
}

export default CHeaderBg
