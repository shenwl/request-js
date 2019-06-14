import { RequestPromise, RequestConfig, Response } from './types'
import { parseHeaders } from './tools/headers'

export default (config: RequestConfig): RequestPromise => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)
    Object.entries(headers).forEach(([name, value]) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }
      typeof value === 'string' && request.setRequestHeader(name, value)
    })
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: Response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request: request
      }
      resolve(response)
    }
    // handle network error
    request.onerror = () => {
      reject(new Error('Network Error'))
    }
    // handle timeout error
    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }
    request.send(data)
  })
}
