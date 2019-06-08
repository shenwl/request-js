import { RequestConfig } from './types'
import { buildURL } from './tools/url'
import { transformRequest } from './tools/data'
import xhr from './xhr'

function request(config: RequestConfig | string) {
  if (typeof config === 'string') {
    xhr({ url: config })
  } else {
    const requestConfig = processConfig(config)
    xhr(requestConfig)
  }
}

function processConfig(config: RequestConfig): RequestConfig {
  const requestConfig = { ...config }
  requestConfig.url = transformURL(requestConfig)
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

export default request
