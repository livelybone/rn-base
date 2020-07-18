import { useEffect } from 'react'
import { store } from '@/store'
import { User } from '@/api/User'
import { getToken } from '@services/Http'

export function useGuard() {
  useEffect(() => {
    const token = getToken()
    if (token && !store.getState().user.userInfo) User.getUserInfo()
  }, [])
}
