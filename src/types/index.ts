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

export interface Response<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request: any
}

export interface RequestPromise<T=any> extends Promise<Response<T>> {}

export interface RequestError extends Error {
  isRequestError: boolean
  config: RequestConfig
  code?: string | null
  request?: any
  response?: Response
}

export interface Request {
  request<T=any>(config: RequestConfig): RequestPromise<T>

  get<T=any>(url: string, config?: RequestConfig): RequestPromise<T>
  delete<T=any>(url: string, config?: RequestConfig): RequestPromise<T>
  head<T=any>(url: string, config?: RequestConfig): RequestPromise<T>
  options<T=any>(url: string, config?: RequestConfig): RequestPromise<T>

  post<T=any>(url: string, data?: any, config?: RequestConfig): RequestPromise<T>
  put<T=any>(url: string, data?: any, config?: RequestConfig): RequestPromise<T>
  patch<T=any>(url: string, data?: any, config?: RequestConfig): RequestPromise<T>
}

export interface RequestInstance extends Request {
  <T=any>(config: RequestConfig): RequestPromise<T>

  <T=any>(url: string, config?: RequestConfig): RequestPromise<T>
}
