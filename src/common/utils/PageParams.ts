declare global {
  interface PageParams {
    offset: number
    limit: number
  }

  interface PageResult<T> {
    offset: number
    limit: number
    total: number
    pageCount: number
    list: T[]

    [key: string]: any
  }
}

export function cPageParams<T extends Partial<PageParams>>(params?: T) {
  return {
    ...params,
    offset: params?.offset || 0,
    limit: params?.limit || 10,
  }
}

export function cPageResult<T = any>(result: any): PageResult<T> {
  return {
    ...result,
    offset: result?.offset || 0,
    limit: result?.limit || 10,
    total: result?.total || 0,
    pageCount: result?.pageCount || 0,
    list: result?.list || [],
  }
}
