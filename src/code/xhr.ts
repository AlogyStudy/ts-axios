import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType, timeout } = config

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
        request: req
      }
      handleResponse(response)
    }

    // 网络错误
    req.onerror = function handleError() {
      reject(createError('Network Error', config, null, req))
      // reject(new Error('Network Error'))
    }

    // 延时处理
    if (timeout) {
      req.timeout = timeout
    }

    req.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceded`, config, 'ECONNABORTED', req))
    }

    req.open(method.toUpperCase(), url!, true)

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        req.setRequestHeader(name, headers[name])
      }
    })

    req.send(data)

    function handleResponse(res: AxiosResponse): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(
          createError(`Requeset failed with status code ${res.status}`, config, null, req, res)
        )
      }
    }
  })
}
