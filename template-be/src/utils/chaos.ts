import {sample} from 'lodash'

export function randomCode(length = 6) {
  return new Array(length)
    .fill(null)
    .map(() => sample('0123456789'))
    .join('')
}
