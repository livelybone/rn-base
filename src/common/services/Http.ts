import {
  DownloadResponse,
  EngineName,
  Http as HttpClass,
  RequestData,
  RequestError,
} from '@livelybone/easy-request'
import { promiseOnPending } from '@livelybone/singleton'
import { StorageUtils } from '@livelybone/storage'
import LocalStorage from '@/localStorage'
import { signInToken, tokenQuery } from '@/localStorage/schemas/Token'
import CAlert from '@components/CAlert'

const baseURL = '/'

export function joinBaseUrl(url: string) {
  return `${baseURL}/${url}`.replace(/\/+/g, '/')
}

export function getToken() {
  const tokenObj = LocalStorage.query('Token', tokenQuery)[0]

  return tokenObj && tokenObj.value
}

const CodeType = {
  0: { defaultMsg: '' },
  1: { defaultMsg: '请求失败!' },
  403: { defaultMsg: '登录过期，请重新登陆！' },
}

interface ApiResult<T = any> {
  code: keyof typeof CodeType
  msg?: string
  data?: T
}

function isError(data: ApiResult) {
  return data.code !== 0
}

function errorDeal(e: RequestError) {
  if (
    [403, 401].some(status => e.statusCode === status || e.resCode === status)
  ) {
    e.message = CodeType[403].defaultMsg
    return CAlert(e)
      .then(() => LocalStorage.update('Token', signInToken('')))
      .then(() => Promise.reject())
  }
  e.message = (e.data && e.data.msg) || e.message
  if (e.message === 'Network request failed') e.message = '网络出错了，请重试'
  else if (!e.message) e.message = (CodeType as any)[e.resCode || 1].defaultMsg
  return Promise.reject(e)
}

const Http = new HttpClass(EngineName.Fetch, {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  convertFormDataOptions: {
    customConvertFn: data => {
      const formData = new FormData()
      Object.keys(data).forEach(k => {
        if (data[k] instanceof Array)
          data[k].forEach((v: any) => formData.append(k, v))
        else formData.append(k, data[k])
      })
      return formData
    },
  },
})

Http.interceptors.request.use(async conf => {
  return {
    ...conf,
    headers: {
      ...conf.headers,
      Connection: 'close',
      Authorization: `Bearer ${getToken()}`,
    },
  }
})

Http.interceptors.response.use(res => {
  const { data } = res

  if (isError(data)) {
    return Promise.reject(res)
  }

  return data.data
}, errorDeal)

const defaultTime = 1000

export default Http

export const CacheHttp = {
  get<T = any>(
    url: string,
    qData?: RequestData,
    cacheTime: number = defaultTime,
  ) {
    return promiseOnPending(() => Http.get<T>(url, qData), {
      id: `${url}-${StorageUtils.stringifyJSON(qData)}`,
      delayTime: cacheTime,
    })
  },
}

export const PostFormOptions = {
  headers: { 'Content-Type': 'multipart/form-data' },
}

export async function dealDownloadRes(
  res: DownloadResponse,
): Promise<[string, string]> {
  if (!res.tempFilePath)
    return Promise.reject(`下载失败，status: ${res.statusCode}`)
  return [res.tempFilePath, decodeURIComponent(res.filename)]
}
