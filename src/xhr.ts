import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headres = {} } = config

  const req = new XMLHttpRequest()

  req.open(method.toUpperCase(), url, true)

  Object.keys(headres).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headres[name]
    } else {
      req.setRequestHeader(name, headres[name])
    }
  })

  req.send(data)
}
