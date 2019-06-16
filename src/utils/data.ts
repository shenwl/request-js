import { isPlainObject } from './utils'

export const transformRequest = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
export const transformResponse = (data: any): any => {
  let formatData = data
  if (typeof data === 'string') {
    try {
      formatData = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return formatData
}
