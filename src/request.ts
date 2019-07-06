import Request from './core/Request'
import { RequestInstance } from './types'
import {extend} from './utils/utils'

function createInstance(): RequestInstance {
  const context = new Request()
  const instance = Request.prototype.request.bind(context)

  extend(instance, context)

  return instance as RequestInstance
}

const request = createInstance()

export default request
