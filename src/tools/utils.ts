const toString = Object.prototype.toString

export const isDate = (val: any): boolean => {
  return toString.call(val) === "[object Date]"
}

export const isObject = (val: any): boolean => {
  return val !== null && typeof val === 'object'
}
