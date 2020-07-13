import React from 'react'
import { RouteProp } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import CWrapper from '@/route/components/CWrapper'
import screens from '@/route/screens'

type RouteTypes = typeof screens
type RouteTypeKeys = keyof RouteTypes

type RootStackParamList = {
  [key in RouteTypeKeys]: RouteTypes[key]['initialParams']
}

declare global {
  interface Global {
    navigation: StackNavigationProp<RootStackParamList>
    route: RouteProp<
      { [name: string]: RootStackParamList[RouteTypeKeys] },
      string
    >

    AppRoutes: {
      [key in RouteTypeKeys]: (
        params?: Partial<RootStackParamList[key]>,
      ) => [key, RootStackParamList[key]]
    }
  }
}

global.AppRoutes = Object.keys(screens).reduce((pre, k) => {
  return {
    ...pre,
    [k]: params => [k, { ...screens[k].initialParams, ...params }],
  }
}, {} as any)

const Stack = createStackNavigator<RootStackParamList>()

export const Screens: React.FC<any> = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {Object.keys(screens).map(name => {
        const route = screens[name]
        return (
          <Stack.Screen
            key={name}
            name={name as RouteTypeKeys}
            component={CWrapper(route.component, route.options)}
            options={route.options}
            initialParams={route.initialParams}
            listeners={route.listeners}
          />
        )
      })}
    </Stack.Navigator>
  )
}
