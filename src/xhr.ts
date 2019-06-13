import { RequestPromise, RequestConfig, Response } from './types'
import { parseHeaders } from './tools/headers'

export default (config: RequestConfig): RequestPromise => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType } = config

    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    xhr.open(method.toUpperCase(), url, true)
    Object.entries(headers).forEach(([name, value]) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }
      typeof value === 'string' && xhr.setRequestHeader(name, value)
    })
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }
      const responseHeaders = xhr.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? xhr.response : xhr.responseText
      const response: Response = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request: xhr
      }
      resolve(response)
    }
    xhr.send(data)
  })
}
