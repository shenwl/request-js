import { RequestConfig } from './types'

export default (config: RequestConfig): void => {
  const { data = null, url, method = 'get', headers = {} } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)
  data && Object.entries(headers).forEach(([name, value]) => {
    xhr.setRequestHeader(name, value)
  })
  xhr.send(data)
}
