import { RequestPromise, RequestConfig, Response } from './types'
import { parseHeaders } from './utils/headers'
import createError from './utils/error'

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

    request.open(method.toUpperCase(), url!, true)
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
      if (request.status === 0) {
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
      handleResponse(response)
    }
    // handle network error
    request.onerror = () => {
      reject(createError('Network Error', config, undefined, request))
    }
    // handle timeout error
    request.ontimeout = () => {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, undefined, request))
    }
    request.send(data)

    function handleResponse(response: Response): void {
      const { status } = response
      if (status >= 200 && status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${status}`, config, status, request, response))
      }
    }
  })
}
