/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useMemo, useRef } from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native'
import CTabBar from '@/route/components/CTabBar'
import CStatusBar from '@/route/components/CStatusBar'
import CommonStyles from '@styles/CommonStyles'
import { StackNavigationOptions } from '@react-navigation/stack'
import { useIsFocused } from '@react-navigation/native'
import { useStatusBarColorTransitionWhenScroll } from '@utils/OtherHooks'
import useWatch from 'use-watch'
import CHeaderBackground from '@/route/components/CHeaderBackground'
import { useGuard } from '@/route/guard'

declare global {
  interface ScreenProps {
    navigation: Global['navigation']
    route: Global['route']

    onScroll?(ev: NativeSyntheticEvent<NativeScrollEvent>): void
  }
}

function useScroll(
  navigation: Global['navigation'],
  route: Global['route'],
  initialOptions?: StackNavigationOptions,
) {
  const transparent = initialOptions?.headerTransparent || false
  const headerBgTransition = route.params?.headerBgTransition || []
  const headerShadowDisabled = route.params?.headerShadowDisabled || false
  const headerFontColorTransition =
    route.params?.headerFontColorTransition || []

  const {
    color: hBgColor,
    onScroll: onScrollBg,
  } = useStatusBarColorTransitionWhenScroll(...headerBgTransition)

  useWatch(
    hBgColor,
    () => {
      const bgColor =
        hBgColor || (initialOptions?.headerStyle as any)?.backgroundColor
      navigation.setOptions({
        headerBackground: CHeaderBackground(
          bgColor,
          transparent,
          headerShadowDisabled,
        ),
      })
    },
    { immediate: true },
  )

  const {
    color: hFontColor,
    onScroll: onScrollFont,
  } = useStatusBarColorTransitionWhenScroll(...headerFontColorTransition)

  useWatch(
    hFontColor,
    () => {
      navigation.setOptions({
        headerTitleStyle: {
          color:
            hFontColor?.toString('hex8') ||
            (initialOptions?.headerTitleStyle as any)?.color,
        },
      })
    },
    { immediate: true },
  )

  const onScroll = useCallback(
    (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = ev.nativeEvent?.contentOffset.y
      onScrollBg(y)
      onScrollFont(y)
    },
    [onScrollBg, onScrollFont],
  )
  return { hBgColor, hFontColor, onScroll }
}

export default function CWrapper(
  Comp: React.ComponentType<any>,
  options?: (p: any) => StackNavigationOptions,
): React.FC<ScreenProps> {
  return props => {
    useGuard()

    const ref = useRef<Global['currStatusBar']>(null)

    const isFocused = useIsFocused()

    if (isFocused) {
      global.navigation = props.navigation
      global.route = props.route
      global.currStatusBar = ref.current!
    }

    const noScroll = props.route.params?.noScroll
    const containerBgColor = props.route.params?.containerBgColor

    const $option = useMemo(() => options && options(props), [props])
    const containerStyle = {
      ...CommonStyles.scrollContainer,
      backgroundColor:
        containerBgColor || CommonStyles.scrollContainer.backgroundColor,
    }

    const { hBgColor, onScroll } = useScroll(
      props.navigation,
      props.route,
      $option,
    )

    const brightness = useMemo(() => hBgColor?.getBrightness(), [
      hBgColor?.getBrightness,
    ])

    return (
      <>
        <CStatusBar
          ref={ref}
          barStyle={
            brightness === undefined
              ? undefined
              : brightness > 150
              ? 'dark-content'
              : 'light-content'
          }
          backgroundColor={
            $option?.headerTransparent
              ? 'transparent'
              : ($option?.headerStyle as any)?.backgroundColor
          }
        />
        {noScroll ? (
          <View style={containerStyle}>
            <Comp {...props} onScroll={onScroll} />
          </View>
        ) : (
          <ScrollView
            style={containerStyle}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            <Comp {...props} />
          </ScrollView>
        )}
        <CTabBar />
      </>
    )
  }
}
