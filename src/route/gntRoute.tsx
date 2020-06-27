import ColorVariable from '@styles/ColorVariable'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CWrapper from '@/route/components/CWrapper'
import { UnionPop } from 'union-tuple'
import HeaderBack from '@components/HeaderBack'
import { useStatusBarColorTransitionWhenScroll } from '@utils/OtherHooks'
import CHeaderBackground from '@/route/components/CHeaderBackground'

export const headerDark = {
  headerStyle: { backgroundColor: ColorVariable.main },
  headerTitleStyle: {
    color: ColorVariable.white,
  },
}

type StackRouteProps = Omit<
  React.ComponentProps<ReturnType<typeof createStackNavigator>['Screen']>,
  'name'
>

type CommonParams = {
  containerBgColor?: string
  headerShadowDisabled?: boolean
  headerBgTransition?: Parameters<typeof useStatusBarColorTransitionWhenScroll>
  headerFontColorTransition?: Parameters<
    typeof useStatusBarColorTransitionWhenScroll
  >
  [key: string]: any
}

export function gntRoute(
  component: ReturnType<typeof CWrapper>,
  options: StackRouteProps['options'],
): {
  component: ReturnType<typeof CWrapper>
  options: UnionPop<StackRouteProps['options']>
  initialParams: undefined
  listeners: undefined
}

export function gntRoute<
  Params extends NonNullable<StackRouteProps['initialParams']> & CommonParams,
  Listeners extends StackRouteProps['listeners']
>(
  component: ReturnType<typeof CWrapper>,
  options: StackRouteProps['options'],
  initialParams: Params,
  listeners?: Listeners,
): {
  component: ReturnType<typeof CWrapper>
  options: UnionPop<StackRouteProps['options']>
  initialParams: Partial<Params> & CommonParams
  listeners: Listeners
}

export function gntRoute(
  component,
  options?: StackRouteProps['options'],
  initialParams?,
  listeners?,
) {
  return {
    component,
    options: (({ route, navigation }) => {
      const $options =
        typeof options === 'function' ? options({ route, navigation }) : options
      const headerTransparent = !!(
        initialParams?.headerBgTransition || $options?.headerTransparent
      )
      const headerStyle = {
        ...$options?.headerStyle,
        borderBottomWidth: 0,
        elevation: 0,
      }
      const bgColor = (headerStyle as any).backgroundColor
      return {
        ...$options,
        headerTitleStyle: {
          ...$options?.headerTitleStyle,
          flex: 1,
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerBackTitle: $options?.headerBackTitle || null,
        headerLeft: $options?.headerLeft || HeaderBack,
        headerStyle,
        headerRight: $options?.headerRight || (() => <></>),
        headerTransparent,
        headerBackground: CHeaderBackground(bgColor, headerTransparent),
      }
    }) as UnionPop<StackRouteProps['options']>,
    initialParams,
    listeners,
  }
}
