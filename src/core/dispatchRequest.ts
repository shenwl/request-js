import { RequestConfig, RequestPromise, Response } from '../types'
import { buildURL } from '../utils/url'
import { transformRequest, transformResponse } from '../utils/data'
import { processHeaders } from '../utils/headers'
import xhr from '../xhr'

export default function dispatchRequest(config: RequestConfig | string): RequestPromise {
  if (typeof config === 'string') {
    return xhr({ url: config })
  } else {
    const requestConfig = processConfig(config)
    return xhr(requestConfig).then(res => {
      res.data = transformResponseData(res)
      return res
    })
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
  return buildURL(url!, params)
}

function transformRequestData(config: RequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

function transformResponseData(res: Response): any {
  const { data } = res
  return transformResponse(data)
}

function transformHeaders(config: RequestConfig): any {
  const { data, headers = {} } = config
  return processHeaders(headers, data)
}
