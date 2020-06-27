import React, { forwardRef, useImperativeHandle } from 'react'
import { StatusBar } from 'react-native'
import useStateTrackProp from 'use-state-track-prop'

/**
 * A array of route name
 * */
const whiteBarList: string[] = []

interface Props {
  barStyle?: 'dark-content' | 'light-content'
  backgroundColor?: string
}

declare global {
  interface Global {
    currStatusBar: {
      setBackgroundColor(color: string): void
      resetBackgroundColor(): void
    }
  }
}

const CStatusBar = forwardRef<Global['currStatusBar'], Props>(
  ({ barStyle, backgroundColor = '#fff' }, ref) => {
    const routeName = global.route?.name

    const [bg, setBg] = useStateTrackProp(backgroundColor)

    useImperativeHandle(ref, () => ({
      setBackgroundColor: setBg,
      resetBackgroundColor: () => setBg(backgroundColor),
    }))

    return (
      <StatusBar
        barStyle={
          barStyle ||
          (!whiteBarList.includes(routeName) ? 'dark-content' : 'light-content')
        }
        translucent={true}
        backgroundColor={bg}
      />
    )
  },
)

export default CStatusBar
