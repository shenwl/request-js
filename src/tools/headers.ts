import { isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toLowerCase() === normalizedName.toLowerCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  const requestHeaders = { ...headers }
  normalizeHeaderName(requestHeaders, 'Content-Type')

  if (isPlainObject(data)) {
    if (requestHeaders && !requestHeaders['Content-Type']) {
      requestHeaders['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return requestHeaders
}

export const parseHeaders = (headers: string): any => {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('/r/n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    val && (val = val.trim())
    parsed[key] = val
  })
  return parsed
}
