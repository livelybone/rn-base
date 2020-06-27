import { store } from '@/store'
import { MSG } from '@models/msg'
import Http from '@services/Http'
import { cPageParams, cPageResult } from '@utils/PageParams'

export interface ArticleItem {
  id: number | string
  title: string
  content: string
  resume: string
  author: string
}

export class Msg {
  static list(params: Partial<PageParams>) {
    return Http.get('/msgs/list', cPageParams(params)).then(res =>
      cPageResult(res),
    )
  }

  static async markAllRead() {
    return store.dispatch({ type: MSG.MAKE_ALL_MSG_READ })
  }

  static async detail(id: number | 'user-agreement'): Promise<ArticleItem> {
    if (id === 'user-agreement') {
      return {
        id: 'user-agreement',
        title: '用户注册协议',
        content: '用户注册协议内容',
        resume: '用户注册协议',
        author: 'CMWallet 团队',
      }
    }
    return Http.get('/msgs/detail', { id })
  }
}
