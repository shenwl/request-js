import { RequestConfig } from './types'
import xhr from './xhr'

function request(config: RequestConfig | string) {
  if (typeof config === 'string') {
    xhr({ url: config })
  } else {
    xhr(config)
  }
}

export default request
