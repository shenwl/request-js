import { RequestConfig } from './types'

export default (config: RequestConfig): void => {
  const { data = null, url, method = 'get', headers = {} } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)
  Object.entries(headers).forEach(([name, value]) => {
    if(data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    }
    typeof value === 'string' && xhr.setRequestHeader(name, value)
  })
  xhr.send(data)
}
