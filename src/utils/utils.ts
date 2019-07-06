const toString = Object.prototype.toString

export const isDate = (val: any): val is Date => {
  return toString.call(val) === "[object Date]"
}

export const isObject = (val: any): val is Object => {
  return val !== null && typeof val === 'object'
}

export const isPlainObject = (val: any): val is Object => {
  return toString.call(val) === "[object Object]"
}

export function extend<T, F>(to: T, from: F): T & F {
 for(const key in from) {
   (to as T & F)[key] = from[key] as any
 }
 return to as T & F;
}
