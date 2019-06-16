import { RequestConfig, Response } from '../types'

export class RequestError extends Error {
  isRequestError: boolean
  config: RequestConfig
  code?: string | number
  request?: any
  response?: Response

  constructor(
    message: string,
    config: RequestConfig,
    code?: string | number,
    request?: any,
    response?: Response
  ) {
    super(message)

    this.isRequestError = true
    this.message = message
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    // 解决ts继承内置对象时的坑
    Object.setPrototypeOf(this, RequestError.prototype)
  }
}

export default function createError(
  message: string,
  config: RequestConfig,
  code?: string | number,
  request?: any,
  response?: Response
) {
  return new RequestError(message, config, code, request, response)
}
