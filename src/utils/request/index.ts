import systemConfig from '@/config'
import { getLocalStorage } from '@/utils/storage'
import axios, { AxiosRequestConfig } from 'axios'
import { errorCode, errorMsg, handleCommonError, handleNoCommontError } from './errorHandle'

type requestOptions = AxiosRequestConfig & {
  url: string
  noLoading?: boolean
  body?: any
  headers?: any
}
const { baseUrl, authKey } = systemConfig
axios.interceptors.response.use(
  (response: any) => response.data,
  error => {
    const { response } = error
    if (response) {
      const { status, data, config } = response
      data.message = data.message || errorMsg
      const { code, message } = data
      if (status === 400) {
        handleCommonError(data, config)
        const errorObj = { code, message }
        if (data && data.code >= 240015 && data.code <= 240021) {
          return Promise.reject(new Error(JSON.stringify(errorObj)))
        }
        if (data && data.code === errorCode.c330024) {
          return Promise.reject(new Error(JSON.stringify(errorObj)))
        }
        return Promise.reject(message)
      }
      // 404 502 ..
      // const msg = errorMsg
      handleNoCommontError(errorMsg)
      return Promise.reject(errorMsg)
    }
    if (error.code === 'ECONNABORTED') {
      const timeoutMsg = '请求超时，请稍后再试'
      handleNoCommontError(timeoutMsg)
      return Promise.reject(timeoutMsg)
    }
    const networkErrorMsg = '您的网络出现问题，请检查网络重试'
    handleNoCommontError(networkErrorMsg)
    return Promise.reject(networkErrorMsg)
  }
)
export default async function request(options: requestOptions) {
  const { url } = options
  delete options.url
  const hasApi = url.indexOf('api') === -1
  const Authorization = getLocalStorage(authKey)
  let headers = {}
  if (options) {
    headers = options.headers || {}
  }
  const defaultOptions = {
    headers: {
      ...headers,
      [authKey]: Authorization,
    },
    credentials: 'include',
    timeout: 10000,
    withCredentials: true,
    validateStatus(status: any) {
      return status >= 200 && status < 300
    },
  }
  if (options) {
    delete options.headers
  }
  const newOptions: requestOptions = { ...defaultOptions, ...options }
  newOptions.data = newOptions.body
  delete newOptions.body
  const newUrl = hasApi ? baseUrl + url : url
  return axios(newUrl, newOptions)
}
