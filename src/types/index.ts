export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface RequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface Response {
  data: any
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface RequestPromise extends Promise<Response> {}

export interface RequestError extends Error {
  isRequestError: boolean
  config: RequestConfig
  code?: string | null
  request?: any
  response?: Response
}

export interface Request {
  request(config: RequestConfig): RequestPromise

  get(url: string, config?: RequestConfig): RequestPromise
  delete(url: string, config?: RequestConfig): RequestPromise
  head(url: string, config?: RequestConfig): RequestPromise
  options(url: string, config?: RequestConfig): RequestPromise

  post(url: string, data?: any, config?: RequestConfig): RequestPromise
  put(url: string, data?: any, config?: RequestConfig): RequestPromise
  patch(url: string, data?: any, config?: RequestConfig): RequestPromise
}

export interface RequestInstance extends Request {
  (config: RequestConfig): RequestPromise
}
