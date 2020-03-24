import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headres = {}, responseType, timeout } = config

    const req = new XMLHttpRequest()

    if (responseType) {
      req.responseType = responseType
    }

    req.onreadystatechange = function handleLoad() {
      if (req.readyState !== 4) return

      if (req.status === 0) return
      const responseHeaders = parseHeaders(req.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? req.response : req.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: req.status,
        statusTxet: req.statusText,
        headers: responseHeaders,
        config,
        requeset: req
      }
      handleResponse(response)
    }

    // 网络错误
    req.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    // 延时处理
    if (timeout) {
      req.timeout = timeout
    }

    req.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceded`))
    }

    req.open(method.toUpperCase(), url, true)

    Object.keys(headres).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headres[name]
      } else {
        req.setRequestHeader(name, headres[name])
      }
    })

    req.send(data)

    function handleResponse(res: AxiosResponse): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(new Error(`Requeset failed with status code ${res.status}`))
      }
    }
  })
}
