import {QueryArgs} from '@/types'
import {isNil, sample} from 'lodash'
import {WithId} from 'mongodb'
import path from 'path'

export function randomCode(length = 6) {
  return new Array(length)
    .fill(null)
    .map(() => sample('0123456789'))
    .join('')
}

export function randomFileName(originalname: string) {
  return randomCode(8) + Date.now() + path.extname(originalname)
}

export function withId<T>(data: WithId<T>) {
  return {...data, id: data._id.toString()}
}

export function removeNullable<T extends object>(data: T) {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => !isNil(v))
  ) as {
    [key in keyof T]: NonNullable<T[key]>
  }
}

export function transformArgs<T extends object>(args: QueryArgs<T>) {
  const {limit, offset, filter} = args
  const restFilter = removeNullable(filter! ?? {})
  return {
    ...restFilter,
    search: new RegExp(filter?.search ?? ''),
    pagination: {
      limit: limit ?? undefined,
      skip: offset ?? undefined,
    },
  }
}
