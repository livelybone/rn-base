import { createReduxStore } from '@auraxy/redux-usage'
import user from '@models/user'
import msg from '@models/msg'

const models = { user, msg }

export type AllState = {
  [key in keyof typeof models]: typeof models[key]['state']
}

declare module 'react-redux' {
  // 重写 useSelector 的类型
  export function useSelector<TSelected = unknown>(
    selector: (state: AllState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected
}

export function createStore() {
  const initialState = {}

  return createReduxStore(Object.values(models), {
    initialState,
    sagaOptions: {
      onError(err, info) {
        console.warn(err, info)
      },
    },
  })
}

export const store = createStore()
