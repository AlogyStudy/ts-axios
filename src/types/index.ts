/**
 * axios公用 类型定义文件
 */

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headres?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusTxet: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  requset?: any
  response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosResponse

  options(url: string, config?: AxiosRequestConfig): AxiosResponse

  delete(url: string, config?: AxiosRequestConfig): AxiosResponse

  head(url: string, config?: AxiosRequestConfig): AxiosResponse

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponse

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponse

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponse
}

export interface AxiosInatance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
