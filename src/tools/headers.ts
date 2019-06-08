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
