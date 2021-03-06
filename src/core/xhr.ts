import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { 
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvent()

    processHeadres()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
  
      // 延时处理
      if (timeout) {
        request.timeout = timeout
      }
  
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvent(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) return
  
        if (request.status === 0) return
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusTxet: request.statusText,
          headers: responseHeaders,
          config,
          request: request
        }
        handleResponse(response)
      }

      // 网络错误
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
        // reject(new Error('Network Error'))
      }

      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceded`, config, 'ECONNABORTED', request))
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeadres(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
  
      if (xsrfCookieName && (withCredentials || isURLSameOrigin(url!))) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
  
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(res: AxiosResponse): void {
      if (!validateStatus || validateStatus(res.status)) {
        resolve(res)
      } else {
        reject(
          createError(`Requeset failed with status code ${res.status}`, config, null, request, res)
        )
      }
    }
  })
}
