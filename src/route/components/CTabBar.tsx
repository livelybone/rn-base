import React from 'react'
import ColorVariable from '@styles/ColorVariable'
import SizeVariable, { tabBarExtraHeight } from '@styles/SizeVariable'
import CSvg from '@components/CSvg'
import CTab from '@components/CTab'
import CText from '@components/CText'
import { StyleSheet, View } from 'react-native'

const tools = [
  { label: 'Home', icon: 'icon-home', value: 'Home' },
  {
    label: 'Msg List',
    icon: 'icon-menu',
    value: 'UserMsgList',
  },
  {
    label: 'Tab1',
    icon: 'icon-unknown',
    value: 'OtherTabRoute1',
    unavailable: true,
  },
  {
    label: 'User',
    icon: 'icon-user',
    value: 'SignIn',
  },
]

const CTabBar = () => {
  const routeName = global.route?.name
  const showTabBar = !global.route?.params?.hideTabBar

  return showTabBar ? (
    <View style={{ height: SizeVariable.tabBarHeight }}>
      <CTab
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: SizeVariable.tabBarHeight,
          paddingBottom: tabBarExtraHeight,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: ColorVariable.tableBorder,
          backgroundColor: ColorVariable.white,
        }}
        tabStyle={{
          flex: 1,
          fontSize: 10,
          fontWeight: '300',
          color: ColorVariable.fontLighter,
        }}
        options={tools}
        value={routeName}
        renderOption={(nav, activated, $style) => (
          <>
            <CSvg
              name={nav.icon}
              width={18}
              height={18}
              style={{ color: $style.color }}
            />
            <CText
              color={$style.color}
              fontSize={10}
              fontWeight="300"
              margin="5 0 0"
            >
              {nav.label}
            </CText>
          </>
        )}
        onChange={(value, nav) => {
          if (nav.unavailable) {
            global.modalUnavailable.setState({ visible: true })
          } else if (nav.value !== global.route?.name) {
            global.navigation.reset({
              index: 0,
              routes: [{ name: nav.value as string }],
            })
          }
        }}
      />
    </View>
  ) : (
    <></>
  )
}

export default CTabBar
