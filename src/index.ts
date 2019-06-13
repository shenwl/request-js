import { RequestConfig, RequestPromise } from './types'
import { buildURL } from './tools/url'
import { transformRequest } from './tools/data'
import { processHeaders } from './tools/headers'
import xhr from './xhr'

function request(config: RequestConfig | string): RequestPromise {
  if (typeof config === 'string') {
    return xhr({ url: config })
  } else {
    const requestConfig = processConfig(config)
    return xhr(requestConfig)
  }
}

function processConfig(config: RequestConfig): RequestConfig {
  const requestConfig = { ...config }
  requestConfig.url = transformURL(requestConfig)
  requestConfig.headers = transformHeaders(requestConfig)
  requestConfig.data = transformRequestData(requestConfig)
  return requestConfig
}

function transformURL(config: RequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: RequestConfig): any {
  const { data } = config
  return transformRequest(data)
}
function transformHeaders(config: RequestConfig): any {
  const { data, headers = {} } = config
  return processHeaders(headers, data)
}

export default request
