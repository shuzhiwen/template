import path from 'path'
import {isNil, sample} from 'lodash'

export function randomCode(length = 6) {
  return new Array(length)
    .fill(null)
    .map(() => sample('0123456789'))
    .join('')
}

export function randomFileName(originalname: string) {
  return randomCode(8) + Date.now() + path.extname(originalname)
}

export function removeNullable<T extends object>(data: T) {
  return Object.fromEntries(Object.entries(data).filter((_, v) => !isNil(v))) as {
    [key in keyof T]: NonNullable<T[key]>
  }
}
