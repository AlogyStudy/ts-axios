import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headres = {}, responseType } = config

    const req = new XMLHttpRequest()

    if (responseType) {
      req.responseType = responseType
    }

    req.onreadystatechange = function headlerLoad() {
      if (req.readyState !== 4) return
      const responseHeaders = req.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? req.response : req.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: req.status,
        statusTxet: req.statusText,
        headers: responseHeaders,
        config,
        requeset: req
      }
      resolve(response)
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
  })
}
