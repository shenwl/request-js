import { RequestConfig } from './types'

export default (config: RequestConfig): void => {
  const { data = null, url, method = 'get' } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)

  xhr.send(data)
}
