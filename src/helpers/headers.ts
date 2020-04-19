import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).map(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) {
      val = val.trim()
    }
    parsed[key] = val 
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method):any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methdosToDelete = ['delete', 'get', 'post', 'put', 'options', 'head', 'patch', 'common']
  methdosToDelete.map(method => delete headers[method])

  return headers
}
