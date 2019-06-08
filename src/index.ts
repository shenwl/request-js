import { RequestConfig } from './types'
import { buildURL } from './tools/url'
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
  return requestConfig
}

function transformURL(config: RequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default request
