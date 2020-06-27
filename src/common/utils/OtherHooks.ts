import { useCallback, useMemo, useState } from 'react'
import tinygradient, { StopInput } from 'tinygradient'

const DefaultStopInputs = [
  { color: '#fff', pos: 0 },
  { color: '#fff', pos: 1 },
]

export function useStatusBarColorTransitionWhenScroll(
  heightRange?: [number, number],
  ...args: StopInput[]
) {
  if (heightRange && args.length < 2)
    throw new Error('Arguments should be at least 2')
  const gradient = useMemo(
    () =>
      args.length > 1
        ? tinygradient(...args)
        : tinygradient(...DefaultStopInputs),
    [args],
  )
  const [color, setColor] = useState(() => {
    if (heightRange) return gradient.rgbAt(0)
    return undefined
  })
  const onScroll = useCallback(
    (scrollTop: number) => {
      if (heightRange) {
        const pos = Math.max(
          0,
          Math.min(
            1,
            (scrollTop - heightRange[0]) / (heightRange[1] - heightRange[0]),
          ),
        )
        setColor(gradient.rgbAt(pos))
      }
    },
    [gradient, heightRange],
  )
  return {
    color,
    onScroll,
  }
}
