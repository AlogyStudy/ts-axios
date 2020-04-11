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

  [paramsName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusTxet: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  requset?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInstanceManager<AxiosRequestConfig>
    response: AxiosInstanceManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponse<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponse<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponse<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponse<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponse<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponse<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponse<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstanceManager<T> {
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number
  eject(id: number): void
}
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}
