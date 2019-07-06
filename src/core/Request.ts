import { RequestPromise, RequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Request {
  request(config: RequestConfig | string): RequestPromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: RequestConfig): RequestPromise {
    return this._requestWithoutData('get', url, config)
  }

  delete(url: string, config?: RequestConfig): RequestPromise {
    return this._requestWithoutData('delete', url, config)
  }

  head(url: string, config?: RequestConfig): RequestPromise {
    return this._requestWithoutData('head', url, config)
  }

  options(url: string, config?: RequestConfig): RequestPromise {
    return this._requestWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: RequestConfig): RequestPromise {
    return this._requestWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: RequestConfig): RequestPromise {
    return this._requestWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: RequestConfig): RequestPromise {
    return this._requestWithData('patch', url, data, config)
  }

  _requestWithoutData(method: Method, url: string, config?: RequestConfig): RequestPromise {
    return dispatchRequest({
      ...config,
      url,
      method,
    })
  }

  _requestWithData(method: Method, url: string, data?: any, config?: RequestConfig): RequestPromise {
    return dispatchRequest({
      ...config,
      url,
      data,
      method,
    })
  }
}
