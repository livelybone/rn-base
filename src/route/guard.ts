import { useEffect } from 'react'
import { store } from '@/store'
import { User } from '@/api/User'

export function useGuard() {
  useEffect(() => {
    if (!store.getState().user.userInfo) User.getUserInfo()
  }, [])
}
